/**
 * Process page phase icons — fully token-driven, breathing 24/7.
 * Each icon is 56×56 viewBox, intended to be sized by parent.
 */
import { ReactNode } from "react";

const Wrap = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 56 56" className="w-10 h-10 anim-float-drift overflow-visible" aria-hidden>
    {children}
  </svg>
);

/* 01 — Magnifying glass */
export const ClarityIcon = () => (
  <Wrap>
    <circle cx="22" cy="22" r="12" fill="hsl(var(--svg-fill))" stroke="hsl(var(--svg-stroke))" strokeWidth="1.4" className="anim-node-pulse" style={{ transformOrigin: "22px 22px" }} />
    <line x1="31" y1="31" x2="44" y2="44" stroke="hsl(var(--svg-stroke))" strokeWidth="1.6" strokeLinecap="round" />
  </Wrap>
);

/* 02 — Blueprint grid */
export const ArchitectureIcon = () => {
  const pts: [number, number][] = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) pts.push([10 + c * 12, 10 + r * 12]);
  const links: [number, number, number, number][] = [
    [10, 10, 46, 10], [10, 46, 46, 46], [10, 10, 10, 46], [46, 10, 46, 46],
    [22, 22, 34, 34],
  ];
  return (
    <Wrap>
      {links.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="hsl(var(--svg-stroke))" strokeWidth="1" strokeDasharray="240"
          className="anim-line-draw" style={{ animationDelay: `${i * 0.4}s` }} />
      ))}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.6" fill="hsl(var(--svg-highlight))"
          className="anim-node-pulse" style={{ animationDelay: `${i * 0.15}s`, transformOrigin: `${x}px ${y}px` }} />
      ))}
    </Wrap>
  );
};

/* 03 — Gear (8 teeth, rotates 12s) */
export const GearIcon = () => {
  const teeth = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <Wrap>
      <g className="anim-rotate-12" style={{ transformOrigin: "28px 28px" }}>
        {teeth.map((deg) => (
          <rect key={deg} x="26" y="6" width="4" height="6"
            fill="hsl(var(--svg-stroke))"
            transform={`rotate(${deg} 28 28)`} />
        ))}
        <circle cx="28" cy="28" r="14" fill="hsl(var(--svg-fill))" stroke="hsl(var(--svg-stroke))" strokeWidth="1.3" />
        <circle cx="28" cy="28" r="5"  fill="hsl(var(--svg-highlight))" className="anim-glow-pulse" />
      </g>
    </Wrap>
  );
};

/* 04 — Triangle of 3 nodes */
export const IntegrationIcon = () => {
  const a = { x: 28, y: 8 }, b = { x: 8, y: 44 }, c = { x: 48, y: 44 };
  const edges: [{ x: number; y: number }, { x: number; y: number }][] = [[a, b], [b, c], [c, a]];
  return (
    <Wrap>
      {edges.map((e, i) => (
        <line key={i} x1={e[0].x} y1={e[0].y} x2={e[1].x} y2={e[1].y}
          stroke="hsl(var(--svg-stroke))" strokeWidth="1.2" strokeDasharray="240"
          className="anim-line-draw" style={{ animationDelay: `${i * 0.6}s` }} />
      ))}
      {[a, b, c].map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="3" fill="hsl(var(--svg-highlight))"
          className="anim-node-pulse" style={{ animationDelay: `${i * 0.4}s`, transformOrigin: `${n.x}px ${n.y}px` }} />
      ))}
      <circle cx="28" cy="32" r="2" fill="hsl(var(--svg-highlight))" className="anim-glow-pulse" />
    </Wrap>
  );
};

/* 05 — Upward trend line */
export const TrendIcon = () => (
  <Wrap>
    <line x1="8" y1="48" x2="48" y2="48" stroke="hsl(var(--svg-accent))" strokeWidth="0.9" />
    <line x1="8" y1="48" x2="8"  y2="10" stroke="hsl(var(--svg-accent))" strokeWidth="0.9" />
    <polyline points="10,42 20,34 28,38 38,22 46,14"
      fill="none" stroke="hsl(var(--svg-stroke))" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      strokeDasharray="240" className="anim-line-draw" />
    <circle cx="46" cy="14" r="3" fill="hsl(var(--svg-highlight))" className="anim-glow-pulse" />
  </Wrap>
);

export const phaseIcons = [ClarityIcon, ArchitectureIcon, GearIcon, IntegrationIcon, TrendIcon];
