import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createHmac } from 'node:crypto'
import { admin } from '../_shared/db.ts'
import { fulfillOrder } from '../_shared/fulfill.ts'

const IPN_SECRET = Deno.env.get('NOWPAYMENTS_IPN_SECRET') ?? ''
const API_KEY = Deno.env.get('NOWPAYMENTS_API_KEY') ?? ''

/** NOWPayments signs the HMAC-SHA512 of the JSON body with keys sorted alphabetically. */
function sortDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortDeep)
  if (value && typeof value === 'object') {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((acc, k) => {
        acc[k] = sortDeep((value as Record<string, unknown>)[k])
        return acc
      }, {})
  }
  return value
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const db = admin()
  const raw = await req.text()
  let payload: Record<string, any>
  try {
    payload = JSON.parse(raw)
  } catch {
    return new Response('bad payload', { status: 400, headers: corsHeaders })
  }

  const signature = req.headers.get('x-nowpayments-sig') ?? ''
  let verified = false
  let reason = 'NOWPAYMENTS_IPN_SECRET not configured'
  if (IPN_SECRET && signature) {
    const expected = createHmac('sha512', IPN_SECRET)
      .update(JSON.stringify(sortDeep(payload)))
      .digest('hex')
    verified = timingSafeEqual(expected, signature)
    reason = verified ? 'ok' : 'signature mismatch'
  }

  const eventId = `${payload.payment_id ?? crypto.randomUUID()}:${payload.payment_status ?? 'unknown'}`

  const { data: seen } = await db
    .from('webhook_events')
    .select('id, status')
    .eq('provider', 'nowpayments')
    .eq('event_id', eventId)
    .maybeSingle()
  if (seen?.status === 'processed') return new Response('ok', { status: 200, headers: corsHeaders })

  const { data: record } = await db
    .from('webhook_events')
    .upsert(
      {
        provider: 'nowpayments',
        event_id: eventId,
        event_type: String(payload.payment_status ?? 'unknown'),
        signature_verified: verified,
        payload,
        status: verified ? 'received' : 'rejected',
        error: verified ? null : reason,
      },
      { onConflict: 'provider,event_id' },
    )
    .select('id')
    .single()

  if (!verified) {
    console.error('nowpayments-ipn rejected:', reason)
    return new Response('signature not verified', { status: 401, headers: corsHeaders })
  }

  try {
    const orderId = String(payload.order_id ?? '')
    const status = String(payload.payment_status ?? '')

    const { data: order } = await db
      .from('orders')
      .select('id, status, display_amount, display_currency')
      .eq('id', orderId)
      .maybeSingle()

    if (order) {
      if (['finished', 'confirmed'].includes(status)) {
        // Re-read the payment straight from NOWPayments before granting access.
        let authoritative = payload
        if (API_KEY && payload.payment_id) {
          const r = await fetch(`https://api.nowpayments.io/v1/payment/${payload.payment_id}`, {
            headers: { 'x-api-key': API_KEY },
          })
          if (r.ok) authoritative = await r.json()
        }

        const paid = Number(authoritative.price_amount ?? 0)
        const currency = String(authoritative.price_currency ?? '').toUpperCase()
        const finished = ['finished', 'confirmed'].includes(String(authoritative.payment_status))
        const amountOk =
          currency === order.display_currency &&
          paid >= Number(order.display_amount) - 0.01

        if (finished && amountOk) {
          await db.from('payments').upsert(
            {
              order_id: order.id,
              provider: 'nowpayments',
              provider_payment_id: String(authoritative.payment_id),
              amount: paid,
              currency,
              status: 'completed',
              verified: true,
              raw: authoritative,
            },
            { onConflict: 'provider,provider_payment_id' },
          )
          await fulfillOrder(order.id)
        }
      } else if (['failed', 'expired', 'refunded'].includes(status)) {
        await db
          .from('orders')
          .update({ status: status === 'refunded' ? 'refunded' : 'failed' })
          .eq('id', order.id)
        if (status === 'refunded') {
          await db
            .from('entitlements')
            .update({ revoked_at: new Date().toISOString() })
            .eq('order_id', order.id)
        }
      } else if (order.status === 'pending') {
        await db.from('orders').update({ status: 'awaiting_payment' }).eq('id', order.id)
      }
    }

    await db
      .from('webhook_events')
      .update({ status: 'processed', processed_at: new Date().toISOString() })
      .eq('id', record!.id)
  } catch (e) {
    console.error('nowpayments-ipn processing', e)
    await db.from('webhook_events').update({ status: 'error', error: String(e) }).eq('id', record!.id)
    return new Response('processing error', { status: 500, headers: corsHeaders })
  }

  return new Response('ok', { status: 200, headers: corsHeaders })
})
