import { motion, useReducedMotion } from "framer-motion";
import { ReactNode, forwardRef } from "react";

const PageTransition = forwardRef<HTMLDivElement, { children: ReactNode }>(({ children }, ref) => {
  const reduced = useReducedMotion();
  return (
    <>
      {/* Wipe overlay */}
      {!reduced && <motion.div
        className="fixed inset-0 z-[60] bg-foreground origin-top pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{ transformOrigin: "bottom" }}
      />}

      {/* Content */}
      <motion.div
        ref={ref}
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: -15 }}
        transition={{
          duration: reduced ? 0 : 0.6,
          delay: reduced ? 0 : 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </>
  );
});
PageTransition.displayName = "PageTransition";

export default PageTransition;
