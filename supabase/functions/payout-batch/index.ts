import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3.23.8'
import { admin, logActivity, requireUser } from '../_shared/db.ts'

const json = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

const BodySchema = z.object({
  period_month: z.string().regex(/^\d{4}-\d{2}-01$/).optional(),
  mark_paid_batch_id: z.string().uuid().optional(),
})

function previousPeriod() {
  const now = new Date()
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1)).toISOString().slice(0, 10)
}

/** Admin-only monthly payout batch generator. */
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const user = await requireUser(req)
    if (!user) return json({ error: 'Unauthorized' }, 401)

    const db = admin()
    const { data: isAdmin } = await db.rpc('has_role', { _user_id: user.id, _role: 'admin' })
    if (!isAdmin) return json({ error: 'Forbidden' }, 403)

    if (req.method === 'GET') {
      const { data: batches } = await db
        .from('payout_batches')
        .select('*')
        .order('period_month', { ascending: false })
      return json({ batches: batches ?? [] })
    }

    if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

    const parsed = BodySchema.safeParse(await req.json().catch(() => ({})))
    if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400)

    // Settle an existing batch.
    if (parsed.data.mark_paid_batch_id) {
      const id = parsed.data.mark_paid_batch_id
      const now = new Date().toISOString()
      await db.from('payout_records').update({ status: 'paid', paid_at: now }).eq('batch_id', id)
      const { data: records } = await db.from('payout_records').select('id').eq('batch_id', id)
      const ids = (records ?? []).map((r) => r.id)
      if (ids.length) {
        await db.from('commissions').update({ status: 'paid' }).in('payout_record_id', ids)
      }
      const { data: batch } = await db
        .from('payout_batches')
        .update({ status: 'paid', processed_at: now })
        .eq('id', id)
        .select('*')
        .single()
      await logActivity('payout.batch_paid', { batch_id: id }, user.id)
      return json({ batch })
    }

    const period = parsed.data.period_month ?? previousPeriod()

    const { data: existing } = await db
      .from('payout_batches')
      .select('id, status')
      .eq('period_month', period)
      .maybeSingle()
    if (existing) return json({ error: 'A batch already exists for this period', batch_id: existing.id }, 409)

    const { data: commissions } = await db
      .from('commissions')
      .select('id, affiliate_id, amount_usd')
      .eq('period_month', period)
      .in('status', ['pending', 'approved'])
      .is('payout_record_id', null)

    const list = commissions ?? []
    if (list.length === 0) return json({ error: 'No commissions to pay for this period' }, 404)

    const byAffiliate = new Map<string, { total: number; ids: string[] }>()
    for (const c of list) {
      const entry = byAffiliate.get(c.affiliate_id) ?? { total: 0, ids: [] }
      entry.total += Number(c.amount_usd)
      entry.ids.push(c.id)
      byAffiliate.set(c.affiliate_id, entry)
    }

    const total = list.reduce((t, c) => t + Number(c.amount_usd), 0)
    const { data: batch, error: batchErr } = await db
      .from('payout_batches')
      .insert({
        period_month: period,
        status: 'pending',
        total_amount_usd: total,
        affiliate_count: byAffiliate.size,
      })
      .select('*')
      .single()
    if (batchErr || !batch) return json({ error: 'Could not create batch' }, 500)

    for (const [affiliateId, entry] of byAffiliate) {
      const { data: affiliate } = await db
        .from('affiliates')
        .select('payout_recipient_name, payout_country, paypal_email, full_name')
        .eq('id', affiliateId)
        .maybeSingle()

      const { data: record } = await db
        .from('payout_records')
        .insert({
          batch_id: batch.id,
          affiliate_id: affiliateId,
          period_month: period,
          recipient_name: affiliate?.payout_recipient_name ?? affiliate?.full_name ?? null,
          payout_country: affiliate?.payout_country ?? null,
          paypal_email: affiliate?.paypal_email ?? null,
          sales_count: entry.ids.length,
          amount_usd: entry.total,
          status: affiliate?.paypal_email ? 'pending' : 'blocked',
          failure_reason: affiliate?.paypal_email ? null : 'Payout details missing',
        })
        .select('id')
        .single()

      if (record) {
        await db
          .from('commissions')
          .update({ payout_record_id: record.id, status: 'approved' })
          .in('id', entry.ids)
      }
    }

    await logActivity('payout.batch_created', { batch_id: batch.id, period }, user.id)

    const { data: records } = await db
      .from('payout_records')
      .select('*')
      .eq('batch_id', batch.id)

    return json({ batch, records: records ?? [] })
  } catch (e) {
    console.error('payout-batch', e)
    return json({ error: 'Unexpected error' }, 500)
  }
})
