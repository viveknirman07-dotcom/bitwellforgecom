import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { admin, clientIp } from '../_shared/db.ts'
import {
  COUNTRY_CURRENCY,
  CURRENCY_NAMES,
  convertFromInr,
  convertFromUsd,
  formatMoney,
  getRates,
  resolveCountry,
} from '../_shared/money.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const url = new URL(req.url)
    const ip = clientIp(req)
    const forced = url.searchParams.get('currency')?.toUpperCase()

    const { data: product, error } = await admin()
      .from('products')
      .select('id, slug, name, tagline, description, price_inr, price_usd, access_days')
      .eq('slug', 'commercial-growth-system')
      .eq('is_active', true)
      .maybeSingle()

    if (error || !product) throw new Error('Product unavailable')

    const country = await resolveCountry(req, ip)

    // The visitor's own country decides the default. An explicit ?currency wins.
    const geoCurrency = COUNTRY_CURRENCY[country] ?? 'USD'
    const currency =
      forced && /^[A-Z]{3}$/.test(forced) ? forced : geoCurrency

    const amountInr = Number(product.price_inr)
    const amountUsd = product.price_usd != null ? Number(product.price_usd) : null
    const accessDays = product.access_days ?? null

    let converted: { amount: number; rate: number; currency?: string }
    try {
      converted = amountUsd != null
        ? await convertFromUsd(amountUsd, currency)
        : await convertFromInr(amountInr, currency)
    } catch (_) {
      // Never show a possibly-wrong converted price. Fall back to the base currency.
      return new Response(
        JSON.stringify({
          product: {
            slug: product.slug,
            name: product.name,
            tagline: product.tagline,
            description: product.description,
          },
          country,
          suggested_currency: COUNTRY_CURRENCY[country] ?? 'USD',
          base: amountUsd != null ? { currency: 'USD', amount: amountUsd } : { currency: 'INR', amount: amountInr },
          access_days: accessDays,
          display: {
            currency: amountUsd != null ? 'USD' : 'INR',
            amount: amountUsd ?? amountInr,
            formatted: amountUsd != null ? formatMoney('USD', amountUsd) : formatMoney('INR', amountInr),
            rate: 1,
          },
          conversion_unavailable: true,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    const resolvedCurrency = converted.currency ?? currency
    const unsupported = resolvedCurrency !== currency

    let currencies: Array<{ code: string; name: string }> = []
    try {
      const { rates } = await getRates()
      currencies = Object.keys(rates)
        .filter((c) => CURRENCY_NAMES[c])
        .sort()
        .map((c) => ({ code: c, name: CURRENCY_NAMES[c] }))
    } catch (_) {
      currencies = []
    }

    return new Response(
      JSON.stringify({
        product: {
          slug: product.slug,
          name: product.name,
          tagline: product.tagline,
          description: product.description,
        },
        country,
        suggested_currency: COUNTRY_CURRENCY[country] ?? 'USD',
        base: amountUsd != null ? { currency: 'USD', amount: amountUsd } : { currency: 'INR', amount: amountInr },
        access_days: accessDays,
        display: {
          currency: resolvedCurrency,
          amount: converted.amount,
          formatted: formatMoney(resolvedCurrency, converted.amount),
          rate: converted.rate,
        },
        requested_currency_unsupported: unsupported ? currency : null,
        currencies,
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
