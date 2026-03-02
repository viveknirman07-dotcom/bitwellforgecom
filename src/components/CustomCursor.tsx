import { useEffect, useRef, useState, useCallback } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hoverState, setHoverState] = useState<"default" | "text" | "button" | "link" | "card">("default");
  const [clicking, setClicking] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mql.matches || prefersReduced.matches) return;

    const move = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (!visible) setVisible(true);
      // Dot follows exactly
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("[data-cursor='card']")) setHoverState("card");
      else if (t.closest("button") || t.closest("[role='button']")) setHoverState("button");
      else if (t.closest("a")) setHoverState("link");
      else if (t.closest("p") || t.closest("h1") || t.closest("h2") || t.closest("h3") || t.closest("h4") || t.closest("span")) setHoverState("text");
      else setHoverState("default");
    };

    const handleOut = () => setHoverState("default");
    const handleDown = () => setClicking(true);
    const handleUp = () => setClicking(false);
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    // Ring lerp loop
    const loop = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    document.addEventListener("mousedown", handleDown);
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mousedown", handleDown);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [visible]);

  if (!visible) return null;

  const dotScale =
    clicking ? 2 :
    hoverState === "text" ? 0 :
    hoverState === "button" ? 2 :
    1;

  const ringScale =
    hoverState === "text" ? 1.5 :
    hoverState === "button" ? 2 :
    hoverState === "card" ? 1.8 :
    1;

  const ringBorder =
    hoverState === "text" ? "1px dashed #c9a96e" :
    hoverState === "button" ? "1px solid rgba(201,169,110,0.5)" :
    "1px solid rgba(201,169,110,0.5)";

  const ringBg =
    hoverState === "button" ? "rgba(201,169,110,0.15)" :
    "transparent";

  const ringTransform =
    hoverState === "link" ? "translate(-50%, -50%) scaleX(2) scaleY(0.5)" :
    `translate(-50%, -50%) scale(${ringScale})`;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed z-[9999] pointer-events-none"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#c9a96e",
          transform: `translate(-50%, -50%) scale(${dotScale})`,
          transition: "transform 0.15s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "left, top, transform",
          backfaceVisibility: "hidden",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed z-[9999] pointer-events-none"
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: ringBorder,
          backgroundColor: ringBg,
          transform: ringTransform,
          transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), border 0.2s, background-color 0.2s",
          willChange: "left, top, transform",
          backfaceVisibility: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {hoverState === "card" && (
          <span style={{ fontSize: 7, letterSpacing: "0.15em", color: "#c9a96e", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>
            Explore
          </span>
        )}
      </div>
    </>
  );
};

export default CustomCursor;
