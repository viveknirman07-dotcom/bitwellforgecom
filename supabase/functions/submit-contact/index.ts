import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405)

  try {
    const payload = await req.json().catch(() => ({}))

    const name = clean(payload.name, 100)
    const email = clean(payload.email, 255).toLowerCase()
    const company = clean(payload.company, 120)
    const service = clean(payload.service, 120) || 'General Inquiry'
    const challenge = clean(payload.challenge, 4000)
    const honeypot = clean(payload.website, 200)

    if (honeypot) return json({ ok: true })

    if (!name) return json({ error: 'Name is required' }, 400)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json({ error: 'A valid email is required' }, 400)
    if (challenge.length < 10) return json({ error: 'Please describe your challenge in a little more detail' }, 400)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } },
    )

    const { error } = await supabase.from('contact_submissions').insert({
      name,
      email,
      company: company || null,
      service,
      challenge,
    })

    if (error) {
      console.error('contact insert failed', error.message)
      return json({ error: 'Could not record your message. Please try again.' }, 500)
    }

    return json({ ok: true })
  } catch (e) {
    console.error('submit-contact error', e instanceof Error ? e.message : e)
    return json({ error: 'Unexpected error' }, 500)
  }
})
