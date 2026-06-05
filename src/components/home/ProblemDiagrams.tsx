/**
 * Premium architectural system diagnostics.
 * Continuous SMIL motion. Mode-adaptive via --svg-* tokens.
 * Landscape 240x140 for consistency across cards.
 */

/* ───────── Shared grid backdrop ───────── */
const Grid = ({ w = 240, h = 140 }: { w?: number; h?: number }) => (
  <g opacity="0.18">
    {Array.from({ length: Math.floor(w / 12) }).map((_, i) => (
      <line key={`gx${i}`} x1={i * 12} y1={0} x2={i * 12} y2={h} stroke="currentColor" strokeWidth="0.15" />
    ))}
    {Array.from({ length: Math.floor(h / 12) }).map((_, i) => (
      <line key={`gy${i}`} x1={0} y1={i * 12} x2={w} y2={i * 12} stroke="currentColor" strokeWidth="0.15" />
    ))}
  </g>
);

/* ───────── 1. Leaky Pipeline — real-time stage attrition ───────── */
export const LeakyFunnel = () => {
  // 5 stages laid across a horizontal pipeline
  const stages = [28, 76, 124, 172, 212];
  const pipeY = 70;
  return (
    <svg viewBox="0 0 240 140" preserveAspectRatio="xMidYMid meet" className="w-full h-full" aria-hidden>
      <Grid />

      {/* main pipeline rail */}
      <line x1="20" y1={pipeY} x2="220" y2={pipeY} className="svg-stroke" strokeWidth="0.6" opacity="0.55" />

      {/* stage gates */}
      {stages.map((x, i) => (
        <g key={`stage-${i}`}>
          <line x1={x} y1={pipeY - 14} x2={x} y2={pipeY + 14} className="svg-stroke" strokeWidth="0.5" opacity="0.5" />
          <circle cx={x} cy={pipeY} r="2.2" className="svg-highlight" opacity="0.85" />
          <text x={x} y={pipeY - 20} textAnchor="middle" fontSize="5" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.55" letterSpacing="0.5">
            {["CAPTURE", "QUALIFY", "ENGAGE", "PROPOSE", "WON"][i]}
          </text>
          <text x={x} y={pipeY + 28} textAnchor="middle" fontSize="5.5" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.4">
            {[100, 62, 38, 22, 9][i]}
          </text>
        </g>
      ))}

      {/* attrition arcs — leakage going down between stages */}
      {[0, 1, 2, 3].map((i) => {
        const x1 = stages[i];
        const x2 = stages[i + 1];
        const midX = (x1 + x2) / 2;
        return (
          <path
            key={`leak-${i}`}
            d={`M ${midX} ${pipeY} Q ${midX} ${pipeY + 22} ${midX + 6} ${pipeY + 34}`}
            fill="none"
            className="svg-secondary"
            strokeWidth="0.4"
            strokeDasharray="1.5 2"
          />
        );
      })}

      {/* flowing forward signals */}
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={`fwd-${i}`} r="1.6" className="svg-highlight">
          <animateMotion dur="9s" repeatCount="indefinite" begin={`${i * 1.6}s`} path={`M 20 ${pipeY} L 220 ${pipeY}`} />
          <animate attributeName="opacity" values="0;1;1;1;1;0.2;0" keyTimes="0;0.05;0.3;0.55;0.78;0.95;1" dur="9s" repeatCount="indefinite" begin={`${i * 1.6}s`} />
        </circle>
      ))}

      {/* leaking signals — drop out between stages */}
      {[0, 1, 2, 3].map((i) => {
        const x1 = stages[i];
        const x2 = stages[i + 1];
        const midX = (x1 + x2) / 2;
        return (
          <circle key={`drop-${i}`} r="1.3" fill="currentColor" opacity="0">
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              begin={`${i * 1.4 + 0.7}s`}
              path={`M ${x1} ${pipeY} L ${midX} ${pipeY} Q ${midX} ${pipeY + 22} ${midX + 6} ${pipeY + 36}`}
            />
            <animate attributeName="opacity" values="0;0.8;0.8;0" keyTimes="0;0.2;0.7;1" dur="6s" repeatCount="indefinite" begin={`${i * 1.4 + 0.7}s`} />
          </circle>
        );
      })}

      {/* endpoint indicator */}
      <circle cx="220" cy={pipeY} r="3" className="svg-highlight">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};

/* ───────── 2. Channel Dependency (unchanged structure, refined) ───────── */
export const ChannelWire = () => (
  <svg viewBox="0 0 240 140" preserveAspectRatio="xMidYMid meet" className="w-full h-full" aria-hidden>
    <Grid />
    {/* peripheral starved nodes */}
    {[
      [30, 30], [30, 110], [60, 25], [60, 115],
    ].map(([x, y], i) => (
      <g key={`p-${i}`} opacity="0.45">
        <circle cx={x} cy={y} r="2" className="svg-secondary" fill="currentColor" />
        <line x1={x} y1={y} x2="120" y2="70" className="svg-secondary" strokeWidth="0.3" strokeDasharray="1 2" />
      </g>
    ))}
    {/* single dominant channel */}
    <line x1="20" y1="70" x2="220" y2="70" className="svg-stroke" strokeWidth="0.8" />
    <circle cx="20" cy="70" r="3" className="svg-highlight" />
    <circle cx="120" cy="70" r="4.5" className="svg-highlight">
      <animate attributeName="r" values="4.5;5.5;4.5" dur="2.4s" repeatCount="indefinite" />
    </circle>
    <circle cx="220" cy="70" r="3" className="svg-highlight" />
    {/* single signal traveling */}
    <circle r="1.6" className="svg-highlight">
      <animateMotion dur="4s" repeatCount="indefinite" path="M 20 70 L 220 70" />
    </circle>
    {/* fracture point */}
    <line x1="170" y1="60" x2="170" y2="80" className="svg-secondary" strokeDasharray="1 1.5" strokeWidth="0.5">
      <animate attributeName="opacity" values="0;1;0" dur="5s" repeatCount="indefinite" />
    </line>
  </svg>
);

/* ───────── 3. No Feedback Loop — broken intelligence architecture ───────── */
export const FeedbackLoop = () => {
  // Three nodes: ACTIVITY → PROCESSING → INSIGHTS with broken return path
  const A = { x: 36, y: 70, label: "ACTIVITY" };
  const P = { x: 120, y: 70, label: "PROCESSING" };
  const I = { x: 204, y: 70, label: "INSIGHTS" };
  return (
    <svg viewBox="0 0 240 140" preserveAspectRatio="xMidYMid meet" className="w-full h-full" aria-hidden>
      <Grid />

      {/* satellite intelligence nodes around processing */}
      {[
        [P.x - 24, P.y - 26], [P.x + 24, P.y - 26], [P.x - 24, P.y + 26], [P.x + 24, P.y + 26],
      ].map(([x, y], i) => (
        <g key={`sat-${i}`} opacity="0.55">
          <rect x={x - 3} y={y - 3} width="6" height="6" className="svg-stroke" strokeWidth="0.4" fill="none" />
          <line x1={x} y1={y} x2={P.x} y2={P.y} className="svg-secondary" strokeWidth="0.3" strokeDasharray="1 1.5" />
        </g>
      ))}

      {/* forward path */}
      <line x1={A.x} y1={A.y} x2={I.x} y2={I.y} className="svg-stroke" strokeWidth="0.6" />

      {/* node frames */}
      {[A, P, I].map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r="8" className="svg-fill" strokeWidth="0.6" />
          <circle cx={n.x} cy={n.y} r="2.4" className="svg-highlight" />
          <text x={n.x} y={n.y + 20} textAnchor="middle" fontSize="5" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.6" letterSpacing="0.5">
            {n.label}
          </text>
        </g>
      ))}

      {/* central pulse on processing */}
      <circle cx={P.x} cy={P.y} r="8" fill="none" className="svg-secondary" strokeWidth="0.4">
        <animate attributeName="r" values="8;14;8" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* forward data particles */}
      {[0, 1, 2].map((i) => (
        <circle key={`f-${i}`} r="1.4" className="svg-highlight">
          <animateMotion dur="6s" repeatCount="indefinite" begin={`${i * 2}s`} path={`M ${A.x} ${A.y} L ${I.x} ${I.y}`} />
        </circle>
      ))}

      {/* attempted feedback return path — broken */}
      <path
        d={`M ${I.x} ${I.y - 8} Q ${(A.x + I.x) / 2} ${I.y - 38} ${A.x} ${A.y - 8}`}
        fill="none"
        className="svg-secondary"
        strokeWidth="0.5"
        strokeDasharray="2 3"
      />
      {/* break marker */}
      <g transform={`translate(${(A.x + I.x) / 2}, ${I.y - 32})`}>
        <line x1="-4" y1="-3" x2="4" y2="3" className="svg-stroke" strokeWidth="0.6" />
        <line x1="-4" y1="3" x2="4" y2="-3" className="svg-stroke" strokeWidth="0.6" />
      </g>

      {/* return particles that fade and disappear before completing */}
      {[0, 1].map((i) => (
        <circle key={`r-${i}`} r="1.2" fill="currentColor" opacity="0">
          <animateMotion
            dur="5s"
            repeatCount="indefinite"
            begin={`${i * 2.5 + 1}s`}
            path={`M ${I.x} ${I.y - 8} Q ${(A.x + I.x) / 2} ${I.y - 38} ${A.x} ${A.y - 8}`}
          />
          <animate attributeName="opacity" values="0;0.9;0.9;0;0" keyTimes="0;0.1;0.45;0.55;1" dur="5s" repeatCount="indefinite" begin={`${i * 2.5 + 1}s`} />
        </circle>
      ))}
    </svg>
  );
};
