import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const SectionDivider = () => {
  const { ref, isVisible } = useScrollReveal({ once: true });

  return (
    <div ref={ref} className="max-w-[1400px] mx-auto section-padding overflow-hidden">
      <motion.div
        className="h-px bg-border"
        initial={{ scaleX: 0 }}
        animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
};

export default SectionDivider;
