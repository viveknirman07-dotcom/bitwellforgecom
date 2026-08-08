import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3.23.8'
import { admin, clientIp, logActivity, rateLimit, requireUser } from '../_shared/db.ts'
import { COMMISSION_USD, generateCode } from '../_shared/affiliate.ts'

const json = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

const JoinSchema = z.object({
  action: z.literal('join'),
  full_name: z.string().trim().min(1).max(120),
  country_code: z.string().trim().max(4).optional(),
  accept_terms: z.literal(true),
})

const SettingsSchema = z.object({
  action: z.literal('payout_settings'),
  payout_recipient_name: z.string().trim().min(1).max(120),
  payout_country: z.string().trim().min(2).max(60),
  paypal_email: z.string().trim().email().max(255),
})

function periodMonth(d: Date) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)).toISOString().slice(0, 10)
}

async function overview(affiliateId: string) {
  const db = admin()
  const [{ data: commissions }, { data: clicks }, { data: payouts }] = await Promise.all([
    db
      .from('commissions')
      .select('id, amount_usd, status, period_month, created_at')
      .eq('affiliate_id', affiliateId)
      .order('created_at', { ascending: false }),
    db
      .from('referral_clicks')
      .select('id, created_at, landing_path')
      .eq('affiliate_id', affiliateId)
      .order('created_at', { ascending: false })
      .limit(50),
    db
      .from('payout_records')
      .select('id, period_month, sales_count, amount_usd, status, paid_at, failure_reason')
      .eq('affiliate_id', affiliateId)
      .order('period_month', { ascending: false }),
  ])

  const list = commissions ?? []
  const sum = (s: string[]) =>
    list.filter((c) => s.includes(c.status)).reduce((t, c) => t + Number(c.amount_usd), 0)

  const now = new Date()
  const prev = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1))

  return {
    metrics: {
      commission_rate_usd: COMMISSION_USD,
      eligible_sales: list.filter((c) => c.status !== 'void').length,
      total_commission_usd: sum(['pending', 'approved', 'paid']),
      pending_commission_usd: sum(['pending', 'approved']),
      paid_commission_usd: sum(['paid']),
      referral_clicks: (clicks ?? []).length,
      current_period: periodMonth(now),
      next_payout_period: periodMonth(prev),
    },
    commissions: list.slice(0, 100),
    clicks: clicks ?? [],
    payouts: payouts ?? [],
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const user = await requireUser(req)
    if (!user) return json({ error: 'Unauthorized' }, 401)

    const db = admin()
    const ip = clientIp(req)

    const { data: affiliate } = await db
      .from('affiliates')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()

    if (req.method === 'GET') {
      if (!affiliate) return json({ affiliate: null })
      return json({ affiliate, ...(await overview(affiliate.id)) })
    }

    if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

    if (!(await rateLimit('affiliate-account', user.id, 30, 3600))) {
      return json({ error: 'Too many requests. Try again shortly.' }, 429)
    }

    const body = await req.json()

    if (body?.action === 'join') {
      const parsed = JoinSchema.safeParse(body)
      if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400)
      if (affiliate) return json({ affiliate, ...(await overview(affiliate.id)) })

      let created = null
      for (let attempt = 0; attempt < 6 && !created; attempt++) {
        const { data, error } = await db
          .from('affiliates')
          .insert({
            user_id: user.id,
            code: generateCode(6),
            full_name: parsed.data.full_name,
            email: (user.email ?? '').toLowerCase(),
            country_code: parsed.data.country_code ?? null,
            status: 'active',
            terms_accepted_at: new Date().toISOString(),
          })
          .select('*')
          .maybeSingle()
        if (data) created = data
        else if (error && !error.message.includes('affiliates_code_key')) {
          console.error('affiliate join', error.message)
          return json({ error: 'Could not create affiliate account' }, 500)
        }
      }
      if (!created) return json({ error: 'Could not create affiliate account' }, 500)

      await logActivity('affiliate.created', { affiliate_id: created.id }, user.id, ip)
      await db.from('email_logs').insert({
        recipient: created.email,
        template: 'affiliate_account_created',
        subject: 'Your BitwellForge affiliate account is active',
        status: 'sent',
        metadata: { affiliate_id: created.id },
      })
      return json({ affiliate: created, ...(await overview(created.id)) })
    }

    if (body?.action === 'payout_settings') {
      if (!affiliate) return json({ error: 'No affiliate account' }, 403)
      const parsed = SettingsSchema.safeParse(body)
      if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400)

      const { data: updated, error } = await db
        .from('affiliates')
        .update({
          payout_recipient_name: parsed.data.payout_recipient_name,
          payout_country: parsed.data.payout_country,
          paypal_email: parsed.data.paypal_email.toLowerCase(),
        })
        .eq('id', affiliate.id)
        .select('*')
        .single()
      if (error) return json({ error: 'Could not save payout settings' }, 500)

      await logActivity('affiliate.payout_settings_updated', { affiliate_id: affiliate.id }, user.id, ip)
      return json({ affiliate: updated, ...(await overview(affiliate.id)) })
    }

    return json({ error: 'Unknown action' }, 400)
  } catch (e) {
    console.error('affiliate-account', e)
    return json({ error: 'Unexpected error' }, 500)
  }
})
