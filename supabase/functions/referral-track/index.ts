import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3.23.8'
import { admin, clientIp, rateLimit } from '../_shared/db.ts'
import { capDiscountUsd, hashIp, verifyAttribution, AFFILIATE_DISCOUNT_USD } from '../_shared/affiliate.ts'
import { convertUsd, formatMoney } from '../_shared/money.ts'

const TrackSchema = z.object({
  action: z.literal('track').optional(),
  code: z.string().trim().min(3).max(24),
  landing_path: z.string().trim().max(300).optional(),
  referer: z.string().trim().max(300).optional(),
})

const ValidateSchema = z.object({
  action: z.literal('validate'),
  ref: z.string().trim().min(3).max(24),
  code: z.string().trim().min(1).max(24),
  currency: z.string().trim().length(3).optional(),
  email: z.string().trim().email().max(255).optional(),
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
    const body = await req.json()

    /* ---------- Code validation at checkout ---------- */
    if (body?.action === 'validate') {
      if (!(await rateLimit('referral-validate', ip, 30, 3600))) {
        return json({ valid: false, message: 'Too many attempts. Please try again shortly.' }, 429)
      }
      const parsed = ValidateSchema.safeParse(body)
      if (!parsed.success) return json({ valid: false, message: 'That affiliate code is not valid.' })

      const result = await verifyAttribution(parsed.data.ref, parsed.data.code, parsed.data.email)
      if (!result.ok || !result.affiliate) {
        return json({ valid: false, code: result.code, message: result.message })
      }

      // The discount is decided here, server-side, and capped absolutely.
      const discountUsd = capDiscountUsd(result.discount_usd ?? AFFILIATE_DISCOUNT_USD)
      const currency = (parsed.data.currency ?? 'USD').toUpperCase()
      let display: { amount: number; currency: string; formatted: string } | null = null
      try {
        const converted = await convertUsd(discountUsd, currency)
        display = {
          amount: converted.amount,
          currency,
          formatted: formatMoney(currency, converted.amount),
        }
      } catch (_) {
        display = null
      }

      await admin().from('referral_clicks').insert({
        affiliate_id: result.affiliate.id,
        code: result.affiliate.code,
        event: 'validate',
        landing_path: '/checkout',
        ip_hash: await hashIp(ip),
        user_agent: req.headers.get('user-agent'),
      })

      return json({
        valid: true,
        code: result.affiliate.code,
        discount_usd: discountUsd,
        display_discount: display,
      })
    }

    /* ---------- Referral link click ---------- */
    if (!(await rateLimit('referral-track', ip, 60, 3600))) return json({ ok: true })

    const parsed = TrackSchema.safeParse(body)
    if (!parsed.success) return json({ valid: false })

    const result = await verifyAttribution(parsed.data.code, parsed.data.code)
    if (!result.ok || !result.affiliate) return json({ valid: false })

    await admin().from('referral_clicks').insert({
      affiliate_id: result.affiliate.id,
      code: result.affiliate.code,
      event: 'click',
      landing_path: parsed.data.landing_path ?? null,
      referer: parsed.data.referer ?? null,
      ip_hash: await hashIp(ip),
      user_agent: req.headers.get('user-agent'),
    })

    return json({ valid: true, code: result.affiliate.code })
  } catch (e) {
    console.error('referral-track', e)
    return json({ valid: false })
  }
})
