import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3.23.8'
import { admin, clientIp, rateLimit } from '../_shared/db.ts'

const QuerySchema = z.object({ order: z.string().uuid() })

const json = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

/**
 * Minimal, non-sensitive status lookup for the post-payment screen.
 * The order id is an unguessable UUID and only coarse status is returned.
 */
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    if (!(await rateLimit('order-status', clientIp(req), 120, 3600))) {
      return json({ error: 'Too many requests' }, 429)
    }

    const url = new URL(req.url)
    const parsed = QuerySchema.safeParse({ order: url.searchParams.get('order') ?? '' })
    if (!parsed.success) return json({ error: 'Invalid order reference' }, 400)

    const { data } = await admin()
      .from('orders')
      .select('id, status, provider, display_currency, display_amount, email, paid_at')
      .eq('id', parsed.data.order)
      .maybeSingle()

    if (!data) return json({ error: 'Not found' }, 404)

    const [name, domain] = String(data.email).split('@')
    return json({
      order_id: data.id,
      status: data.status,
      provider: data.provider,
      currency: data.display_currency,
      amount: data.display_amount,
      paid_at: data.paid_at,
      email_masked: `${name.slice(0, 2)}${'*'.repeat(Math.max(name.length - 2, 1))}@${domain}`,
    })
  } catch (e) {
    console.error('order-status', e)
    return json({ error: 'Unexpected error' }, 500)
  }
})
