import { useEffect, useState } from "react";

/**
 * Subtle top-of-page reading progress indicator.
 * Uses scroll position over the document height. GPU-friendly (transform/opacity only).
 */
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop || document.body.scrollTop;
      const height = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
      setProgress(height > 0 ? Math.min(1, Math.max(0, scrolled / height)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-transparent pointer-events-none"
    >
      <div
        className="h-full origin-left bg-[hsl(var(--eyebrow-color))]/80 transition-[transform] duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
};

export default ReadingProgress;
