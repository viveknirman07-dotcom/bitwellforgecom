/**
 * Currency resolution.
 * The commercial value is ALWAYS ₹14,500 INR. Any other currency shown to a
 * visitor is a live-rate presentation of that same value. Nothing is hardcoded.
 */

export const COUNTRY_CURRENCY: Record<string, string> = {
  IN: 'INR', US: 'USD', CA: 'CAD', GB: 'GBP', IE: 'EUR', AU: 'AUD', NZ: 'NZD',
  DE: 'EUR', FR: 'EUR', ES: 'EUR', IT: 'EUR', NL: 'EUR', BE: 'EUR', AT: 'EUR',
  PT: 'EUR', FI: 'EUR', GR: 'EUR', LU: 'EUR', SK: 'EUR', SI: 'EUR', EE: 'EUR',
  LV: 'EUR', LT: 'EUR', CY: 'EUR', MT: 'EUR', HR: 'EUR',
  CH: 'CHF', SE: 'SEK', NO: 'NOK', DK: 'DKK', PL: 'PLN', CZ: 'CZK', HU: 'HUF',
  RO: 'RON', BG: 'BGN', TR: 'TRY', RU: 'RUB', UA: 'UAH',
  AE: 'AED', SA: 'SAR', QA: 'QAR', KW: 'KWD', BH: 'BHD', OM: 'OMR', IL: 'ILS',
  SG: 'SGD', MY: 'MYR', ID: 'IDR', TH: 'THB', PH: 'PHP', VN: 'VND', HK: 'HKD',
  JP: 'JPY', KR: 'KRW', CN: 'CNY', TW: 'TWD', PK: 'PKR', BD: 'BDT', LK: 'LKR',
  NP: 'NPR', ZA: 'ZAR', NG: 'NGN', KE: 'KES', GH: 'GHS', EG: 'EGP', MA: 'MAD',
  BR: 'BRL', MX: 'MXN', AR: 'ARS', CL: 'CLP', CO: 'COP', PE: 'PEN', UY: 'UYU',
}

const ZERO_DECIMAL = new Set(['JPY', 'KRW', 'VND', 'CLP', 'IDR', 'HUF'])

export interface Rates {
  base: 'INR'
  rates: Record<string, number>
  fetchedAt: string
}

let cache: { data: Rates; expires: number } | null = null

/** Live INR-based exchange rates. Two independent sources, cached for 30 minutes. */
export async function getRates(): Promise<Rates> {
  if (cache && cache.expires > Date.now()) return cache.data

  const sources = [
    async () => {
      const r = await fetch('https://open.er-api.com/v6/latest/INR')
      if (!r.ok) throw new Error(`er-api ${r.status}`)
      const j = await r.json()
      if (j.result !== 'success' || !j.rates) throw new Error('er-api payload')
      return j.rates as Record<string, number>
    },
    async () => {
      const r = await fetch('https://api.frankfurter.app/latest?from=INR')
      if (!r.ok) throw new Error(`frankfurter ${r.status}`)
      const j = await r.json()
      if (!j.rates) throw new Error('frankfurter payload')
      return { ...j.rates, INR: 1 } as Record<string, number>
    },
  ]

  let lastError: unknown
  for (const src of sources) {
    try {
      const rates = await src()
      const data: Rates = { base: 'INR', rates, fetchedAt: new Date().toISOString() }
      cache = { data, expires: Date.now() + 30 * 60 * 1000 }
      return data
    } catch (e) {
      lastError = e
    }
  }
  throw new Error(`Exchange rate lookup failed: ${lastError}`)
}

/** Display names for the currencies we are willing to quote in. */
export const CURRENCY_NAMES: Record<string, string> = {
  USD: 'US Dollar', EUR: 'Euro', GBP: 'British Pound', INR: 'Indian Rupee',
  CAD: 'Canadian Dollar', AUD: 'Australian Dollar', NZD: 'New Zealand Dollar',
  SGD: 'Singapore Dollar', AED: 'UAE Dirham', SAR: 'Saudi Riyal', QAR: 'Qatari Riyal',
  KWD: 'Kuwaiti Dinar', BHD: 'Bahraini Dinar', OMR: 'Omani Rial',
  JPY: 'Japanese Yen', CNY: 'Chinese Yuan', HKD: 'Hong Kong Dollar', TWD: 'Taiwan Dollar',
  KRW: 'South Korean Won', CHF: 'Swiss Franc', SEK: 'Swedish Krona', NOK: 'Norwegian Krone',
  DKK: 'Danish Krone', PLN: 'Polish Zloty', CZK: 'Czech Koruna', HUF: 'Hungarian Forint',
  RON: 'Romanian Leu', BGN: 'Bulgarian Lev', TRY: 'Turkish Lira',
  BRL: 'Brazilian Real', MXN: 'Mexican Peso', ARS: 'Argentine Peso', CLP: 'Chilean Peso',
  COP: 'Colombian Peso', PEN: 'Peruvian Sol', UYU: 'Uruguayan Peso',
  ZAR: 'South African Rand', NGN: 'Nigerian Naira', KES: 'Kenyan Shilling',
  GHS: 'Ghanaian Cedi', EGP: 'Egyptian Pound', MAD: 'Moroccan Dirham',
  ILS: 'Israeli New Shekel', THB: 'Thai Baht', MYR: 'Malaysian Ringgit',
  IDR: 'Indonesian Rupiah', PHP: 'Philippine Peso', VND: 'Vietnamese Dong',
  PKR: 'Pakistani Rupee', BDT: 'Bangladeshi Taka', LKR: 'Sri Lankan Rupee',
  NPR: 'Nepalese Rupee',
}

/** Currency-correct presentation. Zero-decimal currencies never show cents. */
export function formatMoney(currency: string, amount: number): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: ZERO_DECIMAL.has(currency) ? 0 : 2,
      maximumFractionDigits: ZERO_DECIMAL.has(currency) ? 0 : 2,
    }).format(amount)
  } catch (_) {
    return `${currency} ${amount.toFixed(ZERO_DECIMAL.has(currency) ? 0 : 2)}`
  }
}

export function roundFor(currency: string, value: number): number {
  if (ZERO_DECIMAL.has(currency)) return Math.round(value)
  return Math.round(value * 100) / 100
}

export async function convertFromInr(amountInr: number, currency: string) {
  if (currency === 'INR') return { amount: roundFor('INR', amountInr), rate: 1 }
  const { rates } = await getRates()
  const rate = rates[currency]
  if (!rate) return { amount: roundFor('INR', amountInr), rate: 1, currency: 'INR' }
  return { amount: roundFor(currency, amountInr * rate), rate }
}

/**
 * Converts a USD amount (the affiliate discount is always defined in USD)
 * into the currency the customer is being billed in. Rates are INR-based, so
 * USD is first expressed in INR and then in the target currency.
 */
export async function convertUsd(amountUsd: number, currency: string) {
  if (amountUsd <= 0) return { amount: 0, rate: 1 }
  const { rates } = await getRates()
  const usdRate = rates.USD
  if (!usdRate) throw new Error('No USD rate available')
  const inr = amountUsd / usdRate
  if (currency === 'INR') return { amount: roundFor('INR', inr), rate: 1 }
  const rate = rates[currency]
  if (!rate) throw new Error(`No rate available for ${currency}`)
  return { amount: roundFor(currency, inr * rate), rate }
}

/** USD value of an amount expressed in another currency. */
export async function toUsd(amount: number, currency: string) {
  if (currency === 'USD') return Math.round(amount * 100) / 100
  const { rates } = await getRates()
  const usdRate = rates.USD
  const rate = currency === 'INR' ? 1 : rates[currency]
  if (!usdRate || !rate) throw new Error(`No rate available for ${currency}`)
  const inr = amount / rate
  return Math.round(inr * usdRate * 100) / 100
}


/** Resolve the visitor's ISO country from edge headers, then IP lookup. */
export async function resolveCountry(req: Request, ip: string): Promise<string> {
  const header =
    req.headers.get('cf-ipcountry') ??
    req.headers.get('x-vercel-ip-country') ??
    req.headers.get('x-country-code')
  if (header && /^[A-Z]{2}$/.test(header) && header !== 'XX') return header

  if (ip && ip !== 'unknown') {
    try {
      const r = await fetch(`https://ipapi.co/${ip}/country/`, {
        signal: AbortSignal.timeout(2500),
      })
      const code = (await r.text()).trim().toUpperCase()
      if (/^[A-Z]{2}$/.test(code)) return code
    } catch (_) {
      // fall through
    }
  }
  return 'IN'
}
