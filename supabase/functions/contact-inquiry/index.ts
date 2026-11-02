import { createClient } from 'npm:@supabase/supabase-js@2'
import { sendTemplateEmail } from '../_shared/transactional-email-templates/send-email.ts'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
const TO_EMAIL = 'business@bitwellforge.com'

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const backendUrl = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!backendUrl || !serviceKey) return json({ error: 'Submission service unavailable' }, 503)
  const db = createClient(backendUrl, serviceKey)

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid submission' }, 400)
  }
  const g = (k: string) => String(body[k] ?? '').trim()
  const name = g('name')
  const email = g('email')
  const phone = g('phone')
  const company = g('company')
  const service = g('service').slice(0, 120)
  const challenge = g('challenge')
  const submissionId = g('submission_id')
  if (g('website')) return json({ ok: true }) // honeypot

  if (!name || name.length > 100) return json({ error: 'Please enter your name' }, 400)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) return json({ error: 'Please enter a valid email' }, 400)
  if (!/^[0-9+()\s.-]{6,32}$/.test(phone)) return json({ error: 'Please enter a valid phone number' }, 400)
  if (company.length > 120) return json({ error: 'Company name is too long' }, 400)
  if (!service) return json({ error: 'Please select a topic' }, 400)
  if (!challenge || challenge.length > 1000) return json({ error: 'Please describe your current challenge' }, 400)
  if (submissionId && !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId))
    return json({ error: 'Invalid submission reference' }, 400)

  const fields = 'id, name, email, phone, company, service, challenge'
  const { data: previous, error: lookupError } = submissionId
    ? await db.from('contact_submissions').select(fields).eq('id', submissionId).maybeSingle()
    : { data: null, error: null }
  if (lookupError) return json({ error: 'Could not check submission' }, 500)
  if (previous && (previous.email !== email || previous.name !== name))
    return json({ error: 'Submission reference already used' }, 409)

  // Basic rate limit: 3 enquiries per email per day
  const since = new Date(Date.now() - 86400000).toISOString()
  const { count } = await db
    .from('contact_submissions')
    .select('id', { count: 'exact', head: true })
    .eq('email', email)
    .gte('created_at', since)
  if (!previous && (count ?? 0) >= 3) return json({ error: 'Too many enquiries today. Please try again tomorrow.' }, 429)

  let row = previous
  if (!row) {
    const { data: saved, error: insErr } = await db
      .from('contact_submissions')
      .insert({ ...(submissionId ? { id: submissionId } : {}), name, email, phone, company: company || null, service, challenge, kind: 'contact', status: 'new' })
      .select(fields)
      .single()
    if (insErr?.code === '23505' && submissionId) {
      const { data: concurrent } = await db.from('contact_submissions').select(fields).eq('id', submissionId).maybeSingle()
      if (concurrent?.email === email && concurrent?.name === name) row = concurrent
    } else if (!insErr) row = saved
    if (!row) return json({ error: 'Could not record submission' }, 500)
  }

  const send = async (templateName: 'contact-inquiry' | 'contact-confirmation', recipient: string) => {
    let status = 'failed'
    let errorMessage: string | undefined
    try {
      const result = await sendTemplateEmail(templateName, recipient, {
        idempotencyKey: `${templateName}-${row.id}`,
        ...(templateName === 'contact-confirmation' ? { senderName: 'BitwellForge', replyTo: TO_EMAIL } : {}),
        templateData: templateName === 'contact-confirmation'
          ? { name: row.name, service: row.service }
          : { name: row.name, email: row.email, phone: row.phone,
              company: row.company || undefined, service: row.service,
              challenge: row.challenge, reference: row.id },
      })
      status = result.sent ? 'sent' : 'suppressed'
    } catch (error) {
      errorMessage = (error instanceof Error ? error.message : String(error)).slice(0, 1000)
      console.error('Contact email failed', { template: templateName, submissionId: row.id })
    }
    const { error: logError } = await db.from('email_send_log').insert({
      message_id: null, template_name: templateName, recipient_email: recipient, status,
      ...(errorMessage ? { error_message: errorMessage } : {}),
    })
    if (logError) console.error('Failed to record contact email outcome', { code: logError.code })
    return status
  }
  // Independent outcomes: an internal delivery failure must not block the acknowledgement.
  await send('contact-inquiry', TO_EMAIL)
  const confirmationStatus = await send('contact-confirmation', row.email)

  return json({ ok: true, id: row.id, confirmation: confirmationStatus })
})
