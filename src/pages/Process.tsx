import CTABlock from "@/components/CTABlock";
import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  {
    number: "01",
    title: "Clarity Mapping",
    description:
      "The engagement begins with a deep understanding of your business. Goals, market position, current systems, and growth constraints. This diagnostic phase reveals the structural gaps most businesses overlook.",
  },
  {
    number: "02",
    title: "System Architecture",
    description:
      "Insights from the clarity phase shape the acquisition architecture. Channels, flows, messaging frameworks, and conversion pathways are defined to align with your growth objectives.",
  },
  {
    number: "03",
    title: "Acquisition Engineering",
    description:
      "Systems are built and deployed, from campaign infrastructure to sales processes, with precision engineering that prioritises reliability over speed.",
  },
  {
    number: "04",
    title: "Integration & Automation",
    description:
      "Every component connects into a unified growth machine. Automation handles the repetitive. Intelligence handles the complex. Your team focuses on what matters.",
  },
  {
    number: "05",
    title: "Measurement & Optimisation",
    description:
      "With systems running, what matters gets measured. Continuous optimisation ensures your growth infrastructure compounds in effectiveness over time.",
  },
];

const Process = () => {
  return (
    <div className="pt-20">
      <section className="section-padding section-y">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-16 md:mb-20">
            <ScrollReveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-5 eyebrow">
                Process
              </p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <h1 className="font-heading text-[34px] md:text-[56px] lg:text-[64px] font-semibold text-foreground leading-[1.06] tracking-tightest mb-6 md:mb-8 text-balance">
                Five phases.{" "}
                <span className="font-quote italic text-gold/95">One coherent system.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-muted-foreground text-[15px] md:text-lg leading-[1.8] font-light max-w-2xl">
                A framework that transforms complexity into structured, compounding growth, phase by deliberate phase.
              </p>
            </ScrollReveal>
          </div>

          <div className="relative">
            {/* Timeline rail (desktop only) */}
            <div className="hidden md:block absolute left-[31px] top-6 bottom-6 w-px bg-gold/20" />

            <div className="space-y-0">
              {steps.map((step, i) => (
                <ScrollReveal key={step.number} delay={i * 120}>
                  <div className="relative grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-10 py-10 md:py-14 border-t border-border">
                    <div className="md:col-span-1 flex items-start">
                      <div className="relative z-10 w-[58px] h-[58px] md:w-[64px] md:h-[64px] rounded-full bg-secondary/70 backdrop-blur-sm flex items-center justify-center border border-gold/25">
                        <span className="text-[12px] md:text-[13px] font-medium text-foreground tracking-wide">
                          {step.number}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-4 md:pt-4">
                      <h2 className="font-heading text-[22px] md:text-[28px] font-semibold text-foreground leading-tight tracking-tight">
                        {step.title}
                      </h2>
                    </div>
                    <div className="md:col-span-7 md:pt-5">
                      <p className="text-muted-foreground text-[14.5px] md:text-[15.5px] leading-[1.85] font-light">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABlock />
    </div>
  );
};

export default Process;
