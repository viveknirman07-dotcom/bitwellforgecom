import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { admin } from '../_shared/db.ts'
import { paypalFetch, verifyPaypalWebhook } from '../_shared/paypal.ts'
import { fulfillOrder } from '../_shared/fulfill.ts'

const RELEVANT = new Set([
  'PAYMENT.CAPTURE.COMPLETED',
  'CHECKOUT.ORDER.APPROVED',
  'CHECKOUT.ORDER.COMPLETED',
])
const NEGATIVE = new Set([
  'PAYMENT.CAPTURE.DENIED',
  'PAYMENT.CAPTURE.REFUNDED',
  'PAYMENT.CAPTURE.REVERSED',
])

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const db = admin()
  const raw = await req.text()
  let event: Record<string, any>
  try {
    event = JSON.parse(raw)
  } catch {
    return new Response('bad payload', { status: 400, headers: corsHeaders })
  }

  const eventId = String(event.id ?? crypto.randomUUID())
  const eventType = String(event.event_type ?? 'unknown')

  const { data: seen } = await db
    .from('webhook_events')
    .select('id, status')
    .eq('provider', 'paypal')
    .eq('event_id', eventId)
    .maybeSingle()
  if (seen?.status === 'processed') {
    return new Response('ok', { status: 200, headers: corsHeaders })
  }

  const { verified, reason } = await verifyPaypalWebhook(req, raw)

  const { data: record } = await db
    .from('webhook_events')
    .upsert(
      {
        provider: 'paypal',
        event_id: eventId,
        event_type: eventType,
        signature_verified: verified,
        payload: event,
        status: verified ? 'received' : 'rejected',
        error: verified ? null : reason,
      },
      { onConflict: 'provider,event_id' },
    )
    .select('id')
    .single()

  if (!verified) {
    console.error('paypal-webhook rejected:', reason)
    return new Response('signature not verified', { status: 401, headers: corsHeaders })
  }

  try {
    const resource = event.resource ?? {}
    const orderId: string | undefined =
      resource.custom_id ??
      resource.purchase_units?.[0]?.custom_id ??
      resource.purchase_units?.[0]?.reference_id ??
      resource.supplementary_data?.related_ids?.order_id

    if (NEGATIVE.has(eventType) && orderId) {
      const status = eventType === 'PAYMENT.CAPTURE.REFUNDED' ? 'refunded' : 'failed'
      await db.from('orders').update({ status }).eq('id', orderId)
      if (status === 'refunded') {
        await db
          .from('entitlements')
          .update({ revoked_at: new Date().toISOString() })
          .eq('order_id', orderId)
      }
    } else if (RELEVANT.has(eventType) && orderId) {
      const { data: order } = await db
        .from('orders')
        .select('id, status, provider_order_id, display_amount, display_currency')
        .eq('id', orderId)
        .maybeSingle()

      if (order && order.status !== 'paid' && order.provider_order_id) {
        // Re-read the order from PayPal rather than trusting the payload.
        const { ok, body } = await paypalFetch(`/v2/checkout/orders/${order.provider_order_id}`)
        const capture = (body?.purchase_units as Array<any>)?.[0]?.payments?.captures?.[0]
        const amount = Number(capture?.amount?.value ?? 0)
        const currency = String(capture?.amount?.currency_code ?? '')
        const good =
          ok &&
          capture?.status === 'COMPLETED' &&
          Math.abs(amount - Number(order.display_amount)) < 0.01 &&
          currency === order.display_currency

        if (good) {
          await db.from('payments').upsert(
            {
              order_id: order.id,
              provider: 'paypal',
              provider_payment_id: String(capture.id),
              amount,
              currency,
              status: 'completed',
              verified: true,
              raw: body,
            },
            { onConflict: 'provider,provider_payment_id' },
          )
          await fulfillOrder(order.id)
        }
      }
    }

    await db
      .from('webhook_events')
      .update({ status: 'processed', processed_at: new Date().toISOString() })
      .eq('id', record!.id)
  } catch (e) {
    console.error('paypal-webhook processing', e)
    await db
      .from('webhook_events')
      .update({ status: 'error', error: String(e), attempts: (seen ? 1 : 0) + 1 })
      .eq('id', record!.id)
    return new Response('processing error', { status: 500, headers: corsHeaders })
  }

  return new Response('ok', { status: 200, headers: corsHeaders })
})
