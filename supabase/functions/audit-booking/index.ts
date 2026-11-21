import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { admin, clientIp, rateLimit } from '../_shared/db.ts'
import { AUDIT_SITE, bookingUrl, sendAudit, setStatus } from '../_shared/audit.ts'

const GW = 'https://connector-gateway.lovable.dev/google_calendar/calendar/v3'
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
const TOKEN = /^[0-9a-f]{48}$/
const TZ = 'Asia/Kolkata'
const TZ_OFFSET_MIN = 330 // IST has no daylight saving
const START_HOURS = [10, 11, 12, 14, 15, 16, 17] // 60-minute slots, local business hours
const DAYS_AHEAD = 21
const SLOT_MIN = 60

async function gcal(path: string, init: RequestInit = {}) {
  const lk = Deno.env.get('LOVABLE_API_KEY'), ck = Deno.env.get('GOOGLE_CALENDAR_API_KEY')
  if (!lk || !ck) throw new Error('Calendar is not connected')
  const res = await fetch(`${GW}${path}`, { ...init, headers: { Authorization: `Bearer ${lk}`, 'X-Connection-Api-Key': ck, 'Content-Type': 'application/json', ...(init.headers ?? {}) } })
  const text = await res.text()
  if (!res.ok) throw new Error(`Calendar ${res.status}: ${text.slice(0, 500)}`)
  return text ? JSON.parse(text) : {}
}

/** Candidate slots in IST business hours, weekdays, at least 24h ahead. */
function candidates(now = new Date()) {
  const out: Date[] = []
  const earliest = now.getTime() + 24 * 3600e3
  for (let d = 0; d <= DAYS_AHEAD; d++) {
    const local = new Date(now.getTime() + TZ_OFFSET_MIN * 60e3 + d * 86400e3)
    const dow = local.getUTCDay()
    if (dow === 0 || dow === 6) continue
    for (const h of START_HOURS) {
      const utc = Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate(), h, 0) - TZ_OFFSET_MIN * 60e3
      if (utc >= earliest) out.push(new Date(utc))
    }
  }
  return out
}

async function freeSlots() {
  const c = candidates()
  if (!c.length) return []
  const db = admin()
  const { data: taken } = await db.from('audit_bookings').select('slot_start').neq('status', 'cancelled').gte('slot_start', c[0].toISOString())
  const takenSet = new Set((taken ?? []).map((t) => new Date(t.slot_start).getTime()))
  const fb = await gcal('/freeBusy', { method: 'POST', body: JSON.stringify({ timeMin: c[0].toISOString(), timeMax: new Date(c[c.length - 1].getTime() + SLOT_MIN * 60e3).toISOString(), items: [{ id: 'primary' }] }) })
  const busy = ((fb.calendars?.primary?.busy ?? []) as { start: string; end: string }[]).map((b) => [Date.parse(b.start), Date.parse(b.end)])
  return c.filter((s) => {
    const a = s.getTime(), z = a + SLOT_MIN * 60e3
    return !takenSet.has(a) && !busy.some(([bs, be]) => a < be && z > bs)
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  const db = admin()
  try {
    if (!(await rateLimit('audit-booking', clientIp(req), 60, 3600))) return json({ error: 'Too many requests' }, 429)
    const body = await req.json().catch(() => ({})) as Record<string, string>
    if (!TOKEN.test(String(body.token ?? ''))) return json({ error: 'Invalid link' }, 400)
    const { data: eng } = await db.from('audit_engagements').select('id, email, full_name, status, intake, access_token').eq('access_token', body.token).maybeSingle()
    if (!eng) return json({ error: 'Audit not found' }, 404)
    const eligible = ['deliverables_sent', 'presentation_scheduled'].includes(eng.status)
    const { data: current } = await db.from('audit_bookings').select('id, slot_start, slot_end, meet_url, google_event_id').eq('engagement_id', eng.id).neq('status', 'cancelled').maybeSingle()

    if (body.action === 'slots') {
      const prefill = { full_name: eng.full_name ?? eng.intake?.full_name ?? '', email: eng.intake?.work_email ?? eng.email, company: eng.intake?.company ?? '' }
      if (!eligible) return json({ eligible, current, prefill, slots: [], timezone: TZ })
      const slots = await freeSlots()
      return json({ eligible, current, prefill, timezone: TZ, duration_minutes: SLOT_MIN, slots: slots.map((s) => s.toISOString()) })
    }

    if (body.action === 'book') {
      if (!eligible) return json({ error: 'Booking opens once your deliverables have been sent.' }, 400)
      const name = String(body.full_name ?? '').trim(), email = String(body.email ?? '').trim(), company = String(body.company ?? '').trim()
      if (!name || name.length > 120 || !company || company.length > 160 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255)
        return json({ error: 'Please enter your name, business email and company.' }, 400)
      const start = new Date(String(body.slot ?? ''))
      const free = await freeSlots()
      if (isNaN(start.getTime()) || !free.some((s) => s.getTime() === start.getTime())) return json({ error: 'That time is no longer available. Please choose another.' }, 409)
      const end = new Date(start.getTime() + SLOT_MIN * 60e3)

      // Free the client's previous slot first (reschedule).
      if (current) {
        await db.from('audit_bookings').update({ status: 'cancelled' }).eq('id', current.id)
        if (current.google_event_id) await gcal(`/calendars/primary/events/${current.google_event_id}?sendUpdates=all`, { method: 'DELETE' }).catch((e) => console.error('cancel event', String(e)))
      }
      // Unique index on active slot_start blocks double bookings atomically.
      const { data: row, error } = await db.from('audit_bookings').insert({ engagement_id: eng.id, full_name: name, email, company, slot_start: start.toISOString(), slot_end: end.toISOString(), status: 'pending' }).select('id').single()
      if (error?.code === '23505') return json({ error: 'That time was just booked. Please choose another.' }, 409)
      if (error || !row) throw new Error(error?.message ?? 'Could not reserve slot')

      let event: Record<string, any>
      try {
        event = await gcal('/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all', {
          method: 'POST',
          body: JSON.stringify({
            summary: `BitwellForge Findings Presentation | ${company}`,
            description: `Revenue Infrastructure Audit findings presentation (45–60 minutes).\n\nAgenda\nMost important findings\nTheir commercial implications\nRecommended order of priorities\nQuestions and next steps\n\nReschedule: ${bookingUrl(eng.access_token)}`,
            start: { dateTime: start.toISOString(), timeZone: TZ }, end: { dateTime: end.toISOString(), timeZone: TZ },
            attendees: [{ email, displayName: name }],
            conferenceData: { createRequest: { requestId: row.id, conferenceSolutionKey: { type: 'hangoutsMeet' } } },
            reminders: { useDefault: true },
          }),
        })
      } catch (e) {
        await db.from('audit_bookings').update({ status: 'cancelled' }).eq('id', row.id)
        console.error('create event', String(e))
        return json({ error: 'The calendar could not confirm this booking. Please try again.', details: String(e) }, 502)
      }
      const meet = event.hangoutLink ?? event.conferenceData?.entryPoints?.find((p: any) => p.entryPointType === 'video')?.uri
      if (!meet) {
        await gcal(`/calendars/primary/events/${event.id}`, { method: 'DELETE' }).catch(() => {})
        await db.from('audit_bookings').update({ status: 'cancelled' }).eq('id', row.id)
        return json({ error: 'A meeting link could not be created. Please try again.' }, 502)
      }
      await db.from('audit_bookings').update({ status: 'confirmed', google_event_id: event.id, meet_url: meet }).eq('id', row.id)
      await db.from('audit_engagements').update({ meeting_at: start.toISOString(), meeting_url: meet }).eq('id', eng.id)
      await setStatus(eng.id, 'presentation_scheduled', current ? 'Rescheduled by client' : 'Booked by client')
      const label = start.toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short', timeZone: TZ }) + ' IST'
      const emailStatus = await sendAudit('audit-presentation-confirmed', email, row.id, { name, when: label, meetingUrl: meet, calendarUrl: event.htmlLink, bookingUrl: bookingUrl(eng.access_token) })
      return json({ ok: true, slot_start: start.toISOString(), meet_url: meet, email: emailStatus })
    }
    return json({ error: 'Unknown action' }, 400)
  } catch (e) {
    console.error('audit-booking', String(e))
    return json({ error: 'Booking is temporarily unavailable. Please try again shortly.' }, 500)
  }
})
