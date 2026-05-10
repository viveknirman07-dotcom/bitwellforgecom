import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { articles } from "@/pages/Insights";
import ScrollReveal from "@/components/ScrollReveal";
import CTABlock from "@/components/CTABlock";
import Eyebrow from "@/components/Eyebrow";
import ReadingProgress from "@/components/ReadingProgress";
import { useSEO } from "@/hooks/use-seo";

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
          Back to Insights
        </Link>
      </div>
    );
  }

  const paragraphs = article.content
    .trim()
    .split("\n\n")
    .filter((p) => p.trim());

  return (
    <div className="pt-20">
      <ReadingProgress />

      <article className="section-padding section-y">
        <div className="max-w-[720px] mx-auto">
          <ScrollReveal>
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12"
            >
              <ArrowLeft size={14} />
              Back to Insights
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-7">
                <Eyebrow as="span">{article.category}</Eyebrow>
                <span className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground/80">
                  {article.date}
                </span>
              </div>
              <h1 className="font-heading text-[32px] md:text-[48px] lg:text-[56px] font-semibold text-foreground leading-[1.08] tracking-tightest mb-7 text-balance">
                {article.title}
              </h1>
              <p className="text-[16px] md:text-[18px] text-muted-foreground leading-[1.75] font-light">
                {article.excerpt}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="border-t border-border pt-12 space-y-7">
              {paragraphs.map((p, i) => {
                const trimmed = p.trim();
                if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
                  return (
                    <h2
                      key={i}
                      className="font-heading text-[22px] md:text-[28px] font-semibold text-foreground leading-[1.2] tracking-tight mt-12 mb-1"
                    >
                      {trimmed.replace(/\*\*/g, "")}
                    </h2>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-foreground/85 leading-[1.85] text-[15.5px] md:text-[16.5px] font-light"
                  >
                    {trimmed}
                  </p>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </article>

      <ScrollReveal>
        <CTABlock
          heading="Ready to explore this further?"
          subtext="Let's talk about applying these ideas to your business."
          buttonLabel="Start the Conversation"
        />
      </ScrollReveal>
    </div>
  );
};

export default InsightArticle;
