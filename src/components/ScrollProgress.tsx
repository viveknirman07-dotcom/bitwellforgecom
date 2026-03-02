import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.5 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[9998]"
      style={{
        scaleX,
        backgroundColor: "#c9a96e",
        willChange: "transform",
      }}
    />
  );
};

export default ScrollProgress;
