import * as React from 'npm:react@18.3.1'
import { Hr, Img, Link, Section, Text } from 'npm:@react-email/components@0.0.22'

// Shared BitwellForge email identity: one visual strip and one footer used by every email.
export const NAVY = '#020E45'
export const MUTED = '#5B6478'
export const BODY_FONT = "'Montserrat', 'Helvetica Neue', Arial, sans-serif"
export const DISPLAY_FONT = "'Cormorant Garamond', Georgia, 'Times New Roman', serif"
export const FONT_LINK = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&family=Montserrat:wght@400;500;600&display=swap'
export const SITE = 'https://www.bitwellforge.com'
export const PRIVACY_URL = `${SITE}/privacy`
export const STRIP_URL = `${SITE}/__l5e/assets-v1/55a90a9a-68b4-484c-b7b9-dceb42f580fa/bitwellforge-email-strip.jpg`

export const BrandFonts = () => <link href={FONT_LINK} rel="stylesheet" />

export const Wordmark = ({ size = 28 }: { size?: number }) => (
  <Text style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: `${size}px`, lineHeight: `${size + 6}px`, color: NAVY, margin: '0' }}>BitwellForge</Text>
)

/** Decorative halftone strip; empty alt so blocked images leave nothing confusing behind. */
export const BrandStrip = () => (
  <Section style={{ backgroundColor: '#3322D6', lineHeight: '0', fontSize: '0' }}>
    <Img src={STRIP_URL} width="600" height="150" alt="" style={{ display: 'block', width: '100%', maxWidth: '600px', height: 'auto', border: '0' }} />
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
    <Wordmark size={20} />
    <Text style={{ fontFamily: BODY_FONT, fontWeight: 400, fontSize: '11px', lineHeight: '18px', color: MUTED, margin: '4px 0 0' }}>Commercial Growth &amp; Revenue Infrastructure</Text>
  </Section>
)
