import { motion } from "framer-motion";
import { ReactNode } from "react";

const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* Wipe overlay — slides down to reveal */}
      <motion.div
        className="fixed inset-0 z-[60] bg-foreground origin-top pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{ transformOrigin: "bottom" }}
      />
      <motion.div
        className="fixed inset-0 z-[60] bg-foreground origin-bottom pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.05,
        }}
        style={{ transformOrigin: "top" }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.7,
          delay: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
