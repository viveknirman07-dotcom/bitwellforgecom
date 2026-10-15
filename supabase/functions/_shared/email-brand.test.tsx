import * as React from 'npm:react@18.3.1'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { BrandHeader, LIGHT_BRAND_URL, DARK_BRAND_URL } from './email-brand.tsx'
import { SignupEmail } from './email-templates/signup.tsx'
import { InviteEmail } from './email-templates/invite.tsx'
import { MagicLinkEmail } from './email-templates/magic-link.tsx'
import { RecoveryEmail } from './email-templates/recovery.tsx'
import { EmailChangeEmail } from './email-templates/email-change.tsx'
import { ReauthenticationEmail } from './email-templates/reauthentication.tsx'
import { TEMPLATES } from './transactional-email-templates/registry.ts'

function check(ok: boolean, message: string) { if (!ok) throw new Error(message) }
const props = { siteName: 'BitwellForge', siteUrl: 'https://www.bitwellforge.com', recipient: 'candidate@example.com', confirmationUrl: 'https://www.bitwellforge.com/account?test=1', oldEmail: 'old@example.com', email: 'new@example.com', newEmail: 'new@example.com', token: '123456' }
const emails = [SignupEmail, InviteEmail, MagicLinkEmail, RecoveryEmail, EmailChangeEmail, ReauthenticationEmail, ...Object.values(TEMPLATES).map(t => t.component)]

Deno.test('All eight emails have one official top image and consistent typography', async () => {
  await Deno.mkdir('/tmp/browser/email-branding', { recursive: true })
  for (const [i, component] of emails.entries()) {
    const html = await renderAsync(React.createElement(component, { ...props, name: 'Alex Morgan', roleTitle: 'Revenue Architect', email: 'candidate.with.a.long.address@example.com', summary: 'Application details', reference: 'abc123' }))
    check((html.match(/<img\s/g) || []).length === 1, `Email ${i}: duplicate/missing artwork`)
    check(html.includes(`src="${LIGHT_BRAND_URL}"`), `Email ${i}: missing light fallback`)
    check(html.includes(DARK_BRAND_URL), `Email ${i}: missing dark source`)
    check(html.indexOf('<img ') < html.indexOf('<h1'), `Email ${i}: image below heading`)
    check(!html.includes('55a90a9a') && !html.includes('Commercial Growth &amp; Revenue Infrastructure'), `Email ${i}: legacy branding`)
    check(html.includes('Montserrat') && html.includes('Cormorant Garamond'), `Email ${i}: fonts missing`)
    check(!html.includes('font-weight:bold') && !html.includes('font-family:Arial'), `Email ${i}: legacy primary font`)
    await Deno.writeTextFile(`/tmp/browser/email-branding/email-${i}.html`, html)
  }
})

Deno.test('Explicit email modes each produce exactly one matching original image', async () => {
  for (const mode of ['light', 'dark'] as const) {
    const html = await renderAsync(<BrandHeader mode={mode} />)
    check((html.match(/<img\s/g) || []).length === 1, 'Multiple images')
    check(html.includes(`src="${mode === 'dark' ? DARK_BRAND_URL : LIGHT_BRAND_URL}"`), 'Incorrect mode mapping')
    check(!html.includes('<source'), 'Explicit mode must not include alternate source')
  }
})