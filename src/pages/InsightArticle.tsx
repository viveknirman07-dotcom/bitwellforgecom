import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { articles } from "@/pages/Insights";
import ScrollReveal from "@/components/ScrollReveal";
import CTABlock from "@/components/CTABlock";
import Eyebrow from "@/components/Eyebrow";
import ReadingProgress from "@/components/ReadingProgress";
import { useSEO } from "@/hooks/use-seo";
import { readingTime, sectionHeadings, relatedArticles } from "@/lib/insights";

const MetaDot = () => (
  <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-muted-foreground/40" />
);

const InsightArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  useSEO({
    title: article ? `${article.title} | BitwellForge Insights` : "Article not found | BitwellForge",
    description: article?.excerpt ?? "Insight from BitwellForge on growth, systems, and strategic clarity.",
    canonicalPath: `/insights/${slug ?? ""}`,
    ogType: "article",
  });

  if (!article) {
    return (
      <div className="pt-20 section-padding section-y text-center">
        <h1 className="font-heading text-3xl font-semibold text-foreground mb-4">Article not found</h1>
        <Link to="/insights" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Back to the archive
        </Link>
      </div>
    );
  }

  const paragraphs = article.content
    .trim()
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  // First non-heading paragraph = Executive Summary lead.
  const summaryParagraph = paragraphs.find((p) => !(p.startsWith("**") && p.endsWith("**")));
  // Body = everything after the summary paragraph (preserves all original content/order).
  const summaryIndex = summaryParagraph ? paragraphs.indexOf(summaryParagraph) : -1;
  const bodyParagraphs = summaryIndex >= 0 ? paragraphs.slice(summaryIndex + 1) : paragraphs;

  const minutes = readingTime(article.content);
  const takeaways = sectionHeadings(article.content);
  const related = relatedArticles(article.slug, 3);

  return (
    <div className="pt-20">
      <ReadingProgress />

      <article className="section-padding pt-16 md:pt-24 pb-24 md:pb-32">
        <div className="max-w-[760px] mx-auto">
          <ScrollReveal>
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 mb-14"
            >
              <ArrowLeft size={13} />
              The Archive
            </Link>
          </ScrollReveal>

          {/* Document header */}
          <ScrollReveal delay={80}>
            <header className="mb-14 md:mb-16">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8">
                <Eyebrow as="span">{article.category}</Eyebrow>
                <MetaDot />
                <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground/80">
                  {article.date}
                </span>
                <MetaDot />
                <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground/80">
                  {minutes} min read
                </span>
              </div>
              <h1 className="font-heading text-[34px] md:text-[52px] lg:text-[60px] font-semibold text-foreground leading-[1.06] tracking-tightest text-balance">
                {article.title}
              </h1>
            </header>
          </ScrollReveal>

          {/* Executive Summary */}
          {summaryParagraph && (
            <ScrollReveal delay={140}>
              <section
                aria-label="Executive Summary"
                className="mb-16 md:mb-20 border-y border-border/70 py-10 md:py-12"
              >
                <p className="text-[10px] md:text-[11px] font-medium tracking-[0.28em] uppercase text-[hsl(var(--eyebrow-color))] mb-5">
                  Executive Summary
                </p>
                <p className="font-quote text-[22px] md:text-[26px] leading-[1.55] text-foreground/90 italic font-light tracking-tight">
                  {summaryParagraph}
                </p>
                <p className="mt-6 text-[13px] md:text-[13.5px] text-muted-foreground leading-[1.8] font-light max-w-[640px]">
                  {article.excerpt}
                </p>
              </section>
            </ScrollReveal>
          )}

          {/* Briefing body */}
          <ScrollReveal delay={180}>
            <div className="space-y-7 md:space-y-8">
              {bodyParagraphs.map((p, i) => {
                if (p.startsWith("**") && p.endsWith("**")) {
                  return (
                    <h2
                      key={i}
                      className="font-heading text-[22px] md:text-[28px] font-semibold text-foreground leading-[1.2] tracking-tight pt-8 md:pt-10 mt-2"
                    >
                      {p.replace(/\*\*/g, "")}
                    </h2>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-foreground/85 leading-[1.9] text-[16px] md:text-[17px] font-light"
                  >
                    {p}
                  </p>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Key Takeaways */}
          {takeaways.length > 0 && (
            <ScrollReveal delay={120}>
              <section
                aria-label="Key Takeaways"
                className="mt-20 md:mt-24 border-t border-border pt-12 md:pt-14"
              >
                <p className="text-[10px] md:text-[11px] font-medium tracking-[0.28em] uppercase text-[hsl(var(--eyebrow-color))] mb-8">
                  Key Takeaways
                </p>
                <ol className="space-y-6 md:space-y-7">
                  {takeaways.map((t, i) => (
                    <li key={i} className="grid grid-cols-[3rem_1fr] md:grid-cols-[3.5rem_1fr] items-baseline">
                      <span className="font-heading text-[18px] md:text-[20px] text-muted-foreground/70 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-heading text-[18px] md:text-[22px] leading-[1.35] text-foreground tracking-tight">
                        {t}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            </ScrollReveal>
          )}

          {/* Related Insights */}
          {related.length > 0 && (
            <ScrollReveal delay={120}>
              <section
                aria-label="Related Insights"
                className="mt-20 md:mt-24 border-t border-border pt-12 md:pt-14"
              >
                <p className="text-[10px] md:text-[11px] font-medium tracking-[0.28em] uppercase text-[hsl(var(--eyebrow-color))] mb-8">
                  Related Briefings
                </p>
                <ul className="divide-y divide-border/70">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        to={`/insights/${r.slug}`}
                        className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 py-6 md:py-7 items-baseline"
                      >
                        <span className="md:col-span-3 text-[10px] tracking-[0.22em] uppercase text-muted-foreground/80">
                          {r.category}
                        </span>
                        <span className="md:col-span-8 font-heading text-[17px] md:text-[19px] leading-[1.3] text-foreground tracking-tight group-hover:text-[hsl(var(--eyebrow-color))] transition-colors duration-300">
                          {r.title}
                        </span>
                        <span className="md:col-span-1 md:text-right text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          <ArrowRight size={14} className="inline transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </ScrollReveal>
          )}
        </div>
      </article>

      <ScrollReveal>
        <CTABlock
          heading="Ready to explore this further?"
          subtext="Let's talk about applying these ideas to your business."
          buttonLabel="Book Infrastructure Audit"
        />
      </ScrollReveal>
    </div>
  );
};

export default InsightArticle;
