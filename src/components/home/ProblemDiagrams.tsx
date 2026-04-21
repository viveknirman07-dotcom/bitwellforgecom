import { motion, useReducedMotion } from "framer-motion";

export const LeakyFunnel = () => {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 120 110" className="w-24 h-24">
      <defs>
        <linearGradient id="lf" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path d="M10 12 L110 12 L78 60 L78 96 L42 96 L42 60 Z" fill="none" stroke="url(#lf)" strokeWidth="0.8" />
      {/* hole */}
      <ellipse cx="60" cy="60" rx="9" ry="2.4" fill="none" stroke="currentColor" strokeOpacity="0.7" strokeWidth="0.7" strokeDasharray="2 2" />
      {/* leaking dots */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={60}
          cy={68}
          r={1.2}
          fill="currentColor"
          initial={{ y: 0, opacity: 0 }}
          animate={reduced ? undefined : { y: [0, 30], opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.7, ease: "easeIn" }}
        />
      ))}
    </svg>
  );
};

export const ChannelWire = () => {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 120 60" className="w-28 h-20">
      <motion.path
        d="M5 30 Q40 5 60 30 T115 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={reduced ? { pathLength: 1 } : { pathLength: [0, 1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="5" cy="30" r="2.8" fill="currentColor" />
      <circle cx="115" cy="30" r="2.8" fill="currentColor" />
      {/* break indicator */}
      <line x1="60" y1="22" x2="60" y2="38" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.6" strokeDasharray="1.5 2" />
    </svg>
  );
};

export const FeedbackLoop = () => {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 120 110" className="w-24 h-24">
      <motion.circle
        cx="60"
        cy="55"
        r="38"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="3 4"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 55px" }}
      />
      <text x="60" y="66" textAnchor="middle" fontSize="32" fontFamily="Playfair Display, serif" fill="currentColor" fontStyle="italic">
        ?
      </text>
    </svg>
  );
};
