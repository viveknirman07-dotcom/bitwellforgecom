import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
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
  buttonLabel = "Start the Conversation",
  href = "/contact",
  service = "General Inquiry",
}: CTABlockProps) => {
  const { ref, isVisible } = useScrollReveal({ once: true });

  const contactHref = href === "/contact"
    ? `/contact?service=${encodeURIComponent(service)}`
    : href;

  return (
    <section ref={ref} className="section-padding section-y">
      <div className="max-w-[1400px] mx-auto text-center">
        <motion.h2
          className="font-heading text-3xl md:text-5xl font-semibold text-foreground mb-6 text-balance"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {heading}
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {subtext}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to={contactHref}
            className="group relative inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm font-medium tracking-wide overflow-hidden hover:scale-[1.04] active:scale-[0.98] transition-transform duration-200"
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <span className="relative z-10 flex items-center gap-2">
              {buttonLabel}
              <ArrowRight size={16} />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABlock;
