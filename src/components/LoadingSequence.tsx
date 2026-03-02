import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"logo" | "sweep" | "done">("logo");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Phase 1: Logo draws for ~1.4s
    const t1 = setTimeout(() => setPhase("sweep"), 1800);
    // Phase 2: Sweep + fade for ~1.2s
    const t2 = setTimeout(() => setPhase("done"), 3200);
    // Phase 3: Complete
    const t3 = setTimeout(() => onComplete(), 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ backgroundColor: "#0a0a0a" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo SVG draw */}
          <motion.div
            className="relative"
            animate={phase === "sweep" ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg
              viewBox="0 0 240 40"
              className="w-48 md:w-64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* B */}
              <motion.text
                x="0"
                y="32"
                fontFamily="'Playfair Display', serif"
                fontSize="36"
                fontWeight="600"
                stroke="#c9a96e"
                strokeWidth="1"
                fill="none"
                initial={{ strokeDasharray: 200, strokeDashoffset: 200 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.5, delay: 0, ease: [0.22, 1, 0.36, 1] }}
              >
                B
              </motion.text>
              {/* w */}
              <motion.text
                x="28"
                y="32"
                fontFamily="'Playfair Display', serif"
                fontSize="36"
                fontWeight="400"
                stroke="#c9a96e"
                strokeWidth="1"
                fill="none"
                initial={{ strokeDasharray: 200, strokeDashoffset: 200 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                w
              </motion.text>
              {/* F */}
              <motion.text
                x="62"
                y="32"
                fontFamily="'Playfair Display', serif"
                fontSize="36"
                fontWeight="600"
                stroke="#c9a96e"
                strokeWidth="1"
                fill="none"
                initial={{ strokeDasharray: 200, strokeDashoffset: 200 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                F
              </motion.text>
              {/* . */}
              <motion.circle
                cx="98"
                cy="31"
                r="3"
                stroke="#c9a96e"
                strokeWidth="1.5"
                fill="none"
                initial={{ strokeDasharray: 20, strokeDashoffset: 20 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.4, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
          </motion.div>

          {/* Gold sweep line */}
          {phase === "sweep" && (
            <motion.div
              className="absolute left-0 top-1/2 h-[2px] w-full origin-left"
              style={{ backgroundColor: "#c9a96e" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingSequence;
