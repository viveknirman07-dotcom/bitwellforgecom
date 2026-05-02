/**
 * Service section visuals — fully token-driven (light + dark adaptive),
 * breathing 24/7 via global keyframes.
 */

/* 1. Demand generation: node-and-edge graph */
export const DemandGraph = () => {
  const nodes = [
    { id: "li", x: 50,  y: 60,  label: "LinkedIn" },
    { id: "em", x: 50,  y: 180, label: "Email" },
    { id: "co", x: 350, y: 60,  label: "Content" },
    { id: "tr", x: 350, y: 180, label: "Triggers" },
  ];
  const center = { x: 200, y: 120, label: "Pipeline" };
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full anim-float-drift overflow-visible">
      {nodes.map((n, i) => (
        <line
          key={n.id}
          x1={n.x} y1={n.y}
          x2={center.x} y2={center.y}
          stroke="hsl(var(--svg-stroke))"
          strokeWidth="0.8"
          strokeDasharray="240"
          className="anim-line-draw"
          style={{ animationDelay: `${i * 0.6}s` }}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={n.id}>
          <circle
            cx={n.x} cy={n.y} r="6"
            fill="hsl(var(--background))"
            stroke="hsl(var(--svg-stroke))"
            strokeWidth="0.9"
            className="anim-node-pulse"
            style={{ animationDelay: `${i * 0.4}s`, transformOrigin: `${n.x}px ${n.y}px` }}
          />
          <text x={n.x} y={n.y - 12} textAnchor="middle" fontSize="9" fill="hsl(var(--svg-text))" fontFamily="DM Sans, sans-serif">
            {n.label}
          </text>
        </g>
      ))}
      <circle
        cx={center.x} cy={center.y} r="14"
        fill="hsl(var(--svg-highlight) / 0.25)"
        stroke="hsl(var(--svg-highlight))"
        strokeWidth="1.1"
        className="anim-glow-pulse"
      />
      <text x={center.x} y={center.y + 3} textAnchor="middle" fontSize="9" fill="hsl(var(--svg-text))" fontFamily="DM Sans, sans-serif">
        Pipeline
      </text>
    </svg>
  );
};

/* 2. Revenue funnel */
export const RevenueFunnel = () => {
  const stages = [
    { label: "Awareness", w: 360, pct: "100%" },
    { label: "Engaged",   w: 280, pct: "62%" },
    { label: "Qualified", w: 200, pct: "34%" },
    { label: "Proposal",  w: 130, pct: "18%" },
    { label: "Closed",    w: 80,  pct: "9%", gold: true },
  ];
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full anim-float-drift overflow-visible">
      {stages.map((s, i) => {
        const y = 12 + i * 44;
        const x = (400 - s.w) / 2;
        return (
          <g key={s.label} className="anim-node-pulse" style={{ animationDelay: `${i * 0.3}s`, transformOrigin: `200px ${y + 14}px` }}>
            <rect
              x={x} y={y} width={s.w} height={28}
              fill={s.gold ? "hsl(var(--svg-highlight) / 0.55)" : "hsl(var(--svg-fill))"}
              stroke="hsl(var(--svg-stroke))"
              strokeWidth="0.7"
              className={s.gold ? "anim-glow-pulse" : ""}
            />
            <text x={x + 8} y={y + 18} fontSize="10" fill="hsl(var(--svg-text))" fontFamily="DM Sans, sans-serif">
              {s.label}
            </text>
            <text x={x + s.w - 8} y={y + 18} fontSize="10" textAnchor="end" fill="hsl(var(--svg-text))" fontFamily="Playfair Display, serif" fontStyle="italic">
              {s.pct}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/* 3. Positioning matrix 2x2 */
export const PositioningMatrix = () => {
  return (
    <svg viewBox="0 0 300 220" className="w-full h-full anim-float-drift overflow-visible">
      {/* axes */}
      <line x1="40" y1="20"  x2="40"  y2="200" stroke="hsl(var(--svg-accent))" strokeWidth="0.7" />
      <line x1="40" y1="200" x2="280" y2="200" stroke="hsl(var(--svg-accent))" strokeWidth="0.7" />
      {/* divider */}
      <line x1="160" y1="20"  x2="160" y2="200" stroke="hsl(var(--svg-secondary))" strokeWidth="0.5" strokeDasharray="2 3" />
      <line x1="40"  y1="110" x2="280" y2="110" stroke="hsl(var(--svg-secondary))" strokeWidth="0.5" strokeDasharray="2 3" />
      {/* labels */}
      <text x="20"  y="20"  fontSize="8" fill="hsl(var(--svg-text))" fontFamily="DM Sans, sans-serif">High</text>
      <text x="20"  y="200" fontSize="8" fill="hsl(var(--svg-text))" fontFamily="DM Sans, sans-serif">Low</text>
      <text x="40"  y="215" fontSize="8" fill="hsl(var(--svg-text))" fontFamily="DM Sans, sans-serif">Generic</text>
      <text x="280" y="215" fontSize="8" textAnchor="end" fill="hsl(var(--svg-text))" fontFamily="DM Sans, sans-serif">Specific</text>
      <text x="160" y="14"  fontSize="8" textAnchor="middle" fill="hsl(var(--svg-text))" fontFamily="Playfair Display, serif" fontStyle="italic">Differentiation</text>
      {/* competitor dots */}
      {[[70, 165], [95, 145], [120, 175], [80, 130], [140, 155]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="hsl(var(--svg-secondary))" />
      ))}
      {/* you dot — orbits + glows */}
      <g className="anim-dot-orbit" style={{ transformOrigin: "230px 55px" }}>
        <circle cx="230" cy="55" r="6"  fill="hsl(var(--svg-highlight))" className="anim-glow-pulse" />
        <circle cx="230" cy="55" r="12" fill="none" stroke="hsl(var(--svg-stroke))" strokeWidth="0.7" />
      </g>
      <text x="244" y="48" fontSize="9" fill="hsl(var(--svg-text))" fontFamily="DM Sans, sans-serif">You</text>
    </svg>
  );
};

/* 4. AI workflow */
export const AutomationFlow = () => {
  const boxes = [
    { x: 20,  y: 90,  label: "Lead",     ai: false },
    { x: 110, y: 90,  label: "AI Score", ai: true  },
    { x: 210, y: 40,  label: "Nurture",  ai: false },
    { x: 210, y: 140, label: "AI Route", ai: true  },
    { x: 320, y: 90,  label: "Close",    ai: false },
  ];
  const arrows = [
    [90,  90, 110, 90],
    [180, 90, 210, 55],
    [180, 90, 210, 135],
    [280, 40, 320, 80],
    [280, 140, 320, 100],
  ];
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full anim-float-drift overflow-visible">
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--svg-stroke))" />
        </marker>
      </defs>
      {boxes.map((b, i) => (
        <g key={b.label} className={b.ai ? "anim-glow-pulse" : "anim-node-pulse"} style={{ animationDelay: `${i * 0.4}s`, transformOrigin: `${b.x + 35}px ${b.y}px` }}>
          <rect
            x={b.x} y={b.y - 14} width={70} height={28}
            fill={b.ai ? "hsl(var(--svg-highlight) / 0.40)" : "hsl(var(--svg-fill))"}
            stroke="hsl(var(--svg-stroke))"
            strokeWidth="0.7"
          />
          <text x={b.x + 35} y={b.y + 4} fontSize="9" textAnchor="middle" fill="hsl(var(--svg-text))" fontFamily="DM Sans, sans-serif">
            {b.label}
          </text>
        </g>
      ))}
      {arrows.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="hsl(var(--svg-stroke))"
          strokeWidth="0.7"
          strokeDasharray="240"
          markerEnd="url(#arr)"
          className="anim-line-draw"
          style={{ animationDelay: `${i * 0.6}s` }}
        />
      ))}
    </svg>
  );
};
