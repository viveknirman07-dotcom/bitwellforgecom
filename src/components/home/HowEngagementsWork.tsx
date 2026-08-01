import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  {
    n: "01",
    title: "Commercial Audit",
    body: "A structured diagnostic across acquisition, conversion, positioning, and operations. We map where revenue is created and where it quietly leaks.",
  },
  {
    n: "02",
    title: "Strategic Diagnosis",
    body: "Positioning, offer, channel mix, and category logic reviewed against your commercial model. Growth decisions get grounded in evidence, not preference.",
  },
  {
    n: "03",
    title: "Architecture Design",
    body: "A deliberate blueprint covering demand generation, sales motion, automation, and reporting. Every layer designed to reinforce the next.",
  },
  {
    n: "04",
    title: "Execution",
    body: "The architecture gets built. Sequences, workflows, and operating layers deployed with engineering precision rather than theory.",
  },
  {
    n: "05",
    title: "Optimization",
    body: "Measure, refine, compound. The architecture becomes more efficient the longer it runs, because signal now feeds decision.",
  },
];

const HowEngagementsWork = () => {
  return (
    <section className="section-space relative section-padding">
      <div className="sheet-inner">
        <div className="header-gap grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <p className="mb-6 text-[10px] uppercase tracking-[0.28em] text-gold">
                How Engagements Work
              </p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 className="font-heading text-[34px] font-semibold leading-[1.06] tracking-tightest text-foreground text-balance md:text-[48px] lg:text-[56px]">
                How the architecture{" "}
                <span className="font-quote italic text-gold/95">gets built.</span>
              </h2>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-5">
            <ScrollReveal delay={160}>
              <p className="text-[15px] font-light leading-[1.75] text-muted-foreground">
                Five deliberate phases. Every engagement moves from diagnostic to architecture, then into execution and compounding optimization.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Engineering track: horizontal spine on desktop, vertical on mobile */}
        <div className="relative">
          <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-foreground/10 lg:block" />
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-foreground/10 lg:hidden" />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-8">
            {steps.map((s, i) => (
              <ScrollReveal key={s.n} delay={i * 80}>
                <div className="relative pl-9 lg:pl-0 lg:pt-9">
                  <span
                    className="glow-soft absolute left-1 top-1 block h-[13px] w-[13px] rounded-full border border-foreground/35 bg-background lg:left-0 lg:top-0"
                    aria-hidden
                  />
                  <span className="tnum mb-4 block text-[11px] tracking-[0.28em] text-muted-foreground/60">
                    {s.n}
                  </span>
                  <h3 className="mb-4 font-heading text-[20px] font-semibold tracking-tightest text-foreground">
                    {s.title}
                  </h3>
                  <p className="text-[14px] font-light leading-[1.8] text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowEngagementsWork;
