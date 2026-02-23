import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CTABlock from "@/components/CTABlock";

const articles = [
  {
    title: "Why Most Growth Strategies Fail Before They Start",
    excerpt: "The problem isn't execution — it's architecture. Understanding why structure precedes scale.",
    category: "Strategy",
    date: "Feb 2026",
  },
  {
    title: "The Anatomy of a High-Converting Sales System",
    excerpt: "Breaking down the structural elements that separate consistent pipelines from chaotic ones.",
    category: "Sales Systems",
    date: "Jan 2026",
  },
  {
    title: "Automation Without Intelligence Is Just Faster Chaos",
    excerpt: "Why AI and automation must be built on strategic foundations to deliver real value.",
    category: "Automation",
    date: "Jan 2026",
  },
  {
    title: "LinkedIn as a Growth System, Not a Content Calendar",
    excerpt: "Shifting from posting to positioning — building authority infrastructure on LinkedIn.",
    category: "LinkedIn",
    date: "Dec 2025",
  },
  {
    title: "The Compounding Effect of Structured Acquisition",
    excerpt: "How well-designed systems improve with time while tactics degrade.",
    category: "Growth",
    date: "Nov 2025",
  },
];

const Insights = () => {
  return (
    <div className="pt-20">
      <section className="section-padding section-y">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-20">
            <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6 animate-fade-up">Insights</p>
            <h1 className="font-heading text-4xl md:text-6xl font-semibold text-foreground leading-tight mb-8 text-balance animate-fade-up-delay-1">
              Thinking on growth, systems, and strategic clarity.
            </h1>
          </div>

          <div className="space-y-0">
            {articles.map((article, i) => (
              <article
                key={i}
                className="group border-t border-border py-10 md:py-14 cursor-pointer"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 items-start">
                  <div className="md:col-span-2">
                    <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">{article.category}</span>
                    <p className="text-xs text-muted-foreground mt-1">{article.date}</p>
                  </div>
                  <div className="md:col-span-7">
                    <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300 mb-3">
                      {article.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
                  </div>
                  <div className="md:col-span-3 md:text-right">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      Read
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABlock
        heading="Have a growth challenge?"
        subtext="We'd love to hear about it."
        buttonLabel="Start a Conversation"
      />
    </div>
  );
};

export default Insights;
