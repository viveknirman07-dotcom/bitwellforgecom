import { createOpenAI } from 'npm:@ai-sdk/openai'
import { streamText, Output, NoObjectGeneratedError } from 'npm:ai'
import { z } from 'npm:zod'
import { createLovableAiGatewayRunIdFetch, getLovableAiGatewayRunId } from '../_shared/run-id.ts'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Expose-Headers': 'X-Lovable-AIG-Run-ID',
}
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } })

const schema = z.object({
  headline: z.string(),
  summary: z.string(),
  constraints: z.array(z.object({ title: z.string(), explanation: z.string() })),
  focusAreas: z.array(z.object({ area: z.string(), why: z.string(), firstMove: z.string() })),
  question: z.string(),
})

const SERVICE_AREAS = `BitwellForge practice areas (use these exact names for every focus area "area" field):
Commercial Growth Strategy: acquisition system diagnostic, revenue attribution mapping, competitive positioning analysis, channel prioritisation, quarterly milestone architecture, cross functional alignment.
High Ticket Revenue Systems: lead qualification scoring, structured discovery methodology, proposal architecture, follow up cadence with timing logic, objection handling frameworks, pipeline velocity tracking.
Performance Growth: multi touch attribution, statistically valid creative testing, landing page optimisation, marginal return budget allocation, revenue focused reporting, cross channel data integration.
Client Acquisition Architecture: ICP development with behavioural criteria, multi channel outbound sequences, inbound content architecture, lead scoring and routing, nurture for not yet ready prospects, coverage modelling.
Market Authority Positioning: founder positioning aligned to commercial outcomes, content pillar architecture, engagement protocols, sustainable production systems, analytics tied to pipeline, executive team coordination.
AI Powered Revenue Operations: CRM and pipeline automation, workflow orchestration, data hygiene, operational reporting, handoff design between sales and delivery.
Search & Digital Visibility: technical search foundations, search intent content architecture, authority building, local and category visibility, conversion of organic traffic.
Digital Product Commercialization: offer and pricing architecture for digital products, launch systems, productised services, recurring revenue design.`

const instructions = `You are a senior advisor at BitwellForge, a revenue infrastructure consultancy for agencies, consultancies, coaches and B2B service businesses. Diagnose the structural constraints behind the described growth challenge across strategy, acquisition, operations and digital execution. Begin with the commercial problem, never a predetermined intervention.

${SERVICE_AREAS}

Each of the 3 focus areas must be one distinct BitwellForge practice area named exactly as above, chosen because it addresses a diagnosed constraint. Each firstMove must be a concrete first step drawn from that practice area's listed work (for example "Run an acquisition system diagnostic across your three current channels"), tailored to the client's situation. Tone: precise, quietly confident, evidence led, no buzzwords, no sales language. Never use dashes, hyphens as punctuation or bullet characters in any text. Return a short headline (max 10 words), a summary of 2 to 3 sentences, exactly 3 constraints (each explanation 1 to 2 sentences), exactly 3 focus areas ranked by priority (why and firstMove each one sentence), and one probing question the client should answer next. Base everything only on what the client describes; state assumptions plainly.`

const clean = (s: string) => s.replace(/\s[\u2013\u2014-]\s/g, ', ').replace(/[\u2013\u2014]/g, ', ').trim()

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  const apiKey = Deno.env.get('LOVABLE_API_KEY')
  if (!apiKey) return json({ error: 'The diagnosis service is not configured.' }, 500)

  let body: Record<string, unknown>
  try { body = await req.json() } catch { return json({ error: 'Invalid request.' }, 400) }
  const s = (k: string, max: number) => String(body[k] ?? '').trim().slice(0, max)
  const challenge = s('challenge', 4000)
  if (challenge.length < 40) return json({ error: 'Please describe your challenge in a little more detail.' }, 400)
  const context = [
    `Business type: ${s('businessType', 120) || 'not stated'}`,
    `Team size: ${s('teamSize', 60) || 'not stated'}`,
    `Annual revenue: ${s('revenue', 60) || 'not stated'}`,
    `Challenge: ${challenge}`,
  ].join('\n')

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(req))
  const provider = createOpenAI({
    baseURL: 'https://ai.gateway.lovable.dev/v1',
    apiKey,
    headers: { 'Lovable-API-Key': apiKey, 'X-Lovable-AIG-SDK': 'vercel-ai-sdk' },
    fetch: runIdFetch.fetch,
  })

  try {
    const result = streamText({
      model: provider.responses('openai/gpt-6-astra'),
      system: instructions,
      messages: [{ role: 'user', content: context }],
      output: Output.object({ schema }),
      abortSignal: req.signal,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: 'low',
          reasoningSummary: 'auto',
          store: false,
          include: ['reasoning.encrypted_content'],
        },
      },
    })
    let out: z.infer<typeof schema>
    try {
      out = await result.output
    } catch (e) {
      if (NoObjectGeneratedError.isInstance(e) && e.text) {
        try { out = schema.parse(JSON.parse(e.text)) } catch { return json({ error: 'The diagnosis could not be completed. Please try again.' }, 502) }
      } else throw e
    }
    const diagnosis = {
      headline: clean(out.headline),
      summary: clean(out.summary),
      constraints: out.constraints.slice(0, 3).map((c) => ({ title: clean(c.title), explanation: clean(c.explanation) })),
      focusAreas: out.focusAreas.slice(0, 3).map((f) => ({ area: clean(f.area).replace(/^\d+[.)]\s*/, ""), why: clean(f.why), firstMove: clean(f.firstMove) })),
      question: clean(out.question),
    }
    return json({ diagnosis })
  } catch (e) {
    if (req.signal.aborted) return json({ error: 'Cancelled' }, 499)
    const status = (e as { statusCode?: number })?.statusCode ?? 500
    const msg = status === 429 ? 'Demand is high right now. Please try again in a minute.'
      : status === 402 ? 'The diagnosis service is temporarily unavailable.'
      : 'The diagnosis could not be completed. Please try again.'
    console.error('growth-diagnosis error', status, (e as Error)?.message)
    return json({ error: msg }, status >= 400 && status < 600 ? status : 500)
  }
})
