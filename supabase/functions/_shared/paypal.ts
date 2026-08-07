const CLIENT_ID = Deno.env.get('PAYPAL_CLIENT_ID') ?? Deno.env.get('PAYPAL_CIENT_ID') ?? ''
const CLIENT_SECRET = Deno.env.get('PAYPAL_CLIENT_SECRET') ?? ''
export const PAYPAL_ENV = (Deno.env.get('PAYPAL_ENVIRONMENT') ?? 'live').toLowerCase()
export const PAYPAL_API =
  PAYPAL_ENV === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com'

export function paypalConfigured() {
  return Boolean(CLIENT_ID && CLIENT_SECRET)
}
export function paypalClientId() {
  return CLIENT_ID
}

let token: { value: string; expires: number } | null = null

export async function paypalToken(): Promise<string> {
  if (token && token.expires > Date.now()) return token.value
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  if (!res.ok) throw new Error(`PayPal auth failed: ${res.status} ${await res.text()}`)
  const j = await res.json()
  token = { value: j.access_token, expires: Date.now() + (j.expires_in - 60) * 1000 }
  return token.value
}

export async function paypalFetch(path: string, init: RequestInit = {}) {
  const at = await paypalToken()
  const res = await fetch(`${PAYPAL_API}${path}`, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      Authorization: `Bearer ${at}`,
      'Content-Type': 'application/json',
    },
  })
  const text = await res.text()
  let body: unknown = null
  try {
    body = text ? JSON.parse(text) : null
  } catch (_) {
    body = text
  }
  return { ok: res.ok, status: res.status, body: body as Record<string, unknown> }
}

/** Verifies a webhook signature against PayPal's own verification endpoint. */
export async function verifyPaypalWebhook(req: Request, rawBody: string) {
  const webhookId = Deno.env.get('PAYPAL_WEBHOOK_ID')
  if (!webhookId) return { verified: false, reason: 'PAYPAL_WEBHOOK_ID not configured' }

  const payload = {
    auth_algo: req.headers.get('paypal-auth-algo'),
    cert_url: req.headers.get('paypal-cert-url'),
    transmission_id: req.headers.get('paypal-transmission-id'),
    transmission_sig: req.headers.get('paypal-transmission-sig'),
    transmission_time: req.headers.get('paypal-transmission-time'),
    webhook_id: webhookId,
    webhook_event: JSON.parse(rawBody),
  }
  if (!payload.transmission_id || !payload.transmission_sig) {
    return { verified: false, reason: 'missing signature headers' }
  }
  const { ok, body } = await paypalFetch('/v1/notifications/verify-webhook-signature', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  return {
    verified: ok && body?.verification_status === 'SUCCESS',
    reason: ok ? String(body?.verification_status) : 'verification call failed',
  }
}
