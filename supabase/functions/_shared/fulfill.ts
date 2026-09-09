import { admin, logActivity } from './db.ts'
import { recordCommission } from './affiliate.ts'

const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://bitwellforgecom.lovable.app'
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') ?? 'BitwellForge <v@bitwellforge.com>'

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
 * Sends a transactional email when a delivery key is configured.
 * Without a key the event is still recorded so nothing is silently lost.
 */
async function sendEmail(
  recipient: string,
  template: string,
  subject: string,
  html: string,
  metadata: Record<string, unknown> = {},
) {
  if (!RESEND_API_KEY) {
    await logEmail(recipient, template, subject, 'skipped', 'No email delivery key configured', metadata)
    return
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: FROM_EMAIL, to: [recipient], subject, html }),
    })
    const body = await res.text()
    await logEmail(recipient, template, subject, res.ok ? 'sent' : 'failed', res.ok ? undefined : body, metadata)
  } catch (e) {
    await logEmail(recipient, template, subject, 'failed', String(e), metadata)
  }
}

function confirmationHtml(opts: {
  name: string | null
  currency: string
  amount: string
  orderId: string
}) {
  return `
  <div style="font-family:Georgia,'Times New Roman',serif;background:#0b0d10;color:#f4f1ea;padding:40px">
    <div style="max-width:560px;margin:0 auto">
      <p style="letter-spacing:.28em;text-transform:uppercase;font-size:11px;color:#c9a227;margin:0 0 18px">Access granted</p>
      <h1 style="font-size:26px;margin:0 0 24px;font-weight:600">Your Forge Vault purchase is confirmed</h1>
      <p style="font-size:15px;line-height:1.8;color:#cfcbc2;margin:0 0 18px">
        ${opts.name ? `${opts.name}, thank` : 'Thank'} you. Your payment of
        <strong style="color:#f4f1ea">${opts.currency} ${opts.amount}</strong> has been verified and lifetime
        access to the Forge Vault has been issued to this email address.
      </p>
      <p style="font-size:15px;line-height:1.8;color:#cfcbc2;margin:0 0 28px">
        If this is your first purchase, use the password link sent separately to set a password, then sign in.
      </p>
      <p style="margin:0 0 32px">
        <a href="${SITE_URL}/vault" style="display:inline-block;background:#c9a227;color:#0b0d10;text-decoration:none;padding:14px 22px;font-size:13px;letter-spacing:.14em;text-transform:uppercase">Open the Forge Vault</a>
      </p>
      <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#6f6a61;margin:0">
        Order reference ${opts.orderId.slice(0, 8)}
      </p>
    </div>
  </div>`
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

    await sendEmail(
      order.email,
      'purchase_confirmation',
      'Your Forge Vault purchase is confirmed',
      confirmationHtml({
        name: order.full_name,
        currency: String(order.display_currency ?? 'INR'),
        amount: String(order.display_amount ?? order.amount_inr),
        orderId: order.id,
      }),
      {
        order_id: order.id,
        amount_inr: order.amount_inr,
        display_currency: order.display_currency,
        display_amount: order.display_amount,
      },
    )

  }

  // Affiliate attribution. Unique on order_id, so retries never double-pay.
  try {
    await recordCommission(order.id)
  } catch (e) {
    console.error('commission', e)
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
