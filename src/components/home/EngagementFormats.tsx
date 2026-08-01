import ScrollReveal from "@/components/ScrollReveal";

const formats = [
  {
    title: "Strategic Advisory",
    body: "Positioning clarity, commercial architecture, and growth strategy shaped alongside your leadership.",
  },
  {
    title: "Architecture Implementation",
    body: "Done-with-you deployment of acquisition, sales, automation, and reporting layers, engineered end to end.",
  },
  {
    title: "Ongoing Optimization",
    body: "Continuous refinement, measurement, and scaling. The architecture matures as the business grows.",
  },
];

const EngagementFormats = () => {
  return (
    <section className="section-space relative section-padding">
      <div className="sheet-inner">
        <div className="header-gap max-w-3xl">
          <ScrollReveal>
            <p className="mb-6 text-[10px] uppercase tracking-[0.28em] text-gold">
              Engagement Formats
            </p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="font-heading text-[34px] font-semibold leading-[1.06] tracking-tightest text-foreground text-balance md:text-[48px] lg:text-[56px]">
              Three ways to engage.{" "}
              <span className="font-quote italic text-gold/95">One operating standard.</span>
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 gap-px bg-foreground/10 md:grid-cols-3">
          {formats.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 80}>
              <div className="h-full bg-background py-10 md:px-8 md:py-2">
                <span className="tnum mb-5 block text-[11px] tracking-[0.28em] text-muted-foreground/60">
                  0{i + 1}
                </span>
                <h3 className="mb-4 font-heading text-[22px] font-semibold tracking-tightest text-foreground">
                  {f.title}
                </h3>
                <p className="text-[14.5px] font-light leading-[1.8] text-muted-foreground">
                  {f.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngagementFormats;
