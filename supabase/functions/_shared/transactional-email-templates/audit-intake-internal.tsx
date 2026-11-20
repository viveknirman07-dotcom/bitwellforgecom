import * as React from 'npm:react@18.3.1'
import type { TemplateEntry } from './registry.ts'
import { AUDIT_SITE, AuditEmail, Label, P } from './audit-layout.tsx'

interface Props { name?: string; company?: string; email?: string; orderRef?: string; submittedAt?: string; documents?: string[]; engagementId?: string }
const Email = ({ name, company, email, orderRef, submittedAt, documents, engagementId }: Props) => (
  <AuditEmail internal preview={`Audit intake received from ${company ?? name ?? 'a client'}`} title="Audit Intake Received"
    cta={[{ href: `${AUDIT_SITE}/audit/admin?id=${engagementId ?? ''}`, label: 'Open Client Record' }]}>
    <Label>Client</Label><P>{name ?? 'Not provided'}</P>
    <Label>Company</Label><P>{company ?? 'Not provided'}</P>
    <Label>Email</Label><P>{email ?? 'Not provided'}</P>
    <Label>Order reference</Label><P>{orderRef ?? 'Not available'}</P>
    <Label>Payment status</Label><P>Paid, verified</P>
    <Label>Submitted</Label><P>{submittedAt ?? 'Not available'}</P>
    <Label>Documents</Label><P>{documents?.length ? documents.join('\n') : 'None uploaded'}</P>
  </AuditEmail>
)
export const template = {
  component: Email,
  subject: (d: Record<string, any>) => `[Audit Intake] ${d.company ?? d.name ?? 'Client'}`,
  displayName: 'Audit intake internal notice',
  to: 'business@bitwellforge.com',
  previewData: { name: 'Alex Morgan', company: 'Morgan Advisory', email: 'alex@example.com', orderRef: 'BWF-7D3F1C2A', submittedAt: '20 Nov 2026, 17:30 UTC', documents: ['revenue-2026.pdf'], engagementId: 'preview' },
} satisfies TemplateEntry
