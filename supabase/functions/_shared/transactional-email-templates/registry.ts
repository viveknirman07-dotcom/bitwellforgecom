import type * as React from 'npm:react@18.3.1'
import { template as careerApplication } from './career-application.tsx'
import { template as applicantConfirmation } from './applicant-confirmation.tsx'

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
}
