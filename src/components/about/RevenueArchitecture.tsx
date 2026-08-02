import { useState } from "react";

/**
 * Core Architecture Diagram.
 * A futuristic "system core": four glass nodes feeding a glowing central hub
 * through precise optical data pathways.
 */
type Node = {
  id: string;
  title: string;
  sub: string;
  cx: number;
  cy: number;
  /** point on the node plate edge where the pathway leaves */
  ex: number;
  ey: number;
};

const W = 186;
const H = 58;

const nodes: Node[] = [
  { id: "clarity", title: "Strategic Clarity", sub: "Direction & positioning", cx: 250, cy: 46, ex: 250, ey: 75 },
  { id: "commercial", title: "Commercial Systems", sub: "Pipeline & conversion", cx: 400, cy: 250, ex: 307, ey: 250 },
  { id: "operations", title: "Operations & Automation", sub: "Capability & leverage", cx: 250, cy: 454, ex: 250, ey: 425 },
  { id: "execution", title: "Execution", sub: "Delivery cadence", cx: 100, cy: 250, ex: 193, ey: 250 },
];

const CX = 250;
const CY = 250;
const CORE_R = 74;

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
      className="diagram-frame w-full aspect-square max-w-[620px] mx-auto"
      style={{ color: "var(--svg-stroke)" }}
    >
      <svg
        viewBox="0 0 500 500"
        className="relative w-full h-full overflow-visible"
        role="img"
        aria-label="Core architecture: strategic clarity, commercial systems, operations and automation, and execution feeding a sustainable growth core"
      >
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity="0.16" />
            <stop offset="60%" stopColor="hsl(var(--gold))" stopOpacity="0.05" />
            <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="glassPlate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0.06" />
            <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.015" />
          </linearGradient>
          <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient core light */}
        <circle cx={CX} cy={CY} r="190" fill="url(#coreGlow)" />

        {/* Optical data pathways */}
        {nodes.map((n, i) => {
          const c = corePoint(n.ex, n.ey);
          const isActive = active === n.id;
          const d = `M ${n.ex} ${n.ey} L ${c.x} ${c.y}`;
          return (
            <g key={`path-${n.id}`}>
              <path
                d={d}
                fill="none"
                stroke="currentColor"
                strokeWidth={isActive ? 1 : 0.6}
                opacity={isActive ? 0.7 : 0.28}
                style={{ transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)" }}
              />
              <path
                d={d}
                fill="none"
                stroke="hsl(var(--gold))"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray="14 86"
                opacity={isActive ? 1 : 0.7}
                filter="url(#softGlow)"
                style={{
                  animation: `lineFlow ${5.5 + i * 0.5}s linear infinite`,
                  animationDelay: `${i * 0.8}s`,
                }}
              />
            </g>
          );
        })}

        {/* Core hub */}
        <g>
          <circle
            cx={CX}
            cy={CY}
            r={CORE_R + 20}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.35"
            strokeDasharray="1.5 7"
            opacity="0.28"
            style={{ transformOrigin: "250px 250px", animation: "rotateSlow 110s linear infinite" }}
          />
          <circle
            cx={CX}
            cy={CY}
            r={CORE_R}
            fill="url(#glassPlate)"
            stroke="hsl(var(--gold))"
            strokeWidth="0.7"
            opacity="0.9"
            filter="url(#softGlow)"
            style={{ transformOrigin: "250px 250px", animation: "nodePulse 8s ease-in-out infinite" }}
          />
          <circle cx={CX} cy={CY} r={CORE_R - 12} fill="none" stroke="currentColor" strokeWidth="0.35" opacity="0.35" />
          <text
            x={CX}
            y={CY - 18}
            textAnchor="middle"
            fontSize="7.6"
            letterSpacing="2.6"
            fontFamily="DM Sans, sans-serif"
            fill="hsl(var(--gold))"
            opacity="0.9"
          >
            CORE OUTCOME
          </text>
          <text
            x={CX}
            y={CY + 3}
            textAnchor="middle"
            fontSize="14"
            fontFamily="Playfair Display, serif"
            fontStyle="italic"
            fill="hsl(var(--foreground))"
          >
            Sustainable Growth
          </text>
          <text
            x={CX}
            y={CY + 21}
            textAnchor="middle"
            fontSize="9.5"
            fontFamily="DM Sans, sans-serif"
            fill="hsl(var(--muted-foreground))"
          >
            Revenue Lifecycle
          </text>
        </g>

        {/* Glass node plates */}
        {nodes.map((n) => {
          const isActive = active === n.id;
          const x = n.cx - W / 2;
          const y = n.cy - H / 2;
          return (
            <g
              key={n.id}
              onMouseEnter={() => setActive(n.id)}
              onMouseLeave={() => setActive(null)}
              style={{ cursor: "default" }}
            >
              <rect
                x={x}
                y={y}
                width={W}
                height={H}
                rx="12"
                fill="url(#glassPlate)"
                stroke="currentColor"
                strokeWidth={isActive ? 0.9 : 0.5}
                opacity={isActive ? 1 : 0.7}
                style={{ transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)" }}
              />
              <line
                x1={x + 14}
                y1={n.cy}
                x2={x + 14}
                y2={n.cy}
                stroke="hsl(var(--gold))"
                strokeWidth="3"
                strokeLinecap="round"
                opacity={isActive ? 1 : 0.7}
                filter="url(#softGlow)"
              />
              <text
                x={x + 26}
                y={n.cy - 3}
                fontSize="10.5"
                fontFamily="DM Sans, sans-serif"
                fill="hsl(var(--foreground))"
                opacity={isActive ? 1 : 0.9}
              >
                {n.title}
              </text>
              <text
                x={x + 26}
                y={n.cy + 12}
                fontSize="8.4"
                fontFamily="DM Sans, sans-serif"
                fill="hsl(var(--muted-foreground))"
                opacity={isActive ? 0.95 : 0.6}
              >
                {n.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default RevenueArchitecture;
