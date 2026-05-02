import { useMemo } from "react";

/**
 * Hero background — token-driven, mode-adaptive.
 * Diagonal grid + drifting constellation + 12 floating particles.
 */
const IsometricGrid = () => {
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

  const links: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [1, 5], [3, 5], [0, 2],
  ];

  // 12 floating particles
  const particles = useMemo(
    () => Array.from({ length: 12 }, (_, i) => ({
      cx: 5 + Math.random() * 90,
      cy: 5 + Math.random() * 90,
      duration: 5 + Math.random() * 4,
      delay: Math.random() * 4,
      opacity: 0.06 + Math.random() * 0.06,
    })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Diagonal grid — very slow rotation */}
      <div
        className="absolute inset-0 bg-constellation-grid anim-rotate-60"
        style={{ transformOrigin: "center" }}
      />

      {/* Soft radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 65% 45%, hsl(var(--svg-glow) / 0.10) 0%, transparent 70%)",
        }}
      />

      {/* Drifting constellation */}
      <div
        className="absolute inset-0"
        style={{
          animation: "constellationDrift 12s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          {links.map(([a, b], i) => (
            <line
              key={i}
              x1={points[a].x} y1={points[a].y}
              x2={points[b].x} y2={points[b].y}
              stroke="hsl(var(--svg-stroke))"
              strokeOpacity="0.35"
              strokeWidth="0.08"
              strokeDasharray="240"
              vectorEffect="non-scaling-stroke"
              className="anim-line-draw"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x} cy={p.y} r="0.3"
              fill="hsl(var(--svg-highlight))"
              vectorEffect="non-scaling-stroke"
              className="anim-node-pulse"
              style={{ animationDelay: `${i * 0.4}s`, transformOrigin: `${p.x}% ${p.y}%` }}
            />
          ))}

          {/* 12 floating particles */}
          {particles.map((p, i) => (
            <circle
              key={`p-${i}`}
              cx={p.cx} cy={p.cy} r="0.18"
              fill="hsl(var(--svg-highlight))"
              fillOpacity={p.opacity}
              vectorEffect="non-scaling-stroke"
              style={{
                animation: `floatDrift ${p.duration}s ease-in-out ${p.delay}s infinite`,
                transformBox: "fill-box",
                transformOrigin: "center",
                willChange: "transform",
              }}
            />
          ))}
        </svg>
      </div>

      <div className="absolute inset-0 bg-noise opacity-[0.035] mix-blend-overlay" />
    </div>
  );
};

export default IsometricGrid;
