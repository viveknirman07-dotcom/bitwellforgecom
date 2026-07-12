/**
 * Six-stage operating system journey visuals.
 * Premium architectural language. Continuous SMIL motion.
 * Mode-adaptive via --svg-* and currentColor.
 */

const VB = "0 0 240 160";
const frame = "w-full h-full";

/* Shared grid backdrop */
const Grid = ({ w = 240, h = 160 }: { w?: number; h?: number }) => (
  <g opacity="0.16">
    {Array.from({ length: Math.floor(w / 12) }).map((_, i) => (
      <line key={`gx${i}`} x1={i * 12} y1={0} x2={i * 12} y2={h} stroke="currentColor" strokeWidth="0.15" />
    ))}
    {Array.from({ length: Math.floor(h / 12) }).map((_, i) => (
      <line key={`gy${i}`} x1={0} y1={i * 12} x2={w} y2={i * 12} stroke="currentColor" strokeWidth="0.15" />
    ))}
  </g>
);

/* ─────────── 01 Diagnose — scan surface, discovered anomalies, annotation lines ─────────── */
export const DiagnoseVisual = () => {
  const anomalies = [
    { x: 62, y: 48, label: "ACQUISITION" },
    { x: 138, y: 92, label: "CONVERSION" },
    { x: 190, y: 42, label: "RETENTION" },
    { x: 96, y: 118, label: "OPERATIONS" },
  ];
  return (
    <svg viewBox={VB} className={frame} aria-hidden>
      <Grid />
      {/* domain surface frame */}
      <rect x="22" y="22" width="196" height="116" fill="none" stroke="currentColor" strokeWidth="0.35" opacity="0.35" />
      {/* horizontal scan sweep */}
      <line x1="22" y1="22" x2="22" y2="138" stroke="currentColor" strokeWidth="0.9" opacity="0.55">
        <animate attributeName="x1" values="22;218;22" dur="7s" repeatCount="indefinite" />
        <animate attributeName="x2" values="22;218;22" dur="7s" repeatCount="indefinite" />
      </line>
      {/* discovered anomalies */}
      {anomalies.map((a, i) => (
        <g key={i}>
          {/* crosshair */}
          <line x1={a.x - 8} y1={a.y} x2={a.x + 8} y2={a.y} stroke="currentColor" strokeWidth="0.3" opacity="0.5" />
          <line x1={a.x} y1={a.y - 8} x2={a.x} y2={a.y + 8} stroke="currentColor" strokeWidth="0.3" opacity="0.5" />
          {/* core */}
          <circle cx={a.x} cy={a.y} r="2.4" fill="currentColor">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
          </circle>
          {/* pulse */}
          <circle cx={a.x} cy={a.y} r="3" fill="none" stroke="currentColor" strokeWidth="0.4">
            <animate attributeName="r" values="3;12;3" dur="3s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0;0.7" dur="3s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
          </circle>
          {/* annotation */}
          <line
            x1={a.x}
            y1={a.y}
            x2={a.x + (a.x > 120 ? 22 : -22)}
            y2={a.y < 80 ? 18 : 148}
            stroke="currentColor"
            strokeWidth="0.3"
            strokeDasharray="1.5 2"
            opacity="0.45"
          />
          <text
            x={a.x + (a.x > 120 ? 24 : -24)}
            y={a.y < 80 ? 16 : 152}
            textAnchor={a.x > 120 ? "start" : "end"}
            fontSize="4"
            fontFamily="DM Sans, sans-serif"
            fill="currentColor"
            opacity="0.65"
            letterSpacing="0.7"
          >
            {a.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

/* ─────────── 02 Architect — blueprint being drawn, sequenced modules connecting ─────────── */
export const ArchitectVisual = () => {
  const modules = [
    { x: 60, y: 50, label: "ACQUIRE" },
    { x: 150, y: 50, label: "QUALIFY" },
    { x: 60, y: 110, label: "CONVERT" },
    { x: 150, y: 110, label: "RETAIN" },
  ];
  const paths = [
    "M 60 50 L 150 50",
    "M 150 50 L 150 110",
    "M 150 110 L 60 110",
    "M 60 110 L 60 50",
    "M 60 50 L 150 110",
  ];
  return (
    <svg viewBox={VB} className={frame} aria-hidden>
      <Grid />
      {/* outer frame */}
      <rect x="30" y="25" width="180" height="110" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
      {/* corner ticks */}
      {[[30, 25], [210, 25], [30, 135], [210, 135]].map(([x, y], i) => (
        <g key={i} opacity="0.55">
          <line x1={x - 3} y1={y} x2={x + 3} y2={y} stroke="currentColor" strokeWidth="0.5" />
          <line x1={x} y1={y - 3} x2={x} y2={y + 3} stroke="currentColor" strokeWidth="0.5" />
        </g>
      ))}
      {/* drawing paths in sequence */}
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="0.55" strokeDasharray="220" strokeDashoffset="220" opacity="0.75">
          <animate attributeName="stroke-dashoffset" values="220;0;0;220" keyTimes="0;0.45;0.9;1" dur="8s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
        </path>
      ))}
      {/* modules resolving into place */}
      {modules.map((m, i) => (
        <g key={i}>
          <rect x={m.x - 10} y={m.y - 8} width="20" height="16" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="0.55" opacity="0.85">
            <animate attributeName="opacity" values="0;0.9;0.9" keyTimes="0;0.5;1" dur="8s" begin={`${1 + i * 0.4}s`} repeatCount="indefinite" />
          </rect>
          <circle cx={m.x} cy={m.y - 2} r="1.3" fill="currentColor" />
          <text x={m.x} y={m.y + 4} textAnchor="middle" fontSize="3.6" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.65" letterSpacing="0.6">{m.label}</text>
        </g>
      ))}
      {/* dimension lines */}
      <line x1="30" y1="18" x2="210" y2="18" stroke="currentColor" strokeWidth="0.3" opacity="0.35" />
      <line x1="30" y1="16" x2="30" y2="20" stroke="currentColor" strokeWidth="0.3" opacity="0.35" />
      <line x1="210" y1="16" x2="210" y2="20" stroke="currentColor" strokeWidth="0.3" opacity="0.35" />
      {/* traveling architect signal */}
      <circle r="1.5" fill="currentColor">
        <animateMotion dur="6s" repeatCount="indefinite" begin="3s" path="M 60 50 L 150 50 L 150 110 L 60 110 Z" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="6s" repeatCount="indefinite" begin="3s" />
      </circle>
    </svg>
  );
};

/* ─────────── 03 Engineer — modules assembling into a live 4-layer system ─────────── */
export const EngineerVisual = () => {
  const layers = [
    { y: 34, label: "INTELLIGENCE", nodes: [55, 105, 155, 205] },
    { y: 72, label: "ACQUISITION", nodes: [75, 130, 190] },
    { y: 110, label: "REVENUE", nodes: [60, 115, 165, 210] },
    { y: 148, label: "REPORTING", nodes: [85, 145, 195] },
  ];
  const bridges: [number, number, number, number][] = [
    [55, 34, 75, 72], [105, 34, 130, 72], [155, 34, 130, 72], [205, 34, 190, 72],
    [75, 72, 60, 110], [130, 72, 115, 110], [190, 72, 165, 110], [190, 72, 210, 110],
    [60, 110, 85, 148], [115, 110, 145, 148], [165, 110, 145, 148], [210, 110, 195, 148],
  ];
  return (
    <svg viewBox={VB} className={frame} aria-hidden>
      <Grid />
      {layers.map((L, li) => (
        <g key={li}>
          <line x1="22" y1={L.y} x2="218" y2={L.y} stroke="currentColor" strokeWidth="0.35" opacity="0.4" />
          <text x="22" y={L.y - 5} fontSize="4" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.6" letterSpacing="0.8">
            {L.label}
          </text>
          {L.nodes.map((x, ni) => (
            <g key={ni}>
              <rect x={x - 4} y={L.y - 4} width="8" height="8" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="0.5" opacity="0.85">
                <animate attributeName="opacity" values="0;0.9;0.9" keyTimes="0;0.4;1" dur="9s" begin={`${li * 0.7 + ni * 0.18}s`} repeatCount="indefinite" />
              </rect>
              <circle cx={x} cy={L.y} r="1.2" fill="currentColor" opacity="0.9" />
            </g>
          ))}
        </g>
      ))}
      {bridges.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.4" strokeDasharray="70" strokeDashoffset="70" opacity="0.7">
          <animate attributeName="stroke-dashoffset" values="70;0;0" keyTimes="0;0.5;1" dur="9s" begin={`${1.5 + i * 0.15}s`} repeatCount="indefinite" />
        </line>
      ))}
      {[
        "M 105 34 L 130 72 L 115 110 L 145 148",
        "M 55 34 L 75 72 L 60 110 L 85 148",
        "M 155 34 L 190 72 L 165 110 L 145 148",
        "M 205 34 L 190 72 L 210 110 L 195 148",
      ].map((path, i) => (
        <circle key={i} r="1.6" fill="currentColor">
          <animateMotion dur="6s" repeatCount="indefinite" begin={`${3 + i * 0.9}s`} path={path} />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="6s" repeatCount="indefinite" begin={`${3 + i * 0.9}s`} />
        </circle>
      ))}
    </svg>
  );
};


/* ─────────── 04 Activate — live acquisition engine ─────────── */
export const ActivateVisual = () => {
  // 4 inbound demand sources → central qualifier → 3 opportunity outputs
  const sources = [
    { x: 25, y: 35, label: "INBOUND" },
    { x: 25, y: 65, label: "OUTBOUND" },
    { x: 25, y: 95, label: "REFERRAL" },
    { x: 25, y: 125, label: "CONTENT" },
  ];
  const Q = { x: 120, y: 80 };
  const outs = [
    { x: 218, y: 50 }, { x: 218, y: 80 }, { x: 218, y: 110 },
  ];
  return (
    <svg viewBox={VB} className={frame} aria-hidden>
      <Grid />
      {/* qualifier core */}
      <rect x={Q.x - 22} y={Q.y - 22} width="44" height="44" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
      <rect x={Q.x - 14} y={Q.y - 14} width="28" height="28" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
      <text x={Q.x} y={Q.y + 1} textAnchor="middle" fontSize="4.2" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.7" letterSpacing="0.5">
        QUALIFY
      </text>
      <circle cx={Q.x} cy={Q.y + 10} r="2" fill="currentColor">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* source rails */}
      {sources.map((s, i) => (
        <g key={i}>
          <text x={s.x - 2} y={s.y - 6} fontSize="4" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.55" letterSpacing="0.6">
            {s.label}
          </text>
          <circle cx={s.x} cy={s.y} r="2" fill="currentColor" opacity="0.8" />
          <line x1={s.x} y1={s.y} x2={Q.x - 22} y2={Q.y} stroke="currentColor" strokeWidth="0.35" opacity="0.45" />
          {/* incoming signals */}
          {[0, 1].map((k) => (
            <circle key={k} r="1.3" fill="currentColor">
              <animateMotion dur="5s" repeatCount="indefinite" begin={`${i * 0.6 + k * 2.5}s`} path={`M ${s.x} ${s.y} L ${Q.x - 22} ${Q.y}`} />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="5s" repeatCount="indefinite" begin={`${i * 0.6 + k * 2.5}s`} />
            </circle>
          ))}
        </g>
      ))}

      {/* output rails — qualified opportunities */}
      {outs.map((o, i) => (
        <g key={i}>
          <line x1={Q.x + 22} y1={Q.y} x2={o.x} y2={o.y} stroke="currentColor" strokeWidth="0.4" opacity="0.55" />
          <rect x={o.x - 4} y={o.y - 4} width="8" height="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.8" />
          <circle cx={o.x} cy={o.y} r="1.3" fill="currentColor">
            <animate attributeName="opacity" values="0;1;1;0.3" keyTimes="0;0.3;0.85;1" dur="4s" begin={`${i * 1.3}s`} repeatCount="indefinite" />
          </circle>
          {/* qualified signal exiting */}
          <circle r="1.5" fill="currentColor">
            <animateMotion dur="4s" repeatCount="indefinite" begin={`${i * 1.3 + 0.5}s`} path={`M ${Q.x + 22} ${Q.y} L ${o.x} ${o.y}`} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="4s" repeatCount="indefinite" begin={`${i * 1.3 + 0.5}s`} />
          </circle>
        </g>
      ))}
      <text x={218} y={32} textAnchor="end" fontSize="4" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.55" letterSpacing="0.6">
        OPPORTUNITIES
      </text>
    </svg>
  );
};

/* ─────────── 05 Optimize — feedback intelligence engine ─────────── */
export const OptimizeVisual = () => {
  // Three vertical zones: ACTIVITY (left) → ANALYSIS (mid) → OPTIMIZATION (right)
  // with a return path from right back to mid.
  const A = { x: 38, y: 80 };
  const N = { x: 120, y: 80 };
  const O = { x: 202, y: 80 };
  return (
    <svg viewBox={VB} className={frame} aria-hidden>
      <Grid />

      {/* zone columns */}
      {[A, N, O].map((z, i) => (
        <g key={i} opacity="0.5">
          <line x1={z.x} y1="25" x2={z.x} y2="135" stroke="currentColor" strokeWidth="0.3" />
        </g>
      ))}

      {/* zone labels */}
      {[
        { x: A.x, t: "ACTIVITY" },
        { x: N.x, t: "ANALYSIS" },
        { x: O.x, t: "OPTIMIZE" },
      ].map((l) => (
        <text key={l.t} x={l.x} y="20" textAnchor="middle" fontSize="4.2" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.6" letterSpacing="0.8">
          {l.t}
        </text>
      ))}

      {/* activity nodes — multiple inputs */}
      {[50, 80, 110].map((y, i) => (
        <g key={i}>
          <rect x={A.x - 4} y={y - 4} width="8" height="8" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.75" />
          <line x1={A.x + 4} y1={y} x2={N.x - 6} y2={N.y} stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
        </g>
      ))}

      {/* analysis core */}
      <circle cx={N.x} cy={N.y} r="14" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
      <circle cx={N.x} cy={N.y} r="6" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
      <circle cx={N.x} cy={N.y} r="2" fill="currentColor">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" repeatCount="indefinite" />
      </circle>
      {/* rotating analysis ring */}
      <g style={{ transformOrigin: `${N.x}px ${N.y}px` }}>
        <circle cx={N.x} cy={N.y} r="20" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 4" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" from={`0 ${N.x} ${N.y}`} to={`360 ${N.x} ${N.y}`} dur="30s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* analysis → optimize */}
      <line x1={N.x + 14} y1={N.y} x2={O.x - 4} y2={O.y} stroke="currentColor" strokeWidth="0.45" opacity="0.55" />

      {/* optimization output nodes */}
      {[55, 80, 105].map((y, i) => (
        <g key={i}>
          <rect x={O.x - 4} y={y - 4} width="8" height="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.8" />
          <circle cx={O.x} cy={y} r="1.2" fill="currentColor">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* activity signals flowing into analysis */}
      {[50, 80, 110].map((y, i) =>
        [0, 1].map((k) => (
          <circle key={`a-${i}-${k}`} r="1.3" fill="currentColor">
            <animateMotion dur="5s" repeatCount="indefinite" begin={`${i * 0.7 + k * 2.5}s`} path={`M ${A.x} ${y} L ${N.x} ${N.y}`} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="5s" repeatCount="indefinite" begin={`${i * 0.7 + k * 2.5}s`} />
          </circle>
        ))
      )}

      {/* analysis → optimization signal */}
      {[0, 1, 2].map((i) => (
        <circle key={`o-${i}`} r="1.5" fill="currentColor">
          <animateMotion dur="4s" repeatCount="indefinite" begin={`${1 + i * 1.3}s`} path={`M ${N.x} ${N.y} L ${O.x} ${[55, 80, 105][i]}`} />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="4s" repeatCount="indefinite" begin={`${1 + i * 1.3}s`} />
        </circle>
      ))}

      {/* FEEDBACK PATH — optimization results return to analysis */}
      <path
        d={`M ${O.x} ${O.y + 24} Q ${(N.x + O.x) / 2} ${O.y + 50} ${N.x} ${N.y + 24}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray="2 2.5"
        opacity="0.55"
      />
      <text x={(N.x + O.x) / 2} y={O.y + 56} textAnchor="middle" fontSize="3.8" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.55" letterSpacing="0.6">
        FEEDBACK
      </text>
      {/* return particles — completing the loop */}
      {[0, 1].map((i) => (
        <circle key={`f-${i}`} r="1.3" fill="currentColor">
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            begin={`${2 + i * 3}s`}
            path={`M ${O.x} ${O.y + 24} Q ${(N.x + O.x) / 2} ${O.y + 50} ${N.x} ${N.y + 24}`}
          />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="6s" repeatCount="indefinite" begin={`${2 + i * 3}s`} />
        </circle>
      ))}
    </svg>
  );
};

/* ─────────── 06 Compound (refined, kept simple curve) ─────────── */
export const CompoundVisual = () => (
  <svg viewBox={VB} className={frame} aria-hidden>
    <Grid />
    <line x1="30" y1="140" x2="220" y2="140" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
    <line x1="30" y1="20" x2="30" y2="140" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
    {/* baseline reference */}
    <line x1="30" y1="120" x2="220" y2="120" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 3" opacity="0.35" />
    {/* compounding curve */}
    <path
      d="M30 130 Q 90 125, 130 100 T 220 25"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="400"
      strokeDashoffset="400"
    >
      <animate attributeName="stroke-dashoffset" values="400;0;0;400" keyTimes="0;0.4;0.9;1" dur="9s" repeatCount="indefinite" />
    </path>
    {/* milestone nodes */}
    {[[90, 125], [150, 80], [210, 30]].map(([x, y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r={2.5 + i * 0.4} fill="currentColor">
          <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.5;1" dur="9s" begin={`${i * 0.8 + 1}s`} repeatCount="indefinite" />
        </circle>
      </g>
    ))}
    {/* signal traveling along curve */}
    <circle r="1.8" fill="currentColor">
      <animateMotion dur="9s" repeatCount="indefinite" path="M30 130 Q 90 125, 130 100 T 220 25" />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="9s" repeatCount="indefinite" />
    </circle>
  </svg>
);
