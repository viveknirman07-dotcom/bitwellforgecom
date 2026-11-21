import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { admin } from '../_shared/db.ts'
import { BOOKING_URL, orderRef, sendAudit, setStatus } from '../_shared/audit.ts'

const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
const TEAM_STATUSES = new Set(['audit_in_progress', 'audit_ready', 'presentation_completed'])
const SLOTS = { report: 'report_path', findings: 'findings_path', roadmap: 'roadmap_path' } as const

const gcal = (start: Date, url: string) => {
  const f = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const end = new Date(start.getTime() + 60 * 60000)
  const q = new URLSearchParams({ action: 'TEMPLATE', text: 'BitwellForge Findings Presentation', dates: `${f(start)}/${f(end)}`, details: `Revenue Infrastructure Audit findings presentation. Join: ${url}`, location: url })
  return `https://calendar.google.com/calendar/render?${q}`
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  const auth = req.headers.get('Authorization') ?? ''
  const userClient = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: auth } } })
  const { data: u } = await userClient.auth.getUser()
  if (!u?.user) return json({ error: 'Please sign in' }, 401)
  const db = admin()
  const { data: isAdmin } = await db.rpc('has_role', { _user_id: u.user.id, _role: 'admin' })
  if (!isAdmin) return json({ error: 'Not authorised' }, 403)

  try {
    const isForm = (req.headers.get('content-type') ?? '').includes('multipart/form-data')
    const form = isForm ? await req.formData() : null
    const body: Record<string, any> = form ? Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === 'string')) : await req.json().catch(() => ({}))
    const { action, id } = body

    if (action === 'list') {
      const { data } = await db.from('audit_engagements').select('id, order_id, email, full_name, status, intake_submitted_at, report_path, findings_path, roadmap_path, meeting_at, meeting_url, created_at').order('created_at', { ascending: false }).limit(200)
      return json({ items: (data ?? []).map((r) => ({ ...r, order_ref: orderRef(r.order_id) })) })
    }
    const { data: eng } = await db.from('audit_engagements').select('*').eq('id', String(id ?? '')).maybeSingle()
    if (!eng) return json({ error: 'Audit not found' }, 404)

    if (action === 'detail') {
      const docs = await Promise.all((eng.document_paths ?? []).map(async (p: string) => ({ name: p.split('/').pop(), url: (await db.storage.from('audit-files').createSignedUrl(p, 3600)).data?.signedUrl })))
      const { data: history } = await db.from('audit_status_history').select('status, note, created_at').eq('engagement_id', eng.id).order('created_at')
      return json({ ...eng, access_token: undefined, order_ref: orderRef(eng.order_id), documents: docs, history })
    }
    if (action === 'status') {
      if (!TEAM_STATUSES.has(body.status)) return json({ error: 'That status cannot be set by hand' }, 400)
      if (!eng.intake_submitted_at) return json({ error: 'The client has not submitted the intake yet' }, 400)
      await setStatus(eng.id, body.status, body.note, u.user.id)
      return json({ ok: true })
    }
    if (action === 'upload') {
      const slot = SLOTS[body.slot as keyof typeof SLOTS]
      const file = form?.get('file')
      if (!slot || !(file instanceof File) || file.type !== 'application/pdf' || file.size > 25 * 1024 * 1024) return json({ error: 'Upload a PDF under 25 MB' }, 400)
      const path = `${eng.id}/deliverables/${body.slot}-${crypto.randomUUID()}.pdf`
      const { error } = await db.storage.from('audit-files').upload(path, file, { contentType: 'application/pdf' })
      if (error) return json({ error: 'Upload failed' }, 500)
      await db.from('audit_engagements').update({ [slot]: path }).eq('id', eng.id)
      return json({ ok: true })
    }
    if (action === 'deliver') {
      if (!eng.report_path || !eng.findings_path || !eng.roadmap_path) return json({ error: 'All three deliverables must be uploaded first' }, 400)
      if (!['audit_ready', 'deliverables_sent'].includes(eng.status)) return json({ error: 'Mark the audit as ready first' }, 400)
      const sent = await sendAudit('audit-delivered', eng.email, eng.id, { name: eng.full_name, token: eng.access_token, bookingUrl: BOOKING_URL || undefined })
      if (sent !== 'sent') return json({ error: `Delivery email ${sent}. Please retry.` }, 502)
      if (eng.status !== 'deliverables_sent') {
        await db.from('audit_engagements').update({ delivered_at: new Date().toISOString() }).eq('id', eng.id)
        await setStatus(eng.id, 'deliverables_sent', 'Delivery email sent', u.user.id)
      }
      return json({ ok: true })
    }
    if (action === 'meeting') {
      const when = new Date(String(body.meeting_at ?? ''))
      let url: URL
      try { url = new URL(String(body.meeting_url ?? '')) } catch { return json({ error: 'Enter the real meeting link' }, 400) }
      if (isNaN(when.getTime()) || url.protocol !== 'https:') return json({ error: 'Enter a valid date and https meeting link' }, 400)
      if (!['deliverables_sent', 'presentation_scheduled'].includes(eng.status)) return json({ error: 'Send the deliverables first' }, 400)
      await db.from('audit_engagements').update({ meeting_at: when.toISOString(), meeting_url: url.toString() }).eq('id', eng.id)
      await setStatus(eng.id, 'presentation_scheduled', when.toISOString(), u.user.id)
      const label = when.toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short', timeZone: 'UTC' }) + ' UTC'
      const sent = await sendAudit('audit-presentation-confirmed', eng.email, `${eng.id}-${when.getTime()}`, { name: eng.full_name, when: label, meetingUrl: url.toString(), calendarUrl: gcal(when, url.toString()), bookingUrl: BOOKING_URL || undefined })
      return json({ ok: true, email: sent })
    }
    return json({ error: 'Unknown action' }, 400)
  } catch (e) {
    console.error('audit-admin', e)
    return json({ error: 'Something went wrong' }, 500)
  }
})
