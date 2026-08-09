import { createClient, SupabaseClient } from 'npm:@supabase/supabase-js@2'

const url = Deno.env.get('MY_SUPABASE_URL') ?? Deno.env.get('SUPABASE_URL')!
const serviceKey =
  Deno.env.get('MY_SUPABASE_SECRET_KEY') ?? Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const anonKey =
  Deno.env.get('MY_SUPABASE_PUBLISHABLE_KEY') ?? Deno.env.get('SUPABASE_ANON_KEY')!

/**
 * Opaque `sb_secret_`/`sb_publishable_` keys are NOT bearer JWTs. supabase-js
 * still sets `Authorization: Bearer <key>`, which PostgREST rejects, so the
 * header is stripped and only `apikey` is sent.
 */
const opaqueFetch = (key: string): typeof fetch => {
  if (!key.startsWith('sb_')) return fetch
  return (input, init) => {
    const headers = new Headers(
      input instanceof Request ? input.headers : undefined,
    )
    if (init?.headers) new Headers(init.headers).forEach((v, k) => headers.set(k, v))
    if (headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization')
    headers.set('apikey', key)
    return fetch(input, { ...init, headers })
  }
}

/** Server-only client. Bypasses RLS. Never expose to the browser. */
export const admin = (): SupabaseClient =>
  createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: opaqueFetch(serviceKey) },
  })

/** Request-scoped client used only to resolve the caller's identity. */
export const asUser = (authHeader: string): SupabaseClient =>
  createClient(url, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false, autoRefreshToken: false },
  })

export async function requireUser(req: Request) {
  const authHeader = req.headers.get('Authorization') ?? ''
  if (!authHeader.startsWith('Bearer ')) return null
  const token = authHeader.slice(7)
  const { data, error } = await asUser(authHeader).auth.getClaims(token)
  if (error || !data?.claims?.sub) return null
  return { id: data.claims.sub as string, email: (data.claims.email as string) ?? null }
}

export function clientIp(req: Request): string {
  return (
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'unknown'
  )
}

export async function logActivity(
  action: string,
  metadata: Record<string, unknown>,
  userId?: string | null,
  ip?: string,
) {
  try {
    await admin()
      .from('activity_logs')
      .insert({ action, metadata, user_id: userId ?? null, ip_address: ip ?? null })
  } catch (_) {
    // logging must never break the request path
  }
}

/** Fixed-window rate limiter backed by Postgres. Returns true when allowed. */
export async function rateLimit(bucket: string, identifier: string, max: number, windowSec: number) {
  const db = admin()
  const now = Date.now()
  const { data } = await db
    .from('rate_limits')
    .select('id, hits, window_start')
    .eq('bucket', bucket)
    .eq('identifier', identifier)
    .maybeSingle()

  if (!data) {
    await db.from('rate_limits').insert({ bucket, identifier, hits: 1 })
    return true
  }
  const started = new Date(data.window_start).getTime()
  if (now - started > windowSec * 1000) {
    await db
      .from('rate_limits')
      .update({ hits: 1, window_start: new Date().toISOString() })
      .eq('id', data.id)
    return true
  }
  if (data.hits >= max) return false
  await db.from('rate_limits').update({ hits: data.hits + 1 }).eq('id', data.id)
  return true
}
