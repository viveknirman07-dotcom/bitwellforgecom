import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'
import { BODY_FONT, BrandFonts, BrandFooter, BrandHeader, DISPLAY_FONT, NAVY } from '../email-brand.tsx'

export const WEBSITE_URL = 'https://bitwellforge.com'
export const LINKEDIN_URL = 'https://www.linkedin.com/company/bitwellforge/'

interface Props { name?: string; service?: string }

const Email = ({ name, service }: Props) => (
  <Html lang="en" dir="ltr">
    <Head><BrandFonts /></Head>
    <Preview>Your enquiry has been received by BitwellForge.</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <BrandHeader />
        <Section style={styles.content}>
          <Heading style={styles.heading}>ENQUIRY RECEIVED</Heading>
          <Text style={styles.text}>Dear {name?.trim() || 'there'},</Text>
          <Text style={styles.text}>Thank you for reaching out to BitwellForge.</Text>
          <Text style={styles.text}>We are writing to confirm that your enquiry regarding {service?.trim() || 'our work'} has been successfully received.</Text>
          <Text style={styles.text}>A member of our team will review your message and respond by email within 24 hours.</Text>
          <Text style={styles.text}>Regards,<br />BitwellForge</Text>
          <Section style={styles.actions}>
            <Section style={styles.action}><Button href={WEBSITE_URL} style={styles.primary}>Visit Our Website</Button></Section>
            <Section style={styles.action}><Button href={LINKEDIN_URL} style={styles.secondary}>Connect With Us on LinkedIn</Button></Section>
          </Section>
          <BrandFooter kind="inquiry" />
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Enquiry Received | BitwellForge',
  displayName: 'Contact receipt confirmation',
  previewData: { name: 'Alex Morgan', service: 'Commercial Growth Strategy' },
} satisfies TemplateEntry

const baseButton = { fontFamily: BODY_FONT, fontSize: '13px', fontWeight: 600, lineHeight: '20px', padding: '14px 18px', borderRadius: '4px', textAlign: 'center' as const, textDecoration: 'none', boxSizing: 'border-box' as const, display: 'block' as const }
const styles = {
  body: { backgroundColor: '#ffffff', margin: '0', color: NAVY, fontFamily: BODY_FONT },
  container: { width: '100%', maxWidth: '600px', margin: '24px auto' },
  content: { padding: '28px 24px' },
  heading: { fontFamily: DISPLAY_FONT, fontSize: '30px', fontWeight: 400, lineHeight: '36px', color: NAVY, margin: '0 0 28px' },
  text: { fontFamily: BODY_FONT, fontWeight: 400, fontSize: '14px', lineHeight: '24px', margin: '0 0 20px', color: NAVY },
  actions: { padding: '8px 0 12px' },
  action: { margin: '0 0 12px' },
  primary: { ...baseButton, backgroundColor: NAVY, color: '#ffffff', border: `1px solid ${NAVY}` },
  secondary: { ...baseButton, backgroundColor: '#ffffff', color: NAVY, border: `1px solid ${NAVY}` },
}
