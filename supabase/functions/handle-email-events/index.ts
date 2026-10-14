import { createEmailWebhookHandler } from 'npm:@lovable.dev/email-js@0.3.1'
import { createClient } from 'npm:@supabase/supabase-js@2'

const databaseUrl = Deno.env.get('SUPABASE_URL')
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

if (!databaseUrl || !serviceRoleKey) {
  throw new Error('Database configuration is missing')
}

const database = createClient(databaseUrl, serviceRoleKey)

type SuppressionReason = 'bounce' | 'complaint' | 'unsubscribe'
type SendLogStatus = 'bounced' | 'complained' | 'suppressed'

async function recordOutcome(
  event: { event_id: string; data: { recipient: string; message_id?: string } },
  reason: SuppressionReason,
  status: SendLogStatus,
  message: string,
) {
  const recipient = event.data.recipient.toLowerCase()
  const { error: suppressionError } = await database
    .from('suppressed_emails')
    .upsert({ email: recipient, reason, metadata: null }, { onConflict: 'email' })

  if (suppressionError) {
    console.error('Failed to record email outcome', {
      event_id: event.event_id,
      code: suppressionError.code,
      message: suppressionError.message,
    })
    throw suppressionError
  }

  const { error: logError } = await database.from('email_send_log').insert({
    message_id: event.data.message_id ?? null,
    template_name: 'system',
    recipient_email: recipient,
    status,
    error_message: message,
    metadata: null,
  })

  if (logError) {
    console.error('Failed to log email outcome', {
      event_id: event.event_id,
      code: logError.code,
      message: logError.message,
    })
    throw logError
  }
}

const handler = createEmailWebhookHandler({
  apiKey: Deno.env.get('LOVABLE_API_KEY')!,
  on: {
    'email.bounced': async (event) => {
      await recordOutcome(event, 'bounce', 'bounced', 'Permanent bounce — email address is invalid or rejected')
    },
    'email.complaint': async (event) => {
      await recordOutcome(event, 'complaint', 'complained', 'Spam complaint — recipient marked email as spam')
    },
    'email.unsubscribed': async (event) => {
      await recordOutcome(event, 'unsubscribe', 'suppressed', 'Recipient unsubscribed')
    },
  },
})

Deno.serve((req) => handler(req))
