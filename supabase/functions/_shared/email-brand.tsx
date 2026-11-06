import * as React from 'npm:react@18.3.1'
import { Hr, Img, Link, Section, Text } from 'npm:@react-email/components@0.0.22'

// Shared email-only identity. A single image with a safe light fallback.
export const NAVY = '#020E45'
export const MUTED = '#5B6478'
export const BODY_FONT = "'Montserrat', 'Helvetica Neue', Arial, sans-serif"
export const DISPLAY_FONT = "'Cormorant Garamond', Georgia, 'Times New Roman', serif"
export const FONT_LINK = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400&family=Montserrat:wght@400;500;600&display=swap'
export const SITE = 'https://www.bitwellforge.com'
export const PRIVACY_URL = `${SITE}/privacy`
export const LIGHT_BRAND_URL = `${SITE}/__l5e/assets-v1/27299fd3-4e36-4519-9c2b-6488259c72f1/bitwellforge-brand-light.jpeg`
export const DARK_BRAND_URL = `${SITE}/__l5e/assets-v1/71f260f8-e772-49c2-85d0-4a81664f2881/bitwellforge-brand-dark.jpeg`

export const BrandFonts = () => <link href={FONT_LINK} rel="stylesheet" />

/** Clients supporting picture/media select dark; clients stripping it retain one light img. */
export const BrandHeader = ({ mode = 'auto' }: { mode?: 'auto' | 'light' | 'dark' }) => (
  <Section style={{ margin: '0 0 24px', lineHeight: '0', fontSize: '0' }}>
    <picture>
      {mode === 'auto' && <source media="(prefers-color-scheme: dark)" srcSet={DARK_BRAND_URL} type="image/jpeg" />}
      <Img src={mode === 'dark' ? DARK_BRAND_URL : LIGHT_BRAND_URL} width="600" alt="BitwellForge | The business of better." style={{ display: 'block', width: '100%', maxWidth: '600px', height: 'auto', border: '0' }} />
    </picture>
  </Section>
)

export type FooterKind = 'recruitment' | 'internal' | 'account'

const COPY: Record<FooterKind, string> = {
  recruitment: 'You are receiving this email because you submitted an application to BitwellForge. This message confirms receipt of your application and relates to the recruitment process. For information about how we handle personal data, please read our Privacy Policy.',
  internal: 'This is an internal recruitment notice generated when a candidate submits an application through the BitwellForge Careers page. Candidate data is handled under our Privacy Policy.',
  account: 'You are receiving this email because an action was requested on your BitwellForge account. It is a service message related to account access. For information about how we handle personal data, please read our Privacy Policy.',
}

const CONTACT: Record<FooterKind, string> = {
  recruitment: 'careers@bitwellforge.com',
  internal: 'careers@bitwellforge.com',
  account: 'support@bitwellforge.com',
}

/** Standardized privacy and contact footer. Email preference links are appended automatically by the email service where applicable. */
export const BrandFooter = ({ kind }: { kind: FooterKind }) => (
  <Section style={{ paddingTop: '8px' }}>
    <Hr style={{ borderColor: '#DEE3EB', margin: '24px 0 18px' }} />
    <Text style={{ fontFamily: BODY_FONT, fontWeight: 500, fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: MUTED, margin: '0 0 8px' }}>About this email</Text>
    <Text style={{ fontFamily: BODY_FONT, fontWeight: 400, fontSize: '11px', lineHeight: '18px', color: MUTED, margin: '0 0 12px' }}>{COPY[kind]}</Text>
    <Text style={{ fontFamily: BODY_FONT, fontWeight: 500, fontSize: '11px', lineHeight: '18px', margin: '0 0 18px' }}>
      <Link href={PRIVACY_URL} style={{ color: NAVY, textDecoration: 'underline' }}>Privacy Policy</Link>
      <span style={{ color: '#B8BECB' }}>{'   /   '}</span>
      <Link href={`mailto:${CONTACT[kind]}`} style={{ color: NAVY, textDecoration: 'underline' }}>Contact Us</Link>
    </Text>
  </Section>
)
