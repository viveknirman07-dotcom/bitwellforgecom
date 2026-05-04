/**
 * Problem section diagrams. Mode-adaptive via --svg-* CSS vars.
 * All landscape format (200x120, 5:3) for visual consistency.
 */

/* Diagram 1 — Leaky Pipelines (landscape funnel pointing right) */
export const LeakyFunnel = () => {
  return (
    <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" className="anim-float w-full h-full" aria-hidden>
      {/* Funnel body — horizontal, opens left, narrows right */}
      <path
        d="M20 20 L20 100 L120 70 L160 70 L160 50 L120 50 Z"
        className="svg-fill"
        strokeWidth="0.9"
      />
      {/* leak holes (dashed) along the angled walls */}
      <ellipse cx="55" cy="35" rx="2" ry="0.8" className="svg-stroke" strokeDasharray="1 1" strokeWidth="0.6" />
      <ellipse cx="80" cy="44" rx="2" ry="0.8" className="svg-stroke" strokeDasharray="1 1" strokeWidth="0.6" />
      <ellipse cx="65" cy="86" rx="2" ry="0.8" className="svg-stroke" strokeDasharray="1 1" strokeWidth="0.6" />

      {/* Inner flow dots — drift right through the funnel */}
      {[0, 1, 2].map((i) => (
        <circle
          key={`flow-${i}`}
          cx={30}
          cy={60}
          r="1.6"
          className="svg-highlight anim-leak"
          style={{ animationDelay: `${i * 0.8}s` }}
        />
      ))}

      {/* Side leak drips */}
      <circle cx="55" cy="35" r="1.2" className="svg-highlight anim-leak" style={{ animationDelay: "0s", animationDuration: "3s" }} />
      <circle cx="80" cy="44" r="1.2" className="svg-highlight anim-leak" style={{ animationDelay: "1.1s", animationDuration: "3s" }} />
      <circle cx="65" cy="86" r="1.2" className="svg-highlight anim-leak" style={{ animationDelay: "2.0s", animationDuration: "3s" }} />

      {/* Output point */}
      <circle cx="170" cy="60" r="1.4" className="svg-highlight anim-node" style={{ animationDelay: "1.2s" }} />
    </svg>
  );
};

/* Diagram 2 — Channel Dependency (landscape) */
export const ChannelWire = () => {
  return (
    <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" className="anim-float w-full h-full" aria-hidden>
      <g className="anim-cut">
        <path
          d="M20 60 Q70 20 100 60 T180 60"
          className="svg-stroke anim-line"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="4 6"
          style={{ animationDuration: "4s" }}
          fill="none"
        />
      </g>

      <circle cx="20" cy="60" r="3.5" className="svg-highlight anim-node" style={{ animationDelay: "0s" }} />
      <circle cx="180" cy="60" r="3.5" className="svg-highlight anim-node anim-hub-only" style={{ animationDelay: "0.4s" }} />

      <line
        x1="100"
        y1="46"
        x2="100"
        y2="74"
        className="svg-secondary"
        strokeDasharray="1.2 2"
        strokeWidth="0.6"
      />
    </svg>
  );
};

/* Diagram 3 — No Feedback Loop (landscape) */
export const FeedbackLoop = () => {
  return (
    <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" className="anim-float w-full h-full" aria-hidden>
      <ellipse
        cx="100"
        cy="60"
        rx="60"
        ry="42"
        className="svg-stroke anim-rotate-slow"
        strokeWidth="0.9"
        strokeDasharray="3 4"
        fill="none"
        style={{ transformOrigin: "100px 60px" }}
      />
      <text
        x="100"
        y="76"
        textAnchor="middle"
        fontSize="38"
        fontFamily="Playfair Display, serif"
        fontStyle="italic"
        className="svg-text anim-node anim-hub-only"
      >
        ?
      </text>
    </svg>
  );
};
