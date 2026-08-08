import { admin } from './db.ts'

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function generateCode(len = 6) {
  const bytes = crypto.getRandomValues(new Uint8Array(len))
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('')
}

export async function resolveAffiliateByCode(code: string) {
  if (!code) return null
  const { data } = await admin()
    .from('affiliates')
    .select('id, user_id, code, email, status')
    .ilike('code', code.trim())
    .maybeSingle()
  return data ?? null
}

export const COMMISSION_USD = 50

/**
 * Creates the single commission owed for a verified, attributed order.
 * Idempotent: the unique constraint on commissions.order_id makes webhook
 * retries and duplicate provider events impossible to double-pay.
 */
export async function recordCommission(orderId: string) {
  const db = admin()

  const { data: order } = await db
    .from('orders')
    .select('id, affiliate_id, status, user_id, email, paid_at, created_at')
    .eq('id', orderId)
    .maybeSingle()

  if (!order || !order.affiliate_id || order.status !== 'paid') return null

  const { data: affiliate } = await db
    .from('affiliates')
    .select('id, user_id, email, status')
    .eq('id', order.affiliate_id)
    .maybeSingle()
  if (!affiliate || affiliate.status !== 'active') return null

  // Self-referral guard: neither the buyer account nor the buyer email may
  // belong to the attributed affiliate.
  const buyerEmail = String(order.email ?? '').toLowerCase()
  if (affiliate.user_id === order.user_id) return null
  if (String(affiliate.email ?? '').toLowerCase() === buyerEmail) return null

  const paidAt = order.paid_at ? new Date(order.paid_at) : new Date()
  const period = new Date(Date.UTC(paidAt.getUTCFullYear(), paidAt.getUTCMonth(), 1))
    .toISOString()
    .slice(0, 10)

  const { data, error } = await db
    .from('commissions')
    .upsert(
      {
        affiliate_id: affiliate.id,
        order_id: order.id,
        amount_usd: COMMISSION_USD,
        currency: 'USD',
        status: 'pending',
        period_month: period,
      },
      { onConflict: 'order_id', ignoreDuplicates: true },
    )
    .select('id')
    .maybeSingle()

  if (error) {
    console.error('recordCommission', error.message)
    return null
  }
  return data?.id ?? null
}

export async function voidCommission(orderId: string, reason: string) {
  await admin()
    .from('commissions')
    .update({ status: 'void', void_reason: reason })
    .eq('order_id', orderId)
    .neq('status', 'paid')
}

export async function hashIp(ip: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip))
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 32)
}
