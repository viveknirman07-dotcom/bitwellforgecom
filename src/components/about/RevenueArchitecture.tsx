import { useState } from "react";

/**
 * Interactive revenue infrastructure diagram.
 * Central "Revenue Engine" with six orbiting system nodes.
 * Hover a node to highlight the connection back to the core.
 */
const nodes = [
  { id: "growth", label: "Commercial Growth Strategy", angle: -90 },
  { id: "lead", label: "Client Acquisition Architecture", angle: -30 },
  { id: "sales", label: "High-Ticket Revenue Systems", angle: 30 },
  { id: "linkedin", label: "Market Authority Positioning", angle: 90 },
  { id: "automation", label: "AI-Powered Revenue Operations", angle: 150 },
  { id: "seo", label: "Search & Digital Visibility", angle: 210 },
];

const RADIUS = 165;
const CX = 250;
const CY = 250;

const RevenueArchitecture = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className="diagram-frame w-full aspect-square max-w-[560px] mx-auto"
      style={{ color: "var(--svg-stroke)" }}
    >
      <div className="diagram-grid" />
      <svg
        viewBox="0 0 500 500"
        className="relative w-full h-full"
        aria-label="Revenue infrastructure diagram"
      >
        {/* Connection lines */}
        {nodes.map((n) => {
          const rad = (n.angle * Math.PI) / 180;
          const x = CX + Math.cos(rad) * RADIUS;
          const y = CY + Math.sin(rad) * RADIUS;
          const isActive = active === n.id;
          return (
            <line
              key={`line-${n.id}`}
              x1={CX}
              y1={CY}
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeWidth={isActive ? 1.2 : 0.6}
              strokeDasharray={isActive ? "0" : "4 5"}
              opacity={isActive ? 0.9 : 0.35}
              style={{ transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
            />
          );
        })}

        {/* Outer orbit ring */}
        <circle
          cx={CX}
          cy={CY}
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.4"
          strokeDasharray="2 4"
          opacity="0.25"
        />

        {/* Central Revenue Engine */}
        <g>
          <circle
            cx={CX}
            cy={CY}
            r="58"
            fill="hsl(var(--background))"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.9"
          />
          <circle
            cx={CX}
            cy={CY}
            r="72"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
            opacity="0.4"
          />
          <text
            x={CX}
            y={CY - 4}
            textAnchor="middle"
            fontSize="12"
            fontFamily="Playfair Display, serif"
            fontStyle="italic"
            fill="hsl(var(--gold))"
          >
            Revenue
          </text>
          <text
            x={CX}
            y={CY + 14}
            textAnchor="middle"
            fontSize="12"
            fontFamily="Playfair Display, serif"
            fontStyle="italic"
            fill="hsl(var(--gold))"
          >
            Engine
          </text>
        </g>

        {/* Outer nodes */}
        {nodes.map((n) => {
          const rad = (n.angle * Math.PI) / 180;
          const x = CX + Math.cos(rad) * RADIUS;
          const y = CY + Math.sin(rad) * RADIUS;
          const isActive = active === n.id;
          // label position pushes outward
          const lx = CX + Math.cos(rad) * (RADIUS + 38);
          const ly = CY + Math.sin(rad) * (RADIUS + 38);
          const anchor =
            Math.abs(Math.cos(rad)) < 0.2
              ? "middle"
              : Math.cos(rad) > 0
              ? "start"
              : "end";

          return (
            <g
              key={n.id}
              onMouseEnter={() => setActive(n.id)}
              onMouseLeave={() => setActive(null)}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={x}
                cy={y}
                r={isActive ? 11 : 7}
                fill="hsl(var(--background))"
                stroke="currentColor"
                strokeWidth={isActive ? 1.2 : 0.8}
                style={{ transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)" }}
              />
              <circle
                cx={x}
                cy={y}
                r={isActive ? 4 : 2.5}
                fill={isActive ? "hsl(var(--gold))" : "currentColor"}
                opacity={isActive ? 1 : 0.7}
                style={{ transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)" }}
              />
              <text
                x={lx}
                y={ly}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontSize="11"
                fontFamily="DM Sans, sans-serif"
                fill="hsl(var(--foreground))"
                opacity={isActive ? 1 : 0.7}
                style={{ transition: "opacity 0.3s ease" }}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default RevenueArchitecture;
