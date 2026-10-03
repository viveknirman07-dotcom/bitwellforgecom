import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const ease = [0.65, 0, 0.35, 1] as const;

/** Opening sequence: centred headline, stacked images expand one by one, final image fills the screen, then dissolves. */
const sizes = [
  "h-[140px] md:h-[200px] aspect-[3/4]",
  "h-[200px] md:h-[300px] aspect-[3/5]",
  "h-[240px] md:h-[350px] aspect-square",
  "h-[60%] md:h-[80%] aspect-[3/4]",
  "h-full aspect-square",
  "h-full w-full",
];

export default function HomePreloader({ images, headline, onDone }: { images: string[]; headline: string; onDone: () => void }) {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(() => !reduced && typeof window !== "undefined" && !sessionStorage.getItem("bf-preloaded"));

  useEffect(() => {
    if (!show) { onDone(); return; }
    sessionStorage.setItem("bf-preloaded", "1");
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => setShow(false), 3600);
    return () => { clearTimeout(t); document.documentElement.style.overflow = ""; };
  }, [show, onDone]);

  return (
    <AnimatePresence onExitComplete={() => { document.documentElement.style.overflow = ""; onDone(); }}>
      {show && (
        <motion.div className="fixed inset-0 z-[200] bg-background flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }} aria-hidden>
          {images.slice(0, 6).map((src, i) => (
            <motion.img key={i} src={src} alt=""
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover max-w-full ${sizes[i]}`}
              initial={{ clipPath: "inset(50% 50% 50% 50%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.4, ease }} />
          ))}
          <motion.p className="relative z-10 font-heading font-normal text-center text-[52px] md:text-[124px] leading-[0.91] tracking-[-0.03em] px-5 max-w-[12ch] text-foreground"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            {headline}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
