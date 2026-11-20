import type * as React from 'npm:react@18.3.1'
import { template as careerApplication } from './career-application.tsx'
import { template as applicantConfirmation } from './applicant-confirmation.tsx'
import { template as contactInquiry } from './contact-inquiry.tsx'
import { template as contactConfirmation } from './contact-confirmation.tsx'
import { template as auditPaymentConfirmed } from './audit-payment-confirmed.tsx'
import { template as auditIntakeReceived } from './audit-intake-received.tsx'
import { template as auditIntakeInternal } from './audit-intake-internal.tsx'
import { template as auditDelivered } from './audit-delivered.tsx'
import { template as auditPresentationConfirmed } from './audit-presentation-confirmed.tsx'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'career-application': careerApplication,
  'applicant-confirmation': applicantConfirmation,
  'contact-inquiry': contactInquiry,
  'contact-confirmation': contactConfirmation,
  'audit-payment-confirmed': auditPaymentConfirmed,
  'audit-intake-received': auditIntakeReceived,
  'audit-intake-internal': auditIntakeInternal,
  'audit-delivered': auditDelivered,
  'audit-presentation-confirmed': auditPresentationConfirmed,
}
