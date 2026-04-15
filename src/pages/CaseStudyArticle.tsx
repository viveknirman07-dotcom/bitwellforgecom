import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { caseStudies } from "@/lib/case-studies-data";
import ScrollReveal from "@/components/ScrollReveal";
import CTABlock from "@/components/CTABlock";

const CaseStudyArticle = () => {
  const { id } = useParams<{ id: string }>();
  const study = caseStudies.find((s) => s.id === id);

  if (!study) {
    return (
      <div className="pt-20 section-padding section-y text-center">
        <h1 className="font-display text-3xl font-semibold text-foreground mb-4">Case study not found</h1>
        <Link to="/case-studies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Back to Case Studies
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <article className="section-padding section-y">
        <div className="max-w-[680px] mx-auto">
          <ScrollReveal>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12"
            >
              <ArrowLeft size={14} />
              Back to Case Studies
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-medium text-accent tracking-widest uppercase">{study.tag}</span>
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-tight mb-6 text-balance">
                {study.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {study.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="border-t border-border pt-10 space-y-8">
              {/* Client Type */}
              <div>
                <h2 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-3">
                  Client Type
                </h2>
                <p className="text-foreground text-[15px] leading-[1.8]">{study.clientType}</p>
              </div>

              {/* Challenge */}
              <div>
                <h2 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-3">
                  Challenge
                </h2>
                <p className="text-foreground text-[15px] leading-[1.8]">{study.challenge}</p>
              </div>

              {/* What We Built */}
              <div>
                <h2 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-3">
                  What We Built
                </h2>
                <ul className="space-y-3">
                  {study.whatWeBuilt.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] text-foreground leading-[1.8]">
                      <CheckCircle2 size={15} className="text-accent mt-1 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Result */}
              <div className="p-6 rounded-xl bg-secondary/60 border border-border/40">
                <h2 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-3">
                  Result
                </h2>
                <p className="text-foreground text-[15px] leading-[1.8] font-medium">{study.result}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="mt-10 text-xs text-muted-foreground italic">{study.label}</p>
          </ScrollReveal>
        </div>
      </article>

      <ScrollReveal>
        <CTABlock
          heading="Ready to build your growth system?"
          subtext="Let's talk about applying these frameworks to your business."
          buttonLabel="Start the Conversation"
        />
      </ScrollReveal>
    </div>
  );
};

export default CaseStudyArticle;
