import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
  /** "fade" = opacity+translate, "scale" = scale+opacity */
  variant?: "fade" | "scale";
}

const ScrollReveal = ({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 800,
  once = true,
  variant = "fade",
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(el);

    // Safety fallback: if element is already in viewport or observer missed it
    const timeout = setTimeout(() => {
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsVisible(true);
        }
      }
    }, 1500 + delay);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [once, delay]);

  // Remove will-change after animation completes
  const handleTransitionEnd = useCallback(() => {
    if (ref.current && isVisible) {
      ref.current.style.willChange = "auto";
    }
  }, [isVisible]);

  const getStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      transitionProperty: "transform, opacity",
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      willChange: isVisible ? "auto" : "transform, opacity",
    };

    if (variant === "scale") {
      return {
        ...base,
        transform: isVisible ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)",
        opacity: isVisible ? 1 : 0,
      };
    }

    // Default: fade with directional translate
    const translateMap: Record<string, string> = {
      up: "translateY(32px)",
      down: "translateY(-32px)",
      left: "translateX(32px)",
      right: "translateX(-32px)",
      none: "translateY(0)",
    };

    return {
      ...base,
      transform: isVisible ? "translateY(0) translateX(0)" : translateMap[direction],
      opacity: isVisible ? 1 : 0,
    };
  };

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={getStyles()}
      onTransitionEnd={handleTransitionEnd}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
