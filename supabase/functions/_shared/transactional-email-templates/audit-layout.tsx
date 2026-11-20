import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import { BrandFooter, BrandHeader, BrandFonts, BODY_FONT, DISPLAY_FONT, NAVY } from '../email-brand.tsx'

export const AUDIT_SITE = 'https://www.bitwellforge.com'

export const AuditEmail = ({ preview, title, children, cta, internal }: {
  preview: string; title: string; children: React.ReactNode; cta?: { href: string; label: string }[]; internal?: boolean
}) => (
  <Html lang="en" dir="ltr">
    <Head><BrandFonts /></Head>
    <Preview>{preview}</Preview>
    <Body style={a.body}>
      <Container style={a.container}>
        <BrandHeader />
        <Section style={a.content}>
          <Heading style={a.h1}>{title}</Heading>
          {children}
          {cta?.map((c, i) => (
            <Section key={c.href} style={{ margin: '0 0 12px' }}>
              <Button href={c.href} style={i === 0 ? a.primary : a.secondary}>{c.label}</Button>
            </Section>
          ))}
          <BrandFooter kind={internal ? 'contact-internal' : 'contact'} />
        </Section>
      </Container>
    </Body>
  </Html>
)

export const P = ({ children }: { children: React.ReactNode }) => <Text style={a.text}>{children}</Text>
export const Label = ({ children }: { children: React.ReactNode }) => <Text style={a.label}>{children}</Text>

const btn = { fontFamily: BODY_FONT, fontSize: '13px', fontWeight: 600, lineHeight: '20px', padding: '14px 18px', borderRadius: '4px', textAlign: 'center' as const, textDecoration: 'none', boxSizing: 'border-box' as const, display: 'block' as const }
const a = {
  body: { backgroundColor: '#ffffff', margin: '0', color: NAVY, fontFamily: BODY_FONT },
  container: { width: '100%', maxWidth: '600px', margin: '24px auto' },
  content: { padding: '28px 24px' },
  h1: { fontFamily: DISPLAY_FONT, fontSize: '30px', fontWeight: 400, lineHeight: '36px', color: NAVY, margin: '0 0 28px' },
  text: { fontFamily: BODY_FONT, fontWeight: 400, fontSize: '14px', lineHeight: '24px', margin: '0 0 18px', color: NAVY, whiteSpace: 'pre-wrap' as const },
  label: { fontFamily: BODY_FONT, fontWeight: 500, fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: NAVY, margin: '0 0 4px' },
  primary: { ...btn, backgroundColor: NAVY, color: '#ffffff', border: `1px solid ${NAVY}` },
  secondary: { ...btn, backgroundColor: '#ffffff', color: NAVY, border: `1px solid ${NAVY}` },
}
