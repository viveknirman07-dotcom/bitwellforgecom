import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import { BrandFooter, BrandHeader, BrandFonts, BODY_FONT, DISPLAY_FONT, NAVY } from '../email-brand.tsx'
import type { TemplateEntry } from './registry.ts'

interface Props { name?: string; service?: string }

const Email = ({ name, service }: Props) => (
  <Html lang="en" dir="ltr">
    <Head><BrandFonts /></Head>
    <Preview>Your enquiry has been received by BitwellForge.</Preview>
    <Body style={s.body}>
      <Container style={s.container}>
        <BrandHeader />
        <Section style={s.content}>
          <Heading style={s.h1}>ENQUIRY RECEIVED</Heading>
          <Text style={s.text}>Dear {name?.trim() || 'there'},</Text>
          <Text style={s.text}>Thank you for contacting BitwellForge. This confirms that your enquiry regarding {service?.trim() || 'our work'} has been received.</Text>
          <Text style={s.text}>A member of our team will review it and reply to you by email.</Text>
          <Text style={s.text}>Regards,<br />BitwellForge</Text>
          <BrandFooter kind="contact" />
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Enquiry Received | BitwellForge',
  displayName: 'Contact enquiry confirmation',
  previewData: { name: 'Alex Morgan', service: 'General Inquiry' },
} satisfies TemplateEntry

const s = {
  body: { backgroundColor: '#ffffff', margin: '0', color: NAVY, fontFamily: BODY_FONT },
  container: { width: '100%', maxWidth: '600px', margin: '24px auto' },
  content: { padding: '28px 24px' },
  h1: { fontFamily: DISPLAY_FONT, fontSize: '30px', fontWeight: 400, lineHeight: '36px', color: NAVY, margin: '0 0 28px' },
  text: { fontFamily: BODY_FONT, fontWeight: 400, fontSize: '14px', lineHeight: '24px', margin: '0 0 20px', color: NAVY },
}
