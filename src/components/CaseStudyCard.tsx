import { useState } from "react";
import { ArrowRight, X, CheckCircle2 } from "lucide-react";
import { CaseStudy } from "@/lib/case-studies-data";
import { cn } from "@/lib/utils";

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

const CaseStudyCard = ({ study, index }: CaseStudyCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "group block w-full text-left p-8 md:p-10 rounded-2xl border border-border/60",
          "bg-card/60 backdrop-blur-xl hover:bg-card/80",
          "hover:shadow-[0_8px_30px_hsl(var(--foreground)/0.06)]",
          "hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.99]",
          "transition-all duration-500 animate-fade-up"
        )}
        style={{
          animationDelay: `${index * 0.1}s`,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <span className="inline-block text-xs font-medium tracking-widest uppercase text-accent mb-4">
          {study.tag}
        </span>
        <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
          {study.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          {study.subtitle}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
          View case study
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md animate-fade-in" />

          {/* Modal content */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-card p-8 md:p-12 shadow-lg animate-fade-up"
            style={{ animationDuration: "0.5s" }}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <span className="inline-block text-xs font-medium tracking-widest uppercase text-accent mb-4">
              {study.tag}
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3 leading-tight">
              {study.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {study.subtitle}
            </p>

            <div className="space-y-6">
              {/* Client Type */}
              <div>
                <h4 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
                  Client Type
                </h4>
                <p className="text-foreground text-sm leading-relaxed">{study.clientType}</p>
              </div>

              {/* Challenge */}
              <div>
                <h4 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
                  Challenge
                </h4>
                <p className="text-foreground text-sm leading-relaxed">{study.challenge}</p>
              </div>

              {/* What We Built */}
              <div>
                <h4 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
                  What We Built
                </h4>
                <ul className="space-y-2">
                  {study.whatWeBuilt.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground leading-relaxed">
                      <CheckCircle2 size={14} className="text-accent mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Result */}
              <div className="p-5 rounded-xl bg-secondary/60 border border-border/40">
                <h4 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
                  Result
                </h4>
                <p className="text-foreground text-sm leading-relaxed font-medium">{study.result}</p>
              </div>
            </div>

            {/* Label */}
            <p className="mt-8 text-xs text-muted-foreground italic">{study.label}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CaseStudyCard;
