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

  const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

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
  if (g('website')) return json({ ok: true }) // honeypot

  if (!roleId || !roleTitle) return json({ error: 'Missing mandate' }, 400)
  if (!name || name.length > 120) return json({ error: 'Please enter your full name' }, 400)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) return json({ error: 'Please enter a valid email' }, 400)
  if (!isUrl(linkedin) || linkedin.length > 500) return json({ error: 'Please enter a valid LinkedIn URL' }, 400)
  if (audio && (!isUrl(audio) || audio.length > 500)) return json({ error: 'Please enter a valid audio brief link' }, 400)
  if (summary.length > 3000) return json({ error: 'Summary is too long' }, 400)

  // Basic rate limit: 3 submissions per email per day
  const since = new Date(Date.now() - 86400000).toISOString()
  const { count } = await db
    .from('career_applications')
    .select('id', { count: 'exact', head: true })
    .eq('email', email)
    .gte('created_at', since)
  if ((count ?? 0) >= 3) return json({ error: 'Too many submissions today. Please try again tomorrow.' }, 429)

  let resumePath: string | null = null
  const file = form.get('resume')
  if (file instanceof File && file.size > 0) {
    if (file.type !== 'application/pdf' || file.size > 10 * 1024 * 1024)
      return json({ error: 'Resume must be a PDF under 10 MB' }, 400)
    resumePath = `${roleId}/${crypto.randomUUID()}.pdf`
    const { error } = await db.storage.from('career-resumes').upload(resumePath, file, { contentType: 'application/pdf' })
    if (error) return json({ error: 'Resume upload failed' }, 500)
  }

  const { data: row, error: insErr } = await db
    .from('career_applications')
    .insert({ role_id: roleId, role_title: roleTitle, full_name: name, email, linkedin_url: linkedin, audio_url: audio || null, summary: summary || null, resume_path: resumePath })
    .select('id')
    .single()
  if (insErr) return json({ error: 'Could not record submission' }, 500)

  let resumeLink = ''
  if (resumePath) {
    const { data } = await db.storage.from('career-resumes').createSignedUrl(resumePath, 60 * 60 * 24 * 30)
    resumeLink = data?.signedUrl ?? ''
  }

  let status = 'failed'
  try {
    const result = await sendTemplateEmail('career-application', TO_EMAIL, {
      idempotencyKey: `career-application-${row.id}`,
      templateData: {
        roleTitle,
        name,
        email,
        linkedin,
        audio: audio || undefined,
        resumeLink: resumeLink || undefined,
        summary: summary || undefined,
        reference: row.id,
      },
    })
    status = result.sent ? 'sent' : 'suppressed'
    const { error: logError } = await db.from('email_send_log').insert({
      message_id: null,
      template_name: 'career-application',
      recipient_email: TO_EMAIL,
      status,
    })
    if (logError) {
      console.error('Failed to record career email outcome', { code: logError.code, message: logError.message })
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    status = `failed: ${message.slice(0, 300)}`
    const { error: logError } = await db.from('email_send_log').insert({
      message_id: null,
      template_name: 'career-application',
      recipient_email: TO_EMAIL,
      status: 'failed',
      error_message: message.slice(0, 1000),
    })
    if (logError) {
      console.error('Failed to record career email failure', { code: logError.code, message: logError.message })
    }
  }
  const { error: statusError } = await db.from('career_applications').update({ email_status: status }).eq('id', row.id)
  if (statusError) {
    console.error('Failed to update career email status', { code: statusError.code, message: statusError.message })
  }

  return json({ ok: true, id: row.id })
})
