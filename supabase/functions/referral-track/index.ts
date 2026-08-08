import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3.23.8'
import { admin, clientIp, rateLimit } from '../_shared/db.ts'
import { hashIp, resolveAffiliateByCode } from '../_shared/affiliate.ts'

const BodySchema = z.object({
  code: z.string().trim().min(3).max(24),
  landing_path: z.string().trim().max(300).optional(),
  referer: z.string().trim().max(300).optional(),
})

const json = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  try {
    const ip = clientIp(req)
    if (!(await rateLimit('referral-track', ip, 60, 3600))) return json({ ok: true })

    const parsed = BodySchema.safeParse(await req.json())
    if (!parsed.success) return json({ valid: false })

    const affiliate = await resolveAffiliateByCode(parsed.data.code)
    if (!affiliate || affiliate.status !== 'active') return json({ valid: false })

    await admin().from('referral_clicks').insert({
      affiliate_id: affiliate.id,
      code: affiliate.code,
      landing_path: parsed.data.landing_path ?? null,
      referer: parsed.data.referer ?? null,
      ip_hash: await hashIp(ip),
      user_agent: req.headers.get('user-agent'),
    })

    return json({ valid: true, code: affiliate.code })
  } catch (e) {
    console.error('referral-track', e)
    return json({ valid: false })
  }
})
