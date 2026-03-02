import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  index: number;
}

const ServiceCard = ({ title, description, href, index }: ServiceCardProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlightPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <Link
      ref={cardRef}
      to={href}
      onMouseMove={handleMouseMove}
      className="group block p-8 md:p-10 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl
        hover:bg-card/80 hover:shadow-[0_8px_30px_hsl(var(--foreground)/0.06)]
        hover:-translate-y-2.5 hover:border-[#c9a96e]/30 active:scale-[0.99]
        transition-all duration-500 relative overflow-hidden"
      style={{
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
        perspective: "1000px",
      }}
    >
      {/* Spotlight follow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(201,169,110,0.08) 0%, transparent 60%)`,
        }}
      />

      <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-3 group-hover:text-[#c9a96e] transition-colors duration-300 relative z-10">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 relative z-10">
        {description}
      </p>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-all duration-300 relative z-10">
        Learn more
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }} />
      </span>
    </Link>
  );
};

export default ServiceCard;
