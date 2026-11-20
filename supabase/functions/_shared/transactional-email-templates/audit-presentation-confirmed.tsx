import * as React from 'npm:react@18.3.1'
import type { TemplateEntry } from './registry.ts'
import { AuditEmail, Label, P } from './audit-layout.tsx'

interface Props { name?: string; when?: string; meetingUrl?: string; calendarUrl?: string; bookingUrl?: string }
const Email = ({ name, when, meetingUrl, calendarUrl, bookingUrl }: Props) => (
  <AuditEmail preview="Your findings presentation is confirmed." title="Findings Presentation Confirmed"
    cta={[...(meetingUrl ? [{ href: meetingUrl, label: 'Join the Meeting' }] : []), ...(calendarUrl ? [{ href: calendarUrl, label: 'Add to Calendar' }] : [])]}>
    <P>Dear {name?.trim() || 'Client'},</P>
    <Label>Date and time</Label><P>{when ?? 'To be confirmed'}</P>
    <Label>Duration</Label><P>45–60 minutes</P>
    <Label>Meeting link</Label><P>{meetingUrl ?? 'To be confirmed'}</P>
    <Label>Agenda</Label>
    <P>{'Most important findings\nTheir commercial implications\nRecommended order of priorities\nQuestions and next steps'}</P>
    {bookingUrl && <P>{`Need a different time? Reschedule here: ${bookingUrl}`}</P>}
  </AuditEmail>
)
export const template = {
  component: Email,
  subject: 'Findings Presentation Confirmed | BitwellForge',
  displayName: 'Audit presentation confirmation',
  previewData: { name: 'Alex Morgan', when: 'Tuesday, 1 December 2026, 15:00 UTC', meetingUrl: 'https://meet.google.com/abc-defg-hij' },
} satisfies TemplateEntry
