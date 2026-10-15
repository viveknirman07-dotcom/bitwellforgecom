import * as React from 'npm:react@18.3.1'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { template, WEBSITE_URL, LINKEDIN_URL } from './applicant-confirmation.tsx'

function check(value: boolean, message: string) { if (!value) throw new Error(message) }

Deno.test('Applicant receipt preserves exact copy, two official links and plaintext', async () => {
  const element = React.createElement(template.component, { name: 'Alex Morgan', roleTitle: 'Revenue Architect' })
  const html = await renderAsync(element)
  const text = await renderAsync(element, { plainText: true })
  const normalizedHtml = html.replace(/<!--.*?-->/g, '')
  const normalizedText = text.replace(/\s+/g, ' ').replace(/\*/g, '')
  check(template.subject === 'Application Received | BitwellForge Careers', 'Subject changed')
  for (const phrase of ['APPLICATION RECEIVED', 'Dear Alex Morgan,', 'Revenue Architect', '3–5 business days', 'does not guarantee shortlisting or selection', 'Commercial Growth &amp; Revenue Infrastructure']) {
    check(normalizedHtml.includes(phrase), `Missing HTML content: ${phrase}`)
  }
  check((html.match(/<a\s/g) || []).length === 4, 'Expected two CTAs plus Privacy and Contact links')
  check(html.includes('href="https://www.bitwellforge.com/privacy"'), 'Missing privacy link')
  check(html.includes('font-weight:700') && html.includes('Cormorant Garamond'), 'Wordmark weight')
  check(html.includes('relates to the recruitment process'), 'Recruitment footer')
  for (const url of [WEBSITE_URL, LINKEDIN_URL]) {
    check(html.includes(`href="${url}"`), `Missing link ${url}`)
    check(text.includes(url), `Plain text missing link ${url}`)
  }
  check(normalizedText.includes('Dear Alex Morgan,'), 'Plain text missing recipient')
  check(normalizedText.includes('3–5 business days'), 'Plain text missing timeframe')
  check(!text.includes('<html'), 'Plain text contains HTML')
})

Deno.test('Applicant receipt escapes dynamic values and supplies graceful fallbacks', async () => {
  const html = await renderAsync(React.createElement(template.component, { name: '<script>alert(1)</script>', roleTitle: 'A & B' }))
  check(!html.includes('<script>'), 'Unsafe dynamic markup')
  check(html.includes('&lt;script&gt;'), 'Name not escaped')
  check(html.includes('A &amp; B'), 'Role not escaped')
  const fallback = (await renderAsync(React.createElement(template.component, {}), { plainText: true })).replace(/\s+/g, ' ')
  check(fallback.includes('Dear Applicant,'), 'Missing name fallback')
  check(fallback.includes('your selected position'), 'Missing role fallback')
})