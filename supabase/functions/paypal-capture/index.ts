import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3.23.8'
import { admin, clientIp, rateLimit } from '../_shared/db.ts'
import { paypalFetch } from '../_shared/paypal.ts'
import { fulfillOrder, markOrderFailed } from '../_shared/fulfill.ts'

const BodySchema = z.object({
  order_id: z.string().uuid(),
  paypal_order_id: z.string().trim().min(4).max(64),
})

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const ip = clientIp(req)
  const db = admin()
  try {
    if (!(await rateLimit('paypal-capture', ip, 20, 3600))) {
      return new Response(JSON.stringify({ error: 'Too many attempts' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const parsed = BodySchema.safeParse(await req.json())
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    const { order_id, paypal_order_id } = parsed.data

    const { data: order } = await db
      .from('orders')
      .select('id, status, provider, provider_order_id, display_currency, display_amount, email')
      .eq('id', order_id)
      .maybeSingle()
    if (!order || order.provider !== 'paypal' || order.provider_order_id !== paypal_order_id) {
      return new Response(JSON.stringify({ error: 'Order not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (order.status === 'paid') {
      return new Response(JSON.stringify({ status: 'paid', order_id: order.id }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { ok, body } = await paypalFetch(`/v2/checkout/orders/${paypal_order_id}/capture`, {
      method: 'POST',
      body: '{}',
    })

    const alreadyCaptured =
      !ok &&
      Array.isArray((body as { details?: Array<{ issue?: string }> })?.details) &&
      (body as { details: Array<{ issue?: string }> }).details.some(
        (d) => d.issue === 'ORDER_ALREADY_CAPTURED',
      )

    let source = body
    if (alreadyCaptured) {
      const fetched = await paypalFetch(`/v2/checkout/orders/${paypal_order_id}`)
      source = fetched.body
    } else if (!ok) {
      await markOrderFailed(order.id, 'paypal capture failed')
      return new Response(JSON.stringify({ error: 'Payment could not be captured' }), {
        status: 402,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const unit = (source?.purchase_units as Array<Record<string, any>>)?.[0]
    const capture = unit?.payments?.captures?.[0]
    const status = String(source?.status ?? '')
    const captureStatus = String(capture?.status ?? '')
    const amount = Number(capture?.amount?.value ?? 0)
    const currency = String(capture?.amount?.currency_code ?? '')

    // Authoritative server-side verification: PayPal must confirm the exact
    // amount and currency we recorded on the order.
    const amountMatches =
      Math.abs(amount - Number(order.display_amount)) < 0.01 && currency === order.display_currency

    if (!(status === 'COMPLETED' && captureStatus === 'COMPLETED' && amountMatches)) {
      await markOrderFailed(order.id, `verification failed status=${status} capture=${captureStatus}`)
      return new Response(JSON.stringify({ error: 'Payment verification failed' }), {
        status: 402,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    await db.from('payments').upsert(
      {
        order_id: order.id,
        provider: 'paypal',
        provider_payment_id: String(capture.id),
        amount,
        currency,
        status: 'completed',
        verified: true,
        raw: source,
      },
      { onConflict: 'provider,provider_payment_id' },
    )

    await fulfillOrder(order.id)

    return new Response(JSON.stringify({ status: 'paid', order_id: order.id, email: order.email }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    console.error('paypal-capture', e)
    return new Response(JSON.stringify({ error: 'Unexpected error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
