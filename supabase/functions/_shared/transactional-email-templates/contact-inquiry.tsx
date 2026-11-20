import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Link, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import { BrandFooter, BrandHeader, BrandFonts, BODY_FONT, DISPLAY_FONT, NAVY } from '../email-brand.tsx'
import type { TemplateEntry } from './registry.ts'

interface Props { name?: string; email?: string; phone?: string; company?: string; service?: string; challenge?: string; reference?: string }

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Section style={{ margin: '0 0 16px' }}>
    <Text style={s.label}>{label}</Text>
    <Text style={s.value}>{children}</Text>
  </Section>
)

const Email = ({ name, email, phone, company, service, challenge, reference }: Props) => (
  <Html lang="en" dir="ltr">
    <Head><BrandFonts /></Head>
    <Preview>{`New enquiry from ${name ?? 'a visitor'}`}</Preview>
    <Body style={s.body}>
      <Container style={s.container}>
        <BrandHeader />
        <Section style={s.content}>
          <Text style={s.label}>Contact Enquiry</Text>
          <Heading style={s.h1}>{service ?? 'General Inquiry'}</Heading>
          <Field label="Name">{name ?? 'Not provided'}</Field>
          <Field label="Email">{email ? <Link href={`mailto:${email}`} style={{ color: NAVY }}>{email}</Link> : 'Not provided'}</Field>
          <Field label="Phone">{phone ?? 'Not provided'}</Field>
          <Field label="Company">{company || 'Not provided'}</Field>
          <Field label="Current challenge">{challenge ?? 'Not provided'}</Field>
          {reference && <Text style={s.label}>Enquiry reference {reference}</Text>}
          <BrandFooter kind="contact-internal" />
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (d: Record<string, any>) => `[Contact Enquiry] ${d.service ?? 'General Inquiry'}, ${d.name ?? 'Visitor'}`,
  displayName: 'Contact enquiry notice',
  to: 'business@bitwellforge.com',
  previewData: { name: 'Alex Morgan', email: 'alex@example.com', phone: '+44 20 7946 0000', company: 'Morgan Advisory', service: 'General Inquiry', challenge: 'Pipeline depends on referrals.', reference: '00000000-0000-4000-8000-000000000000' },
} satisfies TemplateEntry

const s = {
  body: { backgroundColor: '#ffffff', margin: '0', color: NAVY, fontFamily: BODY_FONT },
  container: { width: '100%', maxWidth: '600px', margin: '24px auto' },
  content: { padding: '28px 24px' },
  h1: { fontFamily: DISPLAY_FONT, fontSize: '30px', fontWeight: 400, lineHeight: '36px', color: NAVY, margin: '0 0 24px' },
  label: { fontFamily: BODY_FONT, fontWeight: 500, fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: NAVY, margin: '0 0 4px' },
  value: { fontFamily: BODY_FONT, fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: NAVY, margin: '0', whiteSpace: 'pre-wrap' as const },
}
