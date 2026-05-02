import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { CaseStudy } from "@/lib/case-studies-data";
import { useRef, useState, useCallback } from "react";
import { CategoryIcon } from "@/components/CategoryIcons";

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

const CaseStudyCard = ({ study, index }: CaseStudyCardProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [transform, setTransform] = useState("");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -4;
    const rotateY = (x - 0.5) * 4;
    setTransform(
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
    );
    setGlare({ x: x * 100, y: y * 100, opacity: 0.08 });
  }, []);

  const handleLeave = useCallback(() => {
    setTransform(
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    );
    setGlare({ x: 50, y: 50, opacity: 0 });
  }, []);

  // First metric becomes the headline figure on the card
  const headline = study.metrics?.[0];

  return (
    <Link
      ref={cardRef}
      to={`/case-studies/${study.id}`}
      className="diagram-card group relative block w-full text-left p-7 md:p-9 rounded-2xl bg-[hsl(var(--foreground)/0.02)] backdrop-blur-xl hover:border-[hsl(var(--foreground)/0.18)] active:scale-[0.99] overflow-hidden h-full"
      style={{
        transform,
        transition:
          "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease",
        willChange: "transform",
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* glare */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, hsl(var(--eyebrow-color) / ${glare.opacity}), transparent 55%)`,
          transition: "opacity 0.3s ease",
        }}
      />

      <div className="relative z-10 flex flex-col h-full min-h-[280px]">
        {/* category */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5 text-[hsl(var(--eyebrow-color))]">
            <CategoryIcon category={study.category} />
            <span className="text-[10px] md:text-[11px] font-medium tracking-[0.22em] uppercase">
              {study.category}
            </span>
          </div>
          <ArrowUpRight
            size={16}
            className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
          />
        </div>

        {/* title */}
        <h3 className="font-heading text-xl md:text-[22px] font-semibold text-foreground mb-3 leading-[1.25] text-balance">
          {study.title}
        </h3>

        <p className="text-muted-foreground text-[14px] leading-relaxed mb-auto line-clamp-3">
          {study.subtitle}
        </p>

        {/* headline metric */}
        {headline && (
          <div className="mt-7 pt-6 border-t border-[hsl(var(--foreground)/0.08)]">
            <div className="font-heading text-2xl md:text-3xl font-semibold text-foreground leading-none mb-1.5">
              {headline.value}
            </div>
            <div className="text-[10.5px] uppercase tracking-widest text-muted-foreground leading-snug">
              {headline.label}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CaseStudyCard;
