import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import CTABlock from "@/components/CTABlock";
import ScrollReveal from "@/components/ScrollReveal";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import { AnimatedWords, AnimatedChars } from "@/components/AnimatedText";
import HeroScene from "@/components/HeroScene";
import ScrollIndicator from "@/components/ScrollIndicator";

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
        {/* Three.js background */}
        <HeroScene />

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
                className="cta-primary inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:scale-[1.04] active:scale-[0.98] transition-all duration-200 relative overflow-hidden group"
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                <span className="relative z-10 flex items-center gap-2 group-hover:text-[#0a0a0a] transition-colors duration-350">
                  Start the Conversation
                  <ArrowRight size={16} />
                </span>
                <span className="absolute inset-0 bg-[#c9a96e] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-350" style={{ transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)" }} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:border-[#c9a96e] hover:text-[#f0ebe0] hover:scale-[1.04] active:scale-[0.98] transition-all duration-200"
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                The Philosophy
              </Link>
            </motion.div>
          </div>
        </div>

        <ScrollIndicator />
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
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-[#c9a96e] transition-colors duration-300"
                >
                  View the process
                  <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>
            <div className="space-y-6">
              {["Clarity Mapping", "System Architecture", "Acquisition Engineering", "Integration & Automation", "Measurement & Optimization"].map((step, i) => (
                <ScrollReveal key={step} delay={i * 200} direction="left">
                  <div className="flex gap-4 items-start group">
                    <span className="text-sm font-medium text-muted-foreground w-6 mt-0.5 group-[.is-visible]:text-[#c9a96e] transition-colors duration-500">0{i + 1}</span>
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

      {/* CTA */}
      <ScrollReveal>
        <CTABlock />
      </ScrollReveal>
    </div>
  );
};

export default Index;
