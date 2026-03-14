import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
  /** "fade" = opacity+translate, "clip" = clipPath wipe, "scale" = scale+opacity */
  variant?: "fade" | "clip" | "scale";
}

const ScrollReveal = ({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 900,
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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  // Remove will-change after animation completes
  const handleTransitionEnd = useCallback(() => {
    if (ref.current && isVisible) {
      ref.current.style.willChange = "auto";
    }
  }, [isVisible]);

  const getStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      willChange: isVisible ? "auto" : "transform, opacity",
    };

    if (variant === "clip") {
      const clipMap: Record<string, string> = {
        up: "inset(100% 0 0 0)",
        down: "inset(0 0 100% 0)",
        left: "inset(0 100% 0 0)",
        right: "inset(0 0 0 100%)",
        none: "inset(0 50% 0 50%)",
      };
      return {
        ...base,
        transitionProperty: "clip-path, opacity",
        clipPath: isVisible ? "inset(0 0 0 0)" : clipMap[direction],
        opacity: isVisible ? 1 : 0,
      };
    }

    if (variant === "scale") {
      return {
        ...base,
        transitionProperty: "transform, opacity, filter",
        transform: isVisible ? "scale(1) translateY(0)" : "scale(0.92) translateY(20px)",
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? "blur(0px)" : "blur(6px)",
      };
    }

    // Default: fade
    const translateMap: Record<string, string> = {
      up: "translateY(40px)",
      down: "translateY(-40px)",
      left: "translateX(40px)",
      right: "translateX(-40px)",
      none: "translateY(0)",
    };

    return {
      ...base,
      transitionProperty: "transform, opacity, filter",
      transform: isVisible ? "translateY(0) translateX(0)" : translateMap[direction],
      opacity: isVisible ? 1 : 0,
      filter: isVisible ? "blur(0px)" : "blur(4px)",
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
