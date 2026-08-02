import { useState } from "react";

/**
 * Revenue Infrastructure Framework.
 * Four interlocking pillars flowing into a central growth core.
 */
type Pillar = {
  id: string;
  title: string;
  sub: string;
  /** centre of the pillar plate */
  cx: number;
  cy: number;
  /** point on the plate edge where the stream leaves */
  ex: number;
  ey: number;
  icon: (x: number, y: number) => JSX.Element;
};

const W = 170;
const H = 56;

const icons = {
  target: (x: number, y: number) => (
    <g stroke="currentColor" fill="none" strokeWidth="1">
      <circle cx={x} cy={y} r="7" />
      <circle cx={x} cy={y} r="3" />
      <line x1={x} y1={y - 10} x2={x} y2={y - 8.5} />
      <line x1={x} y1={y + 8.5} x2={x} y2={y + 10} />
    </g>
  ),
  gears: (x: number, y: number) => (
    <g stroke="currentColor" fill="none" strokeWidth="1">
      <circle cx={x - 3.5} cy={y} r="5" />
      <circle cx={x + 5} cy={y + 3} r="3.5" />
      <line x1={x - 3.5} y1={y - 8} x2={x - 3.5} y2={y - 6.5} />
      <line x1={x - 3.5} y1={y + 6.5} x2={x - 3.5} y2={y + 8} />
    </g>
  ),
  chip: (x: number, y: number) => (
    <g stroke="currentColor" fill="none" strokeWidth="1">
      <rect x={x - 5} y={y - 5} width="10" height="10" rx="1.5" />
      <line x1={x - 9} y1={y - 2} x2={x - 5} y2={y - 2} />
      <line x1={x - 9} y1={y + 2} x2={x - 5} y2={y + 2} />
      <line x1={x + 5} y1={y - 2} x2={x + 9} y2={y - 2} />
      <line x1={x + 5} y1={y + 2} x2={x + 9} y2={y + 2} />
    </g>
  ),
  arrow: (x: number, y: number) => (
    <g stroke="currentColor" fill="none" strokeWidth="1">
      <line x1={x - 8} y1={y} x2={x + 7} y2={y} />
      <polyline points={`${x + 2},${y - 5} ${x + 7},${y} ${x + 2},${y + 5}`} />
    </g>
  ),
};

const pillars: Pillar[] = [
  {
    id: "clarity",
    title: "Strategic Clarity",
    sub: "Direction & positioning",
    cx: 250,
    cy: 52,
    ex: 250,
    ey: 80,
    icon: icons.target,
  },
  {
    id: "commercial",
    title: "Commercial Systems",
    sub: "Pipeline & conversion",
    cx: 412,
    cy: 250,
    ex: 327,
    ey: 250,
    icon: icons.gears,
  },
  {
    id: "operations",
    title: "Operations & Automation",
    sub: "Capability & leverage",
    cx: 250,
    cy: 448,
    ex: 250,
    ey: 420,
    icon: icons.chip,
  },
  {
    id: "execution",
    title: "Execution",
    sub: "Delivery cadence",
    cx: 88,
    cy: 250,
    ex: 173,
    ey: 250,
    icon: icons.arrow,
  },
];

const CX = 250;
const CY = 250;
const CORE_R = 84;

/** point on the core circle nearest to the pillar edge point */
const corePoint = (ex: number, ey: number) => {
  const dx = ex - CX;
  const dy = ey - CY;
  const len = Math.hypot(dx, dy) || 1;
  return { x: CX + (dx / len) * CORE_R, y: CY + (dy / len) * CORE_R };
};

const RevenueArchitecture = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className="diagram-frame w-full aspect-square max-w-[540px] mx-auto"
      style={{ color: "var(--svg-stroke)" }}
    >
      <svg
        viewBox="0 0 500 500"
        className="relative w-full h-full"
        role="img"
        aria-label="Revenue Infrastructure Framework: strategic clarity, commercial systems, operations and automation, and execution flowing into sustainable growth"
      >
        {/* Flowing streams */}
        {pillars.map((p, i) => {
          const c = corePoint(p.ex, p.ey);
          const isActive = active === p.id;
          const mx = (p.ex + c.x) / 2;
          const my = (p.ey + c.y) / 2;
          const d = `M ${p.ex} ${p.ey} Q ${mx} ${my} ${c.x} ${c.y}`;
          return (
            <g key={`stream-${p.id}`}>
              <path
                d={d}
                fill="none"
                stroke="currentColor"
                strokeWidth={isActive ? 1.1 : 0.7}
                opacity={isActive ? 0.85 : 0.4}
                style={{ transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)" }}
              />
              <path
                d={d}
                fill="none"
                stroke="hsl(var(--gold))"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeDasharray="10 90"
                opacity="0.85"
                style={{
                  animation: `lineFlow ${5 + i * 0.6}s linear infinite`,
                  animationDelay: `${i * 0.7}s`,
                }}
              />
            </g>
          );
        })}

        {/* Core */}
        <g>
          <circle
            cx={CX}
            cy={CY}
            r={CORE_R + 16}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeDasharray="2 5"
            opacity="0.3"
            style={{ transformOrigin: "250px 250px", animation: "rotateSlow 90s linear infinite" }}
          />
          <circle
            cx={CX}
            cy={CY}
            r={CORE_R}
            fill="hsl(var(--background))"
            stroke="currentColor"
            strokeWidth="0.9"
            opacity="0.95"
            style={{
              transformOrigin: "250px 250px",
              animation: "nodePulse 7s ease-in-out infinite",
            }}
          />
          <text
            x={CX}
            y={CY - 18}
            textAnchor="middle"
            fontSize="9"
            letterSpacing="2.4"
            fontFamily="DM Sans, sans-serif"
            fill="hsl(var(--gold))"
            opacity="0.9"
          >
            CORE OUTCOME
          </text>
          <text
            x={CX}
            y={CY + 4}
            textAnchor="middle"
            fontSize="15"
            fontFamily="Playfair Display, serif"
            fontStyle="italic"
            fill="hsl(var(--foreground))"
          >
            Sustainable Growth
          </text>
          <text
            x={CX}
            y={CY + 24}
            textAnchor="middle"
            fontSize="10.5"
            fontFamily="DM Sans, sans-serif"
            fill="hsl(var(--muted-foreground))"
          >
            Revenue Lifecycle
          </text>
        </g>

        {/* Pillar plates */}
        {pillars.map((p) => {
          const isActive = active === p.id;
          const x = p.cx - W / 2;
          const y = p.cy - H / 2;
          return (
            <g
              key={p.id}
              onMouseEnter={() => setActive(p.id)}
              onMouseLeave={() => setActive(null)}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={x}
                y={y}
                width={W}
                height={H}
                rx="10"
                fill="hsl(var(--background))"
                stroke="currentColor"
                strokeWidth={isActive ? 1.1 : 0.6}
                opacity={isActive ? 1 : 0.75}
                style={{ transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)" }}
              />
              {p.icon(x + 22, p.cy)}
              <text
                x={x + 40}
                y={p.cy - 3}
                fontSize="11.5"
                fontFamily="DM Sans, sans-serif"
                fill="hsl(var(--foreground))"
                opacity={isActive ? 1 : 0.85}
              >
                {p.title}
              </text>
              <text
                x={x + 40}
                y={p.cy + 12}
                fontSize="9"
                fontFamily="DM Sans, sans-serif"
                fill="hsl(var(--muted-foreground))"
                opacity={isActive ? 0.95 : 0.6}
              >
                {p.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default RevenueArchitecture;
