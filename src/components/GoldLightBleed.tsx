import { motion } from "framer-motion";

const GoldLightBleed = () => {
  return (
    <motion.div
      className="fixed bottom-0 left-0 pointer-events-none z-[9989] w-[600px] h-[600px]"
      style={{
        background: "radial-gradient(circle at center, rgba(201,169,110,0.06) 0%, transparent 70%)",
        willChange: "transform",
      }}
      animate={{
        x: [-20, 20, -20],
        y: [-20, 20, -20],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default GoldLightBleed;
