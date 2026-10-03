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
  const [show, setShow] = useState(() => {
    if (reduced || typeof window === "undefined") return false;
    try { return !sessionStorage.getItem("bf-preloaded"); } catch { return true; }
  });

  useEffect(() => {
    if (!show) { onDone(); return; }
    document.documentElement.style.overflow = "hidden";
    let active = true;
    const started = performance.now();
    const minimum = 3200;
    const maximum = 4200;
    const preload = images.slice(0, 6).map((src) => new Promise<void>((resolve) => {
      const image = new Image();
      image.decoding = "async";
      image.onload = () => { image.decode?.().catch(() => {}).finally(resolve); };
      image.onerror = () => resolve();
      image.src = src;
    }));
    const maxTimer = window.setTimeout(() => active && setShow(false), maximum);
    Promise.all(preload).then(() => {
      const remaining = Math.max(0, minimum - (performance.now() - started));
      window.setTimeout(() => active && setShow(false), remaining);
    });
    return () => {
      active = false;
      clearTimeout(maxTimer);
      document.documentElement.style.overflow = "";
    };
  }, [show, onDone]);

  return (
    <AnimatePresence onExitComplete={() => {
      document.documentElement.style.overflow = "";
      try { sessionStorage.setItem("bf-preloaded", "1"); } catch { /* storage may be unavailable */ }
      onDone();
    }}>
      {show && (
        <motion.div className="fixed inset-0 z-[200] bg-background flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }} aria-hidden>
          <img src={images[0]} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-20" />
          {images.slice(0, 6).map((src, i) => (
            <div key={i} className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-full overflow-hidden ${sizes[i]}`}>
              <motion.img src={src} alt=""
                fetchPriority={i === 0 ? "high" : "low"}
                decoding="async"
                className="h-full w-full object-cover"
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.4, ease }} />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/65 to-background/10 pointer-events-none" />
          <motion.p className="relative z-10 font-heading font-normal text-center text-[52px] md:text-[124px] leading-[0.91] tracking-[-0.03em] px-5 max-w-[17ch] text-foreground"
            initial={{ opacity: 1, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.05, ease }}>
            {headline}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
