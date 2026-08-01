import { ReactNode } from "react";
import ScrollReveal from "@/components/ScrollReveal";

interface Props {
  index: number;
  tag: string;
  title: string;
  body: string;
  visual: ReactNode;
  reverse?: boolean;
}

const ServiceFeature = ({ index, tag, title, body, visual }: Props) => {
  const num = String(index + 1).padStart(2, "0");
  return (
    <ScrollReveal variant="fade" delay={index * 80}>
      <article className="glass-panel group h-full p-8 md:p-10 lg:p-12">
        <div className="mb-6 flex items-baseline gap-4">
          <span className="tnum text-[11px] tracking-[0.28em] text-muted-foreground/60">{num}</span>
          <span className="text-[10px] uppercase tracking-[0.26em] text-gold/85">{tag}</span>
        </div>

        <h3 className="mb-5 font-heading text-[26px] font-semibold leading-[1.12] tracking-tightest text-foreground md:text-[32px]">
          {title}
        </h3>

        <p className="max-w-xl text-[15px] font-light leading-[1.75] text-muted-foreground">
          {body}
        </p>

        {/* Detail layer: cross-fades in on hover / focus */}
        <div
          className="mt-8 aspect-[5/3] opacity-40 transition-all duration-700 group-hover:opacity-100 group-focus-within:opacity-100"
          style={{ color: "var(--svg-stroke)" }}
        >
          <div className="relative flex h-full w-full items-center justify-center">
            {visual}
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
};

export default ServiceFeature;
