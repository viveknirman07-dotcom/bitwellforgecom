import { motion, useScroll, useTransform } from "framer-motion";

const ScrollIndicator = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      style={{ opacity }}
    >
      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Scroll</span>
      <div className="relative w-px h-10 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-[#c9a96e]"
          animate={{ height: ["0%", "100%", "0%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "top" }}
        />
      </div>
    </motion.div>
  );
};

export default ScrollIndicator;
