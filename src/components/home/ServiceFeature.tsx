import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface Props {
  index: number;
  tag: string;
  title: string;
  body: string;
  visual: ReactNode;
  href: string;
}

const ServiceFeature = ({ index, tag, title, body, visual, href }: Props) => {
  const num = String(index + 1).padStart(2, "0");

  return (
    <ScrollReveal
      variant="fade"
      delay={index * 70}
      className="h-full min-w-0 border-b border-border md:[&:nth-child(odd)]:border-r lg:border-r lg:[&:nth-child(4n)]:border-r-0"
    >
      <Link
        to={href}
        aria-label={`${tag}: ${title}`}
        className="group relative flex h-full min-h-[560px] flex-col overflow-hidden bg-background p-6 transition-colors duration-500 hover:bg-card/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:p-8 lg:min-h-[620px] lg:p-9"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[11px] text-muted-foreground/55 transition-colors duration-300 group-hover:text-foreground" aria-hidden="true">
            /{num}
          </span>
          <ArrowUpRight
            size={16}
            strokeWidth={1.5}
            className="text-muted-foreground/60 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground"
            aria-hidden="true"
          />
        </div>

        <div className="mt-9 min-h-[210px] sm:mt-11 lg:min-h-[250px]">
          <p className="font-mono text-[9px] uppercase leading-[1.65] text-[hsl(var(--eyebrow-color))]">
            {tag}
          </p>
          <h3 className="mt-5 font-heading text-[29px] font-medium leading-[1.08] text-foreground transition-transform duration-500 group-hover:translate-x-1 sm:text-[32px] lg:text-[35px]">
            {title}
          </h3>
        </div>

        <div
          className="relative my-8 aspect-[3/2] w-full border-y border-border py-3 text-muted-foreground transition-colors duration-500 group-hover:text-foreground"
          style={{ color: "var(--svg-stroke)" }}
          aria-hidden="true"
        >
          <div className="flex h-full w-full items-center justify-center transition-transform duration-700 group-hover:scale-[1.025]">
            {visual}
          </div>
        </div>

        <p className="mt-auto text-[13px] font-light leading-[1.75] text-muted-foreground sm:text-[13.5px]">
          {body}
        </p>

        <span className="mt-8 inline-flex items-center gap-3 font-mono text-[9px] uppercase text-foreground">
          Explore discipline
          <span className="h-px w-8 origin-left bg-foreground/40 transition-transform duration-500 group-hover:scale-x-150" aria-hidden="true" />
        </span>
      </Link>
    </ScrollReveal>
  );
};

export default ServiceFeature;
