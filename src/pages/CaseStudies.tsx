import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import CaseStudyCard from "@/components/CaseStudyCard";
import CTABlock from "@/components/CTABlock";
import Eyebrow from "@/components/Eyebrow";
import { caseStudies, caseStudyCategories } from "@/lib/case-studies-data";
import { cn } from "@/lib/utils";

type Filter = "All" | (typeof caseStudyCategories)[number];

const CaseStudies = () => {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered =
    filter === "All"
      ? caseStudies
      : caseStudies.filter((s) => s.category === filter);

  const filters: Filter[] = ["All", ...caseStudyCategories];

  return (
    <div>
      {/* HERO */}
      <section className="section-padding pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <Eyebrow className="mb-6">Results We Engineer</Eyebrow>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.05] mb-6 text-balance max-w-4xl">
              Real frameworks. Structured outcomes.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed font-light">
              Fourteen engagements documented end to end. Each one a
              demonstration of the same operating principle: build the
              system, run the system, let the system compound.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="section-padding pb-10 md:pb-12">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 md:gap-3 border-b border-[hsl(var(--foreground)/0.10)] pb-6">
              {filters.map((f) => {
                const active = filter === f;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={cn(
                      "px-4 py-2 rounded-full text-xs md:text-sm font-medium tracking-wide transition-all duration-300 border",
                      active
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent text-muted-foreground border-[hsl(var(--foreground)/0.15)] hover:text-foreground hover:border-[hsl(var(--foreground)/0.40)]",
                    )}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* GRID */}
      <section className="section-padding pb-20 md:pb-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filtered.map((study, i) => (
              <ScrollReveal key={study.id} delay={Math.min(i * 60, 360)}>
                <CaseStudyCard study={study} index={i} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={200}>
            <p className="mt-16 text-xs text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed italic">
              Case studies represent system designs and projected outcomes
              based on our methodology, tested across multiple engagements
              rather than any single named client.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <CTABlock />
    </div>
  );
};

export default CaseStudies;
