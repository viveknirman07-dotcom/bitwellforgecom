import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import { BrandFooter, BrandHeader, BrandFonts, BODY_FONT, DISPLAY_FONT } from '../email-brand.tsx'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  phone?: string
  company?: string
  service?: string
  challenge?: string
  reference?: string
}

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Section style={row}>
    <Text style={labelS}>{label}</Text>
    <Text style={value}>{children}</Text>
  </Section>
)

const Email = ({ name, email, phone, company, service, challenge, reference }: Props) => (
  <Html lang="en" dir="ltr">
    <Head><BrandFonts /></Head>
    <Preview>{`New enquiry: ${service ?? 'General Inquiry'} from ${name ?? 'a visitor'}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <BrandHeader />
        <Text style={eyebrow}>Website Enquiry</Text>
        <Heading style={h1}>{service ?? 'General Inquiry'}</Heading>
        <Row label="Name">{name ?? 'Not provided'}</Row>
        <Row label="Email">{email ? <Link href={`mailto:${email}`} style={link}>{email}</Link> : 'Not provided'}</Row>
        <Row label="Phone">{phone || 'Not provided'}</Row>
        <Row label="Company">{company || 'Not provided'}</Row>
        <Row label="Current challenge">{challenge || 'Not provided'}</Row>
        <Hr style={hr} />
        {reference && <Text style={foot}>Enquiry reference {reference}</Text>}
        <BrandFooter kind="inquiry-internal" />
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (d: Record<string, any>) => `[Website Enquiry] ${d.service ?? 'General Inquiry'}, ${d.name ?? 'Visitor'}`,
  displayName: 'Contact enquiry notice',
  to: 'business@bitwellforge.com',
  previewData: { name: 'Jane Doe', email: 'jane@example.com', phone: '+1 555 010 2233', company: 'Northwind Advisory', service: 'Commercial Growth Strategy', challenge: 'Pipeline has stalled despite strong referral work.', reference: 'abc123' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: BODY_FONT, fontWeight: 400 }
const container = { padding: '32px 28px', maxWidth: '620px' }
const eyebrow = { fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#5b6478', margin: '0 0 8px', fontFamily: BODY_FONT, fontWeight: 500 }
const h1 = { fontFamily: DISPLAY_FONT, fontWeight: 400, color: '#020E45', fontSize: '26px', margin: '0 0 24px' }
const row = { borderTop: '1px solid #e3e5eb', padding: '6px 0' }
const labelS = { fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#5b6478', margin: '6px 0 2px', fontFamily: BODY_FONT, fontWeight: 500 }
const value = { fontSize: '15px', color: '#020E45', margin: '0 0 6px', whiteSpace: 'pre-wrap' as const, overflowWrap: 'anywhere' as const, lineHeight: '24px', fontFamily: BODY_FONT, fontWeight: 400 }
const link = { color: '#1b3fa0' }
const hr = { borderColor: '#e3e5eb', margin: '24px 0 12px' }
const foot = { fontSize: '12px', color: '#8a90a0', fontFamily: BODY_FONT, fontWeight: 400 }
