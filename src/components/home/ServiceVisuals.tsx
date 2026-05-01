/**
 * Service section diagrams. Mode-adaptive via --svg-* CSS vars.
 * Uses CSS keyframes (anim-*) so diagrams breathe permanently.
 */

/* 4. Lead Generation Node Graph */
export const DemandGraph = () => {
  const nodes = [
    { id: "li", x: 60, y: 50, label: "LinkedIn" },
    { id: "em", x: 60, y: 190, label: "Email" },
    { id: "co", x: 340, y: 50, label: "Content" },
    { id: "tr", x: 340, y: 190, label: "Triggers" },
  ];
  const center = { x: 200, y: 120 };

  return (
    <svg viewBox="0 0 400 240" className="anim-float w-full h-full" aria-hidden>
      {/* Connector lines */}
      {nodes.map((n, i) => (
        <line
          key={`l-${n.id}`}
          x1={n.x}
          y1={n.y}
          x2={center.x}
          y2={center.y}
          className="svg-accent anim-line"
          strokeWidth="0.9"
          strokeDasharray="6 6"
          style={{ animationDelay: `${i * 0.6}s` }}
        />
      ))}

      {/* Outer nodes */}
      {nodes.map((n, i) => (
        <g key={n.id}>
          <circle
            cx={n.x}
            cy={n.y}
            r="7"
            className="svg-fill anim-node"
            strokeWidth="1"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
          <text
            x={n.x}
            y={n.y - 14}
            textAnchor="middle"
            fontSize="10"
            className="svg-text"
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* Central hub */}
      <circle
        cx={center.x}
        cy={center.y}
        r="18"
        className="svg-fill anim-glow anim-hub-only"
        strokeWidth="1.2"
      />
      <circle cx={center.x} cy={center.y} r="6" className="svg-highlight" />
      <text
        x={center.x}
        y={center.y + 36}
        textAnchor="middle"
        fontSize="11"
        className="svg-text"
        fontStyle="italic"
        fontFamily="Playfair Display, serif"
      >
        Pipeline
      </text>
    </svg>
  );
};

/* 5. Revenue Funnel — horizontal bars */
export const RevenueFunnel = () => {
  const stages = [
    { label: "Awareness", w: 360, pct: "100%" },
    { label: "Engaged",   w: 223, pct: "62%" },
    { label: "Qualified", w: 122, pct: "34%" },
    { label: "Proposal",  w:  65, pct: "18%" },
    { label: "Closed",    w:  32, pct: "9%", glow: true },
  ];
  return (
    <svg viewBox="0 0 400 260" className="anim-float w-full h-full" aria-hidden>
      {stages.map((s, i) => {
        const y = 16 + i * 46;
        const x = (400 - s.w) / 2;
        return (
          <g key={s.label} style={{ transformOrigin: "center" }}>
            <rect
              x={x}
              y={y}
              width={s.w}
              height={28}
              className={`svg-fill ${s.glow ? "anim-glow anim-hub-only" : "anim-node"}`}
              style={{ animationDelay: `${i * 0.3}s` }}
              strokeWidth="0.8"
            />
            <text
              x={x + 8}
              y={y + 18}
              fontSize="10.5"
              className="svg-text"
            >
              {s.label}
            </text>
            <text
              x={x + s.w + 8}
              y={y + 18}
              fontSize="10.5"
              className="svg-text"
              fontStyle="italic"
              fontFamily="Playfair Display, serif"
            >
              {s.pct}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/* 6. Positioning Matrix */
export const PositioningMatrix = () => {
  return (
    <svg viewBox="0 0 320 240" className="anim-float w-full h-full" aria-hidden>
      {/* axes */}
      <line x1="40" y1="20" x2="40" y2="210" className="svg-accent" strokeWidth="0.7" />
      <line x1="40" y1="210" x2="300" y2="210" className="svg-accent" strokeWidth="0.7" />

      {/* quadrant dividers */}
      <line x1="170" y1="20" x2="170" y2="210" className="svg-secondary" strokeDasharray="2 4" strokeWidth="0.5" />
      <line x1="40" y1="115" x2="300" y2="115" className="svg-secondary" strokeDasharray="2 4" strokeWidth="0.5" />

      {/* axis labels */}
      <text x="22" y="22" fontSize="9" className="svg-text">High</text>
      <text x="22" y="212" fontSize="9" className="svg-text">Low</text>
      <text x="40" y="226" fontSize="9" className="svg-text">Low Price</text>
      <text x="300" y="226" textAnchor="end" fontSize="9" className="svg-text">High Price</text>
      <text
        x="170" y="14"
        textAnchor="middle"
        fontSize="10"
        className="svg-text"
        fontStyle="italic"
        fontFamily="Playfair Display, serif"
      >
        Differentiation
      </text>

      {/* competitor dots */}
      {[
        [80, 175], [105, 155], [130, 185], [90, 140], [150, 165],
        [115, 175], [70, 195],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.2" className="svg-secondary" fill="currentColor" fillOpacity="0.45" />
      ))}

      {/* "You" — orbiting + glowing in top-right */}
      <g className="anim-orbit" style={{ transformOrigin: "240px 60px" }}>
        <circle cx="240" cy="60" r="14" className="svg-fill" strokeWidth="0.8" />
        <circle cx="240" cy="60" r="6" className="svg-highlight anim-glow anim-hub-only" />
      </g>
      <text x="258" y="56" fontSize="10" className="svg-text">You</text>
    </svg>
  );
};

/* 7. AI Workflow */
export const AutomationFlow = () => {
  return (
    <svg viewBox="0 0 420 240" className="anim-float w-full h-full" aria-hidden>
      <defs>
        <marker id="arr-light" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--svg-accent)" />
        </marker>
      </defs>

      {/* Nodes */}
      {[
        { x: 20,  y: 106, w: 70, label: "Lead" },
        { x: 120, y: 106, w: 80, label: "AI Score", glow: true },
        { x: 240, y: 50,  w: 70, label: "Nurture" },
        { x: 240, y: 162, w: 80, label: "AI Route", glow: true },
        { x: 340, y: 106, w: 70, label: "Close" },
      ].map((b, i) => (
        <g key={b.label}>
          <rect
            x={b.x}
            y={b.y}
            width={b.w}
            height={28}
            className={`svg-fill ${b.glow ? "anim-glow anim-hub-only" : "anim-node"}`}
            style={{ animationDelay: `${i * 0.4}s` }}
            strokeWidth="0.8"
          />
          <text
            x={b.x + b.w / 2}
            y={b.y + 18}
            fontSize="10"
            textAnchor="middle"
            className="svg-text"
          >
            {b.label}
          </text>
        </g>
      ))}

      {/* Diamond decision split */}
      <g className="anim-node" style={{ transformOrigin: "215px 120px" }}>
        <polygon
          points="215,104 230,120 215,136 200,120"
          className="svg-fill"
          strokeWidth="0.8"
        />
      </g>

      {/* Connector arrows */}
      {[
        { d: "M 90 120 L 118 120",            i: 0 },
        { d: "M 200 120 L 215 120",           i: 1 },
        { d: "M 215 104 L 215 80 L 240 64",   i: 2 },
        { d: "M 215 136 L 215 160 L 240 176", i: 3 },
        { d: "M 310 64 L 340 110",            i: 4 },
        { d: "M 320 176 L 340 130",           i: 5 },
      ].map((c) => (
        <path
          key={c.i}
          d={c.d}
          className="svg-accent anim-line"
          strokeWidth="0.9"
          strokeDasharray="5 5"
          markerEnd="url(#arr-light)"
          style={{ animationDelay: `${c.i * 0.6}s` }}
          fill="none"
        />
      ))}
    </svg>
  );
};
