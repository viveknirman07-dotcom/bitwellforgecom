import ScrollReveal from "@/components/ScrollReveal";
import CaseStudyCard from "@/components/CaseStudyCard";
import CTABlock from "@/components/CTABlock";
import { caseStudies } from "@/lib/case-studies-data";

const CaseStudies = () => {
  return (
    <div>
      {/* Hero */}
      <section className="section-padding pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6">
              Results We Engineer
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <h1 className="font-heading text-4xl md:text-6xl font-black text-foreground leading-[1.1] mb-6 text-balance max-w-3xl">
              Real frameworks. Structured outcomes.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={350}>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Built for businesses ready to grow with intention.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Cards */}
      <section className="section-padding pb-20 md:pb-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((study, i) => (
              <ScrollReveal key={study.id} delay={i * 100}>
                <CaseStudyCard study={study} index={i} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400}>
            <p className="mt-12 text-xs text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
              Case studies marked as Concept Studies represent system designs and projected outcomes based on our methodology, not specific client engagements.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <ScrollReveal>
        <CTABlock />
      </ScrollReveal>
    </div>
  );
};

export default CaseStudies;
