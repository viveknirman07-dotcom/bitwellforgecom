import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface Props {
  index: number;
  tag: string;
  title: string;
  body: string;
  href: string;
  visual: ReactNode;
}

const ServiceFeature = ({ index, tag, title, body, href, visual }: Props) => {
  const num = String(index + 1).padStart(2, "0");
  return (
    <ScrollReveal variant="fade" delay={50}>
      <article className="group relative border-t border-gold/20 transition-colors duration-500 hover:bg-card/35">
        <div className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-gold transition-transform duration-500 group-hover:scale-y-100" aria-hidden />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-12 px-0 py-12 md:py-16 lg:px-8 lg:py-20">
          <div className="lg:col-span-3 flex lg:block items-baseline gap-5">
            <span className="font-quote italic text-gold text-3xl md:text-4xl leading-none">{num}</span>
            <div className="lg:mt-8">
              <p className="text-[10px] tracking-[0.24em] uppercase text-gold/80 leading-[1.7] max-w-[190px]">
                {tag}
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:pr-4">
            <h3 className="font-heading text-[30px] md:text-[38px] lg:text-[42px] font-semibold text-foreground leading-[1.08] mb-6 tracking-tightest text-balance transition-colors duration-500 group-hover:text-gold">
              {title}
            </h3>
            <p className="text-muted-foreground text-[14.5px] md:text-[15px] leading-[1.85] font-light max-w-lg">
              {body}
            </p>
            <Link
              to={href}
              className="mt-8 inline-flex min-h-11 items-center gap-3 border-b border-gold/40 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground transition-colors duration-300 hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              Explore discipline
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          <div className="lg:col-span-5 lg:pl-3">
            <div className="relative aspect-[3/2] overflow-hidden border border-gold/15 bg-background/45 text-[color:var(--svg-stroke)] transition-colors duration-500 group-hover:border-gold/35">
              <div className="absolute left-0 top-0 h-px w-12 bg-gold transition-[width] duration-500 group-hover:w-full" aria-hidden />
              <div className="relative flex h-full w-full items-center justify-center p-4 md:p-6 transition-transform duration-500 group-hover:scale-[1.015]">
                {visual}
              </div>
            </div>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
};

export default ServiceFeature;
