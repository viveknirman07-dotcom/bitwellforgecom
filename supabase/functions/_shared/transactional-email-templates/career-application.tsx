import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  roleTitle?: string
  name?: string
  email?: string
  linkedin?: string
  audio?: string
  resumeLink?: string
  summary?: string
  reference?: string
}

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Section style={row}>
    <Text style={labelS}>{label}</Text>
    <Text style={value}>{children}</Text>
  </Section>
)

const Email = ({ roleTitle, name, email, linkedin, audio, resumeLink, summary, reference }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{`New candidacy: ${roleTitle ?? 'Mandate'} from ${name ?? 'a candidate'}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>Candidacy Submission</Text>
        <Heading style={h1}>{roleTitle ?? 'Mandate'}</Heading>
        <Row label="Candidate">{name ?? 'Not provided'}</Row>
        <Row label="Email">{email ? <Link href={`mailto:${email}`} style={link}>{email}</Link> : 'Not provided'}</Row>
        <Row label="LinkedIn">{linkedin ? <Link href={linkedin} style={link}>{linkedin}</Link> : 'Not provided'}</Row>
        <Row label="Audio brief">{audio ? <Link href={audio} style={link}>{audio}</Link> : 'Not provided'}</Row>
        <Row label="Resume">{resumeLink ? <><Link href={resumeLink} style={link}>Download PDF</Link> (link valid 30 days)</> : 'Not provided'}</Row>
        <Row label="Summary">{summary || 'Not provided'}</Row>
        <Hr style={hr} />
        <Text style={foot}>BitwellForge Careers{reference ? `, reference ${reference}` : ''}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (d: Record<string, any>) => `[Candidacy Submission] ${d.roleTitle ?? 'Mandate'}, ${d.name ?? 'Candidate'}`,
  displayName: 'Careers application notice',
  to: 'careers@bitwellforge.com',
  previewData: { roleTitle: 'Associate, Account Intelligence', name: 'Jane Doe', email: 'jane@example.com', linkedin: 'https://linkedin.com/in/janedoe', summary: 'Ten years in B2B advisory.', reference: 'abc123' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, serif' }
const container = { padding: '32px 28px', maxWidth: '620px' }
const eyebrow = { fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#5b6478', margin: '0 0 8px', fontFamily: 'Arial, sans-serif' }
const h1 = { fontWeight: 400, color: '#020E45', fontSize: '26px', margin: '0 0 24px' }
const row = { borderTop: '1px solid #e3e5eb', padding: '6px 0' }
const labelS = { fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#5b6478', margin: '6px 0 2px', fontFamily: 'Arial, sans-serif' }
const value = { fontSize: '15px', color: '#020E45', margin: '0 0 6px', whiteSpace: 'pre-wrap' as const, fontFamily: 'Arial, sans-serif' }
const link = { color: '#1b3fa0' }
const hr = { borderColor: '#e3e5eb', margin: '24px 0 12px' }
const foot = { fontSize: '12px', color: '#8a90a0', fontFamily: 'Arial, sans-serif' }
