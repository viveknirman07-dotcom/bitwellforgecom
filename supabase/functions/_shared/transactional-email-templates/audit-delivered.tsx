import * as React from 'npm:react@18.3.1'
import type { TemplateEntry } from './registry.ts'
import { AUDIT_SITE, AuditEmail, P } from './audit-layout.tsx'

interface Props { name?: string; token?: string; bookingUrl?: string }
const Email = ({ name, token, bookingUrl }: Props) => {
  const portal = `${AUDIT_SITE}/audit/client?t=${token ?? ''}`
  return (
    <AuditEmail preview="Your audit deliverables are ready." title="Your Audit Deliverables"
      cta={[{ href: portal, label: 'Open Your Deliverables' }, ...(bookingUrl ? [{ href: bookingUrl, label: 'Schedule Your Findings Presentation' }] : [])]}>
      <P>Dear {name?.trim() || 'Client'},</P>
      <P>Your Revenue Infrastructure Audit is complete. Your private client page holds secure download links for the Complete Audit Report, the Executive Findings PDF and the 90-Day Priority Roadmap.</P>
      <P>{bookingUrl ? 'Please choose a time for your 45–60-minute findings presentation using the scheduling link below.' : 'We will contact you shortly to arrange your 45–60-minute findings presentation.'}</P>
    </AuditEmail>
  )
}
export const template = {
  component: Email,
  subject: 'Your Revenue Infrastructure Audit Deliverables | BitwellForge',
  displayName: 'Audit delivery',
  previewData: { name: 'Alex Morgan', token: 'preview', bookingUrl: 'https://cal.com/bitwellforge/findings' },
} satisfies TemplateEntry
