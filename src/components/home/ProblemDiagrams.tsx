/**
 * Problem section diagrams — fully token-driven, breathing 24/7.
 * All colors come from --svg-* CSS variables (light + dark adaptive).
 */

export const LeakyFunnel = () => {
  return (
    <svg viewBox="0 0 120 110" className="w-24 h-24 anim-float-drift overflow-visible">
      {/* funnel body */}
      <path
        d="M10 12 L110 12 L78 60 L78 96 L42 96 L42 60 Z"
        fill="hsl(var(--svg-fill))"
        stroke="hsl(var(--svg-stroke))"
        strokeWidth="0.9"
      />
      {/* leak hole */}
      <ellipse
        cx="60" cy="60" rx="9" ry="2.4"
        fill="none"
        stroke="hsl(var(--svg-accent))"
        strokeWidth="0.7"
        strokeDasharray="2 2"
      />
      {/* leaking dots — 3 staggered */}
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={60} cy={62} r={1.4}
          fill="hsl(var(--svg-highlight))"
          style={{
            animation: `leakDot 2.4s ease-in ${i * 0.7}s infinite`,
            transformBox: "fill-box",
            willChange: "transform, opacity",
          }}
        />
      ))}
      {/* center node breathes */}
      <circle cx="60" cy="60" r="1.6" fill="hsl(var(--svg-highlight))" className="anim-node-pulse anim-glow-pulse" />
    </svg>
  );
};

export const ChannelWire = () => {
  return (
    <svg viewBox="0 0 120 60" className="w-28 h-20 anim-float-drift overflow-visible">
      <path
        d="M5 30 Q40 5 60 30 T115 30"
        fill="none"
        stroke="hsl(var(--svg-stroke))"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="240"
        className="anim-line-draw anim-wire-cut"
      />
      <circle cx="5"   cy="30" r="3" fill="hsl(var(--svg-highlight))" className="anim-node-pulse anim-glow-pulse" />
      <circle cx="115" cy="30" r="3" fill="hsl(var(--svg-highlight))" className="anim-node-pulse" style={{ animationDelay: "0.4s" }} />
      <line x1="60" y1="22" x2="60" y2="38" stroke="hsl(var(--svg-secondary))" strokeWidth="0.6" strokeDasharray="1.5 2" />
    </svg>
  );
};

export const FeedbackLoop = () => {
  return (
    <svg viewBox="0 0 120 110" className="w-24 h-24 anim-float-drift overflow-visible">
      <g className="anim-rotate-slow" style={{ transformOrigin: "60px 55px" }}>
        <circle
          cx="60" cy="55" r="38"
          fill="none"
          stroke="hsl(var(--svg-stroke))"
          strokeWidth="0.9"
          strokeDasharray="3 4"
        />
      </g>
      <text
        x="60" y="66"
        textAnchor="middle"
        fontSize="32"
        fontFamily="Playfair Display, serif"
        fill="hsl(var(--svg-text))"
        fontStyle="italic"
        className="anim-node-pulse"
        style={{ transformOrigin: "60px 55px" }}
      >
        ?
      </text>
    </svg>
  );
};
