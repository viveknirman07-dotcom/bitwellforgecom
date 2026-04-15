import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { articles } from "@/pages/Insights";
import ScrollReveal from "@/components/ScrollReveal";
import CTABlock from "@/components/CTABlock";

const InsightArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

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
      <article className="section-padding section-y">
        <div className="max-w-[680px] mx-auto">
          <ScrollReveal>
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12"
            >
              <ArrowLeft size={14} />
              Back to Insights
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">{article.category}</span>
                <span className="text-xs text-muted-foreground">{article.date}</span>
              </div>
              <h1 className="font-heading text-3xl md:text-5xl font-semibold text-foreground leading-tight mb-6 text-balance">
                {article.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="border-t border-border pt-10 space-y-6">
              {paragraphs.map((p, i) => {
                const trimmed = p.trim();
                if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
                  return (
                    <h2 key={i} className="font-heading text-xl md:text-2xl font-semibold text-foreground mt-10 mb-2">
                      {trimmed.replace(/\*\*/g, "")}
                    </h2>
                  );
                }
                return (
                  <p key={i} className="text-muted-foreground leading-[1.8] text-[15px]">
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
