import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef, useState, useCallback } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  index: number;
}

const ServiceCard = ({ title, description, href, index }: ServiceCardProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [transform, setTransform] = useState("");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -8;
    const rotateY = (x - 0.5) * 8;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlare({ x: x * 100, y: y * 100, opacity: 0.08 });
  }, []);

  const handleLeave = useCallback(() => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlare({ x: 50, y: 50, opacity: 0 });
  }, []);

  return (
    <Link
      ref={cardRef}
      to={href}
      className="group block p-8 md:p-10 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl hover:shadow-[0_20px_60px_hsl(var(--foreground)/0.08)] hover:border-accent/30 active:scale-[0.99] transition-shadow duration-500 relative overflow-hidden"
      style={{
        transform,
        transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease",
        willChange: "transform",
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Glare effect */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, hsl(var(--accent) / ${glare.opacity}), transparent 60%)`,
          transition: "opacity 0.3s ease",
        }}
      />
      <h3 className="font-heading text-xl md:text-2xl font-extralight text-foreground mb-3 group-hover:text-accent transition-colors duration-300 relative z-10">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 relative z-10">
        {description}
      </p>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-all duration-400 relative z-10">
        Learn more
        <ArrowRight size={14} className="transition-transform duration-400 group-hover:translate-x-1.5" style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }} />
      </span>
    </Link>
  );
};

export default ServiceCard;
