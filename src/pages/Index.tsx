import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import CTABlock from "@/components/CTABlock";
import ScrollReveal from "@/components/ScrollReveal";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import { AnimatedWords, AnimatedChars } from "@/components/AnimatedText";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import heroTexture from "@/assets/hero-texture.jpg";

const faqItems = [
  { question: "Do I need a large team or big budget to work with BitwellForge", answer: "No. Most of our clients start as solo operators or small teams. We build systems that work with the resources you already have and scale as your business grows" },
  { question: "How is this different from hiring a marketing agency", answer: "A typical agency runs campaigns for you. We build the infrastructure that makes all your acquisition efforts compound over time. You own the system. It runs whether or not we are actively involved" },
  { question: "How long before I start seeing results", answer: "Most clients see pipeline movement within the first 30 to 45 days. Full system compounding typically becomes visible between 60 and 90 days depending on the engagement" },
  { question: "Do you work with businesses outside Switzerland", answer: "Yes. We work with clients across multiple countries. Our systems are built for remote collaboration and are not limited by geography" },
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
  return (
    <div>
      {/* Hero */}
      <section className="section-padding min-h-screen flex items-center relative overflow-hidden">
        {/* Background texture */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center opacity-[0.07] dark:opacity-[0.15] pointer-events-none"
          style={{ backgroundImage: `url(${heroTexture})` }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        {/* Subtle grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-[1400px] mx-auto w-full pt-20 relative z-10">
          <div className="max-w-3xl">
            <motion.p
              className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Strategic Growth Systems
            </motion.p>

            <AnimatedWords
              text="Growth doesn't fail from lack of effort. It fails from lack of structure."
              className="font-heading text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.1] mb-8 text-balance"
              stagger={0.08}
              delay={0.5}
            />

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-12 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            >
              The acquisition systems behind consistent, qualified demand for businesses ready to scale with clarity.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:opacity-90 hover:scale-[1.04] active:scale-[0.98] transition-all duration-200"
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                Start the Conversation
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-secondary hover:scale-[1.04] active:scale-[0.98] transition-all duration-200"
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
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
            <ScrollReveal>
              <div>
                <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6">Philosophy</p>
                <AnimatedChars
                  text="Clarity is the foundation of every growth system worth building."
                  as="h2"
                  className="font-heading text-3xl md:text-5xl font-semibold text-foreground leading-tight mb-6 text-balance"
                  stagger={0.02}
                />
              </div>
            </ScrollReveal>
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
              <ScrollReveal key={service.title} delay={i * 150}>
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
              <ScrollReveal delay={0}>
                <div className="h-full flex flex-col p-8 md:p-10 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl">
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
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium tracking-wide hover:opacity-90 hover:scale-[1.04] active:scale-[0.98] transition-all duration-200"
                  >
                    Start the Conversation
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </ScrollReveal>

              {/* Growth System */}
              <ScrollReveal delay={150}>
                <div className="h-full flex flex-col p-8 md:p-10 rounded-2xl border border-accent/40 bg-card/80 backdrop-blur-xl shadow-[0_8px_30px_hsl(var(--foreground)/0.06)] relative">
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
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium tracking-wide hover:opacity-90 hover:scale-[1.04] active:scale-[0.98] transition-all duration-200"
                  >
                    Start the Conversation
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </ScrollReveal>

              {/* Enterprise */}
              <ScrollReveal delay={300}>
                <div className="h-full flex flex-col p-8 md:p-10 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl">
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
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-6 py-3 rounded-full text-sm font-medium tracking-wide hover:bg-secondary hover:scale-[1.04] active:scale-[0.98] transition-all duration-200"
                  >
                    Let's Talk
                    <ArrowRight size={14} />
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
            <ScrollReveal>
              <div>
                <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6">Process</p>
                <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-6 text-balance">
                  From clarity to compounding results.
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  A five phase framework that transforms ambiguity into actionable growth architecture, step by deliberate step.
                </p>
                <Link
                  to="/process"
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors duration-300"
                >
                  View the process
                  <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>
            <div className="space-y-6">
              {["Clarity Mapping", "System Architecture", "Acquisition Engineering", "Integration & Automation", "Measurement & Optimization"].map((step, i) => (
                <ScrollReveal key={step} delay={i * 180} direction="left">
                  <div className="flex gap-4 items-start group hover:translate-x-1.5 transition-transform duration-250" style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}>
                    <span className="text-sm font-medium text-muted-foreground w-6 mt-0.5 group-[.is-visible]:text-accent transition-colors duration-500">0{i + 1}</span>
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
          <ScrollReveal>
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
              <ScrollReveal key={item.title} delay={i * 200}>
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
      <ScrollReveal>
        <CTABlock />
      </ScrollReveal>
    </div>
  );
};

export default Index;
