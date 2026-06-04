/**
 * Six-stage operating system journey visuals.
 * All mode-adaptive via --svg-* CSS vars and `currentColor`.
 * Animations are limited to opacity / transform / stroke-dashoffset.
 */

const frame = "w-full h-full";

export const DiagnoseVisual = () => (
  <svg viewBox="0 0 240 160" className={`${frame} anim-float`} aria-hidden>
    {/* scanning grid */}
    {Array.from({ length: 8 }).map((_, i) => (
      <line
        key={`v-${i}`}
        x1={20 + i * 25}
        y1={20}
        x2={20 + i * 25}
        y2={140}
        stroke="currentColor"
        strokeWidth="0.3"
        opacity="0.25"
      />
    ))}
    {Array.from({ length: 5 }).map((_, i) => (
      <line
        key={`h-${i}`}
        x1={20}
        y1={20 + i * 30}
        x2={220}
        y2={20 + i * 30}
        stroke="currentColor"
        strokeWidth="0.3"
        opacity="0.25"
      />
    ))}
    {/* scan beam */}
    <line
      x1="20"
      y1="20"
      x2="20"
      y2="140"
      stroke="hsl(var(--gold))"
      strokeWidth="1"
      opacity="0.7"
      className="anim-scan"
    />
    {/* hotspots */}
    <circle cx="80" cy="55" r="3" fill="hsl(var(--gold))" className="anim-node" />
    <circle cx="155" cy="95" r="3" fill="hsl(var(--gold))" className="anim-node" style={{ animationDelay: "0.6s" }} />
    <circle cx="195" cy="50" r="3" fill="hsl(var(--gold))" className="anim-node" style={{ animationDelay: "1.1s" }} />
  </svg>
);

export const ArchitectVisual = () => (
  <svg viewBox="0 0 240 160" className={`${frame} anim-float`} aria-hidden>
    {/* blueprint frame */}
    <rect x="30" y="25" width="180" height="110" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
    {/* drawn-in paths */}
    <path
      d="M30 80 L100 80 L100 45 L210 45"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeDasharray="240"
      strokeDashoffset="0"
      className="anim-line"
    />
    <path
      d="M60 135 L60 105 L150 105 L150 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeDasharray="240"
      strokeDashoffset="0"
      className="anim-line"
      style={{ animationDelay: "0.8s" }}
    />
    {/* nodes */}
    <rect x="95" y="40" width="10" height="10" fill="hsl(var(--gold))" opacity="0.85" className="anim-node" />
    <rect x="145" y="75" width="10" height="10" fill="hsl(var(--gold))" opacity="0.85" className="anim-node" style={{ animationDelay: "0.4s" }} />
    <rect x="55" y="100" width="10" height="10" fill="hsl(var(--gold))" opacity="0.85" className="anim-node" style={{ animationDelay: "0.8s" }} />
  </svg>
);

export const EngineerVisual = () => {
  const items = [
    { x: 40, label: "CRM" },
    { x: 90, label: "Outbound" },
    { x: 140, label: "Sales" },
    { x: 190, label: "Auto" },
  ];
  return (
    <svg viewBox="0 0 240 160" className={`${frame} anim-float`} aria-hidden>
      {items.map((it, i) => (
        <g key={it.label}>
          <rect
            x={it.x - 18}
            y={60}
            width="36"
            height="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
            opacity="0.75"
            className="anim-node"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
          <text
            x={it.x}
            y={85}
            textAnchor="middle"
            fontSize="8"
            fontFamily="DM Sans, sans-serif"
            fill="currentColor"
            opacity="0.7"
          >
            {it.label}
          </text>
          {i < items.length - 1 && (
            <line
              x1={it.x + 18}
              y1={80}
              x2={items[i + 1].x - 18}
              y2={80}
              stroke="hsl(var(--gold))"
              strokeWidth="0.6"
              strokeDasharray="3 3"
              className="anim-line"
              style={{ animationDelay: `${i * 0.3 + 0.3}s` }}
            />
          )}
        </g>
      ))}
    </svg>
  );
};

export const ActivateVisual = () => (
  <svg viewBox="0 0 240 160" className={`${frame} anim-float`} aria-hidden>
    {/* pipeline channels filling */}
    {[40, 70, 100].map((y, i) => (
      <g key={y}>
        <rect x="30" y={y} width="180" height="6" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
        <rect
          x="30"
          y={y}
          width="180"
          height="6"
          fill="hsl(var(--gold))"
          opacity="0.5"
          className="anim-fill"
          style={{ animationDelay: `${i * 0.4}s`, transformOrigin: "30px center" }}
        />
      </g>
    ))}
    {/* moving dots */}
    {[0, 1, 2].map((i) => (
      <circle
        key={i}
        cx="30"
        cy={43 + i * 30}
        r="2"
        fill="hsl(var(--gold))"
        className="anim-leak"
        style={{ animationDelay: `${i * 0.5}s` }}
      />
    ))}
  </svg>
);

export const OptimizeVisual = () => (
  <svg viewBox="0 0 240 160" className={`${frame} anim-float`} aria-hidden>
    {/* feedback loop */}
    <path
      d="M 50 110 Q 50 40 120 40 Q 190 40 190 110 Q 190 130 120 130 Q 50 130 50 110 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeDasharray="6 4"
      opacity="0.6"
      className="anim-rotate-slow"
      style={{ transformOrigin: "120px 85px" }}
    />
    <circle cx="120" cy="85" r="22" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
    <text
      x="120"
      y="90"
      textAnchor="middle"
      fontSize="14"
      fontFamily="Playfair Display, serif"
      fontStyle="italic"
      fill="hsl(var(--gold))"
    >
      loop
    </text>
    {/* arrows */}
    <circle cx="190" cy="85" r="3" fill="hsl(var(--gold))" className="anim-node" />
    <circle cx="50" cy="85" r="3" fill="hsl(var(--gold))" className="anim-node" style={{ animationDelay: "0.8s" }} />
  </svg>
);

export const CompoundVisual = () => (
  <svg viewBox="0 0 240 160" className={`${frame} anim-float`} aria-hidden>
    {/* axes */}
    <line x1="30" y1="140" x2="220" y2="140" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    <line x1="30" y1="20" x2="30" y2="140" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    {/* compounding curve */}
    <path
      d="M30 130 Q 90 125, 130 100 T 220 25"
      fill="none"
      stroke="hsl(var(--gold))"
      strokeWidth="1.2"
      strokeDasharray="400"
      strokeDashoffset="0"
      className="anim-line"
    />
    {/* milestone dots */}
    <circle cx="90" cy="125" r="2.5" fill="hsl(var(--gold))" className="anim-node" />
    <circle cx="150" cy="80" r="2.5" fill="hsl(var(--gold))" className="anim-node" style={{ animationDelay: "0.4s" }} />
    <circle cx="210" cy="30" r="3" fill="hsl(var(--gold))" className="anim-node" style={{ animationDelay: "0.8s" }} />
  </svg>
);
