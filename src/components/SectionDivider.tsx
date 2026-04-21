import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const SectionDivider = () => {
  const { ref, isVisible } = useScrollReveal({ once: true });

  return (
    <div ref={ref} className="max-w-[1400px] mx-auto section-padding overflow-hidden">
      <div className="relative flex items-center justify-center py-2">
        <motion.div
          className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isVisible ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          aria-hidden
          className="mx-4 text-gold text-[10px] leading-none select-none"
          initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
          animate={isVisible ? { opacity: 1, scale: 1, rotate: 45 } : { opacity: 0, scale: 0.6, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          ◆
        </motion.span>
        <motion.div
          className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/40 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isVisible ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
};

export default SectionDivider;
