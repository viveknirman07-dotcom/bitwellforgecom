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
    <section className="relative section-padding py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-14 md:mb-20">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-5">
                How Engagements Work
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="font-heading text-3xl md:text-[44px] lg:text-[52px] font-semibold text-foreground leading-[1.08] tracking-tightest text-balance">
                How the architecture{" "}
                <span className="font-quote italic text-gold/95">gets built.</span>
              </h2>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-5">
            <ScrollReveal delay={200}>
              <p className="text-muted-foreground text-[14.5px] md:text-[15.5px] leading-[1.85] font-light">
                Five deliberate phases. Every engagement moves from diagnostic to architecture, then into execution and compounding optimization.
              </p>
            </ScrollReveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-gold/15 border border-gold/15 rounded-xl overflow-hidden">
          {steps.map((s, i) => (
            <ScrollReveal key={s.n} delay={i * 100}>
              <div className="h-full bg-background p-7 md:p-8 flex flex-col">
                <span className="font-quote italic text-gold text-2xl mb-6">{s.n}</span>
                <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground mb-4 tracking-tightest">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-[13.5px] leading-[1.8] font-light">
                  {s.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowEngagementsWork;
