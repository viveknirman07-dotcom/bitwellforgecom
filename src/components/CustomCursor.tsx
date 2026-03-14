import { useEffect, useRef, useState, useCallback } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const dot = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const raf = useRef<number>(0);

  const animate = useCallback(() => {
    // Dot follows tightly (lerp 0.25)
    dot.current.x += (mouse.current.x - dot.current.x) * 0.25;
    dot.current.y += (mouse.current.y - dot.current.y) * 0.25;
    // Ring follows with more lag (lerp 0.12)
    ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
    ring.current.y += (mouse.current.y - ring.current.y) * 0.12;

    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate(-50%, -50%) scale(${clicking ? 0.5 : 1})`;
    }
    if (ringRef.current) {
      const s = hovering ? 2.5 : clicking ? 0.6 : 1;
      ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${s})`;
      ringRef.current.style.opacity = hovering ? "0.3" : "0.6";
    }

    raf.current = requestAnimationFrame(animate);
  }, [hovering, clicking]);

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    if (!mql.matches) return;

    const move = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a") || t.closest("button") || t.closest("[role='button']") || t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT") {
        setHovering(true);
      }
    };
    const out = () => setHovering(false);
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    document.addEventListener("mouseout", out, { passive: true });
    document.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      cancelAnimationFrame(raf.current);
    };
  }, [visible, animate]);

  if (!visible) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ willChange: "transform" }}
      >
        <div className="w-2 h-2 rounded-full bg-accent" />
      </div>
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
        style={{
          willChange: "transform",
          transition: "opacity 0.3s ease",
        }}
      >
        <div className="w-10 h-10 rounded-full border border-accent/60" />
      </div>
    </>
  );
};

export default CustomCursor;
