import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  {
    n: "01",
    title: "Diagnostic",
    body: "Audit acquisition systems, positioning, revenue flow, operational friction, and infrastructure gaps.",
  },
  {
    n: "02",
    title: "Architecture",
    body: "Design the acquisition, automation, visibility, and revenue systems around the client's business model and growth objectives.",
  },
  {
    n: "03",
    title: "Deployment",
    body: "Implement workflows, CRM logic, outbound systems, reporting layers, automation infrastructure, and operational frameworks.",
  },
  {
    n: "04",
    title: "Optimization",
    body: "Continuously refine performance, conversion efficiency, operational clarity, and scalability over time.",
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
                Structured systems.{" "}
                <span className="font-quote italic text-gold/95">Clear implementation.</span>
              </h2>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-5">
            <ScrollReveal delay={200}>
              <p className="text-muted-foreground text-[14.5px] md:text-[15.5px] leading-[1.85] font-light">
                Every engagement is designed to identify bottlenecks, engineer infrastructure, and create compounding operational leverage.
              </p>
            </ScrollReveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gold/15 border border-gold/15 rounded-xl overflow-hidden">
          {steps.map((s, i) => (
            <ScrollReveal key={s.n} delay={i * 100}>
              <div className="h-full bg-background p-7 md:p-9 flex flex-col">
                <span className="font-quote italic text-gold text-2xl mb-6">{s.n}</span>
                <h3 className="font-heading text-xl md:text-[22px] font-semibold text-foreground mb-4 tracking-tightest">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-[14px] leading-[1.8] font-light">
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
