import { createClient } from 'npm:@supabase/supabase-js@2'
import { sendTemplateEmail } from '../_shared/transactional-email-templates/send-email.ts'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
const TO_EMAIL = 'business@bitwellforge.com'
const SERVICES = new Set(['General Inquiry','Revenue Infrastructure Audit','Diagnose My Growth System','Commercial Growth Strategy','Client Acquisition Architecture','High-Ticket Revenue Systems','Market Authority Positioning','AI-Powered Revenue Operations','Search & Digital Visibility','Performance Growth','Digital Product Commercialization'])
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  const url = Deno.env.get('SUPABASE_URL'), key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!url || !key) return json({ error: 'Submission service unavailable' }, 503)
  const db = createClient(url, key)

  let b: Record<string, unknown>
  try { b = await req.json() } catch { return json({ error: 'Invalid submission' }, 400) }
  const g = (k: string) => String(b[k] ?? '').trim()
  if (g('website')) return json({ ok: true }) // honeypot
  const name = g('name'), email = g('email'), phone = g('phone'), company = g('company'), challenge = g('challenge')
  let service = g('service'); if (!SERVICES.has(service)) service = 'General Inquiry'
  const id = g('submission_id')
  if (!name || name.length > 100) return json({ error: 'Please enter your name' }, 400)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) return json({ error: 'Please enter a valid email' }, 400)
  if (!/^[0-9+()\s.-]{6,32}$/.test(phone)) return json({ error: 'Please enter a valid phone number' }, 400)
  if (company.length > 120) return json({ error: 'Company name is too long' }, 400)
  if (!challenge || challenge.length > 1000) return json({ error: 'Please describe your challenge in under 1000 characters' }, 400)
  if (!UUID.test(id)) return json({ error: 'Invalid submission reference' }, 400)

  const fields = 'id, full_name, email, phone, company, service, challenge'
  const { data: prev, error: lookErr } = await db.from('contact_inquiries').select(fields).eq('id', id).maybeSingle()
  if (lookErr) return json({ error: 'Could not check submission' }, 500)
  if (prev && (prev.email !== email || prev.full_name !== name)) return json({ error: 'Submission reference already used' }, 409)

  let row = prev
  if (!row) {
    const since = new Date(Date.now() - 86400000).toISOString()
    const { count } = await db.from('contact_inquiries').select('id', { count: 'exact', head: true }).eq('email', email).gte('created_at', since)
    if ((count ?? 0) >= 5) return json({ error: 'Too many enquiries today. Please email business@bitwellforge.com directly.' }, 429)
    const { data, error } = await db.from('contact_inquiries')
      .insert({ id, full_name: name, email, phone, company: company || null, service, challenge }).select(fields).single()
    if (error?.code === '23505') {
      const { data: c } = await db.from('contact_inquiries').select(fields).eq('id', id).maybeSingle()
      if (c?.email === email && c?.full_name === name) row = c
    } else if (!error) row = data
    if (!row) return json({ error: 'Could not record enquiry' }, 500)
  }

  const send = async (tpl: 'contact-inquiry' | 'contact-confirmation', to: string) => {
    let status = 'failed', msg: string | undefined
    try {
      const r = await sendTemplateEmail(tpl, to, {
        idempotencyKey: `${tpl}-${row.id}`,
        ...(tpl === 'contact-inquiry' ? { replyTo: row.email } : { replyTo: TO_EMAIL }),
        templateData: tpl === 'contact-inquiry'
          ? { name: row.full_name, email: row.email, phone: row.phone, company: row.company || undefined, service: row.service, challenge: row.challenge, reference: row.id }
          : { name: row.full_name, service: row.service },
      })
      status = r.sent ? 'sent' : 'suppressed'
    } catch (e) {
      msg = (e instanceof Error ? e.message : String(e)).slice(0, 1000)
      console.error('Contact email failed', { tpl, id: row.id, msg })
    }
    await db.from('email_send_log').insert({ message_id: null, template_name: tpl, recipient_email: to, status, ...(msg ? { error_message: msg } : {}) })
    return status
  }
  const internal = await send('contact-inquiry', TO_EMAIL)
  const confirmation = await send('contact-confirmation', row.email)
  await db.from('contact_inquiries').update({ email_status: internal }).eq('id', row.id)
  return json({ ok: true, id: row.id, internal, confirmation })
})
