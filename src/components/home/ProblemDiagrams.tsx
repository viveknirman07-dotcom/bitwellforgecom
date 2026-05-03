/**
 * Problem section diagrams. Mode-adaptive via --svg-* CSS vars.
 * All animations defined as CSS keyframes; no Framer here so they
 * breathe 24/7 without re-renders.
 */

/* Diagram 1 — Leaky Pipelines */
export const LeakyFunnel = () => {
  return (
    <svg viewBox="0 0 120 120" className="anim-float w-full h-full" aria-hidden>
      {/* Funnel body */}
      <path
        d="M14 14 L106 14 L78 62 L78 102 L42 102 L42 62 Z"
        className="svg-fill"
        strokeWidth="0.9"
      />
      {/* leak holes (dashed) */}
      <ellipse cx="50" cy="40" rx="2" ry="0.8" className="svg-stroke" strokeDasharray="1 1" strokeWidth="0.6" />
      <ellipse cx="72" cy="48" rx="2" ry="0.8" className="svg-stroke" strokeDasharray="1 1" strokeWidth="0.6" />
      <ellipse cx="55" cy="58" rx="2" ry="0.8" className="svg-stroke" strokeDasharray="1 1" strokeWidth="0.6" />

      {/* Inner flow dots — fall through center */}
      {[0, 1, 2].map((i) => (
        <circle
          key={`flow-${i}`}
          cx={60}
          cy={20}
          r="1.6"
          className="svg-highlight anim-leak"
          style={{ animationDelay: `${i * 0.8}s` }}
        />
      ))}

      {/* Side leak drips — staggered */}
      <circle cx="50" cy="40" r="1.2" className="svg-highlight anim-leak" style={{ animationDelay: "0s", animationDuration: "3s" }} />
      <circle cx="72" cy="48" r="1.2" className="svg-highlight anim-leak" style={{ animationDelay: "1.1s", animationDuration: "3s" }} />
      <circle cx="55" cy="58" r="1.2" className="svg-highlight anim-leak" style={{ animationDelay: "2.0s", animationDuration: "3s" }} />

      {/* Bottom output — sparse */}
      <circle cx="60" cy="110" r="1" className="svg-highlight anim-node" style={{ animationDelay: "1.2s" }} />
    </svg>
  );
};

/* Diagram 2 — Channel Dependency */
export const ChannelWire = () => {
  return (
    <svg viewBox="0 0 120 60" className="anim-float w-full h-full" aria-hidden>
      {/* Single fragile wire */}
      <g className="anim-cut">
        <path
          d="M10 30 Q40 6 60 30 T110 30"
          className="svg-stroke anim-line"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="4 6"
          style={{ animationDuration: "4s" }}
        />
      </g>

      {/* Endpoint nodes */}
      <circle cx="10" cy="30" r="3" className="svg-highlight anim-node" style={{ animationDelay: "0s" }} />
      <circle cx="110" cy="30" r="3" className="svg-highlight anim-node anim-hub-only" style={{ animationDelay: "0.4s" }} />

      {/* Subtle break indicator */}
      <line
        x1="60"
        y1="20"
        x2="60"
        y2="40"
        className="svg-secondary"
        strokeDasharray="1.2 2"
        strokeWidth="0.6"
      />
    </svg>
  );
};

/* Diagram 3 — No Feedback Loop */
export const FeedbackLoop = () => {
  return (
    <svg viewBox="0 0 120 120" className="anim-float w-full h-full" aria-hidden>
      <circle
        cx="60"
        cy="60"
        r="38"
        className="svg-stroke anim-rotate-slow"
        strokeWidth="0.9"
        strokeDasharray="3 4"
        fill="none"
      />
      <text
        x="60"
        y="72"
        textAnchor="middle"
        fontSize="34"
        fontFamily="Playfair Display, serif"
        fontStyle="italic"
        className="svg-text anim-node anim-hub-only"
      >
        ?
      </text>
    </svg>
  );
};
