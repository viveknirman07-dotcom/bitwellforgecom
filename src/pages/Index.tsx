import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import CTABlock from "@/components/CTABlock";

const services = [
  { title: "Growth Strategy", description: "Architecting acquisition roadmaps built on data, clarity, and sustainable momentum.", href: "/services#growth-strategy" },
  { title: "High-Ticket Sales Systems", description: "Structured pipelines that convert qualified prospects into long-term clients.", href: "/services#sales-systems" },
  { title: "Performance Marketing", description: "Precision-engineered campaigns that deliver measurable, compounding returns.", href: "/services#performance-marketing" },
  { title: "B2B Lead Generation", description: "Systematic outbound and inbound engines designed for enterprise-grade demand.", href: "/services#lead-generation" },
  { title: "LinkedIn Positioning", description: "Authority-building frameworks for founders and leadership teams.", href: "/services#linkedin" },
  { title: "AI & Automation", description: "Intelligent workflows that eliminate friction and scale operations effortlessly.", href: "/services#ai-automation" },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="section-padding min-h-screen flex items-center">
        <div className="max-w-[1400px] mx-auto w-full pt-20">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-8 animate-fade-up">
              Strategic Growth Systems
            </p>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.1] mb-8 text-balance animate-fade-up-delay-1">
              Growth doesn't fail from lack of effort. It fails from lack of structure.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-12 leading-relaxed animate-fade-up-delay-2">
              We design the acquisition systems that create consistent, qualified demand for ambitious businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up-delay-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:opacity-90 transition-opacity duration-300"
              >
                Book a Strategy Call
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-secondary transition-colors duration-300"
              >
                Our Philosophy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding section-y border-t border-border">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6">Philosophy</p>
              <h2 className="font-heading text-3xl md:text-5xl font-semibold text-foreground leading-tight mb-6 text-balance">
                Clarity is the foundation of every growth system we build.
              </h2>
            </div>
            <div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Most businesses don't lack ambition — they lack architecture. We replace scattered tactics with structured systems that compound over time. Every engagement begins with understanding, not execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding section-y bg-secondary/50">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6">Systems We Build</p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-16 text-balance">
            Infrastructure for sustainable growth.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.title} {...service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Preview */}
      <section className="section-padding section-y border-t border-border">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6">Process</p>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-6 text-balance">
                From clarity to compounding results.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our five-phase framework transforms ambiguity into actionable growth architecture.
              </p>
              <Link
                to="/process"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors duration-300"
              >
                View our process
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-6">
              {["Clarity Mapping", "System Architecture", "Acquisition Engineering", "Integration & Automation", "Measurement & Optimization"].map((step, i) => (
                <div key={step} className="flex gap-4 items-start">
                  <span className="text-sm font-medium text-muted-foreground w-6 mt-0.5">0{i + 1}</span>
                  <div>
                    <h4 className="font-heading text-lg font-medium text-foreground">{step}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why BitwellForge */}
      <section className="section-padding section-y bg-primary text-primary-foreground">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-sm font-medium opacity-60 tracking-widest uppercase mb-6">Why BitwellForge</p>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold mb-16 text-balance max-w-3xl mx-auto">
            We don't chase trends. We build systems that outlast them.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {[
              { title: "Systems, Not Tactics", desc: "Every engagement produces infrastructure — not one-off campaigns that expire." },
              { title: "Clarity First", desc: "We diagnose before we prescribe. Understanding always precedes execution." },
              { title: "Long-Term Partnerships", desc: "We grow alongside our clients. Our success is measured by yours." },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-heading text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABlock />
    </div>
  );
};

export default Index;
