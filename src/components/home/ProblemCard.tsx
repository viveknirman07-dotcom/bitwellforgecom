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
      <div className="group relative h-full p-7 md:p-8 border border-gold/20 bg-card/40 backdrop-blur-sm transition-all duration-700 hover:border-gold/45 hover:-translate-y-1 hover:bg-card/60">
        {/* Corner accents */}
        <span className="absolute top-0 left-0 w-3 h-3 border-l border-t border-gold/60" />
        <span className="absolute top-0 right-0 w-3 h-3 border-r border-t border-gold/60" />
        <span className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-gold/60" />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-gold/60" />

        <div className="h-28 mb-7 flex items-center justify-center text-gold/80">
          {diagram}
        </div>
        <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-3 tracking-tightest">
          {title}
        </h3>
        <p className="text-[13.5px] md:text-sm text-muted-foreground leading-[1.75] font-light">
          {description}
        </p>
      </div>
    </ScrollReveal>
  );
};

export default ProblemCard;
