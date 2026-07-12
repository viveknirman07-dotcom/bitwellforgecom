import { ReactNode } from "react";
import ScrollReveal from "@/components/ScrollReveal";

interface Props {
  title: string;
  description: string;
  diagram: ReactNode;
  delay?: number;
}

const ProblemCard = ({ title, description, diagram, delay = 0 }: Props) => {
  return (
    <ScrollReveal delay={delay} variant="fade">
      <div className="group relative h-full pt-8 md:pt-10 border-t border-gold/25 transition-all duration-500 hover:border-gold/60 flex flex-col">
        <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-3 tracking-tightest">
          {title}
        </h3>

        <p className="text-[13.5px] md:text-sm text-muted-foreground leading-[1.75] font-light mb-7">
          {description}
        </p>

        {/* Borderless diagram surface */}
        <div
          className="diagram-frame aspect-[4/3] md:aspect-[5/3] mt-auto transition-opacity duration-500 group-hover:opacity-100 opacity-90"
          style={{ color: "var(--svg-stroke)" }}
        >
          <div className="relative w-full h-full flex items-center justify-center p-3">
            {diagram}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default ProblemCard;
