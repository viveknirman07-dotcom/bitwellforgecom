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

const ServiceFeature = ({ index, tag, title, body, visual, reverse }: Props) => {
  const num = String(index + 1).padStart(2, "0");
  return (
    <ScrollReveal variant="fade" delay={50}>
      <div className="relative border-t border-gold/15 py-14 md:py-20">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div className="lg:col-span-6">
            <div className="flex items-center gap-4 mb-5">
              <span className="font-quote text-gold text-2xl">{num}</span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-gold/80">
                {tag}
              </span>
            </div>
            <h3 className="font-heading text-3xl md:text-[40px] lg:text-[44px] font-semibold text-foreground leading-[1.1] mb-6 tracking-tightest">
              {title}
            </h3>
            <p className="text-muted-foreground text-[15px] leading-[1.85] font-light max-w-xl">
              {body}
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="diagram-frame aspect-[4/3] md:aspect-[5/3]" style={{ color: "var(--svg-stroke)" }}>
              <div className="relative w-full h-full flex items-center justify-center p-4 md:p-6">
                {visual}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default ServiceFeature;
