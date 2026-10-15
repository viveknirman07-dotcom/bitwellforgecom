import { createClient } from 'npm:@supabase/supabase-js@2'
import { sendTemplateEmail } from '../_shared/transactional-email-templates/send-email.ts'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
const TO_EMAIL = 'careers@bitwellforge.com'

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } })

const isUrl = (s: string) => {
  try {
    const u = new URL(s)
    return u.protocol === 'https:' || u.protocol === 'http:'
  } catch {
    return false
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const backendUrl = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!backendUrl || !serviceKey) return json({ error: 'Submission service unavailable' }, 503)
  const db = createClient(backendUrl, serviceKey)

  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return json({ error: 'Invalid submission' }, 400)
  }
  const g = (k: string) => String(form.get(k) ?? '').trim()
  const roleId = g('role_id').slice(0, 80)
  const roleTitle = g('role_title').slice(0, 200)
  const name = g('full_name')
  const email = g('email')
  const linkedin = g('linkedin_url')
  const audio = g('audio_url')
  const summary = g('summary')
  const submissionId = g('submission_id')
  if (g('website')) return json({ ok: true }) // honeypot

  if (!roleId || !roleTitle) return json({ error: 'Missing mandate' }, 400)
  if (!name || name.length > 120) return json({ error: 'Please enter your full name' }, 400)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) return json({ error: 'Please enter a valid email' }, 400)
  if (!isUrl(linkedin) || linkedin.length > 500) return json({ error: 'Please enter a valid LinkedIn URL' }, 400)
  if (audio && (!isUrl(audio) || audio.length > 500)) return json({ error: 'Please enter a valid audio brief link' }, 400)
  if (summary.length > 3000) return json({ error: 'Summary is too long' }, 400)
  if (submissionId && !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId))
    return json({ error: 'Invalid submission reference' }, 400)

  const fields = 'id, role_title, full_name, email, linkedin_url, audio_url, summary, resume_path, email_status'
  const { data: previous, error: lookupError } = submissionId
    ? await db.from('career_applications').select(fields).eq('id', submissionId).maybeSingle()
    : { data: null, error: null }
  if (lookupError) return json({ error: 'Could not check submission' }, 500)
  if (previous && (previous.email !== email || previous.full_name !== name || previous.role_title !== roleTitle))
    return json({ error: 'Submission reference already used' }, 409)

  // Basic rate limit: 3 submissions per email per day
  const since = new Date(Date.now() - 86400000).toISOString()
  const { count } = await db
    .from('career_applications')
    .select('id', { count: 'exact', head: true })
    .eq('email', email)
    .gte('created_at', since)
  if (!previous && (count ?? 0) >= 3) return json({ error: 'Too many submissions today. Please try again tomorrow.' }, 429)

  let resumePath: string | null = null
  const file = form.get('resume')
  if (!previous && file instanceof File && file.size > 0) {
    if (file.type !== 'application/pdf' || file.size > 10 * 1024 * 1024)
      return json({ error: 'Resume must be a PDF under 10 MB' }, 400)
    resumePath = `${roleId}/${crypto.randomUUID()}.pdf`
    const { error } = await db.storage.from('career-resumes').upload(resumePath, file, { contentType: 'application/pdf' })
    if (error) return json({ error: 'Resume upload failed' }, 500)
  }

  let row = previous
  if (!row) {
    const { data: saved, error: insErr } = await db
      .from('career_applications')
      .insert({ ...(submissionId ? { id: submissionId } : {}), role_id: roleId, role_title: roleTitle, full_name: name, email, linkedin_url: linkedin, audio_url: audio || null, summary: summary || null, resume_path: resumePath })
      .select(fields)
      .single()
    if (insErr?.code === '23505' && submissionId) {
      const { data: concurrent } = await db.from('career_applications').select(fields).eq('id', submissionId).maybeSingle()
      if (concurrent?.email === email && concurrent?.full_name === name && concurrent?.role_title === roleTitle) row = concurrent
    } else if (!insErr) row = saved
    if (!row) return json({ error: 'Could not record submission' }, 500)
  }
  // A retried request always uses the original saved application, never fresh browser values.
  resumePath = row.resume_path

  let resumeLink = ''
  if (resumePath) {
    const { data } = await db.storage.from('career-resumes').createSignedUrl(resumePath, 60 * 60 * 24 * 30)
    resumeLink = data?.signedUrl ?? ''
  }

  const send = async (templateName: 'career-application' | 'applicant-confirmation', recipient: string) => {
    let status = 'failed'
    let errorMessage: string | undefined
    try {
      const result = await sendTemplateEmail(templateName, recipient, {
        idempotencyKey: `${templateName}-${row.id}`,
        ...(templateName === 'applicant-confirmation' ? { senderName: 'BitwellForge Careers', replyTo: TO_EMAIL } : {}),
        templateData: templateName === 'applicant-confirmation'
          ? { name: row.full_name, roleTitle: row.role_title }
          : { roleTitle: row.role_title, name: row.full_name, email: row.email, linkedin: row.linkedin_url,
              audio: row.audio_url || undefined, resumeLink: resumeLink || undefined,
              summary: row.summary || undefined, reference: row.id },
      })
      status = result.sent ? 'sent' : 'suppressed'
    } catch (error) {
      errorMessage = (error instanceof Error ? error.message : String(error)).slice(0, 1000)
      console.error('Career email failed', { template: templateName, applicationId: row.id })
    }
    const { error: logError } = await db.from('email_send_log').insert({
      message_id: null, template_name: templateName, recipient_email: recipient, status,
      ...(errorMessage ? { error_message: errorMessage } : {}),
    })
    if (logError) console.error('Failed to record career email outcome', { code: logError.code })
    return status
  }
  // Independent outcomes: an internal delivery failure must not block the acknowledgement.
  const internalStatus = await send('career-application', TO_EMAIL)
  const confirmationStatus = await send('applicant-confirmation', row.email)
  const { error: statusError } = await db.from('career_applications').update({ email_status: internalStatus }).eq('id', row.id)
  if (statusError) {
    console.error('Failed to update career email status', { code: statusError.code, message: statusError.message })
  }

  return json({ ok: true, id: row.id, confirmation: confirmationStatus })
})
