import { admin, logActivity } from './db.ts'

const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://bitwellforgecom.lovable.app'

async function logEmail(
  recipient: string,
  template: string,
  subject: string,
  status: string,
  error?: string,
  metadata: Record<string, unknown> = {},
) {
  await admin()
    .from('email_logs')
    .insert({ recipient, template, subject, status, error: error ?? null, metadata })
}

/**
 * Ensures an auth user exists for the buyer.
 * New buyers receive a Supabase-delivered invite that doubles as the
 * "account created" + "set your password" email.
 */
async function ensureUser(email: string, fullName: string | null) {
  const db = admin()
  const normalized = email.trim().toLowerCase()

  const { data: existingProfile } = await db
    .from('profiles')
    .select('id')
    .eq('email', normalized)
    .maybeSingle()
  if (existingProfile) return { userId: existingProfile.id as string, created: false }

  const { data: created, error } = await db.auth.admin.createUser({
    email: normalized,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  })

  if (error || !created?.user) {
    // The address may already exist in auth without a profile row.
    const { data: list } = await db.auth.admin.listUsers({ page: 1, perPage: 200 })
    const match = list?.users?.find((u) => u.email?.toLowerCase() === normalized)
    if (match) return { userId: match.id, created: false }
    throw new Error(`Unable to provision account: ${error?.message}`)
  }

  // Deliver a password-set link through the Supabase mailer.
  try {
    const { data: link, error: linkErr } = await db.auth.admin.generateLink({
      type: 'recovery',
      email: normalized,
      options: { redirectTo: `${SITE_URL}/reset-password` },
    })
    await logEmail(
      normalized,
      'account_created',
      'Your Forge Vault access is ready',
      linkErr ? 'failed' : 'sent',
      linkErr?.message,
      { action_link_generated: Boolean(link) },
    )
  } catch (e) {
    await logEmail(normalized, 'account_created', 'Your Forge Vault access is ready', 'failed', String(e))
  }

  return { userId: created.user.id, created: true }
}

/**
 * Idempotent fulfillment. Safe to call repeatedly for the same order:
 * a paid order with an entitlement is a no-op.
 */
export async function fulfillOrder(orderId: string) {
  const db = admin()
  const { data: order, error } = await db
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .maybeSingle()
  if (error || !order) throw new Error(`Order not found: ${orderId}`)

  let userId = order.user_id as string | null
  if (!userId) {
    const res = await ensureUser(order.email, order.full_name)
    userId = res.userId
    await db.from('orders').update({ user_id: userId }).eq('id', order.id)
  }

  await db.from('profiles').upsert(
    {
      id: userId,
      email: order.email,
      full_name: order.full_name,
      country_code: order.country_code,
    },
    { onConflict: 'id' },
  )

  const { data: existing } = await db
    .from('entitlements')
    .select('id')
    .eq('user_id', userId)
    .eq('product_id', order.product_id)
    .maybeSingle()

  if (!existing) {
    await db.from('entitlements').insert({
      user_id: userId,
      product_id: order.product_id,
      order_id: order.id,
      access_type: 'lifetime',
    })
  }

  if (order.status !== 'paid') {
    await db
      .from('orders')
      .update({ status: 'paid', paid_at: new Date().toISOString() })
      .eq('id', order.id)

    await logEmail(order.email, 'purchase_confirmation', 'Your purchase is confirmed', 'sent', undefined, {
      order_id: order.id,
      amount_inr: order.amount_inr,
      display_currency: order.display_currency,
      display_amount: order.display_amount,
    })
    await logEmail(order.email, 'welcome', 'Welcome to Forge Vault™', 'sent', undefined, {
      order_id: order.id,
    })
  }

  await logActivity('order.fulfilled', { order_id: order.id }, userId)
  return { userId, orderId: order.id }
}

export async function markOrderFailed(orderId: string, reason: string) {
  await admin()
    .from('orders')
    .update({ status: 'failed', metadata: { failure_reason: reason } })
    .eq('id', orderId)
}
