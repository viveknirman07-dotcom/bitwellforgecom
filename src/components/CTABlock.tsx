import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

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
  const { ref, isVisible } = useScrollReveal({ once: true });

  return (
    <section ref={ref} className="section-padding section-y relative overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, rgba(201,169,110,0.4) 0%, transparent 70%)",
            top: "20%",
            left: "10%",
            mixBlendMode: "screen",
          }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, rgba(100,120,160,0.4) 0%, transparent 70%)",
            top: "30%",
            right: "15%",
            mixBlendMode: "screen",
          }}
          animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1.1, 0.9, 1.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, rgba(30,30,50,0.5) 0%, transparent 70%)",
            bottom: "10%",
            left: "40%",
            mixBlendMode: "screen",
          }}
          animate={{ x: [0, 20, 0], y: [0, -20, 0], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto text-center relative z-10">
        <motion.h2
          className="font-heading text-3xl md:text-5xl font-semibold text-foreground mb-6 text-balance"
          initial={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
          animate={isVisible ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.95, filter: "blur(6px)" }}
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
            to={href}
            className="group relative inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm font-medium tracking-wide overflow-hidden hover:scale-[1.04] active:scale-[0.98] transition-transform duration-200 cta-glow"
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <span className="relative z-10 flex items-center gap-2 group-hover:text-[#0a0a0a] transition-colors duration-350">
              {buttonLabel}
              <ArrowRight size={16} />
            </span>
            <span className="absolute inset-0 bg-[#c9a96e] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400" style={{ transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)" }} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABlock;
