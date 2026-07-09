/**
 * Service detail content.
 * Written as a strategic briefing, not a service brochure.
 * Tone: senior consultant. No hype. No marketing clichés.
 */

export type ServiceSlug =
  | "growth-strategy"
  | "sales-systems"
  | "performance-marketing"
  | "lead-generation"
  | "linkedin"
  | "ai-automation"
  | "seo"
  | "digital-products";

export interface ApproachStep {
  title: string;
  description: string;
}

export interface OutcomeItem {
  title: string;
  description: string;
}

export interface ServiceContent {
  title: string;
  subtitle: string;
  /** Executive briefing intro. 2–3 short paragraphs that establish the capability as infrastructure. */
  briefing: string[];
  problem: string[];
  strategy: string[];
  approach: ApproachStep[];
  failures: string[];
  inPractice: string[];
  outcomes: OutcomeItem[];
  idealFor: string[];
  contactService: string;
}

const defaultIdealFor = [
  "Agencies",
  "Consultants",
  "Advisory Firms",
  "Executive-Led Brands",
  "B2B Service Businesses",
];

export const serviceData: Record<ServiceSlug, ServiceContent> = {
  /* ─────────────────────────────────────────── */
  "growth-strategy": {
    title: "Commercial Growth Strategy",
    subtitle:
      "A structural blueprint for commercial expansion — positioning, market entry, and growth architecture engineered to compound across every subsequent investment.",
    briefing: [
      "Growth strategy is the operating layer that determines whether every other investment compounds or dissipates. It defines what the business is acquiring, from whom, through which channels, at what economics, and against which competitive position. Without it, marketing spend, sales hires, and tooling decisions all default to instinct.",
      "Most businesses do not have a growth strategy. They have a collection of tactics inherited from previous quarters, previous agencies, and previous priorities. The result is a portfolio of activities that cannot be evaluated against a coherent thesis.",
      "When the strategy is engineered correctly, it functions as the reference architecture for every commercial decision the business makes for the next four to six quarters.",
    ],
    problem: [
      "The visible symptom is inconsistent revenue. The underlying cause is structural. Channels operate as independent disciplines instead of components of a single acquisition system. Messaging shifts depending on which team produced it. Attribution is fragmented across tools that were never integrated. Forecasts are built on activity metrics rather than economic ones.",
      "Most operators misdiagnose this as a tactical problem. They hire another performance marketer, change agencies, or rebuild the website. None of these address the root issue, which is the absence of a thesis that defines what the business is actually trying to do commercially.",
      "The downstream cost is significant. Capital is allocated to channels without knowing their marginal return. Sales teams chase leads from sources they cannot influence. Leadership cannot answer basic questions about why growth happened, or why it stopped.",
    ],
    strategy: [
      "Growth Strategy is built on the principle that infrastructure outperforms intensity. A clearly articulated thesis, defended with data and instrumented with measurement, will produce more compounding returns than any individual tactic executed in isolation.",
      "The work begins with diagnosis, not ideation. The current acquisition system is mapped end to end. Every channel, conversion path, and revenue source is evaluated against the business model it is supposed to serve. Structural gaps are documented before any new activity is proposed.",
      "The resulting strategy is not a marketing plan. It is the commercial reference architecture the business will operate against. Every subsequent decision, from creative direction to sales scripts to budget allocation, is evaluated against that architecture.",
    ],
    approach: [
      {
        title: "Acquisition system diagnostic",
        description:
          "A full-spectrum audit of every channel, touchpoint, and conversion path the business currently operates. The objective is not to evaluate quality but to surface structural relationships between activities and outcomes. Without this, every subsequent decision is built on assumption.",
      },
      {
        title: "Revenue attribution mapping",
        description:
          "Activity is reconnected to economic outcomes. Sources are de-duplicated, attribution windows are normalised, and revenue is traced backward through the system. This produces the first clear answer to where revenue is actually coming from, which is rarely where the business assumed it was.",
      },
      {
        title: "Competitive positioning analysis",
        description:
          "The market is examined for structural advantages, not surface differentiation. Where competitors are over-invested, under-invested, vulnerable, or defended is mapped. Positioning is anchored to a defensible commercial reality rather than to language choices.",
      },
      {
        title: "Channel prioritisation framework",
        description:
          "Channels are ranked by marginal economic return, not by familiarity or trend. The framework specifies which channels receive investment, which receive maintenance, and which are paused. This eliminates the most common source of waste, which is uniform investment across channels of unequal value.",
      },
      {
        title: "Quarterly milestone architecture",
        description:
          "The strategy is decomposed into measurable benchmarks across a four-to-six-quarter horizon. Leading indicators are defined for each, so the business knows whether the strategy is working long before the lagging revenue numbers confirm it.",
      },
      {
        title: "Cross-functional alignment",
        description:
          "Sales, marketing, operations, and leadership are aligned to the same definitions, the same priorities, and the same measurement system. Without this, the strategy decays within a quarter because each function continues to optimise for its own previous metrics.",
      },
    ],
    failures: [
      "Treating growth as a marketing function rather than a commercial system that spans marketing, sales, product, and operations.",
      "Optimising channels in isolation before establishing whether the channel mix itself is correct.",
      "Confusing volume of activity with quality of strategy, leading to teams that are busy but not productive.",
      "Defaulting to tactics that worked at a previous stage of the business, long after the conditions that made them effective have changed.",
      "Treating attribution as a reporting problem instead of a strategic one, which leaves capital allocation decisions running on guesswork.",
    ],
    inPractice: [
      "The strategy lives as a working document, not a slide deck. Leadership references it in capital allocation meetings, hiring decisions, and quarterly planning.",
      "Channel owners operate against a defined thesis for their channel, with explicit leading indicators they report against. Discussions move from opinion to evidence.",
      "Quarterly reviews evaluate the strategy itself, not just the execution of it. When the data contradicts the thesis, the thesis is revised. When the data confirms it, investment is increased.",
      "New initiatives are evaluated against the architecture before they are approved. Activities that do not strengthen the system are declined, regardless of how attractive they appear in isolation.",
    ],
    outcomes: [
      {
        title: "A single coherent growth thesis",
        description:
          "The business operates against one defensible strategy rather than a collection of inherited tactics. Leadership, sales, and marketing share the same commercial logic, which removes most of the friction that previously slowed decisions.",
      },
      {
        title: "Visibility into what actually drives revenue",
        description:
          "Attribution is repaired. The business knows which activities produce economic outcomes and which absorb capital without returning it. This single change typically reallocates significant budget within the first quarter.",
      },
      {
        title: "Reduced acquisition cost across the system",
        description:
          "When channels are prioritised by marginal return, the cost to acquire a customer declines structurally. The improvement is sustained because it comes from architecture, not from temporary optimisation.",
      },
      {
        title: "Predictable pipeline with leading indicators",
        description:
          "Forecasting moves from revenue projection to system performance. Leading indicators tell leadership whether the next two quarters will hit before they happen, which makes capital and hiring decisions defensible.",
      },
      {
        title: "A foundation that compounds quarter over quarter",
        description:
          "Because the strategy is structural rather than tactical, the gains accumulate. Each quarter strengthens the previous one instead of resetting it. This is the difference between a business that grows and a business that scales.",
      },
    ],
    idealFor: defaultIdealFor,
    contactService: "Commercial Growth Strategy",
  },

  /* ─────────────────────────────────────────── */
  "sales-systems": {
    title: "High-Ticket Sales Systems",
    subtitle:
      "Structured pipelines engineered for complex, high-value client acquisition without relying on personality or pressure.",
    briefing: [
      "High-ticket sales is the closing infrastructure of a service business. It is the system that converts strategic positioning and qualified demand into signed engagements at the prices the business actually wants to operate at.",
      "When this layer is engineered, deal economics, sales velocity, and forecasting all become structural properties of the business rather than functions of individual talent. When it is not, the business is permanently exposed to the people who happen to be selling well that quarter.",
      "The objective is to remove personality from the system without removing humanity from the conversation. A well-engineered sales system is more consultative, not less, because it frees the seller to focus on the buyer instead of remembering what to say next.",
    ],
    problem: [
      "Most high-ticket sales operations are not systems. They are aggregations of individual habits, formed over years, owned by a small number of senior people, and impossible to transfer. When those people leave, the pipeline leaves with them.",
      "The problem compounds because the visible metrics still look acceptable. Close rates appear normal because they are measured against the wrong denominator. Cycle times look reasonable because slow deals fall out of the pipeline before they are counted. Average deal value drifts down quietly as discounting becomes the default response to objections that the system was never designed to handle.",
      "The operational consequences are severe. Sales becomes the most expensive and least predictable function in the business. Hiring decisions are made under pressure because there is no scalable path to capacity. Forecasts are negotiated rather than calculated. Capital cannot be deployed against revenue that cannot be predicted.",
    ],
    strategy: [
      "A high-ticket sales system replaces individual judgement with shared infrastructure at every stage where consistency matters more than improvisation. Qualification, discovery, proposal architecture, follow-up, and pricing all become engineered components rather than personal preferences.",
      "The principle is that structure increases trust, not decreases it. Buyers in high-ticket categories are evaluating the seller's operation as much as the offer itself. A disciplined, transparent process is a credibility signal. An improvised one is a risk signal.",
      "When this is built correctly, the system becomes a coaching surface as well as an execution surface. Performance variance between sellers is no longer mysterious. The exact stage at which deals are lost is visible, attributable, and improvable.",
    ],
    approach: [
      {
        title: "Lead qualification scoring",
        description:
          "An explicit scoring framework defines which leads are pursued, which are nurtured, and which are declined. Without it, sellers default to availability and politeness, both of which destroy pipeline economics. Qualification is the first place margin is created or lost.",
      },
      {
        title: "Structured discovery methodology",
        description:
          "Discovery calls follow a defined diagnostic sequence designed to surface real buying signals rather than confirm prepared pitches. The objective is to disqualify aggressively and qualify deeply. Most deals are won or lost in discovery, not in the close.",
      },
      {
        title: "Proposal architecture",
        description:
          "Proposals are constructed against a template that controls scope, anchors price, and removes negotiating leverage from the wrong places. A proposal is not a document. It is a decision-making instrument designed to make approval the easiest available action.",
      },
      {
        title: "Follow-up cadence with timing logic",
        description:
          "Follow-up is the stage where most pipeline value is destroyed. A defined cadence with intent-based triggers eliminates the two failure modes that account for the majority of losses: silence and over-pursuit. The system maintains presence without applying pressure.",
      },
      {
        title: "Objection handling frameworks",
        description:
          "Objections are categorised and pre-engineered. Responses are anchored in evidence rather than persuasion. This converts the most fragile moment of the sale, where individual sellers usually improvise, into the most predictable one.",
      },
      {
        title: "Pipeline velocity tracking",
        description:
          "Stage-to-stage conversion, time-in-stage, and slippage are measured continuously. Bottlenecks become visible before they become structural. The pipeline stops being a sales artifact and becomes an operational system the entire business can plan against.",
      },
    ],
    failures: [
      "Hiring more sellers before the system that supports them exists, which guarantees the new hires reproduce the same inconsistent results.",
      "Treating top performers as a model rather than as a data source. Their behaviour is observed, not engineered, which means it cannot be transferred.",
      "Discounting as a default response to objections, which trains the market to negotiate and erodes the price the offer can command.",
      "Confusing CRM adoption with sales system maturity. A CRM with no underlying methodology is a database, not a system.",
      "Measuring activity instead of outcomes, which produces sellers who are busy with the wrong work and pipelines that look healthier than they are.",
    ],
    inPractice: [
      "Every deal moves through defined stages with explicit entry and exit criteria. A deal is in proposal because the qualification work supporting that stage was completed, not because the seller felt momentum.",
      "Sales reviews discuss the system, not the deal. Pattern analysis across the pipeline identifies what is improving and what is degrading. Individual deals are coached against the framework rather than against personal opinion.",
      "Forecasts are calculated from stage conversion rates and velocity, not from seller confidence. Leadership knows what the next quarter will produce, with stated tolerances, before the quarter begins.",
      "New sellers ramp against the same system the senior sellers operate. The variance between top and bottom performers narrows, because most of the previous variance was system absence rather than talent difference.",
    ],
    outcomes: [
      {
        title: "Close rates independent of individual talent",
        description:
          "Performance becomes a property of the system rather than the people. The business is no longer one resignation away from a pipeline crisis, and capacity decisions can be made on operational terms.",
      },
      {
        title: "Shortened sales cycles",
        description:
          "Structured qualification removes the deals that were never going to close, which is where most cycle-time damage occurs. The pipeline carries fewer deals but converts a higher percentage of them faster.",
      },
      {
        title: "Higher average deal value",
        description:
          "Proposal architecture and disciplined objection handling reduce discounting and increase scope confidence. Deal value rises without the offer itself changing.",
      },
      {
        title: "Reliable forecasting",
        description:
          "Forecasts become a calculation rather than a negotiation. Leadership can deploy capital, plan hiring, and make commitments against a number the business can defend.",
      },
      {
        title: "Sales operations that scale with the team",
        description:
          "The system absorbs new sellers without diluting performance. Growth in headcount produces proportional growth in capacity, which is the property that separates a sales team from a sales organisation.",
      },
    ],
    idealFor: defaultIdealFor,
    contactService: "High Ticket Sales Systems",
  },

  /* ─────────────────────────────────────────── */
  "performance-marketing": {
    title: "Performance Marketing Infrastructure",
    subtitle:
      "Precision campaigns designed for compounding returns, not vanity metrics.",
    briefing: [
      "Performance marketing is the most measurable layer of the acquisition system, which is also why it is the most frequently mis-operated. The discipline rewards businesses that have built the measurement, creative, and decision infrastructure underneath it, and quietly drains the ones that have not.",
      "The difference between a profitable paid programme and an expensive one is rarely the channel, the platform, or the creative. It is whether the business can attribute the spend correctly, decide against the attribution accurately, and improve the system continuously.",
      "When the infrastructure is engineered, paid acquisition becomes a controllable input. When it is not, it becomes a tax the business pays for not knowing what is working.",
    ],
    problem: [
      "Most paid programmes operate without a measurement foundation that can answer the only question that matters, which is whether the next dollar of spend will produce a return higher than the cost of capital. In the absence of that answer, decisions default to the platform's optimisation logic, which is not aligned with the business's economics.",
      "The visible failure is creative fatigue. The underlying failure is the absence of a testing framework that produces statistically valid signal at the cadence the business is iterating at. Without it, optimisation becomes opinion, and budget shifts respond to last week's noise rather than this quarter's pattern.",
      "The hidden cost is larger than the visible one. Capital is consumed by channels that look profitable in the platform dashboard but unprofitable in the business's actual unit economics. Multi-touch attribution is absent, so the credit goes to the last click, and the early-funnel work that produced the demand is defunded.",
    ],
    strategy: [
      "Performance Marketing Infrastructure is built before campaigns are launched, not after they have already failed. Attribution, conversion tracking, creative testing protocols, and reporting are engineered first, because every subsequent decision will depend on them.",
      "The principle is that paid acquisition is a measurement discipline before it is a creative one. Creative quality matters, but only inside a system that can tell the difference between a creative that worked and a creative that was lucky. Most programmes cannot.",
      "The objective is to produce a programme where every dollar spent generates two outputs: revenue and intelligence. The intelligence compounds. Within four to six months, the business is making decisions against a base of evidence that competitors without the infrastructure cannot replicate.",
    ],
    approach: [
      {
        title: "Multi-touch attribution model",
        description:
          "Attribution is reconstructed across all paid channels so the business can see how credit actually distributes across the customer journey. This is the prerequisite for every subsequent budget decision. Without it, the programme is optimising for the wrong objective.",
      },
      {
        title: "Statistically valid creative testing",
        description:
          "A testing framework defines sample sizes, test windows, and decision rules in advance. This eliminates the most common failure mode in paid acquisition, which is declaring winners and losers from noise.",
      },
      {
        title: "Landing page optimisation system",
        description:
          "Landing pages are treated as a controlled variable, not an afterthought. A structured A/B protocol isolates page-level performance from creative and audience effects, which is where most measurement errors compound.",
      },
      {
        title: "Marginal return budget allocation",
        description:
          "Budget is allocated against the marginal return of the next dollar, not the average return of the current spend. This is the single decision rule that separates programmes that scale from programmes that plateau.",
      },
      {
        title: "Revenue-focused reporting layer",
        description:
          "Dashboards are built around economic metrics rather than platform metrics. The business sees CAC, payback, contribution margin, and LTV, not impressions, CTR, and frequency. Reporting changes the conversation from activity to outcomes.",
      },
      {
        title: "Cross-channel data integration",
        description:
          "Channels are connected into a single measurement plane so the interactions between them are visible. This eliminates the most expensive mistake in performance marketing, which is over-crediting one channel and under-funding another that is doing the upstream work.",
      },
    ],
    failures: [
      "Optimising inside the platform dashboard, which is optimised for the platform's revenue, not the business's.",
      "Treating last-click attribution as fact, which systematically defunds the upper-funnel work that creates demand in the first place.",
      "Declaring creative winners from sample sizes that have no statistical validity, then scaling spend behind noise.",
      "Hiring a buyer before building the measurement infrastructure they need to operate, then evaluating them against numbers neither party can trust.",
      "Confusing channel diversification with channel competence, which produces a portfolio of underfunded programmes that all underperform.",
    ],
    inPractice: [
      "Weekly reviews evaluate marginal return by channel and creative cohort, not aggregate spend. Reallocation decisions are made against decision rules established before the data arrived.",
      "Creative production runs on a testing schedule, not a launch schedule. Each cohort is engineered to isolate a specific variable, which makes the learning portable across future cohorts.",
      "Reporting reaches leadership in economic units. The conversation in the business is about payback periods and contribution margin, not about platform metrics that have no bearing on capital allocation.",
      "When a channel hits the point of diminishing return, budget shifts. The decision is not contested because the framework that produced it was agreed in advance.",
    ],
    outcomes: [
      {
        title: "Clear visibility into true acquisition cost",
        description:
          "The business knows what it actually costs to acquire a customer, by channel and cohort, in units that match the way it accounts for revenue. Capital allocation decisions become defensible.",
      },
      {
        title: "Continuously improving creative performance",
        description:
          "Because testing is structured, learning compounds. Each cohort is more informed than the last, and creative performance improves as a property of the system rather than as a function of individual judgement.",
      },
      {
        title: "Reduced wasted spend",
        description:
          "Budget moves toward channels with positive marginal return and away from channels that have hit diminishing returns. The reallocation typically recovers significant spend within the first two cycles.",
      },
      {
        title: "Compounding returns from accumulated intelligence",
        description:
          "The measurement infrastructure produces a base of evidence that competitors operating without it cannot replicate. The advantage widens over time rather than narrowing.",
      },
      {
        title: "Spend tied directly to revenue outcomes",
        description:
          "Marketing investment is evaluated against the same economic metrics the rest of the business operates against. The discipline stops being a cost centre with vanity metrics and becomes a revenue function with defensible numbers.",
      },
    ],
    idealFor: defaultIdealFor,
    contactService: "Performance Marketing",
  },

  /* ─────────────────────────────────────────── */
  "lead-generation": {
    title: "B2B Lead Generation",
    subtitle:
      "Systematic engines for enterprise-grade demand generation combining outbound precision with inbound magnetism.",
    briefing: [
      "B2B lead generation is the demand layer of the revenue system. Its job is to deliver a continuous, qualified pipeline that the sales system can convert, at a cost and velocity the business can plan against.",
      "When this layer is engineered, pipeline coverage becomes a function of architecture rather than effort. When it is not, the business oscillates between feast and famine, and every quarter feels like it starts from zero.",
      "The objective is parallel acquisition. Outbound generates pipeline this quarter. Inbound compounds pipeline across the next twelve. Together they create coverage that is not exposed to any single channel, platform, or operator.",
    ],
    problem: [
      "Most B2B lead generation is single-engine. Either outbound is funded but inbound is neglected, in which case the business is permanently dependent on volume and burns through markets quickly. Or inbound is funded but outbound is absent, in which case the business is at the mercy of intent it does not control.",
      "The structural failure is treating the two as alternatives rather than as a system. Outbound and inbound are different mechanisms operating on the same underlying ICP. Run independently, they produce duplicated effort and conflicting signals. Run together, they produce coverage and intelligence.",
      "The downstream cost is operational rather than just commercial. Sales teams cannot plan capacity because pipeline is unpredictable. Marketing cannot allocate budget because attribution is contested. Leadership cannot forecast because the inputs are not reliable enough to defend.",
    ],
    strategy: [
      "B2B Lead Generation is built as two engines operating against one ICP definition, one measurement plane, and one routing system. Outbound carries the immediate quarter. Inbound builds the structural advantage. Both are instrumented so the business knows which is producing what, and why.",
      "The principle is that pipeline coverage is a coverage problem, not a channel problem. The objective is to ensure that no plausible failure of any single source can compromise the business's ability to fill its pipeline. That requires deliberate redundancy, not opportunistic experimentation.",
      "When the system is built correctly, the two engines reinforce each other. Inbound signal informs outbound targeting. Outbound conversations surface content gaps the inbound system fills. The compounding is structural, not coincidental.",
    ],
    approach: [
      {
        title: "ICP development with behavioural criteria",
        description:
          "The ideal client profile is defined in firmographic, behavioural, and economic terms, not just demographic ones. Without this, both engines target wide, convert poorly, and contaminate the data the system relies on to improve.",
      },
      {
        title: "Multi-channel outbound sequences",
        description:
          "Outbound is operated across email, LinkedIn, and targeted advertising as a coordinated sequence rather than three independent activities. The cadence is engineered for the buyer's evaluation rhythm, not for the seller's send schedule.",
      },
      {
        title: "Inbound content architecture",
        description:
          "Content is structured to attract specific buying signals rather than general traffic. Topics, formats, and distribution are aligned to the ICP's actual evaluation behaviour, which is the only metric that translates into pipeline.",
      },
      {
        title: "Lead scoring and routing",
        description:
          "Leads are scored against explicit criteria and routed to the right stage at the right velocity. Without this, high-intent leads age in queues and low-intent leads consume seller capacity. Routing is where most pipeline value is recovered.",
      },
      {
        title: "Nurture for not-yet-ready prospects",
        description:
          "Most leads are not ready to engage on first contact. A structured nurture programme maintains presence without applying pressure, so the business is the default option when the buyer becomes active.",
      },
      {
        title: "Coverage modelling",
        description:
          "Pipeline coverage is modelled forward against the revenue plan, not measured backward against the previous quarter. The system tells leadership in advance whether the next quarter will hit, which is the property that makes the engine planable.",
      },
    ],
    failures: [
      "Treating outbound and inbound as competing strategies rather than as complementary layers of one demand system.",
      "Building outbound at volume before the ICP is defined precisely enough to make the volume useful, which produces high activity and low conversion.",
      "Treating inbound as a content marketing programme rather than as a demand engineering programme, which produces traffic that does not become pipeline.",
      "Letting lead routing decay into queues that nobody owns, which is the most common single cause of pipeline value destruction.",
      "Evaluating the system on lead volume rather than on pipeline coverage, which rewards the wrong behaviour and obscures the actual health of the engine.",
    ],
    inPractice: [
      "Both engines operate against the same ICP definition, the same routing system, and the same measurement plane. Reviews evaluate them together because the business does not care which engine produced the pipeline, only that the pipeline exists.",
      "Outbound sequences run on disciplined cadences with stage exit criteria. Sellers are not deciding whether to send the next message; they are deciding which prospects to escalate based on signals the system surfaces.",
      "Inbound content production is scheduled against topic gaps revealed by outbound conversations and search data. Each content cohort is engineered to attract a defined buyer state, not generic interest.",
      "Coverage is reported forward. Leadership sees not just current pipeline, but the trajectory of the next two quarters, with the assumptions and tolerances stated openly.",
    ],
    outcomes: [
      {
        title: "Continuous pipeline of qualified prospects",
        description:
          "Pipeline coverage becomes a system property rather than a quarterly scramble. Sales operates against a predictable input, which makes capacity planning and forecasting defensible.",
      },
      {
        title: "Balanced acquisition across engines",
        description:
          "The business is no longer exposed to the failure of any single channel. Algorithm changes, market shifts, and operator turnover are absorbed by the redundancy in the system.",
      },
      {
        title: "Reduced dependency on individual sources",
        description:
          "When no single channel accounts for the majority of pipeline, negotiating power, cost structure, and resilience all improve simultaneously. This is the structural advantage of coverage.",
      },
      {
        title: "Quality maintained as volume increases",
        description:
          "Because scoring and routing are engineered first, scaling the engine does not degrade the quality of the leads that reach sales. Growth compounds instead of diluting.",
      },
      {
        title: "Predictable coverage with leading indicators",
        description:
          "Leadership knows whether the next quarter will hit before it begins. The conversation moves from chasing pipeline to managing the system that produces it.",
      },
    ],
    idealFor: [
      "Agencies",
      "Service Firms",
      "Consultants",
      "High-Ticket Operators",
      "B2B Service Businesses",
    ],
    contactService: "B2B Lead Generation",
  },

  /* ─────────────────────────────────────────── */
  "linkedin": {
    title: "LinkedIn Positioning",
    subtitle:
      "Authority-building frameworks for founders and executive teams that generate inbound opportunities through thought leadership.",
    briefing: [
      "LinkedIn positioning is the most underused asset on the balance sheet of most B2B businesses. The founder, the senior partners, and the executive team carry credibility that the company brand cannot replicate, and that credibility converts at rates no paid channel approaches.",
      "What is missing in most cases is not insight, presence, or willingness. It is the operating system that converts the credibility into consistent, compounding distribution. Without it, the asset depreciates quietly while the business spends elsewhere to produce the same outcomes less efficiently.",
      "The objective is not personal brand. It is structural inbound demand sourced from the people inside the business who already have the authority to produce it.",
    ],
    problem: [
      "Most LinkedIn activity is reactive. Posts are written when something occurs to the operator, engagement is checked when the platform sends a notification, and the connection between activity and pipeline is invisible because nobody is measuring it.",
      "The misdiagnosis is that LinkedIn is a content problem. It is not. It is a positioning, production, and measurement problem operating in a content medium. Businesses that treat it as content marketing produce volume without authority. Businesses that treat it as a positioning system produce authority with modest volume, which is what actually generates inbound.",
      "The hidden cost is opportunity cost. Every quarter the operator's positioning is undefined is a quarter the inbound that would have come from it does not arrive. The business compensates by spending more on outbound and paid, which converts at a fraction of the rate inbound would have.",
    ],
    strategy: [
      "LinkedIn Positioning is engineered as an authority system, not a publishing schedule. The first work is defining what the operator is known for, why that matters commercially, and how the content architecture will reinforce it without diluting it.",
      "The principle is that credibility compounds when the signal is consistent and decays when it is not. A defined positioning, defended over twelve to twenty-four months, will produce more inbound than any volume of unfocused content.",
      "The system also makes the work sustainable. Most operators stop posting because production becomes burdensome, not because the strategy stops working. A defined architecture removes the daily creative decision and makes the cadence operationally light.",
    ],
    approach: [
      {
        title: "Personal positioning aligned to commercial outcomes",
        description:
          "Positioning is defined against the business development objective, not against personal preference. The work establishes what the operator should be known for, in what market, against what alternatives, and why that matters to the buyer.",
      },
      {
        title: "Content pillar architecture",
        description:
          "Three to five content pillars are established as the operating range. Every post fits inside the architecture. This eliminates the most common failure mode, which is content drift, and makes the positioning legible to the audience over time.",
      },
      {
        title: "Engagement protocols",
        description:
          "Engagement is treated as relationship infrastructure, not as algorithmic compliance. A defined protocol governs which conversations the operator participates in, with whom, and why. The result is a network that compounds in value rather than in size alone.",
      },
      {
        title: "Production systems for sustainable output",
        description:
          "Content production is built around the operator's actual constraints. Interview-based capture, structured editing, and a publishing cadence the operator can sustain replace the unsustainable model of writing from scratch every day.",
      },
      {
        title: "Analytics tied to pipeline",
        description:
          "LinkedIn activity is connected to pipeline outcomes, not to platform vanity metrics. The business knows which themes, formats, and conversations produce inbound, and the production system reinforces what works.",
      },
      {
        title: "Executive team coordination",
        description:
          "Where multiple operators participate, their presence is coordinated as an organisational signal rather than competing personal brands. The aggregate effect on market perception is larger than the sum of the individual outputs.",
      },
    ],
    failures: [
      "Confusing engagement with influence. Posts with high likes from the wrong audience produce no pipeline and consume the production capacity that could have produced something that did.",
      "Outsourcing voice to agencies that produce competent but generic content, which dilutes the credibility the system was built to compound.",
      "Treating LinkedIn as a publishing problem rather than a positioning one, which produces volume without a defensible point of view.",
      "Stopping after three months because pipeline impact is not yet visible. Authority compounds on a six-to-twelve-month curve, and businesses that exit early forfeit the entire return.",
      "Measuring against platform metrics rather than commercial ones, which rewards the wrong behaviour and obscures whether the system is actually working.",
    ],
    inPractice: [
      "The operator participates in a structured capture process on a cadence they can sustain, which produces the raw material the system needs without consuming their working week.",
      "Content is published against the pillar architecture. The audience develops a clear understanding of what the operator stands for, which is the prerequisite for inbound that converts at high rates.",
      "Engagement happens deliberately, against a defined list of accounts and conversations. The network the operator builds is the network the business converts against.",
      "Monthly reviews evaluate which themes produced inbound, which conversations led to meetings, and how the positioning is evolving in the market. The system is tuned on evidence, not on opinion.",
    ],
    outcomes: [
      {
        title: "Defensible thought leadership position",
        description:
          "The operator becomes legible to the market against a defined position. This is the asset that produces the inbound, the speaking invitations, and the partnerships that compound across years.",
      },
      {
        title: "Consistent inbound inquiries",
        description:
          "Pipeline begins arriving from the platform on a predictable cadence. Because it is inbound, conversion rates are multiples of any outbound channel, and the cost per opportunity declines structurally.",
      },
      {
        title: "Expanded network of strategic value",
        description:
          "The network grows in the right direction. Connections accumulate against the ICP rather than against vanity metrics, which makes the network itself a compounding business asset.",
      },
      {
        title: "Production that does not depend on willpower",
        description:
          "The system removes the daily creative decision. The operator continues to publish through busy quarters because the infrastructure carries the work that previously depended on energy.",
      },
      {
        title: "Measurable connection to revenue",
        description:
          "The business can attribute pipeline and revenue to LinkedIn activity in defensible terms, which is what allows the investment to be sustained and expanded with confidence.",
      },
    ],
    idealFor: [
      "Founders",
      "Consultants",
      "Executive Teams",
      "Thought Leaders",
      "Advisory Firms",
    ],
    contactService: "LinkedIn Positioning",
  },

  /* ─────────────────────────────────────────── */
  "ai-automation": {
    title: "AI & Automation Systems",
    subtitle:
      "Intelligent workflows that eliminate operational friction and multiply output without multiplying headcount.",
    briefing: [
      "Automation is the operational leverage layer of the business. It determines how much the organisation can produce, how fast it can respond, and how consistently it can deliver, without proportional growth in headcount.",
      "Most operations are not under-automated for lack of tools. They are under-automated because the workflows themselves were never designed for automation. Tools applied to broken processes produce automated chaos at higher speed than manual chaos.",
      "The objective is to identify the workflows where intelligent automation actually creates leverage, design those workflows correctly, and integrate them into the operating system of the business in a way that the team trusts and adopts.",
    ],
    problem: [
      "Growth creates operational complexity at a faster rate than it creates operational capacity. Lead volumes increase, response time degrades, quality control becomes inconsistent, and senior people end up doing coordination work instead of strategic work. The business hits a ceiling that is not commercial, it is operational.",
      "The conventional response is to hire. Hiring is a slow, expensive, and reversible solution to a problem that is often structural. The new headcount inherits the same broken workflows, and the operational ceiling reasserts itself one stage higher than before.",
      "The hidden cost is execution drift. The most experienced people in the business spend their week reacting to operational noise instead of producing the strategic work that justified their seniority. This is a tax the business pays continuously, and it does not appear on any P&L line.",
    ],
    strategy: [
      "AI and Automation Systems begin with workflow architecture, not tool selection. The processes that consume the most leverage are mapped, redesigned for automation where automation creates value, and left manual where human judgement is genuinely required.",
      "The principle is that automation is a design discipline before it is a technology discipline. The tools have converged in capability. The differentiator is whether the workflow being automated was the right one, designed in the right way, integrated into the right system.",
      "The objective is operational compounding. Each automated workflow frees capacity that is reinvested in the next workflow. Within two to three quarters, the operational ceiling has moved structurally, and the business can scale without proportional headcount expansion.",
    ],
    approach: [
      {
        title: "Operational audit",
        description:
          "The business's actual workflows are mapped, not the documented ones. The audit surfaces where time is consumed, where errors compound, and where the highest-leverage automation opportunities exist. Without this, automation defaults to wherever the loudest pain is, which is rarely the most valuable target.",
      },
      {
        title: "AI-powered scoring and qualification",
        description:
          "Lead scoring, qualification, and routing are moved from manual judgement to engineered logic. The system applies consistent criteria at volume, which is the property humans cannot maintain past a certain throughput.",
      },
      {
        title: "Behaviour-triggered nurture sequences",
        description:
          "Nurture is moved from scheduled to triggered. Sequences respond to actual buyer behaviour rather than to calendar logic, which is the difference between communication that compounds trust and communication that erodes it.",
      },
      {
        title: "CRM and data synchronisation",
        description:
          "The systems the business operates are connected into a single data plane. Duplicate entry, conflicting records, and reporting reconciliation work are eliminated. This typically recovers more capacity than any individual automation does.",
      },
      {
        title: "Intelligent routing across functions",
        description:
          "Leads, tasks, and communications are routed by rules rather than by availability. The right work reaches the right person at the right velocity, which removes the queue dynamics that destroy response time as the business scales.",
      },
      {
        title: "Performance monitoring and alerting",
        description:
          "The automated system is observed, not assumed. Performance is monitored, anomalies trigger alerts, and the workflows are evolved as the business changes. Automation is a living system, not a deliverable.",
      },
    ],
    failures: [
      "Automating processes that should have been eliminated, which produces faster execution of work the business should not have been doing.",
      "Selecting tools before designing workflows, which produces a stack of disconnected platforms and a team that resents the complexity.",
      "Treating automation as a one-time project rather than an evolving system, which guarantees the implementation will decay within two quarters.",
      "Removing human judgement from stages where it is the actual source of value, which produces efficient delivery of low-quality outcomes.",
      "Failing to instrument the automated system, which means the business cannot tell when it stops working and discovers the failure through customer complaints.",
    ],
    inPractice: [
      "The team experiences the system as fewer interruptions, faster handoffs, and cleaner data. The change is operational rather than ceremonial, which is why adoption holds rather than reverting.",
      "Senior people stop doing coordination work. The capacity that previously absorbed status updates, manual routing, and reconciliation is reinvested in strategic work the business was previously short of.",
      "Response times to leads and clients improve structurally because the system holds the standard the team could not hold manually at volume.",
      "When something breaks, the monitoring layer surfaces it before the customer does. Reliability becomes a property of the system rather than a function of how alert the team happens to be that week.",
    ],
    outcomes: [
      {
        title: "Dramatic reduction in manual repetition",
        description:
          "The work that consumed the most capacity for the least judgement is removed from the team's week. The reclaimed time is the leverage the business converts into strategic output.",
      },
      {
        title: "Faster response across the system",
        description:
          "Leads, clients, and internal handoffs move at the speed the system enforces, not at the speed the busiest person allows. Response time becomes a competitive property rather than an operational liability.",
      },
      {
        title: "Consistent quality at any volume",
        description:
          "Standards hold as the business scales because the system applies them, not because the team remembers to. Quality stops degrading with growth.",
      },
      {
        title: "Operations that scale without proportional hiring",
        description:
          "The business absorbs growth without adding headcount at the same rate. The operational ceiling moves structurally, which is the difference between scaling and stalling.",
      },
      {
        title: "Senior capacity returned to strategic work",
        description:
          "The most experienced people in the business spend their week on work only they can do. This is typically the largest single uplift the automation programme produces, and it does not appear in any cost line.",
      },
    ],
    idealFor: defaultIdealFor,
    contactService: "AI Automation & Systems",
  },

  /* ─────────────────────────────────────────── */
  "seo": {
    title: "SEO & Digital Visibility",
    subtitle:
      "Organic growth systems built on structural authority that compound visibility over time.",
    briefing: [
      "SEO is the only acquisition channel that produces an appreciating asset. Every other channel rents attention. Organic visibility, built correctly, accumulates as a structural advantage the business owns.",
      "The discipline has been damaged by years of tactical noise. Most operators understand SEO as a checklist of technical fixes, keyword targets, and content production schedules. That framing is why most SEO programmes do not produce the compounding return the channel is capable of.",
      "The objective is to build the technical foundation, content architecture, and authority graph that allow organic visibility to compound across years, independent of algorithm cycles.",
    ],
    problem: [
      "Most SEO programmes are activity-driven, not architecture-driven. Content is published on a schedule, technical issues are fixed reactively, and authority accumulates by accident rather than by design. The result is incremental improvement on a baseline that the business cannot defend.",
      "The misdiagnosis is that SEO performance is a content problem. It is rarely a content problem. It is usually a topical architecture problem, an authority distribution problem, or a technical foundation problem, all of which content production cannot fix.",
      "The downstream cost is dependency on paid channels. When organic does not produce, the business pays for traffic it could have owned. That spend is recurring, the alternative would have compounded, and the gap between the two widens every quarter the architecture is not corrected.",
    ],
    strategy: [
      "SEO & Digital Visibility is engineered as a long-horizon system, not a quarterly campaign. The work begins with technical foundation and topical architecture, because no amount of content production will produce compounding returns if the structure underneath it is incorrect.",
      "The principle is that organic visibility is a structural property of how the business is organised online, not a function of how much content it produces. Authority compounds within defined topic territories. Diffuse content production across unrelated topics produces no compounding because there is no territory to defend.",
      "The objective is to build a position the market cannot easily contest. Within twelve to twenty-four months, the business owns visibility in a defined territory at a cost per acquisition that paid channels cannot match.",
    ],
    approach: [
      {
        title: "Technical foundation",
        description:
          "Crawlability, indexation, site architecture, and performance are corrected as a prerequisite. No content investment compounds on a broken technical foundation, and most foundations have inherited problems the business is not aware of.",
      },
      {
        title: "Topical content architecture",
        description:
          "Content is organised around a defined topic territory the business intends to own. Pillars, clusters, and internal linking are engineered to concentrate authority where it produces commercial outcomes, not to scatter it across unrelated themes.",
      },
      {
        title: "Authority building",
        description:
          "Authority is acquired through deliberate partnerships, citations, and earned coverage, not through transactional link buying. The objective is durable signal that algorithm updates reinforce rather than penalise.",
      },
      {
        title: "Local and international frameworks where relevant",
        description:
          "Where the business operates across geographies, the architecture is built to compete in each one without competing with itself. Without this, the same content cannibalises its own performance across regions.",
      },
      {
        title: "SEO-integrated content production",
        description:
          "SEO is embedded into the content production process rather than retrofitted to it. Writers, editors, and strategists operate against the same architecture, which is what makes the output compound rather than fragment.",
      },
      {
        title: "Performance tracking with revenue attribution",
        description:
          "Organic performance is measured against pipeline and revenue, not against rankings. The business sees which topics, pages, and clusters produce commercial outcomes, and investment is directed accordingly.",
      },
    ],
    failures: [
      "Treating SEO as a tactical checklist rather than an architectural discipline, which produces incremental gains that do not compound.",
      "Producing content at volume before topical architecture is defined, which creates a portfolio of pages that compete with each other instead of building a defensible territory.",
      "Chasing algorithm updates instead of building the structural signals algorithms are designed to reward, which keeps the business in a permanent reactive posture.",
      "Buying links transactionally, which produces short-term lifts followed by penalties or decay, neither of which the business can plan against.",
      "Measuring against rankings instead of revenue, which rewards activity that does not produce pipeline and obscures activity that does.",
    ],
    inPractice: [
      "Editorial planning operates against the topical architecture. Every piece reinforces a defined cluster, contributes to a defined pillar, and earns its internal links from a defined position in the structure.",
      "Technical health is monitored continuously, not audited annually. Issues are surfaced and resolved before they degrade indexation, which is where most slow declines originate.",
      "Authority work is treated as relationship development, not as outreach volume. The partnerships, mentions, and citations the business earns are sustainable because the relationships behind them are.",
      "Quarterly reviews evaluate territory ownership, not just traffic. The conversation is about which topics the business now owns, which it is contesting, and which it has chosen to exit.",
    ],
    outcomes: [
      {
        title: "Steadily increasing organic visibility",
        description:
          "Visibility grows across the defined territory in a way that algorithm updates reinforce rather than threaten, because the position was built on structural signals rather than on tactical optimisations.",
      },
      {
        title: "Content that serves both reader and business",
        description:
          "The content the business produces meets the audience's intent and the business's commercial objectives in the same artefact. Editorial and acquisition stop being separate workstreams.",
      },
      {
        title: "A technical foundation that supports growth",
        description:
          "The infrastructure stops being a source of decay and becomes a source of leverage. New content, new pages, and new initiatives compound on a foundation that holds.",
      },
      {
        title: "Compounding organic traffic",
        description:
          "Because authority accumulates within a defended territory, traffic compounds rather than plateaus. The cost per acquisition declines as the system matures, which is the property paid channels cannot reproduce.",
      },
      {
        title: "Reduced dependency on paid channels",
        description:
          "As organic produces a structural share of pipeline, the business's exposure to paid platform pricing, policy changes, and algorithm volatility declines. The acquisition system becomes more defensible at every layer.",
      },
    ],
    idealFor: [
      "Advisory Firms",
      "B2B Service Businesses",
      "Consultancies",
      "Executive-Led Brands",
    ],
    contactService: "SEO & Digital Visibility",
  },

  /* ─────────────────────────────────────────── */
  "digital-products": {
    title: "Digital Product Systems",
    subtitle:
      "End-to-end systems for launching and scaling digital products from concept to consistent revenue.",
    briefing: [
      "Digital products are the leverage layer of an expertise business. They convert what the founders and senior operators already know into revenue that is not bound by their time. Built correctly, they expand the surface area of the business without diluting its positioning.",
      "Most attempts fail not because the product was wrong but because the system around the product was absent. Launches happen without validation infrastructure, pricing is set without architecture, and post-launch optimisation is improvised. The product is judged on the result, but the system was always the variable.",
      "The objective is to build the validation, launch, and optimisation infrastructure that allows the business to take a product from concept to sustained revenue, and to do it repeatably across future products.",
    ],
    problem: [
      "The default failure mode of digital product launches is execution drift. The team underestimates the work the launch requires, then improvises the components that were missing. Sales pages are written under deadline, email sequences are assembled the week before, and the pricing decision is made on a call rather than against a model.",
      "Validation is the stage that most operators skip and most regret. Without it, the launch is the first time the market is asked whether the product was wanted, at the price it was wanted, in the form it was wanted. The cost of finding out at that stage is the entire launch.",
      "The hidden cost is positioning damage. A product that underperforms publicly affects the credibility of the services, the brand, and the people behind it. The business pays for the underperformance twice: in revenue, and in the perception that takes longer to repair.",
    ],
    strategy: [
      "Digital Product Systems are built as repeatable infrastructure, not as one-time launches. The validation framework, the launch architecture, the pricing logic, and the post-launch optimisation system are engineered once and reused across future products.",
      "The principle is that the system around the product determines the result more than the product does. Two equivalent products launched into different systems produce different outcomes. The system is the variable the business can actually control.",
      "The objective is to make digital revenue a predictable line item rather than a hopeful one. Once the infrastructure exists, each subsequent product launches at lower cost, higher confidence, and shorter time to revenue than the one before.",
    ],
    approach: [
      {
        title: "Validation framework",
        description:
          "Demand is tested against the actual audience, at the actual price, with the actual positioning, before significant resource is committed. The objective is not to confirm the idea, it is to discover the points at which it would fail, while the cost of finding out is still low.",
      },
      {
        title: "Positioning and messaging architecture",
        description:
          "The product is positioned against a defined buyer, a defined alternative, and a defined outcome. Messaging is constructed from the architecture rather than assembled from inspiration, which is what allows it to perform consistently across surfaces.",
      },
      {
        title: "Launch infrastructure",
        description:
          "Sales pages, email sequences, payment systems, and fulfilment workflows are built as a coordinated system rather than as separate deliverables. The launch executes against an integrated plan instead of a checklist.",
      },
      {
        title: "Pricing and packaging design",
        description:
          "Price points are set against the value the buyer receives, the alternatives they have, and the economics the business requires. Packaging is engineered to make the highest-value option the most attractive one, which is where most pricing systems fail.",
      },
      {
        title: "Post-launch optimisation system",
        description:
          "After launch, performance is observed against pre-defined benchmarks. Conversion, refund, completion, and lifetime value data inform the next iteration. Each cycle improves the system, not just the product.",
      },
      {
        title: "Scaling framework",
        description:
          "When the product reaches the threshold that justifies expansion, the framework defines which channels, audiences, and adjacent offers to extend into. The product becomes a base layer the business can build additional revenue on top of.",
      },
    ],
    failures: [
      "Skipping validation because the team is confident in the idea, which converts a recoverable mistake into a public one.",
      "Treating the launch as a creative project rather than as an engineered system, which produces a beautiful asset that under-converts because the architecture underneath it is missing.",
      "Pricing against intuition rather than against value and alternatives, which leaves significant revenue on the table or prices the product out of its actual market.",
      "Ignoring post-launch data because the launch is over, which forfeits the most valuable intelligence the business will have about the product.",
      "Launching adjacent products before the first one is fully optimised, which dilutes attention across a portfolio that none of which is performing to its potential.",
    ],
    inPractice: [
      "Pre-launch, the validation work produces an evidence base the business uses to decide what to build, what to delay, and what to abandon. The launch begins from a position of informed confidence rather than enthusiastic hope.",
      "Launch week executes against a defined plan. Sales pages, email sequences, payment flow, and fulfilment all operate as components of one system, which is why conversion holds rather than degrading at any single point.",
      "Post-launch, the team reviews the data against the benchmarks that were set in advance. Improvements are made against evidence, not against opinions about what felt off.",
      "When the next product begins, the infrastructure is already there. Each subsequent launch is faster, cheaper, and more confident, because the system carries the work that previously had to be rebuilt.",
    ],
    outcomes: [
      {
        title: "Validated concepts before significant investment",
        description:
          "The business commits resource to products the market has already signalled it wants, at prices the market has already signalled it will pay, in formats the market has already signalled it prefers. The risk of large launches declines structurally.",
      },
      {
        title: "Launch infrastructure that can be reused",
        description:
          "The system built for the first product carries the second, third, and fourth. Each subsequent launch is faster and cheaper, which is what converts digital products from one-off experiments into a recurring capability.",
      },
      {
        title: "Pricing architecture optimised for both conversion and revenue",
        description:
          "Pricing is set against value, alternatives, and economics rather than intuition. Conversion improves, revenue per buyer improves, and the business stops leaving capacity unmonetised at one extreme or pricing itself out at the other.",
      },
      {
        title: "Post-launch data for continuous improvement",
        description:
          "Every launch generates intelligence the next launch uses. The business compounds its operating knowledge of its own market, which is an asset competitors cannot replicate without running the same number of cycles.",
      },
      {
        title: "Scalable digital revenue independent of services",
        description:
          "The business develops a revenue line that does not consume senior delivery capacity. This is the diversification that protects the services business and creates the optionality to expand the offer surface deliberately.",
      },
    ],
    idealFor: [
      "Course Creators",
      "Independent Operators",
      "Productised Consultants",
      "Advisory Firms Launching IP",
    ],
    contactService: "Digital Product Systems",
  },
};
