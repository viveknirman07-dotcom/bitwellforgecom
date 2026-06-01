import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import CTABlock from "@/components/CTABlock";
import IdealFor from "@/components/services/IdealFor";
import ImplementationProof, { type ProofType } from "@/components/services/ImplementationProof";

const defaultIdealFor = [
  "Agencies",
  "Consultants",
  "Advisory Firms",
  "Executive-Led Brands",
  "B2B Service Businesses",
  "High-Ticket Operators",
];

const idealForOverrides: Record<string, string[]> = {
  "linkedin": [
    "Founders",
    "Consultants",
    "Executive Teams",
    "Thought Leadership Brands",
  ],
  "digital-products": [
    "Course Creators",
    "Independent Operators",
    "Productised Consultants",
    "Advisory Firms Launching IP",
  ],
  "seo": [
    "Advisory Firms",
    "B2B Service Businesses",
    "Consultancies",
    "Executive-Led Brands",
  ],
};

interface ServiceContent {
  title: string;
  subtitle: string;
  problem: string;
  strategy: string;
  approach: string[];
  outcomes: string[];
  contactService: string;
}

const serviceData: Record<string, ServiceContent> = {
  "growth-strategy": {
    title: "Growth Strategy",
    subtitle: "A structural blueprint that aligns every channel, message, and system toward predictable, qualified demand.",
    problem: "Most businesses invest heavily in growth without a unifying strategy. Channels operate in silos, messaging lacks consistency, and teams chase metrics that don't translate into revenue. The result is effort without compounding returns, where growth feels unpredictable no matter how much is spent.",
    strategy: "Growth Strategy begins with a comprehensive audit of your current acquisition infrastructure. Every channel, every touchpoint, every conversion path is mapped and evaluated against your actual business objectives. Structural gaps are identified, and a strategic blueprint is designed that connects daily execution to long-term scalability. This is not a marketing plan. It is the operating system your growth runs on.",
    approach: [
      "Full-spectrum growth audit across all channels and touchpoints",
      "Revenue attribution mapping to connect activity to actual outcomes",
      "Competitive positioning analysis to identify structural advantages",
      "Channel prioritization framework based on highest leverage opportunities",
      "Quarterly milestone architecture with measurable benchmarks",
      "Cross-functional alignment to unify sales, marketing, and operations",
    ],
    outcomes: [
      "A single, coherent growth roadmap replacing scattered tactical efforts",
      "Clear visibility into which activities drive revenue and which don't",
      "Reduced acquisition costs through channel optimization",
      "Predictable pipeline growth with defined leading indicators",
      "A scalable foundation that compounds over quarters, not weeks",
    ],
    contactService: "Growth Strategy",
  },
  "sales-systems": {
    title: "High-Ticket Sales Systems",
    subtitle: "Structured pipelines engineered for complex, high-value client acquisition without relying on personality or pressure.",
    problem: "High-ticket sales often depend on individual talent rather than repeatable systems. When top performers leave, pipelines collapse. Proposals lack structure, follow-ups are inconsistent, and qualification criteria remain undefined. Revenue becomes unpredictable because it relies on people rather than process.",
    strategy: "High-Ticket Sales Systems replace personality-dependent selling with structured, repeatable frameworks. From initial qualification through proposal delivery and close, every stage is engineered for consistency. The system ensures that any qualified team member can guide a prospect through the pipeline with confidence and clarity.",
    approach: [
      "Lead qualification scoring frameworks aligned to ideal client profiles",
      "Structured discovery call methodologies that surface real buying signals",
      "Proposal architecture templates designed for high-conversion rates",
      "Follow-up cadence systems with intelligent timing triggers",
      "Objection handling frameworks based on pattern analysis",
      "Pipeline velocity tracking to identify and resolve bottlenecks",
    ],
    outcomes: [
      "Consistent close rates independent of individual sales talent",
      "Shortened sales cycles through structured qualification",
      "Higher average deal values from improved proposal architecture",
      "Reliable pipeline forecasting based on system-level data",
      "Scalable sales operations that grow with your team",
    ],
    contactService: "High Ticket Sales System",
  },
  "performance-marketing": {
    title: "Performance Marketing Infrastructure",
    subtitle: "Precision campaigns designed for compounding returns, not vanity metrics.",
    problem: "Most performance marketing operates without a measurement foundation. Campaigns are launched, budgets are spent, and reports are generated, but the connection between ad spend and actual revenue remains unclear. Creative fatigue sets in quickly, and optimization becomes guesswork rather than science.",
    strategy: "Performance Marketing Infrastructure builds the measurement, creative, and optimization systems that transform ad spend into predictable revenue. Before a single campaign launches, the attribution framework is established, conversion tracking is validated, and creative testing protocols are defined. This ensures every dollar spent generates actionable intelligence.",
    approach: [
      "Multi-touch attribution modeling across all paid channels",
      "Creative testing frameworks with statistically valid sample sizes",
      "Landing page optimization systems with structured A/B protocols",
      "Budget allocation models based on marginal return analysis",
      "Automated reporting dashboards with revenue-focused metrics",
      "Cross-channel integration to eliminate data silos",
    ],
    outcomes: [
      "Clear visibility into true cost per acquisition across channels",
      "Continuously improving creative performance through systematic testing",
      "Reduced wasted spend through data-driven budget reallocation",
      "Compounding returns as optimization intelligence accumulates",
      "Marketing investment tied directly to revenue outcomes",
    ],
    contactService: "Performance Marketing",
  },
  "lead-generation": {
    title: "B2B Lead Generation",
    subtitle: "Systematic engines for enterprise-grade demand generation combining outbound precision with inbound magnetism.",
    problem: "Lead generation often oscillates between feast and famine. Outbound efforts generate short-term spikes but lack sustainability. Inbound channels take months to mature and require consistent investment. Without a unified system, pipeline coverage remains inconsistent and forecasting becomes unreliable.",
    strategy: "B2B Lead Generation builds parallel acquisition engines that work together. Outbound systems are designed for immediate pipeline impact while inbound infrastructure is constructed for long-term compounding. The integration between both ensures consistent pipeline coverage regardless of market conditions.",
    approach: [
      "Ideal Client Profile development with firmographic and behavioral criteria",
      "Multi-channel outbound sequences across email, LinkedIn, and targeted advertising",
      "Inbound content architecture designed to attract high-intent prospects",
      "Lead scoring and routing systems for immediate qualification",
      "Nurture sequence design for prospects not yet ready to engage",
      "Pipeline coverage modeling to maintain consistent deal flow",
    ],
    outcomes: [
      "Consistent pipeline of qualified, high-intent prospects",
      "Balanced acquisition across outbound and inbound channels",
      "Reduced dependency on any single lead source",
      "Scalable systems that maintain quality as volume increases",
      "Predictable pipeline coverage with clear leading indicators",
    ],
    contactService: "B2B Lead Generation",
  },
  "linkedin": {
    title: "LinkedIn Positioning",
    subtitle: "Authority-building frameworks for founders and executive teams that generate inbound opportunities through thought leadership.",
    problem: "Most LinkedIn presence is reactive and inconsistent. Content is published without strategy, engagement is sporadic, and the connection between LinkedIn activity and business development remains invisible. Founders know LinkedIn matters but lack the systems to make it produce measurable results.",
    strategy: "LinkedIn Positioning creates a structured authority-building system that transforms personal profiles into inbound generation engines. Content architectures, engagement protocols, and positioning strategies are designed to establish credible thought leadership that naturally attracts ideal clients.",
    approach: [
      "Personal brand positioning aligned to business development objectives",
      "Content pillar architecture with recurring themes and formats",
      "Engagement protocols for strategic relationship building",
      "Content production systems for consistent, high-quality output",
      "Analytics frameworks to connect LinkedIn activity to pipeline impact",
      "Executive team coordination for amplified organizational presence",
    ],
    outcomes: [
      "Established thought leadership position in your market vertical",
      "Consistent inbound inquiries from LinkedIn presence",
      "Expanded professional network with strategic value",
      "Content systems that maintain consistency without burnout",
      "Measurable connection between LinkedIn activity and revenue",
    ],
    contactService: "LinkedIn Positioning",
  },
  "ai-automation": {
    title: "AI & Automation Systems",
    subtitle: "Intelligent workflows that eliminate operational friction and multiply output without multiplying headcount.",
    problem: "Growth creates operational complexity. As volume increases, manual processes break down, response times slow, and quality control becomes inconsistent. Teams spend more time managing systems than doing meaningful work. Scaling requires either significant hiring or fundamental process redesign.",
    strategy: "AI & Automation Systems identify the highest-leverage points in your operations where intelligent automation can multiply output. From lead nurturing sequences to qualification workflows, automation is integrated strategically to remove friction from your growth infrastructure while maintaining the personal touch that high-value clients expect.",
    approach: [
      "Operational audit to identify automation-ready processes",
      "AI-powered lead scoring and qualification workflows",
      "Automated nurture sequences with behavioral triggers",
      "CRM integration and data synchronization across platforms",
      "Intelligent routing systems for leads, tasks, and communications",
      "Performance monitoring with automated alerting and reporting",
    ],
    outcomes: [
      "Dramatically reduced manual effort in repetitive processes",
      "Faster response times to leads and client communications",
      "Consistent quality control regardless of volume",
      "Scalable operations without proportional headcount increases",
      "Freed team capacity for high-value strategic work",
    ],
    contactService: "AI Automation and Systems",
  },
  "seo": {
    title: "SEO & Digital Visibility",
    subtitle: "Organic growth systems built on structural authority that compound visibility over time.",
    problem: "SEO is often treated as a checklist rather than a growth system. Technical issues go unresolved, content is produced without strategic direction, and authority building happens accidentally rather than deliberately. The result is stagnant organic visibility despite ongoing investment.",
    strategy: "SEO & Digital Visibility builds the technical foundation, content architecture, and authority framework required for compounding organic growth. Rather than chasing algorithm updates, the focus is on creating structural advantages that become more valuable over time.",
    approach: [
      "Technical SEO audit and infrastructure optimization",
      "Content architecture aligned to search intent and business objectives",
      "Authority building through strategic link acquisition and partnerships",
      "Local and international SEO frameworks where applicable",
      "Content production systems with SEO integration at every stage",
      "Performance tracking with organic revenue attribution",
    ],
    outcomes: [
      "Steadily increasing organic visibility across target keywords",
      "Content that serves both reader intent and business objectives",
      "Technical foundation that supports rather than hinders growth",
      "Compounding organic traffic as authority accumulates",
      "Reduced dependency on paid channels for demand generation",
    ],
    contactService: "General Inquiry",
  },
  "digital-products": {
    title: "Digital Product Systems",
    subtitle: "End-to-end systems for launching and scaling digital products from concept to consistent revenue.",
    problem: "Most digital product launches fail not from a lack of ideas, but from a lack of systematic execution. Market validation is skipped, launch infrastructure is improvised, and post-launch optimization is neglected. Products with genuine value never reach the audiences they could serve.",
    strategy: "Digital Product Systems provide the complete infrastructure for taking a digital product from validated concept to sustainable revenue. Market validation frameworks, launch engineering, pricing architecture, and post-launch optimization systems ensure that every launch builds on the intelligence gathered from the last.",
    approach: [
      "Market validation frameworks with structured testing protocols",
      "Product positioning and messaging architecture",
      "Launch infrastructure including sales pages, email sequences, and payment systems",
      "Pricing strategy and packaging design for optimal conversion",
      "Post-launch optimization systems for continuous improvement",
      "Scaling frameworks for expanding reach and revenue",
    ],
    outcomes: [
      "Validated product concepts before significant resource investment",
      "Launch infrastructure that can be replicated and refined",
      "Pricing architecture optimized for both conversion and revenue",
      "Post-launch data systems for continuous improvement",
      "Scalable digital revenue streams independent of services",
    ],
    contactService: "General Inquiry",
  },
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceData[slug] : null;

  if (!service) {
    return (
      <div className="pt-20 section-padding section-y text-center">
        <h1 className="font-heading text-3xl text-foreground mb-4">Service not found</h1>
        <Link to="/services" className="text-accent hover:underline">Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="section-padding section-y">
        <div className="max-w-[800px] mx-auto">
          <ScrollReveal>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-10"
            >
              <ArrowLeft size={14} />
              All Services
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-6">
              {service.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-lg text-muted-foreground leading-relaxed mb-16">
              {service.subtitle}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="mb-14">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">The Problem</h2>
              <p className="text-muted-foreground leading-relaxed">{service.problem}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-14">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">The Strategy</h2>
              <p className="text-muted-foreground leading-relaxed">{service.strategy}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-14">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">System Approach</h2>
              <ul className="space-y-3">
                {service.approach.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start text-muted-foreground leading-relaxed">
                    <span className="text-xs text-muted-foreground/60 font-medium mt-1.5 shrink-0">0{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-14">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">Expected Outcomes</h2>
              <ul className="space-y-3">
                {service.outcomes.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start text-muted-foreground leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ScrollReveal>
        <CTABlock service={service.contactService} />
      </ScrollReveal>
    </div>
  );
};

export default ServiceDetail;
