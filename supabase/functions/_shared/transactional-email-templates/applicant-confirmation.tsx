import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

export const WEBSITE_URL = 'https://bitwellforge.com'
export const LINKEDIN_URL = 'https://www.linkedin.com/company/bitwellforge/'

interface Props { name?: string; roleTitle?: string }

const Email = ({ name, roleTitle }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your application has been received by BitwellForge Careers.</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <Section style={styles.brandBand}><Text style={styles.brand}>BitwellForge</Text></Section>
        <Section style={styles.content}>
          <Heading style={styles.heading}>APPLICATION RECEIVED</Heading>
          <Text style={styles.text}>Dear {name?.trim() || 'Applicant'},</Text>
          <Text style={styles.text}>Thank you for your interest in BitwellForge.</Text>
          <Text style={styles.text}>We are writing to confirm that your application for the position of {roleTitle?.trim() || 'your selected position'} has been successfully received.</Text>
          <Text style={styles.text}>Our team will carefully review your application. If your profile is shortlisted, you can expect to hear from us by email within 3–5 business days.</Text>
          <Text style={styles.text}>Please note that this confirmation acknowledges receipt of your application and does not guarantee shortlisting or selection.</Text>
          <Text style={styles.text}>Thank you for taking the time to apply to BitwellForge.</Text>
          <Text style={styles.text}>We appreciate your interest in being part of our work.</Text>
          <Text style={styles.text}>Regards,<br />BitwellForge Careers</Text>
          <Section style={styles.actions}>
            <Section style={styles.action}><Button href={WEBSITE_URL} style={styles.primary}>Visit Our Website</Button></Section>
            <Section style={styles.action}><Button href={LINKEDIN_URL} style={styles.secondary}>Connect With Us on LinkedIn</Button></Section>
          </Section>
          <Hr style={styles.rule} />
          <Text style={styles.footerBrand}>BitwellForge</Text>
          <Text style={styles.footer}>Commercial Growth &amp; Revenue Infrastructure</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Application Received | BitwellForge Careers',
  displayName: 'Applicant receipt confirmation',
  previewData: { name: 'Alex Morgan', roleTitle: 'Associate, Account Intelligence & C-Suite Origination' },
} satisfies TemplateEntry

const navy = '#020E45'
const bodyFont = "'Montserrat', Arial, sans-serif"
const displayFont = "'Cormorant Garamond', Georgia, serif"
const baseButton = { fontFamily: bodyFont, fontSize: '13px', fontWeight: 600, lineHeight: '20px', padding: '14px 18px', borderRadius: '4px', textAlign: 'center' as const, textDecoration: 'none', boxSizing: 'border-box' as const, display: 'block' as const }
const styles = {
  body: { backgroundColor: '#ffffff', margin: '0', color: navy, fontFamily: bodyFont },
  container: { width: '100%', maxWidth: '600px', margin: '24px auto' },
  brandBand: { backgroundColor: '#CEE6F8', padding: '24px' },
  brand: { fontFamily: displayFont, fontSize: '28px', fontWeight: 600, color: navy, margin: '0', lineHeight: '34px' },
  content: { padding: '28px 24px' },
  heading: { fontFamily: displayFont, fontSize: '28px', fontWeight: 600, lineHeight: '34px', color: navy, margin: '0 0 28px' },
  text: { fontSize: '14px', lineHeight: '24px', margin: '0 0 20px', color: navy },
  actions: { padding: '8px 0 12px' },
  action: { margin: '0 0 12px' },
  primary: { ...baseButton, backgroundColor: navy, color: '#ffffff', border: `1px solid ${navy}` },
  secondary: { ...baseButton, backgroundColor: '#ffffff', color: navy, border: `1px solid ${navy}` },
  rule: { borderColor: '#DEE3EB', margin: '20px 0' },
  footerBrand: { fontFamily: displayFont, fontSize: '20px', fontWeight: 600, color: navy, margin: '0 0 4px' },
  footer: { fontSize: '11px', lineHeight: '18px', color: '#5B6478', margin: '0' },
}