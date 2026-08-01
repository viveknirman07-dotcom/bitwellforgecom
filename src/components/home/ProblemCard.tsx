import { ReactNode } from "react";
import ScrollReveal from "@/components/ScrollReveal";

interface Props {
  title: string;
  description: string;
  diagram: ReactNode;
  delay?: number;
  index?: number;
}

const ProblemCard = ({ title, description, diagram, delay = 0, index = 0 }: Props) => {
  return (
    <ScrollReveal delay={delay} variant="fade">
      <div className="group relative flex h-full flex-col md:px-8 lg:px-10">
        <span className="mb-6 block text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground/60 tnum">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3 className="mb-4 font-heading text-[26px] font-semibold leading-[1.12] tracking-tightest text-foreground md:text-[28px]">
          {title}
        </h3>

        <p className="mb-10 text-[15px] font-light leading-[1.75] text-muted-foreground">
          {description}
        </p>

        <div
          className="mt-auto aspect-[5/3] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
          style={{ color: "var(--svg-stroke)" }}
        >
          <div className="relative flex h-full w-full items-center justify-center">
            {diagram}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default ProblemCard;
