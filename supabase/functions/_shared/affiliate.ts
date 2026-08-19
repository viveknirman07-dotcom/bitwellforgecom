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
 * Buyer benefit granted when a referred visitor validates the matching
 * affiliate code. $10 is an absolute ceiling enforced server-side; every
 * discount in the system passes through capDiscountUsd().
 */
export const AFFILIATE_DISCOUNT_USD = 10
export const MAX_AFFILIATE_DISCOUNT_USD = 10

export function capDiscountUsd(value: number): number {
  const n = Number(value)
  if (!Number.isFinite(n) || n <= 0) return 0
  return Math.min(MAX_AFFILIATE_DISCOUNT_USD, Math.round(n * 100) / 100)
}

export interface AttributionResult {
  ok: boolean
  code?: 'referral_inactive' | 'code_required' | 'code_invalid' | 'code_mismatch' | 'self_referral'
  message?: string
  affiliate?: { id: string; code: string; email: string | null; user_id: string }
  discount_usd?: number
}

/**
 * The single authority on affiliate attribution.
 *
 * Both the referral code carried by the link AND the code typed at checkout are
 * resolved independently against the database and must point at the same active
 * affiliate row before any benefit or commission eligibility exists.
 */
export async function verifyAttribution(
  refCode: string | null | undefined,
  enteredCode: string | null | undefined,
  buyerEmail?: string | null,
): Promise<AttributionResult> {
  const ref = (refCode ?? '').trim()
  if (!ref) return { ok: true, discount_usd: 0 }

  const referred = await resolveAffiliateByCode(ref)
  // A stale or unknown referral never blocks a purchase: it degrades to a
  // plain direct sale with no benefit and no attribution.
  if (!referred || referred.status !== 'active') {
    return { ok: false, code: 'referral_inactive', message: 'This referral link is no longer active.' }
  }

  const entered = (enteredCode ?? '').trim()
  if (!entered) {
    return { ok: false, code: 'code_required', message: 'An affiliate code is required to complete this purchase.' }
  }

  const typed = await resolveAffiliateByCode(entered)
  if (!typed || typed.status !== 'active') {
    return { ok: false, code: 'code_invalid', message: 'That affiliate code is not valid.' }
  }
  if (typed.id !== referred.id) {
    return {
      ok: false,
      code: 'code_mismatch',
      message: 'This affiliate code does not match the referral link used to access this offer.',
    }
  }

  const email = String(buyerEmail ?? '').toLowerCase()
  if (email && String(referred.email ?? '').toLowerCase() === email) {
    return { ok: false, code: 'self_referral', message: 'An affiliate cannot use their own referral code.' }
  }

  return {
    ok: true,
    affiliate: {
      id: referred.id,
      code: referred.code,
      email: referred.email,
      user_id: referred.user_id,
    },
    discount_usd: capDiscountUsd(AFFILIATE_DISCOUNT_USD),
  }
}


/**
 * Creates the single commission owed for a verified, attributed order.
 * Idempotent: the unique constraint on commissions.order_id makes webhook
 * retries and duplicate provider events impossible to double-pay.
 */
export async function recordCommission(orderId: string) {
  const db = admin()

  const { data: order } = await db
    .from('orders')
    .select(
      'id, affiliate_id, status, user_id, email, paid_at, created_at, attribution_status, affiliate_discount_usd, commissionable_amount_usd',
    )
    .eq('id', orderId)
    .maybeSingle()

  if (!order || !order.affiliate_id || order.status !== 'paid') return null
  // Only orders whose attribution was verified at checkout may earn.
  if (order.attribution_status !== 'verified') return null

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
        commissionable_amount_usd: order.commissionable_amount_usd ?? null,
        discount_usd: capDiscountUsd(Number(order.affiliate_discount_usd ?? 0)),
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
