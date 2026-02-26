import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  index: number;
}

const ServiceCard = ({ title, description, href, index }: ServiceCardProps) => {
  return (
    <Link
      to={href}
      className={`group block p-8 md:p-10 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl hover:bg-card/80 hover:shadow-[0_8px_30px_hsl(var(--foreground)/0.06)] hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.99] transition-all duration-500 animate-fade-up`}
      style={{ animationDelay: `${index * 0.1}s`, transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
        {description}
      </p>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
        Learn more
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
};

export default ServiceCard;
