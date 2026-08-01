import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { useSEO } from "@/hooks/use-seo";
import SectionDivider from "@/components/SectionDivider";
import CTABlock from "@/components/CTABlock";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

import ProblemCard from "@/components/home/ProblemCard";
import { LeakyFunnel, ChannelWire, FeedbackLoop } from "@/components/home/ProblemDiagrams";
import ServiceFeature from "@/components/home/ServiceFeature";
import { DemandGraph, RevenueFunnel, PositioningMatrix, AutomationFlow } from "@/components/home/ServiceVisuals";
import StatCounter from "@/components/home/StatCounter";
import QuoteCard from "@/components/home/QuoteCard";
import HowEngagementsWork from "@/components/home/HowEngagementsWork";
import EngagementFormats from "@/components/home/EngagementFormats";

const problems = [
  {
    title: "Leaking Pipelines",
    description:
      "Qualified interest enters the top of the funnel and quietly disappears before it becomes revenue. Without structured qualification, the highest-value conversations are the ones that never happen.",
    diagram: <LeakyFunnel />,
  },
  {
    title: "Single-Channel Dependency",
    description:
      "Commercial growth tied to one platform, one operator, or one campaign. When the channel wavers, so does the business. Durable revenue never sits on a single wire.",
    diagram: <ChannelWire />,
  },
  {
    title: "Absent Feedback Intelligence",
    description:
      "Effort goes out, outcomes come back, and the connection between the two remains invisible. Growth without measurement is a rehearsal that never becomes a performance.",
    diagram: <FeedbackLoop />,
  },
];

const services = [
  {
    tag: "Client Acquisition Architecture",
    title: "From Invisible to In-Demand",
    body:
      "Outbound sequencing, inbound demand capture, and trigger-based nurture designed against your specific sales cycle. ICP definition, channel selection, and message architecture engineered for pipeline density rather than surface reach.",
    visual: <DemandGraph />,
  },
  {
    tag: "High-Ticket Revenue Systems",
    title: "Offers That Close. Sales Motions That Compound.",
    body:
      "A precise commercial offer, a repeatable discovery motion, and the conversion architecture behind it. Scripts, sequencing, objection handling, and CRM logic tuned so revenue behaves predictably instead of episodically.",
    visual: <RevenueFunnel />,
  },
  {
    tag: "Commercial Growth Strategy",
    title: "Clarity Before Campaigns",
    body:
      "A structured diagnostic that resolves positioning, pricing, and category before any execution begins. Strategy grounds every downstream decision in commercial logic rather than in preference.",
    visual: <PositioningMatrix />,
  },
  {
    tag: "AI-Powered Revenue Operations",
    title: "Human Attention on Human Work",
    body:
      "An operations audit that identifies every workflow suitable for automation, then intelligent execution across scoring, routing, nurture, and reporting. Your team stops touching repeatable tasks and starts owning irreplaceable ones.",
    visual: <AutomationFlow />,
  },
];

const stats = [
  { value: 11, suffix: "", label: "Qualified calls in 6 weeks", sub: "from a standing start" },
  { value: 4800, prefix: "$", label: "Closed in 30 days", sub: "with zero paid spend" },
  { value: 3, suffix: "×", label: "Pipeline density", sub: "within 90 days" },
  { value: 14, suffix: " hrs", label: "Reclaimed weekly", sub: "through automation" },
];

const testimonials = [
  {
    quote:
      "Before BitwellForge, I was posting, cold emailing, and hoping. Six weeks into our engagement I had eleven qualified calls on the calendar from an outreach motion I no longer had to run daily. That is not luck. That is architecture.",
    author: "Marcus T.",
    role: "B2B Consulting Firm Founder",
  },
  {
    quote:
      "I had been sitting on a high-ticket offer for three months, unsure how to sell it. They rebuilt the positioning, wrote the conversation sequence, and coached me through the pitch. I closed $4,800 in the first thirty days on organic conversations alone.",
    author: "Danielle R.",
    role: "Executive Coach",
  },
  {
    quote:
      "I was spending twenty hours a week on operational work that should never have touched me. After the automation build, that number dropped below six. Same client volume, a fraction of the operational drag.",
    author: "James O.",
    role: "Independent Consultant",
  },
];

const faqItems = [
  { question: "Do I need a large team or a large budget to work with BitwellForge", answer: "No. Most of our clients begin as solo operators or small teams. We build against the resources you already have and scale the architecture as commercial capacity grows." },
  { question: "How is this different from hiring a marketing agency", answer: "An agency runs campaigns on your behalf. We build the commercial architecture that makes every acquisition effort compound. You own the operating layer and it continues to work whether or not we are actively involved." },
  { question: "How long before results become visible", answer: "Most engagements show pipeline movement within thirty to forty-five days. Full compounding across acquisition, sales, and operations typically becomes visible between sixty and ninety days depending on scope." },
  { question: "Do you work with businesses outside India", answer: "Yes. We operate across multiple markets. Our engagements are built for remote collaboration and are not constrained by geography." },
  { question: "What happens after I reach out", answer: "We open with a discovery conversation to understand your business, your commercial context, and your current acquisition posture. From there we map the architecture we would build before any engagement begins." },
];

const Index = () => {
  const reduced = useReducedMotion();
  useSEO({
    title: "BitwellForge | Commercial Growth Consultancy for B2B Businesses",
    description:
      "BitwellForge builds commercial growth architecture for agencies, consultants, and B2B service businesses. Client acquisition, revenue systems, positioning, and AI-powered operations engineered to compound.",
    canonicalPath: "/",
  });

  return (
    <div className="relative">
      {/* Page-level noise */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-noise opacity-[0.035] mix-blend-overlay" aria-hidden />

      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center section-padding overflow-hidden bg-background">
        <div className="relative z-10 max-w-[1400px] mx-auto w-full pt-24 md:pt-28 pb-16">
          <div className="max-w-3xl">
            <motion.p
              className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-gold mb-6 md:mb-8"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              A Growth Practice
            </motion.p>

            <motion.h1
              className="font-heading font-semibold text-foreground tracking-tightest leading-[1.02] text-balance text-[40px] xs:text-[44px] sm:text-5xl md:text-6xl lg:text-[78px] xl:text-[86px] mb-7 md:mb-10"
              initial={reduced ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              What's assembled breaks down.
              <br />
              <span className="font-quote italic text-foreground/95">What's engineered compounds.</span>
            </motion.h1>

            <motion.p
              className="text-muted-foreground text-[15px] md:text-lg leading-[1.8] font-light max-w-2xl mb-10 md:mb-12"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              BitwellForge works alongside founders and operators building service-based businesses, designing the commercial infrastructure that sustains growth beyond any single campaign.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/contact?service=General+Inquiry"
                data-hero-primary-cta
                className="group inline-flex items-center justify-center gap-2 bg-black text-white dark:bg-gold dark:text-navy px-7 py-4 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/90 dark:hover:bg-white dark:hover:text-navy hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_12px_40px_hsl(0_0%_100%/0.18)] active:scale-[0.98]"
              >
                Book Infrastructure Audit
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/case-studies"
                data-hero-secondary-cta
                className="group inline-flex items-center justify-center gap-2 border border-foreground text-foreground px-7 py-4 rounded-full text-[13px] font-medium tracking-[0.1em] uppercase transition-all duration-300 hover:bg-foreground hover:text-background active:scale-[0.98]"
              >
                See Case Studies
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>

      </section>

      {/* PROBLEM */}
      <section className="relative section-padding py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16 md:mb-20">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-5">
                  What Is Actually Broken
                </p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="font-heading text-3xl md:text-[44px] lg:text-[52px] font-semibold text-foreground leading-[1.08] tracking-tightest text-balance">
                  Most businesses do not have a growth problem. They have an{" "}
                  <span className="font-quote italic text-gold/95">architecture</span> problem.
                </h2>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-5">
              <ScrollReveal delay={200}>
                <p className="text-muted-foreground text-[14.5px] md:text-[15.5px] leading-[1.85] font-light">
                  Leads arrive but do not convert. Outbound gets started and quietly exhausts the team. Paid spend produces movement, then dries up the moment budget pauses. The issue is rarely effort. It is that the commercial engine was assembled from tactics rather than engineered as a whole.
                </p>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
            {problems.map((p, i) => (
              <ProblemCard key={p.title} {...p} delay={i * 120} />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* WHAT WE BUILD */}
      <section className="relative section-padding py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <ScrollReveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-5">
                What We Build
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="font-heading text-3xl md:text-[44px] lg:text-[52px] font-semibold text-foreground leading-[1.08] tracking-tightest text-balance mb-6">
                Four commercial disciplines. One{" "}
                <span className="font-quote italic text-gold/95">compounding</span> growth engine.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <p className="text-muted-foreground text-[15px] leading-[1.8] font-light">
                Acquisition, revenue, positioning, and operations engineered as interlocking layers. Every layer strengthens the next, and value accrues the longer the architecture operates.
              </p>
            </ScrollReveal>
          </div>

          <div>
            {services.map((s, i) => (
              <ServiceFeature key={s.tag} index={i} reverse={i % 2 === 1} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS / NUMBERS */}
      <section className="relative section-padding py-24 md:py-32 overflow-hidden border-y border-gold/15">
        <div className="absolute inset-0 bg-radial-gold pointer-events-none" />
        <div className="absolute inset-0 bg-gold-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <ScrollReveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-5">Outcomes</p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="font-heading text-3xl md:text-[44px] lg:text-[52px] font-semibold text-foreground leading-[1.08] tracking-tightest text-balance">
                The numbers speak to the architecture,{" "}
                <span className="font-quote italic text-gold/95">not the effort.</span>
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-10">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 120}>
                <div className="text-center">
                  <div className="font-heading font-semibold text-gold leading-none text-[44px] md:text-[64px] lg:text-[76px] mb-4 tracking-tightest">
                    <StatCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <div className="text-foreground text-[13px] md:text-sm font-medium mb-1">
                    {s.label}
                  </div>
                  <div className="text-muted-foreground/70 text-[11px] md:text-xs font-light">
                    {s.sub}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative section-padding py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
            <ScrollReveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-5">Voices</p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="font-heading text-3xl md:text-[44px] lg:text-[52px] font-semibold text-foreground leading-[1.08] tracking-tightest text-balance font-quote italic">
                What changes when the architecture holds
              </h2>
            </ScrollReveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
            {testimonials.map((t, i) => (
              <QuoteCard key={t.author} {...t} delay={i * 140} />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* HOW ENGAGEMENTS WORK */}
      <HowEngagementsWork />

      {/* ENGAGEMENT FORMATS */}
      <EngagementFormats />

      <SectionDivider />

      {/* FAQ */}
      <section className="relative section-padding py-24 md:py-32">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-5">Common Questions</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="font-heading text-3xl md:text-[40px] lg:text-[48px] font-semibold text-foreground leading-[1.1] tracking-tightest mb-12 text-balance">
              Answers before you ask.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={180}>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-gold/15">
                  <AccordionTrigger className="text-left font-heading text-[16px] md:text-xl font-medium text-foreground hover:no-underline hover:text-gold py-5 md:py-6 transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-[14.5px] leading-[1.8] font-light pb-6">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <CTABlock />
    </div>
  );
};

export default Index;
