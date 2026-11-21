import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { admin, clientIp, rateLimit } from '../_shared/db.ts'
import { bookingUrl, orderRef, sendAudit } from '../_shared/audit.ts'

const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
const UUID = /^[0-9a-f-]{36}$/i
const TOKEN = /^[0-9a-f]{48}$/
const DOC_TYPES = new Set(['application/pdf', 'text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg'])
const REQUIRED = ['full_name', 'work_email', 'company', 'website', 'country', 'industry', 'business_model', 'products_services', 'customer_segment', 'deal_value', 'revenue_sources', 'acquisition_channels', 'sales_cycle', 'team_size', 'delivery_model', 'operational_tools', 'reporting_process', 'operational_challenges', 'constraints', 'underperforming', 'clarify']
const OPTIONAL = ['linkedin_url', 'monthly_revenue', 'crm']

const publicView = async (eng: Record<string, any>) => {
  const db = admin()
  const delivered = ['deliverables_sent', 'presentation_scheduled', 'presentation_completed'].includes(eng.status)
  const sign = async (p: string | null) => p && delivered ? (await db.storage.from('audit-files').createSignedUrl(p, 3600)).data?.signedUrl ?? null : null
  return {
    status: eng.status, name: eng.full_name, order_ref: orderRef(eng.order_id), intake_submitted_at: eng.intake_submitted_at,
    booking_url: delivered ? bookingUrl(eng.access_token) : null, meeting_at: eng.meeting_at, meeting_url: eng.meeting_url,
    deliverables: delivered ? { report: await sign(eng.report_path), findings: await sign(eng.findings_path), roadmap: await sign(eng.roadmap_path) } : null,
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  const db = admin()
  const ip = clientIp(req)
  try {
    if (!(await rateLimit('audit-portal', ip, 120, 3600))) return json({ error: 'Too many requests' }, 429)
    const isForm = (req.headers.get('content-type') ?? '').includes('multipart/form-data')
    const form = isForm ? await req.formData() : null
    const body: Record<string, unknown> = form ? Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === 'string')) : await req.json().catch(() => ({}))
    const action = String(body.action ?? '')

    // Order lookup after redirect: never trusts the redirect, only the verified order state.
    if (action === 'order') {
      const id = String(body.order_id ?? '')
      if (!UUID.test(id)) return json({ error: 'Invalid order' }, 400)
      const { data: order } = await db.from('orders').select('id, status').eq('id', id).maybeSingle()
      if (!order) return json({ error: 'Order not found' }, 404)
      const { data: eng } = await db.from('audit_engagements').select('access_token').eq('order_id', id).maybeSingle()
      return json({ payment_status: order.status, order_ref: orderRef(id), token: order.status === 'paid' ? eng?.access_token ?? null : null })
    }

    const token = String(body.token ?? '')
    if (!TOKEN.test(token)) return json({ error: 'Invalid link' }, 400)
    const { data: eng } = await db.from('audit_engagements').select('*').eq('access_token', token).maybeSingle()
    if (!eng) return json({ error: 'Audit not found' }, 404)

    if (action === 'get') return json(await publicView(eng))

    if (action === 'intake') {
      if (eng.intake_submitted_at) return json({ ok: true, already: true })
      const g = (k: string) => String(body[k] ?? '').trim()
      const missing = REQUIRED.filter((k) => !g(k))
      if (missing.length) return json({ error: 'Please complete every required field.', missing }, 400)
      if (g('consent') !== 'yes') return json({ error: 'Please confirm the consent statement.' }, 400)
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(g('work_email'))) return json({ error: 'Please enter a valid work email.' }, 400)
      const intake: Record<string, string> = {}
      for (const k of [...REQUIRED, ...OPTIONAL]) {
        const v = g(k)
        if (v.length > 4000) return json({ error: `The ${k.replace(/_/g, ' ')} answer is too long.` }, 400)
        if (v) intake[k] = v
      }
      const files = (form?.getAll('documents') ?? []).filter((f): f is File => f instanceof File && f.size > 0)
      if (files.length > 10) return json({ error: 'Please upload up to 10 documents.' }, 400)
      for (const f of files) {
        if (!DOC_TYPES.has(f.type) || f.size > 20 * 1024 * 1024) return json({ error: `${f.name} must be a PDF, spreadsheet, document or image under 20 MB.` }, 400)
      }
      const paths: string[] = []
      for (const f of files) {
        const safe = f.name.replace(/[^\w.-]+/g, '_').slice(-80)
        const path = `${eng.id}/intake/${crypto.randomUUID()}-${safe}`
        const { error } = await db.storage.from('audit-files').upload(path, f, { contentType: f.type })
        if (error) return json({ error: `Upload failed for ${f.name}. Please try again.` }, 500)
        paths.push(path)
      }
      const now = new Date().toISOString()
      // Conditional update prevents a double submit from overwriting the first.
      const { data: upd } = await db.from('audit_engagements')
        .update({ intake, intake_submitted_at: now, document_paths: paths, status: 'intake_completed' })
        .eq('id', eng.id).is('intake_submitted_at', null).select('id').maybeSingle()
      if (!upd) return json({ ok: true, already: true })
      await db.from('audit_status_history').insert({ engagement_id: eng.id, status: 'intake_completed' })
      await sendAudit('audit-intake-received', eng.email, eng.id, { name: intake.full_name, token })
      await sendAudit('audit-intake-internal', 'business@bitwellforge.com', eng.id, {
        name: intake.full_name, company: intake.company, email: intake.work_email, orderRef: orderRef(eng.order_id),
        submittedAt: new Date(now).toUTCString(), documents: paths.map((p) => p.split('/').pop()), engagementId: eng.id,
      }, intake.work_email)
      return json({ ok: true })
    }
    return json({ error: 'Unknown action' }, 400)
  } catch (e) {
    console.error('audit-portal', e)
    return json({ error: 'Something went wrong. Please try again.' }, 500)
  }
})
