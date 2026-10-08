import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3.23.8'
import { admin, clientIp, rateLimit, requireUser } from '../_shared/db.ts'

const BUCKET = 'vault-documents'
const SIGNED_URL_TTL = 300 // five minutes

const BodySchema = z.object({ document_slug: z.string().trim().min(1).max(80) })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const json = (payload: unknown, status = 200) =>
    new Response(JSON.stringify(payload), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  try {
    const user = await requireUser(req)
    if (!user) return json({ error: 'Unauthorized' }, 401)

    const db = admin()
    const ip = clientIp(req)

    // Administrators (role held in public.user_roles, resolved server-side via
    // has_role) hold full Vault access. Every other account keeps the existing
    // entitlement rules unchanged.
    const { data: isAdmin } = await db.rpc('has_role', { _user_id: user.id, _role: 'admin' })

    const { data: entitlements } = await db
      .from('entitlements')
      .select('product_id')
      .eq('user_id', user.id)
      .is('revoked_at', null)

    const productIds = (entitlements ?? []).map((e) => e.product_id)
    if (!isAdmin && productIds.length === 0) {
      return json({ entitled: false, documents: [], updates: [] })
    }

    let documentQuery = db
      .from('product_documents')
      .select('id, slug, title, subtitle, category, summary, page_count, version, sort_order, product_id')
      .eq('is_published', true)
    if (!isAdmin) documentQuery = documentQuery.in('product_id', productIds)
    const { data: documents } = await documentQuery.order('sort_order')

    const updateProductIds = isAdmin
      ? Array.from(new Set((documents ?? []).map((d) => d.product_id)))
      : productIds

    // Library listing
    if (req.method === 'GET') {
      const ids = (documents ?? []).map((d) => d.id)
      const { data: sections } = await db
        .from('document_sections')
        .select('document_id, slug, title, part, summary, page_start, sort_order')
        .in('document_id', ids.length ? ids : ['00000000-0000-0000-0000-000000000000'])
        .order('sort_order')

      const { data: updates } = await db
        .from('product_updates')
        .select('title, body, version, published_at')
        .in(
          'product_id',
          updateProductIds.length ? updateProductIds : ['00000000-0000-0000-0000-000000000000'],
        )
        .order('published_at', { ascending: false })

      return json({
        entitled: true,
        documents: (documents ?? []).map((d) => ({
          ...d,
          sections: (sections ?? []).filter((s) => s.document_id === d.id),
        })),
        updates: updates ?? [],
      })
    }

    if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

    if (!(await rateLimit('vault-download', user.id, 60, 3600))) {
      return json({ error: 'Download limit reached. Try again shortly.' }, 429)
    }

    const parsed = BodySchema.safeParse(await req.json())
    if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400)

    const doc = (documents ?? []).find((d) => d.slug === parsed.data.document_slug)
    if (!doc) return json({ error: 'Not found' }, 404)

    const { data: full } = await db
      .from('product_documents')
      .select('storage_path')
      .eq('id', doc.id)
      .single()

    const { data: signed, error } = await db.storage
      .from(BUCKET)
      .createSignedUrl(full!.storage_path, SIGNED_URL_TTL)
    if (error || !signed) return json({ error: 'Could not prepare document' }, 500)

    await db.from('downloads').insert({
      user_id: user.id,
      document_id: doc.id,
      ip_address: ip,
      user_agent: req.headers.get('user-agent'),
    })

    return json({ url: signed.signedUrl, expires_in: SIGNED_URL_TTL, title: doc.title })
  } catch (e) {
    console.error('vault-access', e)
    return json({ error: 'Unexpected error' }, 500)
  }
})
