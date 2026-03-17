import { motion } from "framer-motion";
import { ReactNode } from "react";

const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* Wipe overlay */}
      <motion.div
        className="fixed inset-0 z-[60] bg-foreground origin-top pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{ transformOrigin: "bottom" }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{
          duration: 0.6,
          delay: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
