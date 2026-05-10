import { useEffect, useRef, useState } from "react";

/**
 * Minimal cursor: a small dot with a smoothly trailing ring.
 * Hidden on touch devices and when prefers-reduced-motion is set.
 * GPU-only (transform/opacity).
 */
const MovingCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;
    setEnabled(true);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]');
      if (interactive !== hovering) {
        hovering = interactive;
        ringRef.current?.classList.toggle("cursor-ring--hover", hovering);
      }
    };

    const onLeave = () => {
      dotRef.current?.classList.add("opacity-0");
      ringRef.current?.classList.add("opacity-0");
    };
    const onEnter = () => {
      dotRef.current?.classList.remove("opacity-0");
      ringRef.current?.classList.remove("opacity-0");
    };

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 rounded-full border border-white mix-blend-difference transition-[width,height,border-color,opacity] duration-200 ease-out will-change-transform"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[101] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference will-change-transform"
      />
      <style>{`
        @media (pointer: fine) and (prefers-reduced-motion: no-preference) {
          html, body, a, button, [role="button"], input, textarea, select, label { cursor: none !important; }
        }
        .cursor-ring--hover {
          width: 3rem !important;
          height: 3rem !important;
        }
      `}</style>
    </>
  );
};

export default MovingCursor;
