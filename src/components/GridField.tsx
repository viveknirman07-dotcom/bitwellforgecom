import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

interface Props {
  /** 0 to 1 overall intensity */
  intensity?: number;
  className?: string;
}

/**
 * Global background field: 64px hairline grid under a soft radial mask,
 * with abstract network nodes and travelling signal paths.
 * GPU-only (opacity/transform). Disabled under reduced motion.
 */
const GridField = ({ intensity = 1, className = "" }: Props) => {
  const reduced = useReducedMotion();

  const nodes = useMemo(
    () => [
      { x: 14, y: 26 },
      { x: 33, y: 58 },
      { x: 51, y: 20 },
      { x: 67, y: 49 },
      { x: 84, y: 32 },
      { x: 45, y: 78 },
    ],
    []
  );

  const links: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [1, 5],
    [3, 5],
  ];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity: intensity }}
    >
      <div
        className="absolute inset-0 grid-field"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 60% at 55% 40%, black 0%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 55% 40%, black 0%, transparent 78%)",
        }}
      />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {links.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="currentColor"
            strokeWidth="0.6"
            vectorEffect="non-scaling-stroke"
            className="text-foreground"
            opacity={0.07}
          />
        ))}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r="0.5"
            className="text-foreground"
            fill="currentColor"
            opacity={0.28}
            vectorEffect="non-scaling-stroke"
            style={
              reduced
                ? undefined
                : {
                    animation: `fieldBreath ${9 + i}s ease-in-out ${i * 0.6}s infinite`,
                    transformOrigin: "center",
                  }
            }
          />
        ))}
      </svg>
    </div>
  );
};

export default GridField;
