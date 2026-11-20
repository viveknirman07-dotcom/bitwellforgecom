import * as React from 'npm:react@18.3.1'
import type { TemplateEntry } from './registry.ts'
import { AUDIT_SITE, AuditEmail, P } from './audit-layout.tsx'

interface Props { name?: string; token?: string }
const Email = ({ name, token }: Props) => (
  <AuditEmail preview="Your business information has been received." title="Business Information Received"
    cta={[{ href: `${AUDIT_SITE}/audit/client?t=${token ?? ''}`, label: 'View Your Audit Status' }]}>
    <P>Dear {name?.trim() || 'Client'},</P>
    <P>Your business information has been successfully submitted.</P>
    <P>Our team will now review your business structure, commercial systems, acquisition processes and operational dependencies. Your complete deliverables will be prepared within 5–6 days.</P>
    <P>{'Your audit includes:\nComprehensive Revenue Infrastructure Audit Report\nExecutive Findings PDF\n90-Day Priority Roadmap\nFindings Presentation (45–60 minutes)'}</P>
    <P>Questions can be sent to support@bitwellforge.com.</P>
  </AuditEmail>
)
export const template = {
  component: Email,
  subject: 'Business Information Received | BitwellForge',
  displayName: 'Audit intake confirmation',
  previewData: { name: 'Alex Morgan', token: 'preview' },
} satisfies TemplateEntry
