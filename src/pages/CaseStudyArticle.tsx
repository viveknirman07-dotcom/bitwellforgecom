import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { caseStudies } from "@/lib/case-studies-data";
import ScrollReveal from "@/components/ScrollReveal";
import CTABlock from "@/components/CTABlock";
import Eyebrow from "@/components/Eyebrow";

const CaseStudyArticle = () => {
  const { id } = useParams<{ id: string }>();
  const study = caseStudies.find((s) => s.id === id);

  if (!study) {
    return (
      <div className="pt-32 section-padding section-y text-center">
        <h1 className="font-heading text-3xl font-semibold text-foreground mb-4">
          Case study not found
        </h1>
        <Link
          to="/case-studies"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Back to Case Studies
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-40">
      {/* HERO */}
      <header className="section-padding pb-12 md:pb-20">
        <div className="max-w-[820px] mx-auto">
          <ScrollReveal>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-10"
            >
              <ArrowLeft size={14} />
              Back to Case Studies
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <Eyebrow className="mb-6">{study.category}</Eyebrow>
            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.05] mb-6 text-balance">
              {study.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[680px]">
              {study.subtitle}
            </p>
          </ScrollReveal>

          {/* Metric strip */}
          <ScrollReveal delay={200}>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-[hsl(var(--foreground)/0.10)] rounded-xl overflow-hidden border border-[hsl(var(--foreground)/0.10)]">
              {study.metrics.map((m) => (
                <div
                  key={m.label}
                  className="bg-background/80 backdrop-blur-xl p-5 md:p-6"
                >
                  <div className="font-heading text-2xl md:text-3xl font-semibold text-foreground leading-none mb-2">
                    {m.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground leading-snug">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </header>

      {/* SUMMARY BLOCK */}
      <section className="section-padding pb-16 md:pb-20">
        <div className="max-w-[820px] mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-px bg-[hsl(var(--foreground)/0.10)] rounded-xl overflow-hidden border border-[hsl(var(--foreground)/0.10)]">
              <div className="bg-background/60 p-6 md:p-8">
                <Eyebrow as="h2" className="mb-3">
                  Client Type
                </Eyebrow>
                <p className="text-foreground/90 text-[15px] leading-[1.8]">
                  {study.clientType}
                </p>
              </div>
              <div className="bg-background/60 p-6 md:p-8">
                <Eyebrow as="h2" className="mb-3">
                  Challenge
                </Eyebrow>
                <p className="text-foreground/90 text-[15px] leading-[1.8]">
                  {study.challenge}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SEVEN SECTION NARRATIVE */}
      <article className="section-padding pb-20 md:pb-28">
        <div className="max-w-[680px] mx-auto space-y-16 md:space-y-20">
          {study.sections.map((section, idx) => (
            <ScrollReveal key={section.heading} delay={idx * 40}>
              <section>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="font-heading text-sm text-[hsl(var(--eyebrow-color))] tracking-widest tabular-nums">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground leading-tight">
                    {section.heading}
                  </h2>
                </div>
                <div className="space-y-5 border-l-0 md:border-l border-[hsl(var(--foreground)/0.10)] md:pl-8">
                  {section.body.map((para, i) => (
                    <p
                      key={i}
                      className="text-foreground/85 text-[16px] md:text-[17px] leading-[1.85] font-light"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          ))}

          {/* RESULT CALLOUT */}
          <ScrollReveal>
            <aside className="relative overflow-hidden rounded-2xl border border-[hsl(var(--foreground)/0.15)] bg-[hsl(var(--foreground)/0.03)] p-8 md:p-10">
              <div
                className="absolute inset-0 pointer-events-none opacity-60"
                style={{
                  background:
                    "radial-gradient(circle at 0% 0%, hsl(var(--eyebrow-color) / 0.10), transparent 60%)",
                }}
              />
              <div className="relative">
                <Eyebrow className="mb-4">Outcome</Eyebrow>
                <p
                  className="text-foreground text-xl md:text-2xl leading-[1.55] font-light italic"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {study.result}
                </p>
              </div>
            </aside>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-xs text-muted-foreground italic text-center">
              {study.label}
            </p>
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
