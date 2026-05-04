import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudies } from "@/lib/case-studies-data";

interface CaseStudiesSectionProps {
  /** When true, shows a link to the full page */
  showLink?: boolean;
}

const CaseStudiesSection = ({ showLink = false }: CaseStudiesSectionProps) => {
  return (
    <section className="section-padding section-y bg-secondary/50">
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal>
          <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6">
            Results We Engineer
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-16 text-balance">
            Real frameworks. Structured outcomes. Built for businesses ready to grow with intention.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study, i) => (
            <ScrollReveal key={study.id} delay={i * 100}>
              <CaseStudyCard study={study} index={i} />
            </ScrollReveal>
          ))}
        </div>

        {/* Disclaimer */}
        <ScrollReveal delay={400}>
          <p className="mt-12 text-xs text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
            Case studies marked as Concept Studies represent system designs and projected outcomes based on our methodology, not specific client engagements.
          </p>
        </ScrollReveal>

        {showLink && (
          <ScrollReveal delay={500}>
            <div className="mt-10 text-center">
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium tracking-wide border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                See all case studies
                <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};

export default CaseStudiesSection;
