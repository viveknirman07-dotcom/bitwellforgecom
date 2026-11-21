import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3.23.8'
import { admin, clientIp, logActivity, rateLimit } from '../_shared/db.ts'
import { paypalConfigured, paypalFetch } from '../_shared/paypal.ts'
import { AUDIT_PRICE_USD, AUDIT_SITE, AUDIT_SLUG } from '../_shared/audit.ts'

const FUNCTIONS_BASE = `${Deno.env.get('SUPABASE_URL')}/functions/v1`
const NOW_KEY = Deno.env.get('NOWPAYMENTS_API_KEY') ?? ''
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
const Body = z.object({
  email: z.string().trim().email().max(255),
  full_name: z.string().trim().min(1).max(120),
  provider: z.enum(['paypal', 'nowpayments']),
})

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  const ip = clientIp(req)
  const db = admin()
  try {
    if (!(await rateLimit('audit-checkout', ip, 10, 3600))) return json({ error: 'Too many checkout attempts. Please try again later.' }, 429)
    const p = Body.safeParse(await req.json().catch(() => null))
    if (!p.success) return json({ error: 'Please enter your name and a valid email.' }, 400)
    const { email, full_name, provider } = p.data
    const { data: product } = await db.from('products').select('id, name').eq('slug', AUDIT_SLUG).eq('is_active', true).maybeSingle()
    if (!product) return json({ error: 'The audit is not available right now.' }, 503)

    // Amount is fixed server-side; the browser never sends a price.
    const { data: order, error } = await db.from('orders').insert({
      email: email.toLowerCase(), full_name, product_id: product.id, amount_inr: 0,
      display_currency: 'USD', display_amount: AUDIT_PRICE_USD, original_display_amount: AUDIT_PRICE_USD,
      commissionable_amount_usd: AUDIT_PRICE_USD, provider, status: 'pending', metadata: { ip, product: AUDIT_SLUG },
    }).select('id').single()
    if (error || !order) throw new Error(`Could not create order: ${error?.message}`)
    const success = `${AUDIT_SITE}/audit/thank-you?order=${order.id}`
    const cancel = `${AUDIT_SITE}/audit?cancelled=1`

    if (provider === 'paypal') {
      if (!paypalConfigured()) throw new Error('PayPal is not configured')
      const { ok, body } = await paypalFetch('/v2/checkout/orders', {
        method: 'POST',
        headers: { 'PayPal-Request-Id': order.id },
        body: JSON.stringify({
          intent: 'CAPTURE',
          purchase_units: [{ reference_id: order.id, custom_id: order.id, description: product.name, amount: { currency_code: 'USD', value: AUDIT_PRICE_USD.toFixed(2) } }],
          payment_source: { paypal: { experience_context: { brand_name: 'BitwellForge', user_action: 'PAY_NOW', shipping_preference: 'NO_SHIPPING', return_url: success, cancel_url: cancel } } },
        }),
      })
      if (!ok) {
        await db.from('orders').update({ status: 'failed', metadata: { paypal_error: body } }).eq('id', order.id)
        return json({ error: 'PayPal could not start the payment. Please try again.', details: body }, 502)
      }
      await db.from('orders').update({ provider_order_id: String(body.id) }).eq('id', order.id)
      await logActivity('checkout.created', { order_id: order.id, provider, product: AUDIT_SLUG }, null, ip)
      const links = (body.links ?? []) as Array<{ rel: string; href: string }>
      return json({ order_id: order.id, approve_url: links.find((l) => l.rel === 'payer-action' || l.rel === 'approve')?.href ?? null })
    }

    if (!NOW_KEY) throw new Error('Crypto payments are not configured')
    const res = await fetch('https://api.nowpayments.io/v1/invoice', {
      method: 'POST',
      headers: { 'x-api-key': NOW_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ price_amount: AUDIT_PRICE_USD, price_currency: 'usd', order_id: order.id, order_description: product.name,
        ipn_callback_url: `${FUNCTIONS_BASE}/nowpayments-ipn`, success_url: success, cancel_url: cancel }),
    })
    const inv = await res.json().catch(() => ({}))
    if (!res.ok || !inv?.invoice_url) {
      await db.from('orders').update({ status: 'failed', metadata: { nowpayments_error: inv } }).eq('id', order.id)
      return json({ error: 'The crypto payment could not be started. Please try again.', details: inv }, 502)
    }
    await db.from('orders').update({ provider_order_id: String(inv.id), status: 'processing' }).eq('id', order.id)
    await logActivity('checkout.created', { order_id: order.id, provider, product: AUDIT_SLUG }, null, ip)
    return json({ order_id: order.id, approve_url: inv.invoice_url })
  } catch (e) {
    console.error('audit-checkout', e)
    return json({ error: String((e as Error).message ?? e) }, 500)
  }
})
