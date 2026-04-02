import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import CTABlock from "@/components/CTABlock";
import ScrollReveal from "@/components/ScrollReveal";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import { AnimatedWords, AnimatedChars } from "@/components/AnimatedText";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import heroTexture from "@/assets/hero-texture.jpg";

const useIsTabletOrMobile = () => {
  const [isTabletOrMobile, setIsTabletOrMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsTabletOrMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isTabletOrMobile;
};

import * as React from "react";

const faqItems = [
  { question: "Do I need a large team or big budget to work with BitwellForge", answer: "No. Most of our clients start as solo operators or small teams. We build systems that work with the resources you already have and scale as your business grows" },
  { question: "How is this different from hiring a marketing agency", answer: "A typical agency runs campaigns for you. We build the infrastructure that makes all your acquisition efforts compound over time. You own the system. It runs whether or not we are actively involved" },
  { question: "How long before I start seeing results", answer: "Most clients see pipeline movement within the first 30 to 45 days. Full system compounding typically becomes visible between 60 and 90 days depending on the engagement" },
  { question: "Do you work with businesses outside India", answer: "Yes. We work with clients across multiple countries. Our systems are built for remote collaboration and are not limited by geography" },
  { question: "What does the process look like after I reach out", answer: "We start with a discovery call to understand your business, goals, and current acquisition situation. From there we map out a system tailored to your specific needs before any engagement begins" },
  { question: "Is there a minimum commitment period", answer: "Engagements are structured based on what your business actually needs. We discuss timeline and commitment openly during the discovery call so there are no surprises" },
  { question: "Do you run ads or is this purely organic", answer: "We build systems that work without ad dependency. If paid channels make strategic sense for your business we can incorporate them but we never build growth that collapses when ad spend stops" },
  { question: "What kind of businesses do you work with", answer: "We work with agencies, independent consultants, coaches, and service based businesses that are ready to replace unpredictable referral based growth with a structured acquisition system" },
];

const services = [
  { title: "Growth Strategy", description: "A clear roadmap connecting your goals to measurable acquisition outcomes, built for long term momentum.", href: "/services/growth-strategy" },
  { title: "High Ticket Sales Systems", description: "Structured pipelines that turn qualified prospects into committed, long term clients.", href: "/services/sales-systems" },
  { title: "Performance Marketing", description: "Precision campaigns engineered for compounding returns, not vanity metrics.", href: "/services/performance-marketing" },
  { title: "B2B Lead Generation", description: "Systematic engines filling your pipeline with qualified, high intent prospects at enterprise scale.", href: "/services/lead-generation" },
  { title: "LinkedIn Positioning", description: "Authority frameworks that position founders and leadership teams as trusted voices in their market.", href: "/services/linkedin" },
  { title: "AI & Automation", description: "Intelligent workflows that remove friction from your operations and scale without adding headcount.", href: "/services/ai-automation" },
];

const Index = () => {
  const isMobile = useIsMobile();
  const isTabletOrMobile = useIsTabletOrMobile();
  const isTabletOnly = isTabletOrMobile && !isMobile;
  const prefersReduced = useReducedMotion();

  // Stagger delays for mobile/tablet scroll entry
  const labelDelay = isTabletOrMobile ? 0.5 : 0.5;
  const headingDelay = isTabletOrMobile ? 0.6 : 0.7;
  const paraDelay = isTabletOrMobile ? 0.8 : 1.5;
  const ctaDelay = isTabletOrMobile ? 1.0 : 1.8;

  return (
    <div>
      {/* Hero */}
      <section
        className={`section-padding min-h-screen flex items-center relative overflow-hidden ${
          isTabletOrMobile ? "!px-[20px] md:!px-[32px]" : ""
        }`}
      >
        {/* Background texture with parallax */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center opacity-[0.07] dark:opacity-[0.15] pointer-events-none"
          style={{ backgroundImage: `url(${heroTexture})` }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className={`max-w-[1400px] mx-auto w-full pt-20 relative z-10 ${isTabletOrMobile ? "text-left" : ""}`}>
          <div className={`max-w-3xl ${isTabletOrMobile ? "w-full" : ""}`}>
            <motion.p
              className={`font-medium text-muted-foreground uppercase ${
                isTabletOrMobile
                  ? "text-[11px] md:text-[12px] tracking-[1.5px] opacity-70 mb-[12px]"
                  : "text-sm tracking-widest mb-8"
              }`}
              initial={prefersReduced ? false : { opacity: 0, letterSpacing: "0.4em", y: 10 }}
              animate={{ opacity: isTabletOrMobile ? 0.7 : 1, letterSpacing: isTabletOrMobile ? "1.5px" : "0.1em", y: 0 }}
              transition={{ duration: 0.8, delay: labelDelay, ease: [0.22, 1, 0.36, 1] }}
            >
              Strategic Growth Systems
            </motion.p>

            <AnimatedWords
              text="Growth doesn't fail from lack of effort. It fails from lack of structure."
              className={`font-heading font-semibold text-foreground text-balance ${
                isTabletOrMobile
                  ? "text-[28px] md:text-[36px] leading-[1.25] mb-[16px] max-w-[95%]"
                  : "text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-8"
              }`}
              stagger={0.06}
              delay={headingDelay}
            />

            <motion.p
              className={`text-muted-foreground leading-relaxed ${
                isTabletOrMobile
                  ? "text-[14px] md:text-[16px] leading-[1.6] opacity-80 max-w-[90%] mb-[28px]"
                  : "text-lg md:text-xl max-w-xl mb-12"
              }`}
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: isTabletOrMobile ? 0.8 : 1, y: 0 }}
              transition={{ duration: 0.8, delay: paraDelay, ease: [0.22, 1, 0.36, 1] }}
            >
              The acquisition systems behind consistent, qualified demand for businesses ready to scale with clarity.
            </motion.p>

            <motion.div
              className={`relative ${
                isTabletOrMobile
                  ? `flex flex-col gap-[12px] ${isTabletOnly ? "max-w-[480px] mx-auto" : "w-full"}`
                  : "flex flex-col sm:flex-row gap-4"
              }`}
              initial={prefersReduced ? false : { opacity: 0, y: 25, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: ctaDelay, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {/* Radial gradient behind CTA - mobile/tablet only */}
              {isTabletOrMobile && (
                <div
                  className="absolute inset-0 -bottom-8 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at center bottom, hsl(var(--primary) / 0.08), transparent 70%)",
                  }}
                />
              )}
              <Link
                to="/contact?service=General+Inquiry"
                className={`group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-full text-sm font-medium tracking-wide transition-transform duration-300 relative z-10 ${
                  isTabletOrMobile
                    ? "w-full h-[52px] md:h-[54px] active:scale-[0.96] active:shadow-[0_0_20px_hsl(var(--primary)/0.25)]"
                    : "px-8 py-4 hover:scale-[1.06] active:scale-[0.97]"
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)", borderRadius: "999px" }}
              >
                Start the Conversation
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className={`group inline-flex items-center justify-center gap-2 border border-border text-foreground rounded-full text-sm font-medium tracking-wide transition-all duration-300 relative z-10 ${
                  isTabletOrMobile
                    ? "w-full h-[48px] opacity-[0.83] active:scale-[0.98] active:opacity-90 active:border-foreground/30"
                    : "px-8 py-4 hover:bg-secondary hover:scale-[1.06] active:scale-[0.97]"
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)", borderRadius: "999px" }}
              >
                The Philosophy
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding section-y border-t border-border">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div>
              <ScrollReveal>
                <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6">Philosophy</p>
              </ScrollReveal>
              <AnimatedChars
                text="Clarity is the foundation of every growth system worth building."
                as="h2"
                className="font-heading font-semibold text-foreground leading-tight mb-6"
                style={{ fontSize: "clamp(26px, 4vw, 52px)", wordBreak: "normal", overflowWrap: "break-word", hyphens: "none" }}
                stagger={0.015}
              />
            </div>
            <ScrollReveal delay={200}>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Most businesses don't lack ambition. They lack architecture. When scattered tactics are replaced with structured systems, results compound naturally over time.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding section-y bg-secondary/50">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6">Systems Built for You</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-16 text-balance">
              Infrastructure for sustainable growth.
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 100} variant="scale">
                <ServiceCard {...service} index={i} />
              </ScrollReveal>
            ))}
          </div>

          {/* Engagement Options */}
          <div className="mt-24">
            <ScrollReveal>
              <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4">Engagement Options</p>
              <p className="text-sm text-muted-foreground mb-12">All engagements begin with a discovery call to ensure the right fit</p>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Foundation */}
              <ScrollReveal delay={0} variant="scale">
                <div className="h-full flex flex-col p-8 md:p-10 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl hover:shadow-[0_20px_60px_hsl(var(--foreground)/0.08)] hover:-translate-y-1 transition-all duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
                  <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-3">Foundation</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    For businesses ready to build their first structured acquisition system
                  </p>
                  <div className="text-sm text-muted-foreground leading-relaxed space-y-2 mb-8 flex-1">
                    <p>Clarity mapping and ICP definition</p>
                    <p>Outreach system setup</p>
                    <p>Lead qualification framework</p>
                  </div>
                  <Link
                    to="/contact?service=Foundation+Engagement"
                    className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium tracking-wide hover:scale-[1.06] active:scale-[0.97] transition-transform duration-300"
                    style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                  >
                    Start the Conversation
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </ScrollReveal>

              {/* Growth System */}
              <ScrollReveal delay={150} variant="scale">
                <div className="h-full flex flex-col p-8 md:p-10 rounded-2xl border border-accent/40 bg-card/80 backdrop-blur-xl shadow-[0_8px_30px_hsl(var(--foreground)/0.06)] relative hover:shadow-[0_20px_60px_hsl(var(--foreground)/0.1)] hover:-translate-y-1 transition-all duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
                  <span className="absolute top-4 right-4 text-xs font-medium text-accent tracking-wide uppercase">Most Popular</span>
                  <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-3">Growth System</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    Full stack demand infrastructure for businesses ready to scale consistently
                  </p>
                  <div className="text-sm text-muted-foreground leading-relaxed space-y-2 mb-8 flex-1">
                    <p>Everything in Foundation</p>
                    <p>High ticket sales system</p>
                    <p>LinkedIn positioning</p>
                    <p>Content distribution</p>
                    <p>Pipeline automation</p>
                  </div>
                  <Link
                    to="/contact?service=Growth+System+Engagement"
                    className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium tracking-wide hover:scale-[1.06] active:scale-[0.97] transition-transform duration-300"
                    style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                  >
                    Start the Conversation
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </ScrollReveal>

              {/* Enterprise */}
              <ScrollReveal delay={300} variant="scale">
                <div className="h-full flex flex-col p-8 md:p-10 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl hover:shadow-[0_20px_60px_hsl(var(--foreground)/0.08)] hover:-translate-y-1 transition-all duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
                  <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-3">Enterprise</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    Custom growth architecture for established businesses scaling across multiple markets
                  </p>
                  <div className="text-sm text-muted-foreground leading-relaxed space-y-2 mb-8 flex-1">
                    <p>Full system design</p>
                    <p>Performance marketing</p>
                    <p>AI automation</p>
                    <p>PR and brand credibility</p>
                    <p>Ongoing optimization</p>
                  </div>
                  <Link
                    to="/contact?service=Enterprise+Engagement"
                    className="group inline-flex items-center justify-center gap-2 border border-border text-foreground px-6 py-3 rounded-full text-sm font-medium tracking-wide hover:bg-secondary hover:scale-[1.06] active:scale-[0.97] transition-all duration-300"
                    style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                  >
                    Let's Talk
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <CaseStudiesSection showLink />

      {/* Process Preview */}
      <section className="section-padding section-y border-t border-border">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <ScrollReveal>
                <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6">Process</p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-6 text-balance">
                  From clarity to compounding results.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  A five phase framework that transforms ambiguity into actionable growth architecture, step by deliberate step.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <Link
                  to="/process"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors duration-300"
                >
                  View the process
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }} />
                </Link>
              </ScrollReveal>
            </div>
            <div className="space-y-6">
              {["Clarity Mapping", "System Architecture", "Acquisition Engineering", "Integration & Automation", "Measurement & Optimization"].map((step, i) => (
                <ScrollReveal key={step} delay={i * 120} direction="left">
                  <div className="flex gap-4 items-start group hover:translate-x-2 transition-transform duration-400" style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
                    <span className="text-sm font-medium text-muted-foreground w-6 mt-0.5 group-hover:text-accent transition-colors duration-500">0{i + 1}</span>
                    <h4 className="font-heading text-lg font-medium text-foreground">{step}</h4>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why BitwellForge */}
      <section className="section-padding section-y bg-primary text-primary-foreground">
        <div className="max-w-[1400px] mx-auto text-center">
          <ScrollReveal variant="scale">
            <p className="text-sm font-medium opacity-60 tracking-widest uppercase mb-6">Why It Works</p>
            <h2 className="font-heading text-3xl md:text-5xl font-semibold mb-16 text-balance max-w-3xl mx-auto">
              Systems that outlast trends, built for businesses that think long term.
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {[
              { title: "Systems, Not Tactics", desc: "Every engagement produces infrastructure that compounds. Not campaigns that expire." },
              { title: "Clarity First", desc: "Diagnosis before prescription. Understanding always precedes execution." },
              { title: "Long Term Partnership", desc: "Success is measured alongside yours. In years, not quarters." },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 150}>
                <div>
                  <h3 className="font-heading text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-sm opacity-70 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-y border-t border-border">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6">Frequently Asked Questions</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Accordion type="single" collapsible className="w-full max-w-3xl">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-border/60">
                  <AccordionTrigger className="text-left font-heading text-base md:text-lg font-medium text-foreground hover:no-underline py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
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
