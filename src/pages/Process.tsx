import CTABlock from "@/components/CTABlock";
import ScrollReveal from "@/components/ScrollReveal";
import { useSEO } from "@/hooks/use-seo";
import {
  DiagnoseVisual,
  ArchitectVisual,
  EngineerVisual,
  ActivateVisual,
  OptimizeVisual,
  CompoundVisual,
} from "@/components/process/StageVisuals";
import { ReactNode } from "react";

interface Stage {
  number: string;
  title: string;
  outcome: string;
  description: string;
  visual: ReactNode;
}

const stages: Stage[] = [
  {
    number: "01",
    title: "Diagnose",
    outcome: "Identify system bottlenecks.",
    description:
      "An infrastructure scan across acquisition, conversion, and operations. Where revenue leaks, where channels concentrate risk, where decisions happen without data. The diagnosis defines what the engagement is actually solving for.",
    visual: <DiagnoseVisual />,
  },
  {
    number: "02",
    title: "Architect",
    outcome: "Infrastructure design.",
    description:
      "A systems map is generated from the diagnosis. Acquisition channels, sales mechanics, automation layers, and measurement loops are sequenced into a single coherent architecture before any build begins.",
    visual: <ArchitectVisual />,
  },
  {
    number: "03",
    title: "Engineer",
    outcome: "System deployment.",
    description:
      "Components are constructed and connected. CRM logic, outbound sequences, sales workflows, automation pipes, reporting dashboards. The infrastructure assembles into a single operating layer the business can run.",
    visual: <EngineerVisual />,
  },
  {
    number: "04",
    title: "Activate",
    outcome: "Predictable acquisition.",
    description:
      "Demand begins flowing through the system. Pipelines fill, opportunities appear, conversations compound. The business shifts from reactive marketing to a measured, controllable acquisition rhythm.",
    visual: <ActivateVisual />,
  },
  {
    number: "05",
    title: "Optimize",
    outcome: "Compounding efficiency.",
    description:
      "Feedback loops surface what is working and what is not. Insights inform decisions. Conversion improves at every stage. The same infrastructure produces more revenue over time without more input.",
    visual: <OptimizeVisual />,
  },
  {
    number: "06",
    title: "Compound",
    outcome: "Sustainable predictable growth.",
    description:
      "The system becomes self-reinforcing. Authority compounds, data sharpens, automation deepens, the cost of acquiring the next client decreases. Growth becomes a property of the infrastructure, not the effort.",
    visual: <CompoundVisual />,
  },
];

const Process = () => {
  useSEO({
    title: "Process | BitwellForge",
    description:
      "Six stages of revenue infrastructure engineering. Diagnose, architect, engineer, activate, optimize, compound.",
    canonicalPath: "/process",
  });

  return (
    <div className="pt-20">
      {/* HERO */}
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
                From chaos to{" "}
                <span className="font-quote italic text-gold/95">compounding.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-muted-foreground text-[15px] md:text-lg leading-[1.8] font-light max-w-2xl">
                Every engagement follows a structured infrastructure methodology. Six stages designed to engineer revenue rather than chase it.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* STAGES */}
      <section className="section-padding pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto">
          {stages.map((stage, i) => (
            <ScrollReveal key={stage.number} delay={50}>
              <div
                className={`relative border-t border-gold/15 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-6">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="font-quote text-gold text-2xl">{stage.number}</span>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-gold/80">
                      Stage {stage.number}
                    </span>
                  </div>
                  <h2 className="font-heading text-3xl md:text-[40px] lg:text-[44px] font-semibold text-foreground leading-[1.1] mb-5 tracking-tightest">
                    {stage.title}
                  </h2>
                  <p className="font-quote italic text-gold/90 text-lg md:text-xl mb-6">
                    {stage.outcome}
                  </p>
                  <p className="text-muted-foreground text-[15px] leading-[1.85] font-light max-w-xl">
                    {stage.description}
                  </p>
                </div>
                <div className="lg:col-span-6">
                  <div
                    className="diagram-frame aspect-[4/3] md:aspect-[5/3]"
                    style={{ color: "var(--svg-stroke)" }}
                  >
                    <div className="diagram-grid" />
                    <div className="relative w-full h-full flex items-center justify-center p-6">
                      {stage.visual}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CTABlock />
    </div>
  );
};

export default Process;
