import CTABlock from "@/components/CTABlock";
import ScrollReveal from "@/components/ScrollReveal";

const About = () => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding section-y">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl">
            <ScrollReveal>
              <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6">About</p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <h1 className="font-display text-4xl md:text-6xl font-medium text-foreground leading-[1.1] tracking-[-0.025em] mb-8 text-balance">
                Sustainable growth is designed, not forced.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                BitwellForge brings structural clarity to ambitious businesses. Not a marketing agency. A growth systems architecture practice.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding section-y border-t border-border">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <ScrollReveal>
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6">The Philosophy</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Most growth failures aren't caused by a lack of effort. They're caused by a lack of architecture. Businesses invest in channels, campaigns, and tools without a unifying structure.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The question most skip: <em className="text-foreground">"What system would make growth inevitable?"</em> That's where every engagement begins.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6">The Belief</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Growth is not a series of tactics. It is infrastructure. When acquisition, conversion, and retention are designed as interconnected systems, results compound naturally.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                That infrastructure is built with precision, patience, and partnership.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Vision */}
      <section className="section-padding section-y bg-secondary/50">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6">Long-Term Vision</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-8 text-balance">
                A world where businesses grow through design, not desperation.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Every system is built for longevity. Not optimized for quick wins, but engineered for enduring impact. Success is measured in years, not quarters.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Thinking */}
      <section className="section-padding section-y border-t border-border">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6">System Design Thinking</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Diagnose First", desc: "Solutions are never prescribed before understanding the full picture. Every engagement begins with deep strategic analysis." },
              { title: "Architecture Over Execution", desc: "A well-designed system outperforms a well-executed tactic every time. The investment goes into structural design." },
              { title: "Compounding Returns", desc: "Systems designed to improve with time. The longer they run, the more effective they become." },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 150}>
                <div className="p-8 rounded-2xl border border-border bg-card/70 backdrop-blur-sm hover:bg-card/80 hover:shadow-[0_8px_30px_hsl(var(--foreground)/0.06)] hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTABlock />
    </div>
  );
};

export default About;
