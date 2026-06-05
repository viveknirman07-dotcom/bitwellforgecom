import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionDivider from "@/components/SectionDivider";
import { useSEO } from "@/hooks/use-seo";
import ProblemCard from "@/components/home/ProblemCard";
import { LeakyFunnel, ChannelWire, FeedbackLoop } from "@/components/home/ProblemDiagrams";
import RevenueArchitecture from "@/components/about/RevenueArchitecture";

const failures = [
  {
    title: "Leaky Pipelines",
    description:
      "Leads enter a pipeline and very few progress. Revenue disappears silently between stages because qualification, follow-up, and ownership were never engineered.",
    diagram: <LeakyFunnel />,
  },
  {
    title: "Channel Dependency",
    description:
      "Revenue attached to a single source. When that source breaks, the entire system weakens. Growth becomes a function of luck rather than design.",
    diagram: <ChannelWire />,
  },
  {
    title: "No Feedback Loop",
    description:
      "Money goes in. Activity happens. No insight returns. Decisions get made on instinct because the system was never built to learn from itself.",
    diagram: <FeedbackLoop />,
  },
];

const About = () => {
  useSEO({
    title: "About | BitwellForge",
    description:
      "BitwellForge engineers revenue infrastructure for B2B businesses. Systems, architecture, and compounding growth.",
    canonicalPath: "/about",
  });

  return (
    <div className="pt-20">
      {/* HERO */}
      <section className="section-padding section-y">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl">
            <ScrollReveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-6 eyebrow">About</p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <h1 className="font-heading text-[36px] md:text-[60px] lg:text-[72px] font-semibold text-foreground leading-[1.04] tracking-tightest mb-8 text-balance">
                Revenue problems rarely start{" "}
                <span className="font-quote italic text-gold/95">where you think.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-muted-foreground text-[15px] md:text-lg leading-[1.85] font-light max-w-2xl">
                BitwellForge does not run marketing campaigns. We engineer the underlying systems that produce predictable, compounding revenue for B2B businesses, consulting firms, and executive-led brands.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* STAGE 1 — System failures */}
      <section className="relative section-padding py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-14 md:mb-20">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-5">
                  Stage One — The Visible Symptoms
                </p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="font-heading text-3xl md:text-[44px] lg:text-[52px] font-semibold text-foreground leading-[1.08] tracking-tightest text-balance">
                  What looks like a growth problem is almost always a{" "}
                  <span className="font-quote italic text-gold/95">structural one.</span>
                </h2>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-5">
              <ScrollReveal delay={200}>
                <p className="text-muted-foreground text-[14.5px] md:text-[15.5px] leading-[1.85] font-light">
                  Three failure patterns appear in nearly every business that has plateaued. None of them are about effort. All of them are about architecture.
                </p>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
            {failures.map((f, i) => (
              <ProblemCard key={f.title} {...f} delay={i * 120} />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* STAGE 2 — Diagnosis */}
      <section className="relative section-padding py-28 md:py-40">
        <div className="max-w-[1100px] mx-auto text-center">
          <ScrollReveal>
            <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-6">
              Stage Two — The Diagnosis
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <h2 className="font-heading text-3xl md:text-[48px] lg:text-[60px] font-semibold text-foreground leading-[1.08] tracking-tightest text-balance mb-8">
              Most businesses don't have a growth problem.
              <br />
              <span className="font-quote italic text-gold/95">They have a systems problem.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <p className="text-muted-foreground text-[15px] md:text-[16px] leading-[1.9] font-light max-w-2xl mx-auto">
              Channels, campaigns, and tools were stacked on top of each other without a unifying structure. The result is motion without compounding. Effort without leverage. Activity without architecture.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* STAGE 3 — Architecture diagram */}
      <section className="relative section-padding py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-5">
                  Stage Three — The Architecture
                </p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="font-heading text-3xl md:text-[44px] lg:text-[52px] font-semibold text-foreground leading-[1.08] tracking-tightest text-balance mb-8">
                  This is what we{" "}
                  <span className="font-quote italic text-gold/95">engineer.</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-muted-foreground text-[15px] leading-[1.9] font-light mb-8">
                  Every system connects back to a single revenue engine. Growth strategy, lead generation, sales infrastructure, LinkedIn positioning, automation, and SEO operate as interconnected layers of the same architecture.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <p className="text-muted-foreground text-[14px] leading-[1.85] font-light">
                  The components are familiar. The structural integration is what makes the system compound.
                </p>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7">
              <ScrollReveal delay={200}>
                <RevenueArchitecture />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* BELIEF */}
      <section className="section-padding py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <ScrollReveal>
            <div>
              <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-5">The Belief</p>
              <h3 className="font-heading text-2xl md:text-[32px] font-semibold text-foreground mb-6 tracking-tightest leading-[1.15]">
                Growth is not a tactic. It is infrastructure.
              </h3>
              <p className="text-muted-foreground text-[15px] leading-[1.9] font-light">
                When acquisition, conversion, and retention are designed as interconnected systems, results compound naturally. The infrastructure is built with precision, patience, and partnership.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div>
              <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-5">The Vision</p>
              <h3 className="font-heading text-2xl md:text-[32px] font-semibold text-foreground mb-6 tracking-tightest leading-[1.15]">
                Businesses that grow through design, not desperation.
              </h3>
              <p className="text-muted-foreground text-[15px] leading-[1.9] font-light">
                Every system is built for longevity. Not optimized for quick wins, but engineered for enduring impact. Success measured in years, not quarters.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding py-24 md:py-32 border-t border-gold/15">
        <div className="max-w-[1100px] mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-[44px] lg:text-[52px] font-semibold text-foreground leading-[1.1] tracking-tightest text-balance mb-10">
              Diagnose the system before you scale the effort.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <Link
              to="/contact?service=Infrastructure+Audit"
              className="group inline-flex items-center justify-center gap-2 bg-black text-white dark:bg-gold dark:text-navy px-7 py-4 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5"
            >
              Diagnose My Growth System
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default About;
