import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { admin, clientIp } from '../_shared/db.ts'
import { COUNTRY_CURRENCY, convertFromInr, resolveCountry } from '../_shared/money.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const url = new URL(req.url)
    const ip = clientIp(req)
    const forced = url.searchParams.get('currency')?.toUpperCase()

    const { data: product, error } = await admin()
      .from('products')
      .select('id, slug, name, tagline, description, price_inr')
      .eq('slug', 'commercial-growth-system')
      .eq('is_active', true)
      .maybeSingle()

    if (error || !product) throw new Error('Product unavailable')

    const country = await resolveCountry(req, ip)
    const currency =
      forced && /^[A-Z]{3}$/.test(forced) ? forced : (COUNTRY_CURRENCY[country] ?? 'USD')

    const amountInr = Number(product.price_inr)
    const converted = await convertFromInr(amountInr, currency)
    const resolvedCurrency = (converted as { currency?: string }).currency ?? currency

    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: resolvedCurrency,
      maximumFractionDigits: ['JPY', 'KRW', 'VND', 'CLP', 'IDR', 'HUF'].includes(resolvedCurrency)
        ? 0
        : 2,
    }).format(converted.amount)

    return new Response(
      JSON.stringify({
        product: {
          slug: product.slug,
          name: product.name,
          tagline: product.tagline,
          description: product.description,
        },
        country,
        base: { currency: 'INR', amount: amountInr },
        display: {
          currency: resolvedCurrency,
          amount: converted.amount,
          formatted,
          rate: converted.rate,
        },
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (e) {
    return new Response(JSON.stringify({ error: String((e as Error).message ?? e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
