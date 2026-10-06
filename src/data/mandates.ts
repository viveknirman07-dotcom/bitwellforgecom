export type Mandate = {
  id: string;
  title: string;
  practice: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
};

export const mandates: Mandate[] = [
  {
    "id": "c-suite-origination",
    "title": "Associate, Account Intelligence & C-Suite Origination",
    "practice": "Commercial Origination & Strategic Intelligence",
    "overview": "Responsible for initiating institutional, peer-level dialogues with Founders and Managing Partners of specialized professional service firms and technology practices through empirical research, market reconnaissance, and structured discovery.",
    "responsibilities": [
      "Lead deep account reconnaissance across selected industry verticals, analyzing commercial structures and engagement histories.",
      "Formulate tailored, hypothesis-driven points of view that illuminate underlying revenue friction for executive leadership teams.",
      "Deploy multi-channel consultative engagement cadences characterized by understated authority and intellectual rigor.",
      "Navigate exploratory stakeholder dialogues, qualifying senior decision-makers based on organizational readiness.",
      "Manage the transition of qualified executive engagements to Senior Practice Leadership for diagnostic deployment."
    ],
    "requirements": [
      "Exceptional written and spoken articulation with the poise required to engage senior enterprise leadership.",
      "Demonstrated capability in structured research, account-level hypothesis building, and consultative discovery.",
      "Familiarity with professional services business models, partnership dynamics, and consultative service delivery.",
      "Innate intellectual curiosity and comfort with autonomous, outcome-driven operational mandates."
    ]
  },
  {
    "id": "quantitative-pipeline-modeling",
    "title": "Senior Analyst, Quantitative Pipeline & Economic Modeling",
    "practice": "Diagnostic Analytics & Commercial Research",
    "overview": "Anchors the empirical core of BitwellForge’s diagnostic practice by ingesting complex commercial data and translating raw CRM records into econometric models that isolate systemic pipeline leaks and sales cycle friction.",
    "responsibilities": [
      "Extract, sanitize, and structure historical opportunity data across diverse enterprise CRM systems and commercial registries.",
      "Conduct pipeline velocity modeling, stage-to-stage transition probability analyses, and deal-slippage attribution audits.",
      "Benchmark client performance metrics against proprietary firm data indices to isolate structural operational deficits.",
      "Develop quantitative exhibits, waterfall charts, and board-ready diagnostic exhibits illustrating capital leakage.",
      "Partner with Engagement Leadership to translate quantitative insights into strategic diagnostic narratives."
    ],
    "requirements": [
      "Advanced quantitative modeling acumen with deep expertise in spreadsheet modeling and data synthesis.",
      "Conceptual mastery of pipeline economics, commercial attribution modeling, and professional services unit metrics.",
      "High aesthetic standard for data visualization, producing minimalist and executive-ready exhibits.",
      "Relentless attention to data integrity, methodology documentation, and analytical reproducibility."
    ]
  },
  {
    "id": "engagement-manager",
    "title": "Diagnostic Strategy Lead / Engagement Manager",
    "practice": "Advisory & Diagnostic Practice",
    "overview": "Serves as the primary engagement orchestrator, bridging quantitative diagnostic analysis with board-level strategic roadmaps, authoring comprehensive diagnostic dossiers, and directing executive review sessions with Managing Partners.",
    "responsibilities": [
      "Direct the end-to-end delivery of comprehensive commercial diagnostics from intake through formal findings presentation.",
      "Synthesize qualitative stakeholder discovery interviews and quantitative pipeline models into a unified institutional thesis.",
      "Author high-stakes diagnostic dossiers articulating organizational blind spots, process debt, and strategic remediation steps.",
      "Facilitate diagnostic readout presentations with executive leadership, navigating organizational skepticism with calm authority.",
      "Frame multi-quarter implementation roadmaps defining the technical and operational interventions required."
    ],
    "requirements": [
      "Proven background in management consulting, corporate strategy, or specialized commercial advisory.",
      "Demonstrated command of boardroom presentation dynamics and high-stakes stakeholder alignment.",
      "Capacity to distill sprawling operational complexity into concise, prioritized strategic imperatives.",
      "Sophisticated business judgment, emotional discipline, and an institutional client-service posture."
    ]
  },
  {
    "id": "revops-architect",
    "title": "Enterprise Solutions Architect, RevOps & Data Engineering",
    "practice": "Revenue Infrastructure & Systems Transformation",
    "overview": "Translates diagnostic roadmaps into resilient, scalable commercial architectures by engineering the workflows, pipeline governance rules, and automated telemetry systems required for seamless sales execution.",
    "responsibilities": [
      "Re-engineer complex CRM data models, stage progression logic, and pipeline exit criteria to eliminate administrative friction.",
      "Design and implement enterprise routing mechanisms, speed-to-engagement automations, and multi-tier notification protocols.",
      "Cleanse historical data repositories, establish rigorous governance validation rules, and enforce schema standardization.",
      "Build real-time executive dashboard suites providing unvarnished visibility into operational velocity and pipeline health.",
      "Formulate comprehensive system architecture documentation and oversee seamless technical migrations."
    ],
    "requirements": [
      "Deep technical mastery of modern CRM platforms, relational database logic, and API-level workflow orchestrations.",
      "First-principles approach to systems design, prioritizing architectural simplicity over unnecessary tooling sprawl.",
      "Experience architecting revenue infrastructure specifically tailored for high-touch professional services practices.",
      "Uncompromising standards for system resilience, data validation hygiene, and operational reliability."
    ]
  },
  {
    "id": "consultative-closures",
    "title": "Director of Consultative Discovery & Commercial Closures",
    "practice": "Client Acquisition & Strategic Partnerships",
    "overview": "Leads exploratory diagnostic conversations with prospective clients as an objective diagnostician, evaluating operational fit, surfacing systemic vulnerabilities, and guiding leadership teams toward commissioning a formal institutional audit.",
    "responsibilities": [
      "Conduct structured discovery sessions with Founders and Managing Partners experiencing growth plateaus or pipeline instability.",
      "Deploy precision diagnostic questioning to unearth underlying revenue architecture flaws versus surface-level symptoms.",
      "Position the firm’s diagnostic engagements as necessary, independent audits essential for organizational decision-making.",
      "De-escalate sales resistance through objective inquiry, institutional politeness, and zero-ego commercial posture.",
      "Maintain rigorous qualification standards, disengaging professionally from practices that lack diagnostic readiness."
    ],
    "requirements": [
      "Extensive track record in consultative discovery, professional services business development, or management advisory sales.",
      "Nuanced understanding of agency, consultancy, and boutique professional firm operating models.",
      "Exceptional active listening capability with the discipline to diagnose thoroughly before proposing interventions.",
      "Natural gravitas, articulate framing, and complete absence of aggressive sales mannerisms."
    ]
  },
  {
    "id": "strategic-alliances",
    "title": "Principal, Strategic Alliances & Institutional Origination",
    "practice": "Practice Alliances & Corporate Ecosystems",
    "overview": "Oversees the firm’s non-transactional ecosystem expansion, institutionalizing partnerships with Private Equity operating groups, corporate advisory firms, and executive networks to establish BitwellForge as the designated diagnostic authority.",
    "responsibilities": [
      "Architect bilateral alliance frameworks with institutional partners who oversee or advise mid-market professional practices.",
      "Serve as the primary practice liaison to Private Equity operating partners, structuring diagnostic portfolio review models.",
      "Deliver keynote perspectives and executive roundtable briefings to high-status professional groups and closed alliances.",
      "Design co-branded market studies and ecosystem research initiatives that cement firm positioning within select industries.",
      "Manage high-level stakeholder relationships, ensuring sustained cross-organizational goodwill and recurring mandates."
    ],
    "requirements": [
      "Significant professional maturity with prior tenure in corporate partnerships, alliance development, or executive networks.",
      "Sophisticated comprehension of corporate finance, investment theses, and value-creation methodologies in mid-market firms.",
      "Elite interpersonal competence suited for navigating formal corporate and partnership hierarchies.",
      "Strategic acumen capable of structuring sustainable commercial agreements based on mutual institutional prestige."
    ]
  },
  {
    "id": "gtm-enablement",
    "title": "GTM Enablement & Commercial Playbook Specialist",
    "practice": "Practice Transformation & Behavioral Architecture",
    "overview": "Authors the playbooks, discovery frameworks, and stage governance guidelines that ensure the client’s commercial team adheres to institutional sales disciplines following an architectural systems overhaul.",
    "responsibilities": [
      "Codify bespoke consultative engagement playbooks reflecting the client’s updated commercial architecture.",
      "Standardize discovery rubrics, objection-handling theses, and qualification standards across all customer-facing roles.",
      "Design rigorous stage-exit criteria documentation, establishing clear boundary definitions for pipeline progression.",
      "Lead high-engagement enablement workshops and role-playing simulations for client business development professionals.",
      "Conduct pipeline hygiene audits and conversation reviews to assess adherence to new operational protocols."
    ],
    "requirements": [
      "Demonstrated experience in consultative sales enablement, organizational design, or corporate training within B2B environments.",
      "Superior instructional design capability, turning complex operational processes into clear internal frameworks.",
      "Deep understanding of enterprise buying psychology, stakeholder mapping, and non-manipulative discovery frameworks.",
      "Strong facilitative presence capable of commanding respect from both practitioners and senior partners."
    ]
  },
  {
    "id": "transformation-delivery",
    "title": "Commercial Transformation Delivery Lead / Implementation Coach",
    "practice": "Transformation Delivery & Operational Advisory",
    "overview": "Provides embedded operational stewardship during multi-month client restructuring engagements, managing change resistance, monitoring weekly operational variances, and ensuring sustained architecture performance.",
    "responsibilities": [
      "Lead regular operational governance cadences with client executive committees to review transformation milestones.",
      "Monitor day-to-day adoption of redesigned pipeline workflows, identifying and rectifying operational drift in real time.",
      "Analyze ongoing performance metrics, isolating emerging pipeline constraints before they manifest as revenue deficits.",
      "Serve as the primary escalation point for client operational leads during complex multi-stakeholder reorganizations.",
      "Deliver iterative progress reports illustrating baseline improvements against initial diagnostic benchmarks."
    ],
    "requirements": [
      "Background in operational transformation, change management, or program delivery in consulting or corporate settings.",
      "High resilience and diplomatic tact, capable of mediating internal partner politics and organizational inertia.",
      "Structured approach to program governance, risk mitigation, and milestone-based project execution.",
      "Tenacious focus on operational outcomes and behavioral adherence over abstract theoretical models."
    ]
  },
  {
    "id": "pricing-strategy",
    "title": "Pricing Strategy & Commercial Packaging Consultant",
    "practice": "Strategic Monetization & Commercial Architecture",
    "overview": "Restructures how mid-market consultancies package, price, and contract their services, transitioning them from billable-hour commoditization to institutional, value-anchored delivery frameworks.",
    "responsibilities": [
      "Conduct forensic reviews of past client proposals, scope documents, and delivery realization rates to uncover margin erosion.",
      "Re-architect client service catalogs into tiered, diagnostic-led commercial programs that protect delivery margins.",
      "Design value-anchored pricing models, margin governance rules, and formal scope-boundary mechanisms.",
      "Draft contract templates, engagement letters, and change-order governance protocols that eliminate unbilled scope expansion.",
      "Train practice leaders on presenting commercial proposals with high conviction and non-negotiable scope parameters."
    ],
    "requirements": [
      "Deep knowledge of professional services unit economics, margin structures, and commercial contract design.",
      "Analytical expertise in assessing pricing elasticity, utilization metrics, and realization rates.",
      "Sophisticated legal and operational literacy regarding service agreements and scope management.",
      "Decisive advisory posture capable of challenging long-held assumptions regarding billable-hour pricing."
    ]
  },
  {
    "id": "practice-knowledge",
    "title": "Head of Practice Knowledge & Proprietary IP",
    "practice": "Practice Excellence, Research & Intellectual Property",
    "overview": "Codifies operational findings across client engagements into proprietary benchmarks, research studies, analytical frameworks, and executive whitepapers, establishing BitwellForge as an authoritative thought leader.",
    "responsibilities": [
      "Curate and manage the firm’s proprietary benchmark repository, categorizing anonymized pipeline and operational data.",
      "Author executive research whitepapers, market studies, and macro briefings exploring systemic shifts in professional services.",
      "Codify firm diagnostic methodologies into standardized, repeatable audit tools and scored assessment frameworks.",
      "Collaborate with Practice Leadership to translate proprietary research into multimedia assets and visual knowledge exhibits.",
      "Maintain the firm’s intellectual integrity, ensuring all published frameworks adhere to high standards of empirical clarity."
    ],
    "requirements": [
      "Exceptional editorial and analytical writing capability, reflecting institutional sobriety, gravitas, and clarity.",
      "Proven track record in corporate research, economic publishing, or management consulting knowledge development.",
      "Talent for identifying macro patterns across disparate operational datasets and framing them into compelling models.",
      "Impeccable attention to conceptual precision and aesthetic presentation of ideas."
    ]
  },
  {
    "id": "chief-of-staff",
    "title": "Chief of Staff / Director of Practice Governance",
    "practice": "Firm Strategy, Governance & Practice Operations",
    "overview": "Acts as the operational nerve center of BitwellForge, orchestrating internal resource allocation, enforcing deliverable quality assurance, and driving firm operational rhythms to ensure the firm scales smoothly.",
    "responsibilities": [
      "Direct internal firm operating cadences, executive meetings, cross-functional accountability sprints, and leadership priorities.",
      "Establish and enforce rigorous quality assurance protocols for all client diagnostic reports, exhibits, and public deliverables.",
      "Oversee specialized contractor allocation, delivery timelines, and practitioner utilization across active client workstreams.",
      "Identify internal workflow bottlenecks, designing and deploying internal operating systems to protect leadership bandwidth.",
      "Spearhead strategic firm-building initiatives, supporting cross-practice expansion and long-term organizational stewardship."
    ],
    "requirements": [
      "High-caliber background in corporate operations, management consulting program management, or high-growth firm governance.",
      "Masterful organizational architecture skills, with the ability to manage competing priorities under tight timelines.",
      "Unyielding standards for precision, visual polish, and intellectual rigor across all organizational output.",
      "High discretion, mature stakeholder mediation capability, and complete ownership over internal outcomes."
    ]
  }
];

export const mandateGroups: { name: string; ids: string[] }[] = [
  { name: "Commercial Origination & Partnerships", ids: ["c-suite-origination", "consultative-closures", "strategic-alliances"] },
  { name: "Advisory, Analytics & Diagnostics", ids: ["quantitative-pipeline-modeling", "engagement-manager", "pricing-strategy"] },
  { name: "Systems Engineering & Implementation", ids: ["revops-architect", "gtm-enablement", "transformation-delivery"] },
  { name: "Practice Governance & Knowledge", ids: ["practice-knowledge", "chief-of-staff"] },
];
