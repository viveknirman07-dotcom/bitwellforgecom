import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface CTABlockProps {
  heading?: string;
  subtext?: string;
  buttonLabel?: string;
  href?: string;
  service?: string;
}

const CTABlock = ({
  heading = "Ready to build your growth system?",
  subtext = "The right infrastructure makes growth feel inevitable.",
  buttonLabel = "Book Infrastructure Audit",
  href = "/contact",
  service = "General Inquiry",
}: CTABlockProps) => {
  const { ref, isVisible } = useScrollReveal({ once: true });
  const prefersReduced = useReducedMotion();

  const contactHref = href === "/contact"
    ? `/contact?service=${encodeURIComponent(service)}`
    : href;

  return (
    <section ref={ref} className="section-padding pb-[200px] pt-24 md:pt-32">
      <div className="sheet-inner text-center">
        <motion.h2
          className="font-heading text-3xl md:text-5xl font-semibold text-foreground mb-6 text-balance"
          initial={prefersReduced ? false : { opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {heading}
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto"
          initial={prefersReduced ? false : { opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {subtext}
        </motion.p>
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20, scale: 0.92 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <Link
            to={contactHref}
            className="glow-cta group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-black px-8 py-4 text-sm font-medium tracking-wide text-white dark:bg-gold dark:text-navy"
          >
            <span className="relative z-10 flex items-center gap-2">
              {buttonLabel}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }} />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABlock;
