import { admin } from './db.ts'
import { sendTemplateEmail } from './transactional-email-templates/send-email.ts'

export const AUDIT_SLUG = 'revenue-infrastructure-audit'
export const AUDIT_PRICE_USD = 1199
export const AUDIT_SITE = 'https://www.bitwellforge.com'
export const bookingUrl = (token: string) => `${AUDIT_SITE}/audit/findings-presentation?t=${token}`
export const orderRef = (id: string) => `BWF-${id.slice(0, 8).toUpperCase()}`

export async function setStatus(engagementId: string, status: string, note?: string, actorId?: string | null) {
  const db = admin()
  await db.from('audit_engagements').update({ status }).eq('id', engagementId)
  await db.from('audit_status_history').insert({ engagement_id: engagementId, status, note: note ?? null, actor_id: actorId ?? null })
}

/** One fixed template to one recipient, idempotent per event, outcome logged. */
export async function sendAudit(tpl: string, to: string, key: string, data: Record<string, unknown>, replyTo = 'support@bitwellforge.com') {
  let status = 'failed', msg: string | undefined
  try {
    const r = await sendTemplateEmail(tpl, to, { idempotencyKey: `${tpl}-${key}`, replyTo, templateData: data })
    status = r.sent ? 'sent' : 'suppressed'
  } catch (e) {
    msg = (e instanceof Error ? e.message : String(e)).slice(0, 1000)
    console.error('Audit email failed', { tpl, key, msg })
  }
  await admin().from('email_send_log').insert({ message_id: null, template_name: tpl, recipient_email: to, status, ...(msg ? { error_message: msg } : {}) })
  return status
}

/** Called only after a verified payment. Idempotent: one engagement and one email per order. */
export async function fulfillAudit(order: { id: string; email: string; full_name: string | null; status: string }) {
  const db = admin()
  if (order.status !== 'paid') {
    await db.from('orders').update({ status: 'paid', paid_at: new Date().toISOString() }).eq('id', order.id)
  }
  let { data: eng } = await db.from('audit_engagements').select('id, access_token').eq('order_id', order.id).maybeSingle()
  if (!eng) {
    const { data, error } = await db.from('audit_engagements')
      .insert({ order_id: order.id, email: order.email, full_name: order.full_name, status: 'intake_pending' })
      .select('id, access_token').single()
    if (error?.code === '23505') {
      eng = (await db.from('audit_engagements').select('id, access_token').eq('order_id', order.id).single()).data
    } else if (error) throw error
    else {
      eng = data
      await db.from('audit_status_history').insert([
        { engagement_id: data.id, status: 'payment_confirmed', note: 'Verified payment' },
        { engagement_id: data.id, status: 'intake_pending' },
      ])
    }
  }
  if (!eng) throw new Error('Audit record missing')
  await sendAudit('audit-payment-confirmed', order.email, order.id,
    { name: order.full_name, orderRef: orderRef(order.id), token: eng.access_token })
  return eng
}
