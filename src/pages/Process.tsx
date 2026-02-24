import CTABlock from "@/components/CTABlock";
import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  {
    number: "01",
    title: "Clarity Mapping",
    description: "The engagement begins with a deep understanding of your business: goals, market position, current systems, and growth constraints. This diagnostic phase reveals the structural gaps most businesses overlook.",
  },
  {
    number: "02",
    title: "System Architecture",
    description: "Insights from the clarity phase shape the acquisition architecture. Channels, flows, messaging frameworks, and conversion pathways are defined to align with your growth objectives.",
  },
  {
    number: "03",
    title: "Acquisition Engineering",
    description: "Systems are built and deployed, from campaign infrastructure to sales processes, with precision engineering that prioritizes reliability over speed.",
  },
  {
    number: "04",
    title: "Integration & Automation",
    description: "Every component connects into a unified growth machine. Automation handles the repetitive. Intelligence handles the complex. Your team focuses on what matters.",
  },
  {
    number: "05",
    title: "Measurement & Optimization",
    description: "With systems running, what matters gets measured. Continuous optimization ensures your growth infrastructure compounds in effectiveness over time.",
  },
];

const Process = () => {
  return (
    <div className="pt-20">
      <section className="section-padding section-y">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-20">
            <ScrollReveal>
              <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6">Process</p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <h1 className="font-heading text-4xl md:text-6xl font-semibold text-foreground leading-tight mb-8 text-balance">
                Five phases. One coherent system.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A framework that transforms complexity into structured, compounding growth, phase by deliberate phase.
              </p>
            </ScrollReveal>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-[39px] top-0 bottom-0 w-px bg-border" />

            <div className="space-y-0">
              {steps.map((step, i) => (
                <ScrollReveal key={step.number} delay={i * 100}>
                  <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-12 md:py-16 border-t border-border md:border-t-0">
                    <div className="md:col-span-1 flex items-start">
                      <div className="relative z-10 w-20 h-20 rounded-full bg-secondary/70 backdrop-blur-sm flex items-center justify-center border border-border">
                        <span className="text-sm font-medium text-foreground">{step.number}</span>
                      </div>
                    </div>
                    <div className="md:col-span-4 md:pt-5">
                      <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
                        {step.title}
                      </h2>
                    </div>
                    <div className="md:col-span-7 md:pt-6">
                      <p className="text-muted-foreground leading-relaxed">
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

      <ScrollReveal>
        <CTABlock />
      </ScrollReveal>
    </div>
  );
};

export default Process;
