import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CaseStudy } from "@/lib/case-studies-data";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

const CaseStudyCard = ({ study, index }: CaseStudyCardProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <Link
      ref={cardRef}
      to={`/case-studies/${study.id}`}
      data-cursor="card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group block w-full text-left p-8 md:p-10 rounded-2xl border border-border/60",
        "bg-card/60 backdrop-blur-xl hover:bg-card/80",
        "hover:shadow-[0_8px_30px_hsl(var(--foreground)/0.06)]",
        "active:scale-[0.99]",
        "transition-all duration-500"
      )}
      style={{
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        willChange: "transform",
      }}
    >
      <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#c9a96e] mb-4 group-hover:brightness-125 transition-all duration-300">
        {study.tag}
      </span>
      <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-3 group-hover:text-[#c9a96e] transition-colors duration-300"
        style={{ transform: `translateX(${tilt.y * -0.3}px) translateY(${tilt.x * -0.3}px)` }}
      >
        {study.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
        {study.subtitle}
      </p>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
        View case study
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
};

export default CaseStudyCard;
