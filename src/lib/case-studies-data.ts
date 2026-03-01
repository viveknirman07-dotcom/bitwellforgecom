export interface CaseStudy {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  clientType: string;
  challenge: string;
  whatWeBuilt: string[];
  result: string;
  label: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "b2b-lead-generation",
    tag: "B2B Lead Generation",
    title: "From Invisible to 11 Qualified Calls in 6 Weeks",
    subtitle: "How a consulting firm built a predictable outreach engine without paid ads.",
    clientType: "Independent business consultant, service based, B2B focused",
    challenge: "No structured outreach. Relying on referrals. Revenue unpredictable month to month.",
    whatWeBuilt: [
      "LinkedIn positioning overhaul",
      "Targeted connection + DM sequence (20/day)",
      "3 email cold outreach cadence",
      "Weekly tracking dashboard",
    ],
    result: "11 qualified discovery calls in 6 weeks. 2 converted to retainer clients. Pipeline went from empty to consistently active.",
    label: "Concept Study: framework based on real system design",
  },
  {
    id: "revenue-systems",
    tag: "Revenue Systems",
    title: "Closing $4,800 in 30 Days With Zero Ad Spend",
    subtitle: "How a solo coach packaged and sold a high-ticket offer using only DMs and positioning.",
    clientType: "Solo business coach, personal brand, selling 1:1 services",
    challenge: "Great expertise, no structured offer. Conversations happening but not converting.",
    whatWeBuilt: [
      "High ticket offer packaging ($1,500 and $3,000 tiers)",
      "Objection handling framework",
      "DM to call conversion sequence",
      "Simple CRM tracking (Notion based)",
    ],
    result: "$4,800 closed in first 30 days. 60% conversion rate on discovery calls.",
    label: "Concept Study: framework based on real system design",
  },
  {
    id: "growth-strategy",
    tag: "Growth Strategy",
    title: "3x Pipeline Growth for a Digital Agency in 90 Days",
    subtitle: "Replacing scattered tactics with a demand system that runs in the background.",
    clientType: "Small digital agency, 3 person team, serving local businesses",
    challenge: "Feast or famine cycle. Client work consuming all time, no consistent business development happening.",
    whatWeBuilt: [
      "Ideal client profile definition",
      "Semi automated LinkedIn outreach system",
      "Content calendar (2 posts/week, authority positioning)",
      "Monthly pipeline review process",
    ],
    result: "Pipeline grew 3x in 90 days. Owner reclaimed 8 hrs/week previously spent on random prospecting.",
    label: "Concept Study: framework based on real system design",
  },
  {
    id: "ai-automation",
    tag: "AI Automation & Systems",
    title: "14 Hours Saved Per Week for a Solo Consultant",
    subtitle: "How an independent consultant eliminated repetitive operations and reclaimed time for high value client work.",
    clientType: "Independent business consultant, solo operator, B2B focused",
    challenge: "Spending 3+ hours daily on repetitive tasks: manual follow ups, lead tracking, report generation, and calendar coordination. No time left for strategy or business development.",
    whatWeBuilt: [
      "AI powered follow up sequence with automated triggers based on lead behavior",
      "CRM automation connecting outreach to pipeline tracking in real time",
      "Automated weekly reporting dashboard with zero manual data entry",
      "Calendar and task management workflows integrated with existing tools",
    ],
    result: "14 hours saved per week. Consultant shifted 80% of recovered time toward business development. Pipeline activity increased 2x within 60 days without adding headcount or budget.",
    label: "Concept Study: framework based on real system design",
  },
];
