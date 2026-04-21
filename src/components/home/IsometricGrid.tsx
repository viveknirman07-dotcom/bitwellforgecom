import { motion, useReducedMotion } from "framer-motion";

/**
 * Animated isometric gold-line grid + abstract wireframe torus.
 * Pure SVG, GPU-accelerated transforms only.
 */
const IsometricGrid = () => {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Subtle gold orthogonal grid */}
      <div className="absolute inset-0 bg-gold-grid opacity-[0.5]" />

      {/* Radial glow center-right */}
      <div
        className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(220 45% 28% / 0.28), transparent 60%)",
        }}
      />

      {/* Isometric line layer (rotates extremely slowly) */}
      <motion.svg
        viewBox="0 0 1200 800"
        className="absolute inset-0 w-full h-full opacity-[0.35]"
        animate={reduced ? undefined : { rotate: [0, 1.5, 0] }}
        transition={{ duration: 60, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform" }}
      >
        <defs>
          <linearGradient id="goldFade" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(38 38% 60%)" stopOpacity="0.0" />
            <stop offset="50%" stopColor="hsl(38 38% 60%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(38 38% 60%)" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        {/* Diagonal isometric crossing lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`a-${i}`}
            x1={-200 + i * 100}
            y1={0}
            x2={400 + i * 100}
            y2={800}
            stroke="url(#goldFade)"
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`b-${i}`}
            x1={1400 - i * 100}
            y1={0}
            x2={800 - i * 100}
            y2={800}
            stroke="url(#goldFade)"
            strokeWidth="0.5"
          />
        ))}
      </motion.svg>

      {/* Wireframe torus / sphere object */}
      <motion.div
        className="absolute right-[-10%] md:right-[-4%] top-1/2 -translate-y-1/2 w-[420px] h-[420px] md:w-[560px] md:h-[560px] lg:w-[640px] lg:h-[640px]"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
      >
        <svg viewBox="-100 -100 200 200" className="w-full h-full">
          <defs>
            <radialGradient id="ringGold" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(38 38% 60%)" stopOpacity="0.0" />
              <stop offset="80%" stopColor="hsl(38 38% 60%)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(38 38% 60%)" stopOpacity="0.0" />
            </radialGradient>
          </defs>
          {/* Concentric ellipses at varying tilts to suggest torus */}
          {Array.from({ length: 14 }).map((_, i) => {
            const tilt = (i / 14) * 180;
            return (
              <ellipse
                key={i}
                cx="0"
                cy="0"
                rx="78"
                ry="28"
                fill="none"
                stroke="url(#ringGold)"
                strokeWidth="0.3"
                transform={`rotate(${tilt})`}
              />
            );
          })}
          {/* Outer thin ring */}
          <circle cx="0" cy="0" r="82" fill="none" stroke="hsl(38 38% 60%)" strokeOpacity="0.35" strokeWidth="0.4" />
          <circle cx="0" cy="0" r="60" fill="none" stroke="hsl(38 38% 60%)" strokeOpacity="0.18" strokeWidth="0.3" />
        </svg>
      </motion.div>

      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay" />
    </div>
  );
};

export default IsometricGrid;
