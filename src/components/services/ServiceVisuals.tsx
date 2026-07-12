/**
 * Service-detail architectural visual system.
 * - Per-service hero visuals (operating-system aesthetic)
 * - Shared Problem (system failure) and Strategy (transformation) visuals
 * - SystemApproachDiagram: renders the approach[] as a connected architecture
 * - OutcomeCard: each outcome rendered as an architectural artifact
 *
 * Premium consulting language. Continuous SMIL motion. Mode-adaptive via currentColor.
 * No glows, neon, particles-everywhere, or AI aesthetics.
 */

const VB = "0 0 240 160";
const frame = "w-full h-full";

const Grid = ({ w = 240, h = 160, opacity = 0.16 }: { w?: number; h?: number; opacity?: number }) => (
  <g opacity={opacity}>
    {Array.from({ length: Math.floor(w / 12) }).map((_, i) => (
      <line key={`gx${i}`} x1={i * 12} y1={0} x2={i * 12} y2={h} stroke="currentColor" strokeWidth="0.15" />
    ))}
    {Array.from({ length: Math.floor(h / 12) }).map((_, i) => (
      <line key={`gy${i}`} x1={0} y1={i * 12} x2={w} y2={i * 12} stroke="currentColor" strokeWidth="0.15" />
    ))}
  </g>
);

const PanelFrame = ({ children }: { label?: string; children: React.ReactNode }) => (
  <div className="relative w-full">
    <div className="aspect-[3/2] w-full text-foreground/80">
      {children}
    </div>
  </div>
);


/* ════════════════════════════════════════════════════════════
   HERO VISUALS — one per service
   ════════════════════════════════════════════════════════════ */

/* 01 Growth Strategy — disconnected channels converging into one strategic command layer */
const GrowthStrategyHero = () => (
  <svg viewBox={VB} className={frame} aria-hidden>
    <Grid />
    {/* command core */}
    <g>
      <rect x="100" y="60" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.75" />
      <rect x="108" y="68" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
      <text x="120" y="83" textAnchor="middle" fontSize="4" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.7" letterSpacing="0.5">STRATEGY</text>
      <circle cx="120" cy="88" r="1.4" fill="currentColor">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </g>
    {/* peripheral channels */}
    {[
      { x: 30, y: 30, l: "BRAND" },
      { x: 210, y: 30, l: "DEMAND" },
      { x: 30, y: 130, l: "CONTENT" },
      { x: 210, y: 130, l: "SALES" },
      { x: 30, y: 80, l: "PRODUCT" },
      { x: 210, y: 80, l: "MARKET" },
    ].map((c, i) => (
      <g key={i}>
        <rect x={c.x - 5} y={c.y - 5} width="10" height="10" fill="none" stroke="currentColor" strokeWidth="0.45" opacity="0.7" />
        <text x={c.x} y={c.y + (c.y < 80 ? -9 : 16)} textAnchor="middle" fontSize="3.6" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.55" letterSpacing="0.6">{c.l}</text>
        <line x1={c.x < 120 ? c.x + 5 : c.x - 5} y1={c.y} x2={c.x < 120 ? 100 : 140} y2={80} stroke="currentColor" strokeWidth="0.35" strokeDasharray="120" strokeDashoffset="120" opacity="0.55">
          <animate attributeName="stroke-dashoffset" values="120;0;0" keyTimes="0;0.5;1" dur="8s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
        </line>
        <circle r="1.3" fill="currentColor">
          <animateMotion dur="5s" repeatCount="indefinite" begin={`${1.5 + i * 0.6}s`} path={`M ${c.x} ${c.y} L ${c.x < 120 ? 100 : 140} 80`} />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="5s" repeatCount="indefinite" begin={`${1.5 + i * 0.6}s`} />
        </circle>
      </g>
    ))}
  </svg>
);

/* 02 Sales Systems — qualification gates → close */
const SalesSystemsHero = () => {
  const stages = [
    { x: 30, l: "LEAD" },
    { x: 75, l: "QUALIFY" },
    { x: 120, l: "DISCOVER" },
    { x: 165, l: "PROPOSE" },
    { x: 210, l: "CLOSE" },
  ];
  return (
    <svg viewBox={VB} className={frame} aria-hidden>
      <Grid />
      <line x1="30" y1="80" x2="210" y2="80" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
      {stages.map((s, i) => (
        <g key={i}>
          {/* gate */}
          <rect x={s.x - 8} y="60" width="16" height="40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
          <line x1={s.x} y1="60" x2={s.x} y2="100" stroke="currentColor" strokeWidth="0.3" opacity="0.4" strokeDasharray="2 2" />
          <text x={s.x} y="52" textAnchor="middle" fontSize="3.8" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.6" letterSpacing="0.6">{s.l}</text>
          <text x={s.x} y="115" textAnchor="middle" fontSize="3.4" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.45" letterSpacing="0.5">0{i + 1}</text>
        </g>
      ))}
      {/* prospects moving through */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle r="1.6" fill="currentColor">
            <animateMotion dur="14s" repeatCount="indefinite" begin={`${i * 3.2}s`} path="M 30 80 L 210 80" />
            <animate attributeName="opacity" values="0;1;1;0.8;0.6;0.4" keyTimes="0;0.05;0.4;0.6;0.8;1" dur="14s" repeatCount="indefinite" begin={`${i * 3.2}s`} />
          </circle>
        </g>
      ))}
      {/* qualification reject paths */}
      {[75, 120, 165].map((x, i) => (
        <line key={i} x1={x} y1="100" x2={x + 4} y2="130" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1.5 1.5" opacity="0.4" />
      ))}
      <text x="120" y="145" textAnchor="middle" fontSize="3.4" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.4" letterSpacing="0.5">DISQUALIFIED</text>
    </svg>
  );
};

/* 03 Performance Marketing — channels → attribution → budget allocation */
const PerformanceHero = () => {
  const channels = [
    { x: 30, y: 35, l: "PAID SOCIAL" },
    { x: 30, y: 65, l: "SEARCH" },
    { x: 30, y: 95, l: "DISPLAY" },
    { x: 30, y: 125, l: "RETARGETING" },
  ];
  return (
    <svg viewBox={VB} className={frame} aria-hidden>
      <Grid />
      {/* attribution layer */}
      <rect x="100" y="40" width="50" height="80" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      <text x="125" y="32" textAnchor="middle" fontSize="3.8" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.6" letterSpacing="0.6">ATTRIBUTION</text>
      {[55, 75, 95, 115].map((y) => (
        <line key={y} x1="100" y1={y - 5} x2="150" y2={y - 5} stroke="currentColor" strokeWidth="0.25" opacity="0.4" />
      ))}
      {/* optimization output */}
      <rect x="190" y="50" width="30" height="60" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
      <text x="205" y="42" textAnchor="middle" fontSize="3.8" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.6" letterSpacing="0.6">BUDGET</text>
      {/* allocation bars */}
      {[60, 75, 90, 100].map((y, i) => (
        <rect key={i} x="195" y={y} width={[18, 14, 10, 6][i]} height="3" fill="currentColor" opacity="0.65">
          <animate attributeName="width" values={`0;${[18, 14, 10, 6][i]}`} keyTimes="0;1" dur="3s" begin={`${1 + i * 0.3}s`} fill="freeze" />
        </rect>
      ))}
      {channels.map((c, i) => (
        <g key={i}>
          <text x={c.x - 2} y={c.y - 6} fontSize="3.4" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.55" letterSpacing="0.5">{c.l}</text>
          <circle cx={c.x} cy={c.y} r="2" fill="currentColor" opacity="0.75" />
          <line x1={c.x + 2} y1={c.y} x2="100" y2={50 + i * 20} stroke="currentColor" strokeWidth="0.3" opacity="0.45" />
          {[0, 1].map((k) => (
            <circle key={k} r="1.2" fill="currentColor">
              <animateMotion dur="6s" repeatCount="indefinite" begin={`${i * 0.6 + k * 3}s`} path={`M ${c.x} ${c.y} L 100 ${50 + i * 20}`} />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="6s" repeatCount="indefinite" begin={`${i * 0.6 + k * 3}s`} />
            </circle>
          ))}
        </g>
      ))}
      {/* attribution → budget signal */}
      {[0, 1].map((i) => (
        <circle key={i} r="1.4" fill="currentColor">
          <animateMotion dur="5s" repeatCount="indefinite" begin={`${2 + i * 2.5}s`} path="M 150 80 L 190 80" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="5s" repeatCount="indefinite" begin={`${2 + i * 2.5}s`} />
        </circle>
      ))}
    </svg>
  );
};

/* 04 B2B Lead Generation — outbound + inbound demand engines */
const LeadGenHero = () => (
  <svg viewBox={VB} className={frame} aria-hidden>
    <Grid />
    {/* outbound engine (top) */}
    <text x="55" y="22" fontSize="3.8" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.6" letterSpacing="0.6">OUTBOUND</text>
    {[{ x: 30, y: 38 }, { x: 55, y: 38 }, { x: 80, y: 38 }].map((n, i) => (
      <rect key={i} x={n.x - 3} y={n.y - 3} width="6" height="6" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.7" />
    ))}
    {/* inbound engine (bottom) */}
    <text x="55" y="148" fontSize="3.8" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.6" letterSpacing="0.6">INBOUND</text>
    {[{ x: 30, y: 130 }, { x: 55, y: 130 }, { x: 80, y: 130 }].map((n, i) => (
      <circle key={i} cx={n.x} cy={n.y} r="3" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.7" />
    ))}
    {/* ICP / qualification core */}
    <rect x="105" y="65" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="0.55" opacity="0.75" />
    <text x="120" y="83" textAnchor="middle" fontSize="3.8" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.7" letterSpacing="0.5">ICP</text>
    {/* pipeline output */}
    <text x="195" y="50" textAnchor="middle" fontSize="3.8" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.6" letterSpacing="0.6">PIPELINE</text>
    {[60, 75, 90, 105].map((y, i) => (
      <g key={i}>
        <line x1="175" y1={y} x2="215" y2={y} stroke="currentColor" strokeWidth="0.3" opacity="0.45" />
        <rect x="212" y={y - 2} width="4" height="4" fill="currentColor" opacity="0.7">
          <animate attributeName="opacity" values="0.3;0.95;0.3" dur="3s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
        </rect>
      </g>
    ))}
    {/* flows: outbound → ICP, inbound → ICP, ICP → pipeline */}
    {[30, 55, 80].map((x, i) => (
      <g key={`o${i}`}>
        <line x1={x} y1="44" x2="105" y2="80" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
        <circle r="1.2" fill="currentColor">
          <animateMotion dur="5.5s" repeatCount="indefinite" begin={`${i * 0.7}s`} path={`M ${x} 44 L 105 80`} />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="5.5s" repeatCount="indefinite" begin={`${i * 0.7}s`} />
        </circle>
      </g>
    ))}
    {[30, 55, 80].map((x, i) => (
      <g key={`i${i}`}>
        <line x1={x} y1="124" x2="105" y2="85" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
        <circle r="1.2" fill="currentColor">
          <animateMotion dur="6s" repeatCount="indefinite" begin={`${i * 0.8 + 1.5}s`} path={`M ${x} 124 L 105 85`} />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="6s" repeatCount="indefinite" begin={`${i * 0.8 + 1.5}s`} />
        </circle>
      </g>
    ))}
    {[60, 75, 90, 105].map((y, i) => (
      <circle key={`p${i}`} r="1.3" fill="currentColor">
        <animateMotion dur="4.5s" repeatCount="indefinite" begin={`${1 + i * 1}s`} path={`M 135 80 L 175 ${y}`} />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="4.5s" repeatCount="indefinite" begin={`${1 + i * 1}s`} />
      </circle>
    ))}
  </svg>
);

/* 05 LinkedIn — content → authority → inbound */
const LinkedInHero = () => (
  <svg viewBox={VB} className={frame} aria-hidden>
    <Grid />
    {/* content production layer */}
    <text x="30" y="22" fontSize="3.8" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.6" letterSpacing="0.6">CONTENT</text>
    {[35, 55, 75, 95, 115, 135].map((y, i) => (
      <g key={i}>
        <rect x="28" y={y - 3} width="22" height="5" fill="none" stroke="currentColor" strokeWidth="0.35" opacity="0.55">
          <animate attributeName="opacity" values="0;0.7;0.7" keyTimes="0;0.5;1" dur="9s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
        </rect>
      </g>
    ))}
    {/* authority accumulation */}
    <text x="120" y="22" textAnchor="middle" fontSize="3.8" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.6" letterSpacing="0.6">AUTHORITY</text>
    {/* compounding circles */}
    {[1, 2, 3, 4].map((r, i) => (
      <circle key={i} cx="120" cy="85" r={r * 9} fill="none" stroke="currentColor" strokeWidth="0.35" opacity={0.55 - i * 0.08}>
        <animate attributeName="r" values={`${r * 9 - 2};${r * 9 + 2};${r * 9 - 2}`} dur={`${6 + i}s`} repeatCount="indefinite" />
      </circle>
    ))}
    <circle cx="120" cy="85" r="3" fill="currentColor">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="2.6s" repeatCount="indefinite" />
    </circle>
    {/* content → authority signals */}
    {[35, 55, 75, 95, 115, 135].map((y, i) => (
      <circle key={`c${i}`} r="1.2" fill="currentColor">
        <animateMotion dur="6s" repeatCount="indefinite" begin={`${i * 0.7}s`} path={`M 50 ${y} L 120 85`} />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="6s" repeatCount="indefinite" begin={`${i * 0.7}s`} />
      </circle>
    ))}
    {/* inbound conversations */}
    <text x="210" y="22" textAnchor="end" fontSize="3.8" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.6" letterSpacing="0.6">INBOUND</text>
    {[45, 70, 95, 120].map((y, i) => (
      <g key={`in${i}`}>
        <line x1="160" y1="85" x2="210" y2={y} stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
        <circle cx="210" cy={y} r="2" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.7" />
        <circle r="1.3" fill="currentColor">
          <animateMotion dur="5s" repeatCount="indefinite" begin={`${2 + i * 1.1}s`} path={`M 160 85 L 210 ${y}`} />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="5s" repeatCount="indefinite" begin={`${2 + i * 1.1}s`} />
        </circle>
      </g>
    ))}
  </svg>
);

/* 06 AI & Automation — manual → routed intelligent workflows */
const AutomationHero = () => {
  const tasks = [22, 42, 62, 82, 102, 122];
  return (
    <svg viewBox={VB} className={frame} aria-hidden>
      <Grid />
      <text x="30" y="14" fontSize="3.8" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.6" letterSpacing="0.6">INPUTS</text>
      {tasks.map((y, i) => (
        <g key={i}>
          <rect x="28" y={y - 2} width="14" height="4" fill="none" stroke="currentColor" strokeWidth="0.35" opacity="0.65" />
          <line x1="42" y1={y} x2="95" y2="80" stroke="currentColor" strokeWidth="0.25" opacity="0.35" />
        </g>
      ))}
      {/* router */}
      <polygon points="95,55 125,80 95,105 65,80" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.75" />
      <text x="95" y="82" textAnchor="middle" fontSize="3.6" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.7" letterSpacing="0.5">ROUTE</text>
      {/* workflows */}
      <text x="210" y="14" textAnchor="end" fontSize="3.8" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.6" letterSpacing="0.6">WORKFLOWS</text>
      {[
        { y: 35, l: "NURTURE" },
        { y: 65, l: "QUALIFY" },
        { y: 95, l: "ROUTE" },
        { y: 125, l: "REPORT" },
      ].map((w, i) => (
        <g key={i}>
          <rect x="155" y={w.y - 6} width="55" height="12" fill="none" stroke="currentColor" strokeWidth="0.45" opacity="0.7" />
          <text x="160" y={w.y + 1} fontSize="3.4" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.6" letterSpacing="0.5">{w.l}</text>
          <line x1="125" y1="80" x2="155" y2={w.y} stroke="currentColor" strokeWidth="0.3" opacity="0.45" />
          {/* progress bar inside workflow */}
          <rect x="190" y={w.y - 1} width="16" height="2" fill="currentColor" opacity="0.25" />
          <rect x="190" y={w.y - 1} width="0" height="2" fill="currentColor" opacity="0.85">
            <animate attributeName="width" values="0;16;16;0" keyTimes="0;0.4;0.85;1" dur="6s" begin={`${i * 1.2}s`} repeatCount="indefinite" />
          </rect>
        </g>
      ))}
      {/* input particles */}
      {tasks.map((y, i) => (
        <circle key={`t${i}`} r="1.2" fill="currentColor">
          <animateMotion dur="5s" repeatCount="indefinite" begin={`${i * 0.5}s`} path={`M 42 ${y} L 95 80`} />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="5s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
        </circle>
      ))}
      {/* routed to workflows */}
      {[35, 65, 95, 125].map((y, i) => (
        <circle key={`w${i}`} r="1.4" fill="currentColor">
          <animateMotion dur="4s" repeatCount="indefinite" begin={`${1.5 + i * 1}s`} path={`M 125 80 L 155 ${y}`} />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="4s" repeatCount="indefinite" begin={`${1.5 + i * 1}s`} />
        </circle>
      ))}
    </svg>
  );
};

/* 07 SEO — compounding authority + content architecture */
const SEOHero = () => (
  <svg viewBox={VB} className={frame} aria-hidden>
    <Grid />
    {/* technical foundation */}
    <text x="30" y="140" fontSize="3.6" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.55" letterSpacing="0.6">TECHNICAL FOUNDATION</text>
    <line x1="30" y1="125" x2="210" y2="125" stroke="currentColor" strokeWidth="0.5" opacity="0.55" />
    {[40, 70, 100, 130, 160, 190].map((x, i) => (
      <rect key={i} x={x - 2} y="120" width="4" height="5" fill="currentColor" opacity="0.55" />
    ))}
    {/* content tree */}
    {[
      { x: 60, y: 100, p: 120 },
      { x: 120, y: 100, p: 120 },
      { x: 180, y: 100, p: 120 },
    ].map((n, i) => (
      <g key={`p${i}`}>
        <line x1={n.x} y1={n.y} x2={n.x} y2={n.p - 2} stroke="currentColor" strokeWidth="0.3" opacity="0.45" />
        <rect x={n.x - 5} y={n.y - 4} width="10" height="8" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.7" />
        {/* child pages */}
        {[n.x - 18, n.x, n.x + 18].map((cx, j) => (
          <g key={j}>
            <line x1={n.x} y1={n.y - 4} x2={cx} y2={75} stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
            <rect x={cx - 3} y="70" width="6" height="6" fill="none" stroke="currentColor" strokeWidth="0.35" opacity="0.6">
              <animate attributeName="opacity" values="0;0.7;0.7" keyTimes="0;0.5;1" dur="9s" begin={`${i * 0.6 + j * 0.3}s`} repeatCount="indefinite" />
            </rect>
          </g>
        ))}
      </g>
    ))}
    {/* visibility growth curve over time */}
    <text x="30" y="22" fontSize="3.6" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.55" letterSpacing="0.6">COMPOUNDING VISIBILITY</text>
    <path d="M30 55 Q 90 50, 130 38 T 210 18" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.85" strokeDasharray="280" strokeDashoffset="280">
      <animate attributeName="stroke-dashoffset" values="280;0;0;280" keyTimes="0;0.45;0.9;1" dur="10s" repeatCount="indefinite" />
    </path>
    {[[90, 50], [150, 30], [200, 20]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={1.6 + i * 0.4} fill="currentColor">
        <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.5;1" dur="10s" begin={`${i * 0.6 + 1}s`} repeatCount="indefinite" />
      </circle>
    ))}
  </svg>
);

/* 08 Digital Products — validate → launch → optimize → scale */
const DigitalProductsHero = () => {
  const stages = [
    { x: 30, l: "VALIDATE" },
    { x: 80, l: "POSITION" },
    { x: 130, l: "LAUNCH" },
    { x: 180, l: "OPTIMIZE" },
    { x: 210, l: "SCALE" },
  ];
  return (
    <svg viewBox={VB} className={frame} aria-hidden>
      <Grid />
      {/* path */}
      <path d="M 30 100 L 80 100 L 130 80 L 180 60 L 210 35" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.55" strokeDasharray="240" strokeDashoffset="240">
        <animate attributeName="stroke-dashoffset" values="240;0;0;240" keyTimes="0;0.45;0.9;1" dur="10s" repeatCount="indefinite" />
      </path>
      {stages.map((s, i) => {
        const y = i === 0 || i === 1 ? 100 : i === 2 ? 80 : i === 3 ? 60 : 35;
        return (
          <g key={i}>
            <rect x={s.x - 5} y={y - 5} width="10" height="10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.75" />
            <circle cx={s.x} cy={y} r="1.5" fill="currentColor">
              <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.5;1" dur="10s" begin={`${i * 0.6 + 0.5}s`} repeatCount="indefinite" />
            </circle>
            <text x={s.x} y={y + 16} textAnchor="middle" fontSize="3.4" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.55" letterSpacing="0.5">{s.l}</text>
          </g>
        );
      })}
      {/* revenue bars rising under each stage */}
      {stages.map((s, i) => (
        <rect key={`b${i}`} x={s.x - 3} y={140 - i * 3} width="6" height={3 + i * 3} fill="currentColor" opacity="0.45">
          <animate attributeName="opacity" values="0;0.6;0.6" keyTimes="0;0.5;1" dur="10s" begin={`${i * 0.6 + 1}s`} repeatCount="indefinite" />
        </rect>
      ))}
      {/* signal traveling path */}
      <circle r="1.7" fill="currentColor">
        <animateMotion dur="10s" repeatCount="indefinite" path="M 30 100 L 80 100 L 130 80 L 180 60 L 210 35" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="10s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};

const heroMap: Record<string, { label: string; Vis: React.FC }> = {
  "growth-strategy": { label: "Strategic Command Layer", Vis: GrowthStrategyHero },
  "sales-systems": { label: "Revenue Pipeline Engineering", Vis: SalesSystemsHero },
  "performance-marketing": { label: "Marketing Operating System", Vis: PerformanceHero },
  "lead-generation": { label: "Acquisition Infrastructure", Vis: LeadGenHero },
  "linkedin": { label: "Authority Operating System", Vis: LinkedInHero },
  "ai-automation": { label: "Operational Leverage", Vis: AutomationHero },
  "seo": { label: "Organic Growth Engine", Vis: SEOHero },
  "digital-products": { label: "Digital Revenue Infrastructure", Vis: DigitalProductsHero },
};

export const ServiceHero = ({ slug }: { slug: string }) => {
  const entry = heroMap[slug];
  if (!entry) return null;
  const { label, Vis } = entry;
  return (
    <PanelFrame label={label}>
      <Vis />
    </PanelFrame>
  );
};

/* ════════════════════════════════════════════════════════════
   PROBLEM — system failure visualization
   ════════════════════════════════════════════════════════════ */

export const ProblemSystemFailure = () => (
  <PanelFrame label="System Without Architecture">
    <svg viewBox={VB} className={frame} aria-hidden>
      <Grid opacity={0.12} />
      {/* three broken pathways */}
      {[
        { y: 45, d: "M 25 45 L 80 45", breakX: 80, resumeX: 110, resumeD: "M 110 45 L 150 45", deadEnd: true },
        { y: 80, d: "M 25 80 L 120 80", breakX: 120, resumeX: 0, resumeD: "", deadEnd: true },
        { y: 115, d: "M 25 115 L 70 115", breakX: 70, resumeX: 130, resumeD: "M 130 115 L 215 115", deadEnd: false },
      ].map((row, i) => (
        <g key={i}>
          {/* origin */}
          <circle cx="25" cy={row.y} r="2.5" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
          <path d={row.d} fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
          {/* break marker */}
          <g transform={`translate(${row.breakX} ${row.y})`}>
            <line x1="-3" y1="-3" x2="3" y2="3" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
            <line x1="3" y1="-3" x2="-3" y2="3" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
          </g>
          {row.resumeD && <path d={row.resumeD} fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" strokeDasharray="2 2" />}
          {row.deadEnd && !row.resumeD && (
            <text x={row.breakX + 8} y={row.y + 1.5} fontSize="3.4" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.5" letterSpacing="0.5">DEAD END</text>
          )}
          {/* signal that drops at break */}
          <circle r="1.4" fill="currentColor">
            <animateMotion dur="5s" repeatCount="indefinite" begin={`${i * 0.7}s`} path={row.d} />
            <animate attributeName="opacity" values="0;1;1;0.4;0" keyTimes="0;0.1;0.7;0.85;1" dur="5s" repeatCount="indefinite" begin={`${i * 0.7}s`} />
          </circle>
          {/* leak marker */}
          <text x={row.breakX} y={row.y - 6} textAnchor="middle" fontSize="3" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.45" letterSpacing="0.5">LEAK</text>
        </g>
      ))}
      {/* sidebar labels */}
      <text x="215" y="20" textAnchor="end" fontSize="3.6" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.5" letterSpacing="0.6">FRAGMENTED FLOW</text>
    </svg>
  </PanelFrame>
);

/* ════════════════════════════════════════════════════════════
   STRATEGY — chaos resolving into architecture
   ════════════════════════════════════════════════════════════ */

export const StrategyTransformation = () => {
  const left = [
    [40, 35], [60, 55], [35, 80], [70, 105], [50, 130], [25, 50], [65, 130],
  ];
  const right = [
    [165, 35], [195, 55], [165, 80], [195, 105], [165, 130],
  ];
  return (
    <PanelFrame label="From Disorder to Architecture">
      <svg viewBox={VB} className={frame} aria-hidden>
        <Grid opacity={0.12} />
        {/* divider */}
        <line x1="120" y1="20" x2="120" y2="140" stroke="currentColor" strokeWidth="0.3" opacity="0.4" strokeDasharray="2 3" />
        <text x="40" y="18" fontSize="3.6" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.55" letterSpacing="0.6">CURRENT STATE</text>
        <text x="200" y="18" textAnchor="end" fontSize="3.6" fontFamily="DM Sans, sans-serif" fill="currentColor" opacity="0.55" letterSpacing="0.6">ENGINEERED STATE</text>
        {/* left: chaotic scattered nodes with overlapping random lines */}
        {left.map(([x, y], i) => (
          <g key={`l${i}`}>
            <circle cx={x} cy={y} r="2" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.6" />
          </g>
        ))}
        {[
          "M 25 50 L 70 105", "M 40 35 L 65 130", "M 60 55 L 35 80", "M 50 130 L 70 105", "M 35 80 L 65 130",
        ].map((d, i) => (
          <path key={`lp${i}`} d={d} fill="none" stroke="currentColor" strokeWidth="0.25" opacity="0.4" />
        ))}
        {/* arrow */}
        <line x1="100" y1="80" x2="140" y2="80" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        <polyline points="135,76 140,80 135,84" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        {/* right: ordered architecture */}
        {right.map(([x, y], i) => (
          <rect key={`r${i}`} x={x - 4} y={y - 4} width="8" height="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.75">
            <animate attributeName="opacity" values="0;0.85;0.85" keyTimes="0;0.5;1" dur="7s" begin={`${i * 0.4 + 1}s`} repeatCount="indefinite" />
          </rect>
        ))}
        {[
          "M 165 35 L 165 80", "M 165 80 L 165 130", "M 165 35 L 195 55", "M 195 55 L 195 105", "M 165 80 L 195 105", "M 165 130 L 195 105",
        ].map((d, i) => (
          <path key={`rp${i}`} d={d} fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.65" strokeDasharray="80" strokeDashoffset="80">
            <animate attributeName="stroke-dashoffset" values="80;0;0" keyTimes="0;0.5;1" dur="7s" begin={`${i * 0.3 + 1.5}s`} repeatCount="indefinite" />
          </path>
        ))}
        {[
          "M 165 35 L 165 80 L 195 105", "M 165 130 L 195 105 L 195 55",
        ].map((p, i) => (
          <circle key={`rc${i}`} r="1.4" fill="currentColor">
            <animateMotion dur="6s" repeatCount="indefinite" begin={`${3 + i * 1.5}s`} path={p} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="6s" repeatCount="indefinite" begin={`${3 + i * 1.5}s`} />
          </circle>
        ))}
      </svg>
    </PanelFrame>
  );
};

/* ════════════════════════════════════════════════════════════
   SYSTEM APPROACH DIAGRAM — connected architecture
   ════════════════════════════════════════════════════════════ */

export const SystemApproachDiagram = ({ items }: { items: string[] }) => {
  return (
    <div className="relative w-full">
      <div className="flex items-baseline justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="w-4 h-px bg-gold/60" />
          <span className="text-[10px] tracking-[0.32em] uppercase text-gold/75 font-medium">
            System Architecture
          </span>
        </div>
        <span className="text-[9px] tracking-[0.28em] uppercase text-muted-foreground/50 font-mono">
          {items.length} Modules · Interconnected
        </span>
      </div>
      <div className="relative px-1 py-2 md:px-2 md:py-3">
        {/* connecting spine */}
        <div className="absolute left-[34px] md:left-[46px] top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" aria-hidden />
        <ul className="space-y-5 md:space-y-6">
          {items.map((item, i) => (
            <li key={i} className="relative grid grid-cols-[40px_1fr] md:grid-cols-[52px_1fr] gap-4 md:gap-6 items-start group">
              {/* node */}
              <div className="relative flex items-start justify-center pt-1">
                <div className="absolute inset-x-0 top-2 flex items-center justify-center">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-md border border-gold/30 bg-background flex items-center justify-center transition-colors duration-500 group-hover:border-gold/60">
                    <span className="text-[10px] font-mono tracking-tight text-gold/85">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                </div>
              </div>
              {/* module body */}
              <div className="border-l border-gold/10 pl-5 md:pl-6 py-1.5 transition-colors duration-500 group-hover:border-gold/30">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[9px] tracking-[0.28em] uppercase text-gold/55 font-medium">MODULE</span>
                  <span className="h-px flex-1 bg-gold/10" />
                  <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/40 font-mono">ACTIVE</span>
                </div>
                <p className="text-foreground/85 text-[14px] md:text-[14.5px] leading-[1.7] font-light">
                  {item}
                </p>
                {/* lateral connectors to next module */}
                {i < items.length - 1 && (
                  <div className="mt-3 flex items-center gap-1.5 opacity-50">
                    <span className="h-px w-6 bg-gold/30" />
                    <span className="w-1 h-1 rounded-full bg-gold/40" />
                    <span className="text-[9px] tracking-[0.22em] uppercase text-muted-foreground/40 font-mono">feeds into 0{i + 2}</span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════
   OUTCOME CARDS — each outcome as an architectural artifact
   ════════════════════════════════════════════════════════════ */

/* Mini outcome visuals, lightweight & continuous */
const OutcomePipeline = () => (
  <svg viewBox="0 0 80 40" className="w-full h-full" aria-hidden>
    {[10, 22, 34].map((y, i) => (
      <g key={i}>
        <line x1="6" y1={y} x2="74" y2={y} stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
        <circle r="1.2" fill="currentColor">
          <animateMotion dur="5s" repeatCount="indefinite" begin={`${i * 0.6}s`} path={`M 6 ${y} L 74 ${y}`} />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="5s" repeatCount="indefinite" begin={`${i * 0.6}s`} />
        </circle>
      </g>
    ))}
  </svg>
);
const OutcomeGrowth = () => (
  <svg viewBox="0 0 80 40" className="w-full h-full" aria-hidden>
    <path d="M 6 32 Q 30 28, 45 18 T 74 6" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.8" strokeDasharray="100" strokeDashoffset="100">
      <animate attributeName="stroke-dashoffset" values="100;0;0;100" keyTimes="0;0.4;0.9;1" dur="7s" repeatCount="indefinite" />
    </path>
    {[[30, 28], [50, 16], [70, 8]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="1.4" fill="currentColor" opacity="0.85" />
    ))}
  </svg>
);
const OutcomeNetwork = () => (
  <svg viewBox="0 0 80 40" className="w-full h-full" aria-hidden>
    {[[15, 10], [40, 8], [65, 14], [22, 30], [50, 32], [70, 28]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="1.6" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.7">
        <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
      </circle>
    ))}
    {["M 15 10 L 40 8", "M 40 8 L 65 14", "M 22 30 L 50 32", "M 50 32 L 70 28", "M 15 10 L 22 30", "M 65 14 L 70 28", "M 40 8 L 50 32"].map((d, i) => (
      <path key={i} d={d} stroke="currentColor" strokeWidth="0.3" opacity="0.5" fill="none" />
    ))}
  </svg>
);
const OutcomeBars = () => (
  <svg viewBox="0 0 80 40" className="w-full h-full" aria-hidden>
    {[8, 18, 28, 38, 48, 58, 68].map((x, i) => (
      <rect key={i} x={x - 2} y={34 - (4 + i * 3)} width="4" height={4 + i * 3} fill="currentColor" opacity="0.65">
        <animate attributeName="height" values={`0;${4 + i * 3};${4 + i * 3}`} keyTimes="0;0.6;1" dur="5s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
        <animate attributeName="y" values={`34;${34 - (4 + i * 3)};${34 - (4 + i * 3)}`} keyTimes="0;0.6;1" dur="5s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
      </rect>
    ))}
  </svg>
);
const OutcomeRings = () => (
  <svg viewBox="0 0 80 40" className="w-full h-full" aria-hidden>
    {[6, 11, 16].map((r, i) => (
      <circle key={i} cx="40" cy="20" r={r} fill="none" stroke="currentColor" strokeWidth="0.4" opacity={0.6 - i * 0.12}>
        <animate attributeName="r" values={`${r - 1};${r + 1};${r - 1}`} dur={`${4 + i}s`} repeatCount="indefinite" />
      </circle>
    ))}
    <circle cx="40" cy="20" r="1.6" fill="currentColor">
      <animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" repeatCount="indefinite" />
    </circle>
  </svg>
);
const OutcomeFlow = () => (
  <svg viewBox="0 0 80 40" className="w-full h-full" aria-hidden>
    <rect x="8" y="14" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="0.45" opacity="0.7" />
    <rect x="34" y="14" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="0.45" opacity="0.7" />
    <rect x="60" y="14" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="0.45" opacity="0.7" />
    <line x1="20" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
    <line x1="46" y1="20" x2="60" y2="20" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
    {[0, 1].map((k) => (
      <circle key={k} r="1.2" fill="currentColor">
        <animateMotion dur="5s" repeatCount="indefinite" begin={`${k * 2.5}s`} path="M 20 20 L 60 20" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="5s" repeatCount="indefinite" begin={`${k * 2.5}s`} />
      </circle>
    ))}
  </svg>
);

const outcomeVisuals = [OutcomePipeline, OutcomeGrowth, OutcomeNetwork, OutcomeBars, OutcomeRings, OutcomeFlow];

export const OutcomeArchitecture = ({ items }: { items: string[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
    {items.map((item, i) => {
      const Vis = outcomeVisuals[i % outcomeVisuals.length];
      return (
        <div
          key={i}
          className="group relative rounded-xl border border-gold/15 bg-card/40 backdrop-blur-sm p-5 md:p-6 hover:border-gold/30 transition-colors duration-500 overflow-hidden"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <span className="text-[10px] tracking-[0.28em] uppercase text-gold/65 font-medium">Outcome 0{i + 1}</span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/45 font-mono">ENGINEERED</span>
          </div>
          <div className="h-14 md:h-16 mb-5 text-foreground/70">
            <Vis />
          </div>
          <p className="text-foreground/85 text-[13.5px] md:text-[14px] leading-[1.7] font-light">
            {item}
          </p>
        </div>
      );
    })}
  </div>
);
