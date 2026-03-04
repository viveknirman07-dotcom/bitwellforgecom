import { useEffect, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const springConfig = { damping: 20, stiffness: 250, mass: 0.4 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const handleMouseDown = useCallback(() => setClicking(true), []);
  const handleMouseUp = useCallback(() => setClicking(false), []);

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    if (!mql.matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT"
      ) {
        setHovering(true);
      }
    };

    const handleOut = () => setHovering(false);
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, visible, handleMouseDown, handleMouseUp]);

  if (!visible) return null;

  const size = clicking ? 6 : hovering ? 32 : 8;
  const offset = size / -2;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
      style={{ x: cursorX, y: cursorY }}
    >
      <motion.div
        className="rounded-full bg-accent"
        animate={{
          width: size,
          height: size,
          x: offset,
          y: offset,
          opacity: hovering ? 0.4 : 0.8,
        }}
        transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
      />
    </motion.div>
  );
};

export default CustomCursor;
