import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Hero background: deep navy + diagonal grid + drifting constellation.
 * Pure CSS + tiny SVG. Scales to any viewport.
 */
const IsometricGrid = () => {
  const reduced = useReducedMotion();

  // 5 constellation points (in % so they scale on every viewport)
  const points = useMemo(
    () => [
      { x: 18, y: 28 },
      { x: 34, y: 62 },
      { x: 52, y: 22 },
      { x: 68, y: 54 },
      { x: 82, y: 36 },
      { x: 46, y: 80 },
    ],
    []
  );

  // Connect adjacent points into a thin web
  const links: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [1, 5], [3, 5], [0, 2],
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Diagonal grid */}
      <div className="absolute inset-0 bg-constellation-grid" />

      {/* Soft single radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 65% 45%, hsl(0 0% 100% / 0.04) 0%, transparent 70%)",
        }}
      />

      {/* Drifting constellation */}
      <div
        className="absolute inset-0"
        style={{
          animation: reduced ? undefined : "constellationDrift 12s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          {links.map(([a, b], i) => (
            <line
              key={i}
              x1={points[a].x}
              y1={points[a].y}
              x2={points[b].x}
              y2={points[b].y}
              stroke="hsl(0 0% 100% / 0.06)"
              strokeWidth="0.08"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="0.25"
              fill="hsl(0 0% 100% / 0.6)"
              style={{
                animation: reduced
                  ? undefined
                  : `nodePulse 3s ease-in-out ${i * 0.3}s infinite`,
                transformOrigin: `${p.x}% ${p.y}%`,
              }}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>

      {/* Page noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.035] mix-blend-overlay" />
    </div>
  );
};

export default IsometricGrid;
