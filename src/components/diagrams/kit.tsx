import { ReactNode } from "react";

/**
 * Shared diagram kit.
 *
 * One geometry, one type scale, one stroke scale for every diagram on the site.
 * All diagrams are 240 x 160 (3:2) and draw inside the safe field below so they
 * sit identically in every 3:2 frame, on every breakpoint, in both modes.
 *
 * Colour is inherited (currentColor) so light and dark modes resolve from the
 * surrounding frame instead of hardcoded values.
 */

export const VB = "0 0 240 160";
export const FRAME = "w-full h-full block";

/* Safe drawing field — nothing should be drawn outside this */
export const FIELD = { x1: 22, y1: 20, x2: 218, y2: 144, cx: 120, cy: 82 };

/* Type scale */
export const TYPE = { caption: 4.4, label: 3.8, micro: 3.4 };

/* Stroke scale */
export const STROKE = { hair: 0.3, thin: 0.4, base: 0.55, bold: 0.8 };

export const Grid = ({
  w = 240,
  h = 160,
  opacity = 0.14,
}: {
  w?: number;
  h?: number;
  opacity?: number;
}) => (
  <g opacity={opacity}>
    {Array.from({ length: Math.floor(w / 12) }).map((_, i) => (
      <line key={`gx${i}`} x1={i * 12} y1={0} x2={i * 12} y2={h} stroke="currentColor" strokeWidth="0.15" />
    ))}
    {Array.from({ length: Math.floor(h / 12) }).map((_, i) => (
      <line key={`gy${i}`} x1={0} y1={i * 12} x2={w} y2={i * 12} stroke="currentColor" strokeWidth="0.15" />
    ))}
  </g>
);

/** Root svg for every diagram. */
export const Diagram = ({
  children,
  grid = true,
  gridOpacity = 0.14,
}: {
  children: ReactNode;
  grid?: boolean;
  gridOpacity?: number;
}) => (
  <svg
    viewBox={VB}
    preserveAspectRatio="xMidYMid meet"
    className={FRAME}
    role="presentation"
    aria-hidden="true"
    focusable="false"
  >
    {grid && <Grid opacity={gridOpacity} />}
    {children}
  </svg>
);

type TextProps = {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
  size?: number;
  opacity?: number;
};

/** Section caption — the one line that names what the diagram shows. */
export const Caption = ({ x = FIELD.x1, y = FIELD.y1, children, anchor = "start", opacity = 0.55 }: TextProps) => (
  <text
    x={x}
    y={y}
    textAnchor={anchor}
    fontSize={TYPE.caption}
    fontFamily="DM Sans, sans-serif"
    fill="currentColor"
    opacity={opacity}
    letterSpacing="0.7"
  >
    {children}
  </text>
);

/** Node / axis label. */
export const Label = ({ x, y, children, anchor = "middle", size = TYPE.label, opacity = 0.6 }: TextProps) => (
  <text
    x={x}
    y={y}
    textAnchor={anchor}
    fontSize={size}
    fontFamily="DM Sans, sans-serif"
    fill="currentColor"
    opacity={opacity}
    letterSpacing="0.6"
  >
    {children}
  </text>
);

/** Square module node. */
export const Node = ({ x, y, r = 5, opacity = 0.75 }: { x: number; y: number; r?: number; opacity?: number }) => (
  <>
    <rect
      x={x - r}
      y={y - r}
      width={r * 2}
      height={r * 2}
      fill="hsl(var(--background))"
      stroke="currentColor"
      strokeWidth={STROKE.base}
      opacity={opacity}
    />
    <circle cx={x} cy={y} r="1.2" fill="currentColor" opacity="0.9" />
  </>
);

/** Static connector. */
export const Link = ({
  d,
  opacity = 0.45,
  dashed = false,
  width = STROKE.hair,
}: {
  d: string;
  opacity?: number;
  dashed?: boolean;
  width?: number;
}) => (
  <path
    d={d}
    fill="none"
    stroke="currentColor"
    strokeWidth={width}
    strokeDasharray={dashed ? "1.5 2" : undefined}
    opacity={opacity}
  />
);

/** Signal travelling a path. Continuous, GPU-cheap, respects reduced motion via CSS. */
export const Flow = ({
  path,
  dur = 5,
  begin = 0,
  r = 1.3,
}: {
  path: string;
  dur?: number;
  begin?: number;
  r?: number;
}) => (
  <circle r={r} fill="currentColor" className="diagram-motion">
    <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} />
    <animate
      attributeName="opacity"
      values="0;1;1;0"
      keyTimes="0;0.1;0.85;1"
      dur={`${dur}s`}
      begin={`${begin}s`}
      repeatCount="indefinite"
    />
  </circle>
);
