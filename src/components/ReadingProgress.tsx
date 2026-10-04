import { useEffect, useState } from "react";

/**
 * Subtle text-based reading progress indicator.
 * Displays scroll percentage in the top-right corner.
 */
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop || document.body.scrollTop;
      const height = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
      setProgress(
        height > 0 ? Math.min(100, Math.max(0, Math.round((scrolled / height) * 100))) : 0,
      );
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
    <>
      {/* Mobile/tablet: anchors land below the fixed 64px header (+1px border) */}
      <style>{`@media (max-width:1023px){html{scroll-padding-top:calc(65px + 16px)}}`}</style>
      <div
        aria-hidden
        className="fixed top-[calc(65px+12px)] right-5 md:right-8 lg:top-8 lg:right-8 z-40 lg:z-[60] pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground/50 tabular-nums">
          {progress}%
        </span>
      </div>
    </>
  );
};

export default ReadingProgress;

  );
};

export default ReadingProgress;
