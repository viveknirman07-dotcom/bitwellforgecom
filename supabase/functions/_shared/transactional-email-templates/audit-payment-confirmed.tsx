import * as React from 'npm:react@18.3.1'
import type { TemplateEntry } from './registry.ts'
import { AUDIT_SITE, AuditEmail, P } from './audit-layout.tsx'

interface Props { name?: string; orderRef?: string; token?: string }
const Email = ({ name, orderRef, token }: Props) => (
  <AuditEmail preview="Your Revenue Infrastructure Audit is confirmed." title="Your Audit Is Confirmed"
    cta={[{ href: `${AUDIT_SITE}/audit/intake?t=${token ?? ''}`, label: 'Complete Your Business Information' }]}>
    <P>Dear {name?.trim() || 'Client'},</P>
    <P>We confirm receipt of your payment of $1,199 USD for the BitwellForge Revenue Infrastructure Audit.</P>
    <P>Order reference: {orderRef ?? 'Not available'}</P>
    <P>The next step is to provide the information required for your audit. Your complete deliverables will be provided within 5–6 days after we receive your completed intake form.</P>
  </AuditEmail>
)
export const template = {
  component: Email,
  subject: 'Your BitwellForge Revenue Infrastructure Audit Is Confirmed',
  displayName: 'Audit payment confirmation',
  previewData: { name: 'Alex Morgan', orderRef: 'BWF-7D3F1C2A', token: 'preview' },
} satisfies TemplateEntry
