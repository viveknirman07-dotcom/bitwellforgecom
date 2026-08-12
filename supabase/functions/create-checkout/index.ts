import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3.23.8'
import { admin, clientIp, logActivity, rateLimit } from '../_shared/db.ts'
import { COUNTRY_CURRENCY, convertFromInr, resolveCountry } from '../_shared/money.ts'
import { paypalConfigured, paypalFetch } from '../_shared/paypal.ts'
import { resolveAffiliateByCode } from '../_shared/affiliate.ts'

const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://bitwellforgecom.lovable.app'
const NOWPAYMENTS_API_KEY = Deno.env.get('NOWPAYMENTS_API_KEY') ?? ''
const FUNCTIONS_BASE = `${Deno.env.get('MY_SUPABASE_URL') ?? Deno.env.get('SUPABASE_URL')}/functions/v1`

const json = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

const BodySchema = z.object({
  email: z.string().trim().email().max(255),
  full_name: z.string().trim().min(1).max(120).optional(),
  provider: z.enum(['paypal', 'nowpayments']),
  /** The currency the customer chose to be billed in. Amount is never client-supplied. */
  currency: z.string().trim().length(3).optional(),
  pay_currency: z.string().trim().min(2).max(20).optional(),
  ref: z.string().trim().min(3).max(24).optional(),
})

// The complete set of currencies PayPal is able to settle in.
const PAYPAL_CURRENCIES = new Set([
  'AUD', 'BRL', 'CAD', 'CNY', 'CZK', 'DKK', 'EUR', 'HKD', 'HUF', 'ILS', 'JPY', 'MYR', 'MXN',
  'TWD', 'NZD', 'NOK', 'PHP', 'PLN', 'GBP', 'SGD', 'SEK', 'CHF', 'THB', 'USD',
])

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const ip = clientIp(req)
  const db = admin()

  try {
    if (!(await rateLimit('checkout', ip, 10, 3600))) {
      return new Response(
        JSON.stringify({ error: 'Too many checkout attempts. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    const parsed = BodySchema.safeParse(await req.json())
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    const { email, full_name, provider, currency, pay_currency, ref } = parsed.data

    // Referral attribution resolved server-side; the client only supplies a code.
    const affiliate = ref ? await resolveAffiliateByCode(ref) : null
    const attributed = affiliate && affiliate.status === 'active' ? affiliate : null

    const { data: product } = await db
      .from('products')
      .select('id, name, price_inr')
      .eq('slug', 'commercial-growth-system')
      .eq('is_active', true)
      .maybeSingle()
    if (!product) throw new Error('Product unavailable')

    const amountInr = Number(product.price_inr)
    const country = await resolveCountry(req, ip)
    const localCurrency = COUNTRY_CURRENCY[country] ?? 'USD'

    /*
     * The customer chooses the currency; the client never sends an amount.
     * The charge is always recomputed here from the ₹14,500 source of truth,
     * so a tampered client cannot influence what is billed.
     */
    const settleCurrency = (currency ?? 'USD').toUpperCase()
    if (!/^[A-Z]{3}$/.test(settleCurrency)) {
      return json({ error: 'Unrecognised currency', code: 'currency_invalid' }, 400)
    }

    // Never silently substitute a currency the customer did not choose.
    if (provider === 'paypal' && !PAYPAL_CURRENCIES.has(settleCurrency)) {
      return json(
        {
          code: 'currency_unsupported',
          error: `PayPal cannot settle in ${settleCurrency}.`,
          provider: 'paypal',
          supported: [...PAYPAL_CURRENCIES].sort(),
        },
        400,
      )
    }
    if (provider === 'nowpayments' && settleCurrency !== 'USD') {
      return json(
        {
          code: 'currency_unsupported',
          error: `Crypto payment is priced in USD and cannot settle in ${settleCurrency}.`,
          provider: 'nowpayments',
          supported: ['USD'],
        },
        400,
      )
    }

    let settle: { amount: number; rate: number; currency?: string }
    try {
      settle = await convertFromInr(amountInr, settleCurrency)
    } catch (_) {
      return json(
        { code: 'rates_unavailable', error: 'Currency conversion is temporarily unavailable. Please try again shortly.' },
        503,
      )
    }
    if ((settle.currency ?? settleCurrency) !== settleCurrency) {
      return json(
        { code: 'currency_unsupported', error: `No live rate is available for ${settleCurrency}.` },
        400,
      )
    }
    const display = settle

    const { data: order, error: orderErr } = await db
      .from('orders')
      .insert({
        email: email.toLowerCase(),
        full_name: full_name ?? null,
        product_id: product.id,
        amount_inr: amountInr,
        display_currency: settleCurrency,
        display_amount: settle.amount,
        fx_rate: settle.rate,
        provider,
        status: 'pending',
        country_code: country,
        affiliate_id: attributed?.id ?? null,
        referral_code: attributed?.code ?? null,
        metadata: {
          selected_currency: settleCurrency,
          selected_amount: display.amount,
          geo_currency: localCurrency,
          fx_rate: settle.rate,
          ip,
        },
      })
      .select('id')
      .single()
    if (orderErr || !order) throw new Error(`Could not create order: ${orderErr?.message}`)

    if (provider === 'paypal') {
      if (!paypalConfigured()) throw new Error('PayPal is not configured')

      const { ok, body } = await paypalFetch('/v2/checkout/orders', {
        method: 'POST',
        body: JSON.stringify({
          intent: 'CAPTURE',
          purchase_units: [
            {
              reference_id: order.id,
              custom_id: order.id,
              description: String(product.name).slice(0, 127),
              amount: {
                currency_code: settleCurrency,
                value: settle.amount.toFixed(
                  ['JPY', 'HUF', 'TWD'].includes(settleCurrency) ? 0 : 2,
                ),
              },
            },
          ],
          payment_source: {
            paypal: {
              experience_context: {
                brand_name: 'BitwellForge',
                user_action: 'PAY_NOW',
                shipping_preference: 'NO_SHIPPING',
                return_url: `${SITE_URL}/checkout/success?order=${order.id}`,
                cancel_url: `${SITE_URL}/checkout?cancelled=1`,
              },
            },
          },
        }),
      })
      if (!ok) {
        await db.from('orders').update({ status: 'failed', metadata: { paypal_error: body } }).eq('id', order.id)
        throw new Error('PayPal order creation failed')
      }

      await db.from('orders').update({ provider_order_id: String(body.id) }).eq('id', order.id)
      await logActivity('checkout.created', { order_id: order.id, provider }, null, ip)

      const links = (body.links ?? []) as Array<{ rel: string; href: string }>
      return new Response(
        JSON.stringify({
          order_id: order.id,
          provider: 'paypal',
          paypal_order_id: body.id,
          approve_url: links.find((l) => l.rel === 'payer-action' || l.rel === 'approve')?.href ?? null,
          currency: settleCurrency,
          amount: settle.amount,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    // NOWPayments
    if (!NOWPAYMENTS_API_KEY) throw new Error('Crypto payments are not configured')

    const res = await fetch('https://api.nowpayments.io/v1/invoice', {
      method: 'POST',
      headers: { 'x-api-key': NOWPAYMENTS_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        price_amount: settle.amount,
        price_currency: 'usd',
        pay_currency: pay_currency ?? undefined,
        order_id: order.id,
        order_description: String(product.name),
        ipn_callback_url: `${FUNCTIONS_BASE}/nowpayments-ipn`,
        success_url: `${SITE_URL}/checkout/success?order=${order.id}`,
        cancel_url: `${SITE_URL}/checkout?cancelled=1`,
      }),
    })
    const invoice = await res.json()
    if (!res.ok || !invoice?.invoice_url) {
      await db.from('orders').update({ status: 'failed', metadata: { nowpayments_error: invoice } }).eq('id', order.id)
      throw new Error('Crypto invoice creation failed')
    }

    await db
      .from('orders')
      .update({ provider_order_id: String(invoice.id), status: 'processing' })
      .eq('id', order.id)
    await logActivity('checkout.created', { order_id: order.id, provider }, null, ip)

    return new Response(
      JSON.stringify({
        order_id: order.id,
        provider: 'nowpayments',
        invoice_id: invoice.id,
        approve_url: invoice.invoice_url,
        currency: 'USD',
        amount: settle.amount,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (e) {
    console.error('create-checkout', e)
    return new Response(JSON.stringify({ error: String((e as Error).message ?? e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
