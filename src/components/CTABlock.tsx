import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CTABlockProps {
  heading?: string;
  subtext?: string;
  buttonLabel?: string;
  href?: string;
}

const CTABlock = ({
  heading = "Ready to build your growth system?",
  subtext = "The right infrastructure makes growth feel inevitable.",
  buttonLabel = "Start the Conversation",
  href = "/contact",
}: CTABlockProps) => {
  return (
    <section className="section-padding section-y">
      <div className="max-w-[1400px] mx-auto text-center">
        <h2 className="font-heading text-3xl md:text-5xl font-semibold text-foreground mb-6 text-balance">
          {heading}
        </h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
          {subtext}
        </p>
        <Link
          to={href}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500"
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {buttonLabel}
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default CTABlock;
