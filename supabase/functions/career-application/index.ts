import { createClient } from 'npm:@supabase/supabase-js@2'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FROM_EMAIL = Deno.env.get('CAREERS_FROM_EMAIL') ?? 'BitwellForge Careers <careers@bitwellforge.com>'
const TO_EMAIL = 'careers@bitwellforge.com'

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } })

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))

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

  const subject = `[Candidacy Submission] ${roleTitle} - ${name}`
  const rowHtml = (k: string, v: string) =>
    `<tr><td style="padding:10px 16px 10px 0;color:#5b6478;font-size:12px;letter-spacing:.08em;text-transform:uppercase;vertical-align:top">${k}</td><td style="padding:10px 0;color:#050a30;font-size:15px">${v}</td></tr>`
  const link = (u: string) => `<a href="${esc(u)}" style="color:#1b3fa0">${esc(u)}</a>`
  const html = `<div style="font-family:Georgia,serif;background:#f7f5f0;padding:32px"><div style="max-width:620px;margin:0 auto;background:#fff;border:1px solid #d9dce4;padding:32px">
<p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#5b6478;margin:0 0 8px">Candidacy Submission</p>
<h1 style="font-weight:400;color:#050a30;margin:0 0 24px;font-size:26px">${esc(roleTitle)}</h1>
<table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif">
${rowHtml('Candidate', esc(name))}
${rowHtml('Email', link(`mailto:${email}`).replace(`>${esc('mailto:' + email)}<`, `>${esc(email)}<`))}
${rowHtml('LinkedIn', link(linkedin))}
${rowHtml('Audio brief', audio ? link(audio) : 'Not provided')}
${rowHtml('Resume', resumeLink ? `<a href="${esc(resumeLink)}" style="color:#1b3fa0">Download PDF</a> (link valid 30 days)` : 'Not provided')}
${rowHtml('Summary', summary ? esc(summary).replace(/\n/g, '<br>') : 'Not provided')}
</table><p style="font-family:Arial,sans-serif;font-size:12px;color:#8a90a0;margin-top:24px">Reference ${row.id}</p></div></div>`

  let status = 'skipped'
  if (RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `career-${row.id}` },
        body: JSON.stringify({ from: FROM_EMAIL, to: [TO_EMAIL], reply_to: email, subject, html }),
      })
      status = res.ok ? 'sent' : `failed: ${(await res.text()).slice(0, 300)}`
    } catch (e) {
      status = `failed: ${String(e).slice(0, 300)}`
    }
  }
  await db.from('career_applications').update({ email_status: status }).eq('id', row.id)

  return json({ ok: true, id: row.id })
})
