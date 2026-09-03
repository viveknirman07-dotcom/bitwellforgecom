import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3.23.8'
import { admin, clientIp, logActivity, rateLimit } from '../_shared/db.ts'

const Schema = z.object({
  kind: z.enum(['contact', 'booking']).default('contact'),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  service: z.string().trim().min(1).max(120),
  challenge: z.string().trim().min(10).max(4000),
  // Honeypot. Bots fill it; humans never see it.
  website: z.string().max(0).optional(),
})

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405)

  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return json({ error: 'invalid_json' }, 400)
  }

  const parsed = Schema.safeParse(payload)
  if (!parsed.success) {
    return json({ error: 'validation_failed', fields: parsed.error.flatten().fieldErrors }, 400)
  }

  const ip = clientIp(req)
  if (!(await rateLimit('contact_submit', ip, 5, 3600))) {
    return json({ error: 'rate_limited', message: 'Too many messages sent. Please try again later.' }, 429)
  }

  const v = parsed.data
  const { error } = await admin()
    .from('contact_submissions')
    .insert({
      kind: v.kind,
      name: v.name,
      email: v.email.toLowerCase(),
      phone: v.phone || null,
      company: v.company || null,
      service: v.service,
      challenge: v.challenge,
      ip_address: ip,
    })

  if (error) return json({ error: 'store_failed' }, 500)

  await logActivity('contact_submission', { kind: v.kind, service: v.service }, null, ip)
  return json({ ok: true })
})
