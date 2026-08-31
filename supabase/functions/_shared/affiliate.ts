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
 * Buyer benefit granted through affiliate attribution. The value is decided
 * randomly, server-side, once per customer, between $1 and $10 USD. $10 is an
 * absolute ceiling: every discount in the system passes through
 * capDiscountUsd().
 */
export const MIN_AFFILIATE_DISCOUNT_USD = 1
export const MAX_AFFILIATE_DISCOUNT_USD = 10

export function capDiscountUsd(value: number): number {
  const n = Number(value)
  if (!Number.isFinite(n) || n <= 0) return 0
  return Math.min(MAX_AFFILIATE_DISCOUNT_USD, Math.round(n * 100) / 100)
}

/** Cryptographically random whole-dollar benefit in [1, 10]. */
export function rollDiscountUsd(): number {
  const span = MAX_AFFILIATE_DISCOUNT_USD - MIN_AFFILIATE_DISCOUNT_USD + 1
  const buf = crypto.getRandomValues(new Uint32Array(1))[0]
  return capDiscountUsd(MIN_AFFILIATE_DISCOUNT_USD + (buf % span))
}

export interface AttributionResult {
  ok: boolean
  code?: 'code_invalid' | 'code_mismatch' | 'self_referral'
  message?: string
  affiliate?: { id: string; code: string; email: string | null; user_id: string }
  discount_usd?: number
  /** True when the benefit came from a pre-existing permanent binding. */
  persisted?: boolean
}

/**
 * The single authority on affiliate attribution.
 *
 * Rules:
 *  - An affiliate code is OPTIONAL. A purchase with neither a referral link
 *    nor a typed code is an ordinary direct sale.
 *  - A referral link alone is sufficient attribution.
 *  - A typed code alone is sufficient attribution.
 *  - When both are present they must resolve to the same active affiliate.
 *  - Once a customer email is bound to an affiliate, that binding is
 *    permanent. Later purchases by the same customer stay attributed even if
 *    they arrive directly, and a different link can never steal them.
 *  - The discount is rolled once, stored with the binding, and reused for
 *    every subsequent qualifying purchase. The client can never influence it.
 */
export async function verifyAttribution(
  refCode: string | null | undefined,
  enteredCode: string | null | undefined,
  buyerEmail?: string | null,
  options: { persist?: boolean } = {},
): Promise<AttributionResult> {
  const persist = options.persist !== false
  const ref = (refCode ?? '').trim()
  const entered = (enteredCode ?? '').trim()
  const email = String(buyerEmail ?? '').trim().toLowerCase()

  // A permanent binding always wins over whatever the current visit carries.
  const existing = email ? await getAttribution(email) : null

  let candidate: Awaited<ReturnType<typeof resolveAffiliateByCode>> = null

  if (entered) {
    const typed = await resolveAffiliateByCode(entered)
    if (!typed || typed.status !== 'active') {
      return { ok: false, code: 'code_invalid', message: 'That affiliate code is not valid.' }
    }
    candidate = typed
  }

  if (ref) {
    const referred = await resolveAffiliateByCode(ref)
    // A stale link never blocks a purchase; it simply carries no attribution.
    if (referred && referred.status === 'active') {
      if (candidate && candidate.id !== referred.id) {
        return {
          ok: false,
          code: 'code_mismatch',
          message: 'This affiliate code does not match the referral link used to reach this offer.',
        }
      }
      candidate = candidate ?? referred
    }
  }

  const affiliate = existing?.affiliate ?? candidate
  if (!affiliate) return { ok: true, discount_usd: 0 }

  if (email && String(affiliate.email ?? '').toLowerCase() === email) {
    return { ok: false, code: 'self_referral', message: 'An affiliate cannot use their own referral code.' }
  }

  if (existing) {
    return {
      ok: true,
      persisted: true,
      affiliate: {
        id: existing.affiliate.id,
        code: existing.affiliate.code,
        email: existing.affiliate.email,
        user_id: existing.affiliate.user_id,
      },
      discount_usd: capDiscountUsd(existing.discount_usd),
    }
  }

  const discount = rollDiscountUsd()
  if (email && persist) {
    const stored = await persistAttribution(email, affiliate.id, affiliate.code, discount)
    return {
      ok: true,
      persisted: Boolean(stored?.reused),
      affiliate: {
        id: affiliate.id,
        code: affiliate.code,
        email: affiliate.email,
        user_id: affiliate.user_id,
      },
      discount_usd: capDiscountUsd(stored?.discount_usd ?? discount),
    }
  }

  return {
    ok: true,
    affiliate: {
      id: affiliate.id,
      code: affiliate.code,
      email: affiliate.email,
      user_id: affiliate.user_id,
    },
    discount_usd: discount,
  }
}

/** Reads the permanent affiliate binding for a customer email, if any. */
export async function getAttribution(email: string) {
  const lower = email.trim().toLowerCase()
  if (!lower) return null
  const { data } = await admin()
    .from('affiliate_attributions')
    .select('id, affiliate_id, code, discount_usd, affiliates!inner(id, user_id, code, email, status)')
    .ilike('email', lower)
    .maybeSingle()
  if (!data) return null
  const affiliate = (data as { affiliates: { id: string; user_id: string; code: string; email: string | null; status: string } }).affiliates
  if (!affiliate || affiliate.status !== 'active') return null
  return { discount_usd: Number(data.discount_usd ?? 0), affiliate }
}

/**
 * Writes the permanent binding. A unique index on lower(email) makes this
 * first-writer-wins: a concurrent or later attempt reads back the original.
 */
async function persistAttribution(
  email: string,
  affiliateId: string,
  code: string,
  discountUsd: number,
) {
  const db = admin()
  const { error } = await db.from('affiliate_attributions').insert({
    email: email.toLowerCase(),
    affiliate_id: affiliateId,
    code,
    discount_usd: discountUsd,
  })
  if (!error) return { discount_usd: discountUsd, reused: false }

  const existing = await getAttribution(email)
  if (existing) return { discount_usd: existing.discount_usd, reused: true }
  return { discount_usd: discountUsd, reused: false }
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
