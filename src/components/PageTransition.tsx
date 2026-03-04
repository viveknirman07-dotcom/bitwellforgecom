import { motion } from "framer-motion";
import { ReactNode } from "react";

const pageVariants = {
  initial: {
    clipPath: "inset(100% 0 0 0)",
    opacity: 0,
  },
  enter: {
    clipPath: "inset(0 0 0 0)",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    opacity: 0,
    transition: {
      duration: 0.45,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
};

const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
