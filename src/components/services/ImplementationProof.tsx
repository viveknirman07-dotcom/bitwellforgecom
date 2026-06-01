import ScrollReveal from "@/components/ScrollReveal";

type ProofType =
  | "growth-strategy"
  | "sales-systems"
  | "performance-marketing"
  | "lead-generation"
  | "linkedin"
  | "ai-automation"
  | "seo"
  | "digital-products";

const captions: Record<ProofType, { eyebrow: string; title: string; note: string }> = {
  "growth-strategy": {
    eyebrow: "Operational Blueprint",
    title: "Channel architecture map",
    note: "Abstracted from a strategic engagement diagnostic.",
  },
  "sales-systems": {
    eyebrow: "Pipeline Logic",
    title: "Qualification pipeline schema",
    note: "Stages, scoring, and routing of a structured sales system.",
  },
  "performance-marketing": {
    eyebrow: "Attribution Layer",
    title: "Multi-touch reporting layout",
    note: "Abstracted dashboard structure for revenue attribution.",
  },
  "lead-generation": {
    eyebrow: "Outbound Engine",
    title: "Sequence and routing diagram",
    note: "Outbound cadence with intent-based branching.",
  },
  "linkedin": {
    eyebrow: "Positioning Stack",
    title: "Content pillar architecture",
    note: "Recurring formats organised around authority signals.",
  },
  "ai-automation": {
    eyebrow: "Workflow Layer",
    title: "Automation routing schema",
    note: "Intelligent task routing across CRM and operational systems.",
  },
  "seo": {
    eyebrow: "Authority Graph",
    title: "Topical cluster architecture",
    note: "Internal linking and authority distribution model.",
  },
  "digital-products": {
    eyebrow: "Launch System",
    title: "Product launch pipeline",
    note: "Validation, launch, and optimisation stages of a digital product.",
  },
};

const stroke = "hsl(var(--foreground) / 0.55)";
const soft = "hsl(var(--foreground) / 0.22)";
const accent = "hsl(var(--eyebrow-color))";

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div className="relative aspect-[16/9] w-full rounded-xl border border-[hsl(var(--foreground)/0.12)] bg-[hsl(var(--foreground)/0.025)] overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.35]"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--foreground)/0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
    <div className="relative w-full h-full p-6 md:p-8">{children}</div>
  </div>
);

const ChannelMap = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full" aria-hidden>
    {["Positioning", "Acquisition", "Conversion", "Retention"].map((l, i) => {
      const x = 40 + i * 110;
      return (
        <g key={l}>
          <rect x={x - 36} y={70} width={72} height={32} rx={4} fill="none" stroke={stroke} strokeWidth="0.9" />
          <text x={x} y={90} textAnchor="middle" fontSize="9" fill={stroke}>{l}</text>
          {i < 3 && <line x1={x + 36} y1={86} x2={x + 74} y2={86} stroke={soft} strokeDasharray="3 4" />}
        </g>
      );
    })}
    <line x1={40} y1={30} x2={360} y2={30} stroke={accent} strokeWidth="0.8" />
    <text x={40} y={22} fontSize="8.5" fill={accent} letterSpacing="2">REVENUE INFRASTRUCTURE</text>
    <line x1={40} y1={150} x2={360} y2={150} stroke={soft} strokeDasharray="2 4" />
    <text x={40} y={168} fontSize="8" fill={soft}>Audit · Architect · Deploy · Refine</text>
  </svg>
);

const QualificationPipeline = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full" aria-hidden>
    {["Inbound", "Qualified", "Discovery", "Proposal", "Close"].map((l, i) => {
      const y = 24 + i * 32;
      return (
        <g key={l}>
          <rect x={30} y={y} width={140} height={22} rx={3} fill="none" stroke={stroke} strokeWidth="0.9" />
          <text x={40} y={y + 14} fontSize="9" fill={stroke}>{l}</text>
          <text x={160} y={y + 14} fontSize="8.5" fill={accent} textAnchor="end">{100 - i * 18}%</text>
          {i < 4 && <line x1={100} y1={y + 22} x2={100} y2={y + 32} stroke={soft} />}
        </g>
      );
    })}
    <g>
      <rect x={210} y={24} width={160} height={150} rx={4} fill="none" stroke={soft} />
      <text x={220} y={40} fontSize="8.5" fill={accent} letterSpacing="2">ROUTING LOGIC</text>
      {[60, 80, 100, 120, 140].map((y, i) => (
        <g key={y}>
          <circle cx={222} cy={y} r="2" fill={stroke} />
          <line x1={228} y1={y} x2={360} y2={y} stroke={soft} strokeDasharray="2 3" />
          <text x={232} y={y + 3} fontSize="8" fill={stroke}>rule_{String(i + 1).padStart(2, "0")}</text>
        </g>
      ))}
    </g>
  </svg>
);

const AttributionDashboard = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full" aria-hidden>
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={20 + i * 95} y={20} width={80} height={48} rx={3} fill="none" stroke={stroke} strokeWidth="0.9" />
    ))}
    {["CAC", "LTV", "ROAS", "Payback"].map((l, i) => (
      <text key={l} x={60 + i * 95} y={40} textAnchor="middle" fontSize="8.5" fill={accent} letterSpacing="2">{l}</text>
    ))}
    {["1.42×", "6.8×", "3.1×", "84d"].map((v, i) => (
      <text key={v} x={60 + i * 95} y={58} textAnchor="middle" fontSize="14" fill={stroke} fontFamily="Playfair Display, serif">{v}</text>
    ))}
    <rect x={20} y={84} width={360} height={92} rx={3} fill="none" stroke={soft} />
    <polyline
      points="30,160 70,148 110,140 150,132 190,120 230,110 270,98 310,86 350,78 380,72"
      fill="none"
      stroke={accent}
      strokeWidth="1.4"
    />
    {[30, 70, 110, 150, 190, 230, 270, 310, 350, 380].map((x, i) => (
      <circle key={x} cx={x} cy={[160, 148, 140, 132, 120, 110, 98, 86, 78, 72][i]} r="1.6" fill={accent} />
    ))}
  </svg>
);

const OutboundSequence = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full" aria-hidden>
    {["Day 0", "Day 2", "Day 5", "Day 9", "Day 14"].map((l, i) => {
      const x = 40 + i * 80;
      return (
        <g key={l}>
          <circle cx={x} cy={70} r="10" fill="none" stroke={stroke} strokeWidth="0.9" />
          <text x={x} y={74} textAnchor="middle" fontSize="9" fill={stroke}>{i + 1}</text>
          <text x={x} y={50} textAnchor="middle" fontSize="8" fill={accent} letterSpacing="2">{l}</text>
          {i < 4 && <line x1={x + 10} y1={70} x2={x + 70} y2={70} stroke={soft} strokeDasharray="3 4" />}
        </g>
      );
    })}
    {[
      ["Email", "LinkedIn", "Email", "LinkedIn", "Trigger"],
    ][0].map((l, i) => (
      <text key={i} x={40 + i * 80} y={100} textAnchor="middle" fontSize="8" fill={stroke}>{l}</text>
    ))}
    <line x1={40} y1={130} x2={360} y2={130} stroke={soft} strokeDasharray="2 4" />
    <text x={40} y={148} fontSize="8.5" fill={accent} letterSpacing="2">INTENT BRANCH</text>
    <path d="M40 160 L200 160 L200 178 L360 178" fill="none" stroke={accent} strokeWidth="0.9" />
  </svg>
);

const ContentPillars = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full" aria-hidden>
    <circle cx={200} cy={100} r="22" fill="none" stroke={accent} strokeWidth="1.2" />
    <text x={200} y={104} textAnchor="middle" fontSize="9" fill={accent}>Authority</text>
    {[
      { x: 80, y: 50, l: "POV Essays" },
      { x: 320, y: 50, l: "Frameworks" },
      { x: 80, y: 160, l: "Case Notes" },
      { x: 320, y: 160, l: "Operator Insights" },
    ].map((n) => (
      <g key={n.l}>
        <line x1={200} y1={100} x2={n.x} y2={n.y} stroke={soft} strokeDasharray="3 4" />
        <rect x={n.x - 50} y={n.y - 14} width={100} height={28} rx={3} fill="none" stroke={stroke} strokeWidth="0.9" />
        <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="9" fill={stroke}>{n.l}</text>
      </g>
    ))}
  </svg>
);

const AutomationRouting = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full" aria-hidden>
    {[
      { x: 30, y: 90, l: "Trigger" },
      { x: 140, y: 90, l: "AI Score" },
      { x: 260, y: 40, l: "Nurture" },
      { x: 260, y: 140, l: "Sales" },
      { x: 360, y: 90, l: "CRM" },
    ].map((n) => (
      <g key={n.l}>
        <rect x={n.x - 32} y={n.y - 14} width={64} height={28} rx={3} fill="none" stroke={stroke} strokeWidth="0.9" />
        <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="9" fill={stroke}>{n.l}</text>
      </g>
    ))}
    <line x1={62} y1={90} x2={108} y2={90} stroke={soft} strokeDasharray="3 3" />
    <polygon points="172,90 188,76 204,90 188,104" fill="none" stroke={accent} strokeWidth="0.9" />
    <line x1={204} y1={86} x2={228} y2={50} stroke={soft} strokeDasharray="3 3" />
    <line x1={204} y1={94} x2={228} y2={130} stroke={soft} strokeDasharray="3 3" />
    <line x1={292} y1={40} x2={328} y2={82} stroke={soft} strokeDasharray="3 3" />
    <line x1={292} y1={140} x2={328} y2={98} stroke={soft} strokeDasharray="3 3" />
    <text x={30} y={170} fontSize="8" fill={accent} letterSpacing="2">EVENT-DRIVEN ROUTING</text>
  </svg>
);

const TopicalClusters = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full" aria-hidden>
    {[
      { cx: 100, cy: 100, r: 26, l: "Pillar A" },
      { cx: 220, cy: 100, r: 26, l: "Pillar B" },
      { cx: 340, cy: 100, r: 26, l: "Pillar C" },
    ].map((p, pi) => (
      <g key={p.l}>
        <circle cx={p.cx} cy={p.cy} r={p.r} fill="none" stroke={accent} strokeWidth="1" />
        <text x={p.cx} y={p.cy + 3} textAnchor="middle" fontSize="9" fill={accent}>{p.l}</text>
        {[0, 1, 2, 3, 4].map((i) => {
          const a = (i / 5) * Math.PI * 2 + pi;
          const x = p.cx + Math.cos(a) * 58;
          const y = p.cy + Math.sin(a) * 58;
          return (
            <g key={i}>
              <line x1={p.cx + Math.cos(a) * p.r} y1={p.cy + Math.sin(a) * p.r} x2={x} y2={y} stroke={soft} />
              <circle cx={x} cy={y} r="3" fill="none" stroke={stroke} strokeWidth="0.8" />
            </g>
          );
        })}
      </g>
    ))}
  </svg>
);

const LaunchPipeline = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full" aria-hidden>
    {["Validate", "Position", "Build", "Launch", "Optimize"].map((l, i) => {
      const x = 30 + i * 75;
      return (
        <g key={l}>
          <rect x={x} y={80} width={60} height={40} rx={3} fill="none" stroke={stroke} strokeWidth="0.9" />
          <text x={x + 30} y={105} textAnchor="middle" fontSize="9" fill={stroke}>{l}</text>
          {i < 4 && <line x1={x + 60} y1={100} x2={x + 75} y2={100} stroke={accent} strokeWidth="0.9" markerEnd="" />}
        </g>
      );
    })}
    <line x1={30} y1={40} x2={370} y2={40} stroke={soft} strokeDasharray="2 4" />
    <text x={30} y={32} fontSize="8" fill={accent} letterSpacing="2">FEEDBACK LOOP</text>
    <path d="M 370 60 Q 380 100 370 140 L 30 140 Q 20 100 30 60" fill="none" stroke={soft} strokeDasharray="3 4" />
  </svg>
);

const diagrams: Record<ProofType, React.ReactNode> = {
  "growth-strategy": <ChannelMap />,
  "sales-systems": <QualificationPipeline />,
  "performance-marketing": <AttributionDashboard />,
  "lead-generation": <OutboundSequence />,
  "linkedin": <ContentPillars />,
  "ai-automation": <AutomationRouting />,
  "seo": <TopicalClusters />,
  "digital-products": <LaunchPipeline />,
};

const ImplementationProof = ({ type }: { type: ProofType }) => {
  const c = captions[type];
  return (
    <ScrollReveal>
      <div className="mb-14">
        <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
          Implementation Snapshot
        </h2>
        <Frame>{diagrams[type]}</Frame>
        <div className="mt-5 flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[hsl(var(--eyebrow-color))] mb-1">
              {c.eyebrow}
            </p>
            <p className="text-sm text-foreground/85">{c.title}</p>
          </div>
          <p className="text-xs text-muted-foreground italic">{c.note}</p>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default ImplementationProof;
export type { ProofType };
