import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3.23.8'
import { admin, clientIp, rateLimit, requireUser } from '../_shared/db.ts'
import { hashIp } from '../_shared/affiliate.ts'

const BUCKET = 'affiliate-materials'
const TTL = 300

const BodySchema = z.object({
  slug: z.string().trim().min(1).max(80),
  access_type: z.enum(['READ', 'DOWNLOAD']).default('READ'),
})

const json = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const user = await requireUser(req)
    if (!user) return json({ error: 'Unauthorized' }, 401)

    const db = admin()

    // Authorisation gate: authenticated + active affiliate profile.
    const { data: affiliate } = await db
      .from('affiliates')
      .select('id, status')
      .eq('user_id', user.id)
      .maybeSingle()
    if (!affiliate) return json({ error: 'Affiliate account required' }, 403)
    if (affiliate.status !== 'active') return json({ error: 'Affiliate account is not active' }, 403)

    const { data: resources } = await db
      .from('affiliate_resources')
      .select('id, slug, title, subtitle, description, resource_type, version, display_order, file_path')
      .eq('status', 'PUBLISHED')
      .order('display_order')

    if (req.method === 'GET') {
      return json({
        resources: (resources ?? []).map(({ file_path: _drop, ...r }) => r),
      })
    }

    if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

    if (!(await rateLimit('affiliate-resource', user.id, 60, 3600))) {
      return json({ error: 'Access limit reached. Try again shortly.' }, 429)
    }

    const parsed = BodySchema.safeParse(await req.json())
    if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400)

    const resource = (resources ?? []).find((r) => r.slug === parsed.data.slug)
    if (!resource) return json({ error: 'Not found' }, 404)

    const { data: signed, error } = await db.storage
      .from(BUCKET)
      .createSignedUrl(resource.file_path, TTL, {
        download: parsed.data.access_type === 'DOWNLOAD' ? `${resource.slug}.pdf` : undefined,
      })
    if (error || !signed) return json({ error: 'Could not prepare document' }, 500)

    await db.from('affiliate_resource_access').insert({
      affiliate_id: affiliate.id,
      resource_id: resource.id,
      resource_version: resource.version,
      access_type: parsed.data.access_type,
      ip_hash: await hashIp(clientIp(req)),
      user_agent: req.headers.get('user-agent'),
    })

    return json({ url: signed.signedUrl, expires_in: TTL, title: resource.title })
  } catch (e) {
    console.error('affiliate-resource-access', e)
    return json({ error: 'Unexpected error' }, 500)
  }
})
