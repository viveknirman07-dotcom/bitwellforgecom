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
    <section className="relative section-padding py-24 md:py-32 border-t border-gold/15">
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-3xl mb-14 md:mb-20">
          <ScrollReveal>
            <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-5">
              Engagement Formats
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="font-heading text-3xl md:text-[44px] lg:text-[52px] font-semibold text-foreground leading-[1.08] tracking-tightest text-balance">
              Three ways to engage.{" "}
              <span className="font-quote italic text-gold/95">One operating standard.</span>
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {formats.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 100}>
              <div className="border-t border-gold/30 pt-7">
                <span className="font-quote italic text-gold text-xl block mb-5">
                  0{i + 1}
                </span>
                <h3 className="font-heading text-[22px] md:text-2xl font-semibold text-foreground mb-4 tracking-tightest">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-[14.5px] leading-[1.85] font-light">
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
