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
      <div className="pointer-events-none fixed inset-0 z-0 bg-noise opacity-[0.03] mix-blend-overlay" aria-hidden />

      {/* HERO */}
      <section className="relative flex min-h-[92svh] items-center overflow-hidden section-padding">
        <GridField className="z-0" intensity={0.9} />
        <div className="sheet-inner relative z-10 w-full pb-24 pt-32 md:pt-40">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <motion.p
                className="mb-8 text-[10px] uppercase tracking-[0.28em] text-gold md:text-[11px]"
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                A Growth Practice
              </motion.p>

              <motion.h1
                className="mb-9 font-heading text-[40px] font-semibold leading-[1.02] tracking-tightest text-foreground text-balance xs:text-[44px] sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px]"
                initial={reduced ? false : { opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                What's assembled breaks down.
                <br />
                <span className="font-quote italic text-foreground/95">What's engineered compounds.</span>
              </motion.h1>

              <motion.p
                className="mb-12 max-w-[52ch] text-[15px] font-light leading-[1.75] text-muted-foreground md:text-[16px]"
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                BitwellForge works alongside founders and operators building service-based businesses, designing the commercial infrastructure that sustains growth beyond any single campaign.
              </motion.p>

              <motion.div
                className="flex flex-col gap-3 sm:flex-row sm:gap-4"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to="/contact?service=General+Inquiry"
                  data-hero-primary-cta
                  className="glow-cta group inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-[13px] font-semibold tracking-wide text-white dark:bg-gold dark:text-navy"
                >
                  Book Infrastructure Audit
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/case-studies"
                  data-hero-secondary-cta
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-foreground/30 px-8 py-4 text-[13px] font-medium uppercase tracking-[0.1em] text-foreground transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background active:scale-[0.98]"
                >
                  See Case Studies
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            {/* Right rail: hairline stat ticks */}
            <motion.div
              className="lg:col-span-4 lg:col-start-9 lg:self-end"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {stats.map((s) => (
                <div key={s.label} className="hairline-t py-5">
                  <div className="tnum font-heading text-[26px] font-semibold leading-none tracking-tightest text-foreground">
                    {s.prefix ?? ""}
                    {s.value.toLocaleString()}
                    {s.suffix ?? ""}
                  </div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CINEMATIC PLATE */}
      <section className="relative section-padding pb-24 md:pb-32">
        <div className="sheet-inner">
          <ScrollReveal>
            <CinematicPlayer ratio="16/9" label="BitwellForge" />
          </ScrollReveal>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section-space relative section-padding">
        <div className="sheet-inner">
          <div className="header-gap grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <p className="mb-6 text-[10px] uppercase tracking-[0.28em] text-gold">
                  What Is Actually Broken
                </p>
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <h2 className="font-heading text-[34px] font-semibold leading-[1.06] tracking-tightest text-foreground text-balance md:text-[48px] lg:text-[56px]">
                  Most businesses do not have a growth problem. They have an{" "}
                  <span className="font-quote italic text-gold/95">architecture</span> problem.
                </h2>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-5">
              <ScrollReveal delay={160}>
                <p className="text-[15px] font-light leading-[1.75] text-muted-foreground">
                  Leads arrive but do not convert. Outbound gets started and quietly exhausts the team. Paid spend produces movement, then dries up the moment budget pauses. The issue is rarely effort. It is that the commercial engine was assembled from tactics rather than engineered as a whole.
                </p>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px bg-foreground/10 md:grid-cols-3">
            {problems.map((p, i) => (
              <div key={p.title} className="bg-background py-10 md:py-0">
                <ProblemCard {...p} index={i} delay={i * 100} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="section-space relative section-padding">
        <div className="sheet-inner">
          <div className="header-gap max-w-3xl">
            <ScrollReveal>
              <p className="mb-6 text-[10px] uppercase tracking-[0.28em] text-gold">
                What We Build
              </p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 className="mb-6 font-heading text-[34px] font-semibold leading-[1.06] tracking-tightest text-foreground text-balance md:text-[48px] lg:text-[56px]">
                Four commercial disciplines. One{" "}
                <span className="font-quote italic text-gold/95">compounding</span> growth engine.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <p className="text-[15px] font-light leading-[1.75] text-muted-foreground">
                Acquisition, revenue, positioning, and operations engineered as interlocking layers. Every layer strengthens the next, and value accrues the longer the architecture operates.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {services.map((s, i) => (
              <ServiceFeature key={s.tag} index={i} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS / NUMBERS */}
      <section className="section-space relative overflow-hidden section-padding">
        <GridField className="z-0" intensity={0.35} />
        <div className="sheet-inner relative z-10">
          <div className="header-gap max-w-3xl">
            <ScrollReveal>
              <p className="mb-6 text-[10px] uppercase tracking-[0.28em] text-gold">Outcomes</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 className="font-heading text-[34px] font-semibold leading-[1.06] tracking-tightest text-foreground text-balance md:text-[48px] lg:text-[56px]">
                The numbers speak to the architecture,{" "}
                <span className="font-quote italic text-gold/95">not the effort.</span>
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4 lg:gap-x-10">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 90}>
                <div className="hairline-t pt-8">
                  <div className="mb-6 font-heading text-[46px] font-semibold leading-none tracking-tightest text-foreground md:text-[68px] lg:text-[88px]">
                    <StatCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-foreground">
                    {s.label}
                  </div>
                  <div className="mt-1.5 text-[11px] font-light text-muted-foreground/70">
                    {s.sub}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-space relative section-padding">
        <div className="sheet-inner">
          <div className="header-gap max-w-3xl">
            <ScrollReveal>
              <p className="mb-6 text-[10px] uppercase tracking-[0.28em] text-gold">Voices</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 className="font-heading text-[34px] font-semibold leading-[1.06] tracking-tightest text-foreground text-balance md:text-[48px] lg:text-[56px]">
                What changes when the architecture holds
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:col-span-9 lg:gap-8">
              {testimonials.map((t, i) => (
                <QuoteCard key={t.author} {...t} delay={i * 110} />
              ))}
            </div>
            <div className="lg:col-span-3">
              <ScrollReveal delay={200}>
                <CinematicPlayer ratio="9/16" label="15s" className="mx-auto max-w-[300px] lg:max-w-none" />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* HOW ENGAGEMENTS WORK */}
      <HowEngagementsWork />

      {/* ENGAGEMENT FORMATS */}
      <EngagementFormats />

      {/* FAQ */}
      <section className="section-space relative section-padding">
        <div className="sheet-inner grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <p className="mb-6 text-[10px] uppercase tracking-[0.28em] text-gold">Common Questions</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 className="font-heading text-[34px] font-semibold leading-[1.06] tracking-tightest text-foreground text-balance md:text-[44px]">
                Answers before you ask.
              </h2>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-7">
            <ScrollReveal delay={140}>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-foreground/10">
                    <AccordionTrigger className="py-6 text-left font-heading text-[16px] font-medium text-foreground transition-colors hover:text-gold hover:no-underline md:text-[19px]">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-7 text-[14.5px] font-light leading-[1.8] text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABlock />
    </div>
  );
};

export default Index;

