/**
 * Homepage diagnostic diagrams.
 * Language inherited from Process Stage 04 / 05 (master).
 * Borderless, perpetual motion via SMIL, mode-adaptive via currentColor.
 * Each diagram tells its section's meaning without decoration.
 */

const VB = "0 0 240 160";
const frame = "w-full h-full";

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

/* ─────────── 01 Leaking Pipelines
   Five staged gates, forward-flowing signals, downward drop-outs between stages. */
export const LeakyFunnel = () => {
  const stages = [30, 75, 120, 165, 210];
  const labels = ["CAPTURE", "QUALIFY", "ENGAGE", "PROPOSE", "WON"];
  const counts = ["100", "62", "38", "22", "9"];
  const pipeY = 82;
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid meet" className={frame} aria-hidden>
      <Grid />
      {/* main rail */}
      <line x1="22" y1={pipeY} x2="218" y2={pipeY} stroke="currentColor" strokeWidth="0.55" opacity="0.55" />

      {stages.map((x, i) => (
        <g key={i}>
          <rect x={x - 5} y={pipeY - 12} width="10" height="24" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
          <circle cx={x} cy={pipeY} r="1.6" fill="currentColor" opacity="0.9" />
          <text x={x} y={pipeY - 20} textAnchor="middle" fontSize="4.4" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.62" letterSpacing="0.7">
            {labels[i]}
          </text>
          <text x={x} y={pipeY + 30} textAnchor="middle" fontSize="4.6" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.45" letterSpacing="0.5">
            {counts[i]}
          </text>
        </g>
      ))}

      {/* leakage arcs between stages */}
      {[0, 1, 2, 3].map((i) => {
        const midX = (stages[i] + stages[i + 1]) / 2;
        return (
          <path
            key={`leak-${i}`}
            d={`M ${midX} ${pipeY + 5} Q ${midX} ${pipeY + 26} ${midX + 5} ${pipeY + 40}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeDasharray="1.4 2"
            opacity="0.5"
          />
        );
      })}

      {/* forward signals */}
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={`fwd-${i}`} r="1.5" fill="currentColor">
          <animateMotion dur="10s" repeatCount="indefinite" begin={`${i * 1.8}s`} path={`M 22 ${pipeY} L 218 ${pipeY}`} />
          <animate attributeName="opacity" values="0;1;1;1;1;0.3;0" keyTimes="0;0.05;0.3;0.55;0.78;0.95;1" dur="10s" repeatCount="indefinite" begin={`${i * 1.8}s`} />
        </circle>
      ))}

      {/* dropouts */}
      {[0, 1, 2, 3].map((i) => {
        const midX = (stages[i] + stages[i + 1]) / 2;
        return (
          <circle key={`drop-${i}`} r="1.2" fill="currentColor">
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              begin={`${i * 1.5 + 0.8}s`}
              path={`M ${stages[i]} ${pipeY} L ${midX} ${pipeY + 5} Q ${midX} ${pipeY + 26} ${midX + 5} ${pipeY + 42}`}
            />
            <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.2;0.7;1" dur="6s" repeatCount="indefinite" begin={`${i * 1.5 + 0.8}s`} />
          </circle>
        );
      })}

      {/* terminal indicator */}
      <circle cx="218" cy={pipeY} r="3" fill="currentColor" opacity="0.85">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
      </circle>

      <text x="22" y="20" fontSize="4.4" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.55" letterSpacing="0.7">PIPELINE ATTRITION</text>
    </svg>
  );
};

/* ─────────── 02 Single-Channel Dependency
   One dominant rail; four satellites tethered by dashed dependencies; a fracture pulse. */
export const ChannelWire = () => {
  const railY = 80;
  const satellites = [
    { x: 40, y: 30, l: "PAID" },
    { x: 40, y: 130, l: "REFERRAL" },
    { x: 75, y: 24, l: "SOCIAL" },
    { x: 75, y: 136, l: "EVENTS" },
  ];
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid meet" className={frame} aria-hidden>
      <Grid />
      <text x="22" y="20" fontSize="4.4" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.55" letterSpacing="0.7">CHANNEL DEPENDENCY</text>

      {/* dominant rail */}
      <line x1="22" y1={railY} x2="218" y2={railY} stroke="currentColor" strokeWidth="0.8" opacity="0.8" />
      <circle cx="22" cy={railY} r="3" fill="currentColor" opacity="0.85" />
      <circle cx="218" cy={railY} r="3" fill="currentColor" opacity="0.85" />

      {/* central load node — breathing */}
      <circle cx="120" cy={railY} r="8" fill="none" stroke="currentColor" strokeWidth="0.55" opacity="0.75">
        <animate attributeName="r" values="8;10;8" dur="2.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="120" cy={railY} r="2.2" fill="currentColor" />

      {/* starved satellites */}
      {satellites.map((s, i) => (
        <g key={i} opacity="0.5">
          <circle cx={s.x} cy={s.y} r="2.2" fill="currentColor" />
          <line x1={s.x} y1={s.y} x2={120} y2={railY} stroke="currentColor" strokeWidth="0.3" strokeDasharray="1.4 2" />
          <text x={s.x + (s.y < railY ? 6 : 6)} y={s.y + (s.y < railY ? -4 : 8)} fontSize="4" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.55" letterSpacing="0.6">
            {s.l}
          </text>
        </g>
      ))}

      {/* travelling signal on dominant rail */}
      <circle r="1.7" fill="currentColor">
        <animateMotion dur="4s" repeatCount="indefinite" path={`M 22 ${railY} L 218 ${railY}`} />
      </circle>

      {/* fracture point — periodic break */}
      <line x1="170" y1={railY - 12} x2="170" y2={railY + 12} stroke="currentColor" strokeWidth="0.6" strokeDasharray="1 1.5">
        <animate attributeName="opacity" values="0;0.9;0" dur="5s" repeatCount="indefinite" />
      </line>
      <text x="170" y={railY + 22} textAnchor="middle" fontSize="3.8" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.5" letterSpacing="0.6">SINGLE POINT OF FAILURE</text>
    </svg>
  );
};

/* ─────────── 03 Absent Feedback Intelligence
   Forward path lit; feedback return path broken by X marker; return particles fade before completing. */
export const FeedbackLoop = () => {
  const A = { x: 40, y: 82, l: "ACTIVITY" };
  const P = { x: 120, y: 82, l: "PROCESSING" };
  const I = { x: 200, y: 82, l: "INSIGHTS" };
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid meet" className={frame} aria-hidden>
      <Grid />
      <text x="22" y="20" fontSize="4.4" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.55" letterSpacing="0.7">FEEDBACK ARCHITECTURE</text>

      {/* satellite intel around processing */}
      {[
        [P.x - 22, P.y - 24], [P.x + 22, P.y - 24], [P.x - 22, P.y + 24], [P.x + 22, P.y + 24],
      ].map(([x, y], i) => (
        <g key={i} opacity="0.55">
          <rect x={x - 2.4} y={y - 2.4} width="4.8" height="4.8" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <line x1={x} y1={y} x2={P.x} y2={P.y} stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 1.5" />
        </g>
      ))}

      {/* forward path */}
      <line x1={A.x} y1={A.y} x2={I.x} y2={I.y} stroke="currentColor" strokeWidth="0.6" opacity="0.7" />

      {/* nodes */}
      {[A, P, I].map((n) => (
        <g key={n.l}>
          <circle cx={n.x} cy={n.y} r="9" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="0.65" opacity="0.9" />
          <circle cx={n.x} cy={n.y} r="2.4" fill="currentColor" />
          <text x={n.x} y={n.y + 22} textAnchor="middle" fontSize="4.4" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.62" letterSpacing="0.7">
            {n.l}
          </text>
        </g>
      ))}

      {/* processing pulse */}
      <circle cx={P.x} cy={P.y} r="9" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.6">
        <animate attributeName="r" values="9;15;9" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* forward particles */}
      {[0, 1, 2].map((i) => (
        <circle key={`f-${i}`} r="1.5" fill="currentColor">
          <animateMotion dur="6s" repeatCount="indefinite" begin={`${i * 2}s`} path={`M ${A.x} ${A.y} L ${I.x} ${I.y}`} />
        </circle>
      ))}

      {/* attempted feedback return — broken */}
      <path
        d={`M ${I.x} ${I.y - 9} Q ${(A.x + I.x) / 2} ${I.y - 42} ${A.x} ${A.y - 9}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray="2 3"
        opacity="0.55"
      />
      {/* break marker */}
      <g transform={`translate(${(A.x + I.x) / 2}, ${I.y - 36})`}>
        <line x1="-4.5" y1="-3.5" x2="4.5" y2="3.5" stroke="currentColor" strokeWidth="0.75" />
        <line x1="-4.5" y1="3.5" x2="4.5" y2="-3.5" stroke="currentColor" strokeWidth="0.75" />
      </g>

      {/* return particles fade mid-path */}
      {[0, 1].map((i) => (
        <circle key={`r-${i}`} r="1.3" fill="currentColor" opacity="0">
          <animateMotion
            dur="5s"
            repeatCount="indefinite"
            begin={`${i * 2.5 + 1}s`}
            path={`M ${I.x} ${I.y - 9} Q ${(A.x + I.x) / 2} ${I.y - 42} ${A.x} ${A.y - 9}`}
          />
          <animate attributeName="opacity" values="0;0.9;0.9;0;0" keyTimes="0;0.1;0.45;0.55;1" dur="5s" repeatCount="indefinite" begin={`${i * 2.5 + 1}s`} />
        </circle>
      ))}
    </svg>
  );
};
