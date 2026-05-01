import { motion, useReducedMotion } from "framer-motion";

/* 1. Demand generation: node-and-edge graph */
export const DemandGraph = () => {
  const reduced = useReducedMotion();
  const nodes = [
    { id: "li", x: 50, y: 60, label: "LinkedIn" },
    { id: "em", x: 50, y: 180, label: "Email" },
    { id: "co", x: 350, y: 60, label: "Content" },
    { id: "tr", x: 350, y: 180, label: "Triggers" },
  ];
  const center = { x: 200, y: 120, label: "Pipeline" };
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      {nodes.map((n) => (
        <motion.line
          key={n.id}
          x1={n.x}
          y1={n.y}
          x2={center.x}
          y2={center.y}
          stroke="currentColor"
          strokeWidth="0.6"
          strokeOpacity="0.55"
          initial={{ pathLength: 0 }}
          animate={reduced ? { pathLength: 1 } : { pathLength: [0, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: Math.random() }}
        />
      ))}
      {nodes.map((n) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r="6" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="0.8" />
          <text x={n.x} y={n.y - 12} textAnchor="middle" fontSize="9" fill="currentColor" fontFamily="DM Sans, sans-serif">
            {n.label}
          </text>
        </g>
      ))}
      <circle cx={center.x} cy={center.y} r="14" fill="hsl(var(--gold) / 0.18)" stroke="currentColor" strokeWidth="1" />
      <text x={center.x} y={center.y + 3} textAnchor="middle" fontSize="9" fill="currentColor" fontFamily="DM Sans, sans-serif">
        Pipeline
      </text>
    </svg>
  );
};

/* 2. Revenue funnel with gold-highlight closed stage */
export const RevenueFunnel = () => {
  const stages = [
    { label: "Awareness", w: 360, pct: "100%" },
    { label: "Engaged", w: 280, pct: "62%" },
    { label: "Qualified", w: 200, pct: "34%" },
    { label: "Proposal", w: 130, pct: "18%" },
    { label: "Closed", w: 80, pct: "9%", gold: true },
  ];
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      {stages.map((s, i) => {
        const y = 12 + i * 44;
        const x = (400 - s.w) / 2;
        return (
          <g key={s.label}>
            <rect
              x={x}
              y={y}
              width={s.w}
              height={28}
              fill={s.gold ? "hsl(var(--gold) / 0.25)" : "hsl(var(--gold) / 0.05)"}
              stroke="currentColor"
              strokeWidth="0.6"
              strokeOpacity={s.gold ? 1 : 0.5}
            />
            <text x={x + 8} y={y + 18} fontSize="10" fill="currentColor" fontFamily="DM Sans, sans-serif">
              {s.label}
            </text>
            <text x={x + s.w - 8} y={y + 18} fontSize="10" textAnchor="end" fill="currentColor" fontFamily="Playfair Display, serif" fontStyle="italic">
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
    <svg viewBox="0 0 300 220" className="w-full h-full">
      {/* axes */}
      <line x1="40" y1="20" x2="40" y2="200" stroke="currentColor" strokeOpacity="0.6" strokeWidth="0.6" />
      <line x1="40" y1="200" x2="280" y2="200" stroke="currentColor" strokeOpacity="0.6" strokeWidth="0.6" />
      {/* grid divider */}
      <line x1="160" y1="20" x2="160" y2="200" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.4" strokeDasharray="2 3" />
      <line x1="40" y1="110" x2="280" y2="110" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.4" strokeDasharray="2 3" />
      {/* labels */}
      <text x="20" y="20" fontSize="8" fill="currentColor" fontFamily="DM Sans, sans-serif">High</text>
      <text x="20" y="200" fontSize="8" fill="currentColor" fontFamily="DM Sans, sans-serif">Low</text>
      <text x="40" y="215" fontSize="8" fill="currentColor" fontFamily="DM Sans, sans-serif">Generic</text>
      <text x="280" y="215" fontSize="8" textAnchor="end" fill="currentColor" fontFamily="DM Sans, sans-serif">Specific</text>
      <text x="160" y="14" fontSize="8" textAnchor="middle" fill="currentColor" fontFamily="Playfair Display, serif" fontStyle="italic">Differentiation</text>
      {/* competitor dots */}
      {[
        [70, 165], [95, 145], [120, 175], [80, 130], [140, 155],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="currentColor" fillOpacity="0.35" />
      ))}
      {/* you dot */}
      <circle cx="230" cy="55" r="6" fill="hsl(var(--gold))" />
      <circle cx="230" cy="55" r="12" fill="none" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.5" />
      <text x="240" y="48" fontSize="9" fill="currentColor" fontFamily="DM Sans, sans-serif">You</text>
    </svg>
  );
};

/* 4. AI workflow - boxes with arrows and gold AI nodes */
export const AutomationFlow = () => {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full">
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="currentColor" opacity="0.8" />
        </marker>
      </defs>
      {[
        { x: 20, y: 90, label: "Lead", ai: false },
        { x: 110, y: 90, label: "AI Score", ai: true },
        { x: 210, y: 40, label: "Nurture", ai: false },
        { x: 210, y: 140, label: "AI Route", ai: true },
        { x: 320, y: 90, label: "Close", ai: false },
      ].map((b) => (
        <g key={b.label}>
          <rect
            x={b.x}
            y={b.y - 14}
            width={70}
            height={28}
            fill={b.ai ? "hsl(var(--gold) / 0.22)" : "hsl(var(--gold) / 0.04)"}
            stroke="currentColor"
            strokeWidth="0.6"
            strokeOpacity={b.ai ? 1 : 0.5}
          />
          <text x={b.x + 35} y={b.y + 4} fontSize="9" textAnchor="middle" fill="currentColor" fontFamily="DM Sans, sans-serif">
            {b.label}
          </text>
        </g>
      ))}
      {/* arrows */}
      <line x1="90" y1="90" x2="110" y2="90" stroke="currentColor" strokeOpacity="0.7" strokeWidth="0.6" markerEnd="url(#arr)" />
      <line x1="180" y1="90" x2="210" y2="55" stroke="currentColor" strokeOpacity="0.7" strokeWidth="0.6" markerEnd="url(#arr)" />
      <line x1="180" y1="90" x2="210" y2="135" stroke="currentColor" strokeOpacity="0.7" strokeWidth="0.6" markerEnd="url(#arr)" />
      <line x1="280" y1="40" x2="320" y2="80" stroke="currentColor" strokeOpacity="0.7" strokeWidth="0.6" markerEnd="url(#arr)" />
      <line x1="280" y1="140" x2="320" y2="100" stroke="currentColor" strokeOpacity="0.7" strokeWidth="0.6" markerEnd="url(#arr)" />
    </svg>
  );
};
