import { cn } from "@/lib/utils";
import { createElement, type ElementType, type ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  /** Optional rendered tag. Defaults to <p>. */
  as?: ElementType;
  /** When true, renders a small leading line in the eyebrow accent colour. */
  withLine?: boolean;
}

/**
 * Sitewide eyebrow / kicker label.
 * Uses the --eyebrow-color token (#7eb8d4) defined in index.css.
 */
const Eyebrow = ({
  children,
  className,
  as = "p",
  withLine = false,
}: EyebrowProps) => {
  return createElement(
    as,
    {
      className: cn(
        "inline-flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.22em] uppercase",
        "text-[hsl(var(--eyebrow-color))]",
        className,
      ),
    },
    withLine ? (
      <span
        aria-hidden="true"
        className="block h-px w-8 bg-[hsl(var(--eyebrow-line))]"
      />
    ) : null,
    <span>{children}</span>,
  );
};

export default Eyebrow;
