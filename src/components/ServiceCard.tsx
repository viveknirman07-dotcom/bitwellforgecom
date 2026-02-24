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
      className={`group block p-8 md:p-10 rounded-2xl border border-border bg-card/70 backdrop-blur-sm hover:shadow-soft transition-all duration-500 animate-fade-up`}
      style={{ animationDelay: `${index * 0.1}s` }}
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
