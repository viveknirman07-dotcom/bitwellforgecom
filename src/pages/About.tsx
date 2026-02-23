import CTABlock from "@/components/CTABlock";

const About = () => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding section-y">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6 animate-fade-up">About</p>
            <h1 className="font-heading text-4xl md:text-6xl font-semibold text-foreground leading-tight mb-8 text-balance animate-fade-up-delay-1">
              We believe sustainable growth is designed, not forced.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed animate-fade-up-delay-2">
              BitwellForge exists to bring structural clarity to ambitious businesses. We are not a marketing agency. We are growth systems architects.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding section-y border-t border-border">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-6">Our Philosophy</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Most growth failures aren't caused by a lack of effort — they're caused by a lack of architecture. Businesses invest in channels, campaigns, and tools without a unifying structure.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We start with the question most skip: <em className="text-foreground">"What system would make growth inevitable?"</em> Then we build it.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-6">Our Belief</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Growth is not a series of tactics. It is infrastructure. When acquisition, conversion, and retention are designed as interconnected systems, results compound naturally.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We build that infrastructure with precision, patience, and partnership.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section-padding section-y bg-secondary/50">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6">Long-Term Vision</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-8 text-balance">
              We envision a world where businesses grow through design, not desperation.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Every system we create is built for longevity. We don't optimize for quick wins — we engineer for enduring impact. Our work is measured in years, not quarters.
            </p>
          </div>
        </div>
      </section>

      {/* Thinking */}
      <section className="section-padding section-y border-t border-border">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6">System Design Thinking</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Diagnose First", desc: "We never prescribe solutions before understanding the full picture. Every engagement begins with deep strategic analysis." },
              { title: "Architecture Over Execution", desc: "A well-designed system outperforms a well-executed tactic every time. We invest heavily in structural design." },
              { title: "Compounding Returns", desc: "Our systems are designed to improve with time. The longer they run, the more effective they become." },
            ].map((item) => (
              <div key={item.title} className="p-8 rounded-2xl border border-border bg-card">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock />
    </div>
  );
};

export default About;
