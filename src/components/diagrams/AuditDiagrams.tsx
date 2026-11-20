/**
 * Hand-built SVG consulting diagrams for the Revenue Infrastructure Audit.
 * Pure 2D vectors drawn with theme tokens so they follow light and dark modes.
 */
const INK = "hsl(var(--foreground))";
const MUTED = "hsl(var(--muted-foreground))";
const LINE = "hsl(var(--foreground) / 0.35)";
const ACCENT = "hsl(var(--accent-blue-2))";
const PAPER = "hsl(var(--background))";
const SERIF = "'Cormorant Garamond', serif";
const SANS = "'Montserrat', sans-serif";

const Arrow = ({ id, color = LINE }: { id: string; color?: string }) => (
  <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0 0 L10 5 L0 10 z" fill={color} />
  </marker>
);

/* 1. Structural Architecture: five stacked layers with dependency connectors */
export const StructuralArchitecture = () => {
  const layers = [
    { n: "01", t: "Business Structure", s: "Ownership, offer, pricing model" },
    { n: "02", t: "Commercial Systems", s: "Pipeline, proposals, pricing logic" },
    { n: "03", t: "Acquisition Infrastructure", s: "Channels, positioning, lead flow" },
    { n: "04", t: "Operational Infrastructure", s: "Delivery, capacity, handoffs" },
    { n: "05", t: "Digital Infrastructure", s: "Site, data, tooling, automation" },
  ];
  const x = 40, w = 440, h = 78, gap = 30, top = 30;
  const deps: [number, number][] = [[0, 2], [1, 3], [2, 4], [0, 4]];
  return (
    <svg viewBox="0 0 600 600" role="img" aria-labelledby="sa-t" className="w-full h-auto">
      <title id="sa-t">Structural architecture: five dependent business layers</title>
      <defs><Arrow id="sa-a" /></defs>
      {layers.map((l, i) => {
        const y = top + i * (h + gap);
        return (
          <g key={l.n}>
            <rect x={x} y={y} width={w} height={h} fill="none" stroke={INK} strokeWidth="1.2" />
            <rect x={x} y={y} width="6" height={h} fill={i === 2 ? ACCENT : INK} />
            <text x={x + 28} y={y + 34} fontFamily={SERIF} fontSize="25" fill={INK}>{l.t}</text>
            <text x={x + 28} y={y + 60} fontFamily={SANS} fontSize="13" fill={MUTED}>{l.s}</text>
            <text x={x + w - 18} y={y + 34} textAnchor="end" fontFamily={SANS} fontSize="12" letterSpacing="2" fill={MUTED}>{l.n}</text>
            {i < layers.length - 1 && (
              <line x1={x + w / 2} y1={y + h} x2={x + w / 2} y2={y + h + gap} stroke={INK} strokeWidth="1" />
            )}
          </g>
        );
      })}
      {deps.map(([a, b], k) => {
        const ya = top + a * (h + gap) + h / 2;
        const yb = top + b * (h + gap) + h / 2;
        const xr = x + w + 22 + k * 22;
        return (
          <path key={k} d={`M${x + w} ${ya} H${xr} V${yb} H${x + w + 4}`} fill="none"
            stroke={k === 3 ? ACCENT : LINE} strokeWidth="1" strokeDasharray={k === 3 ? "0" : "3 4"} markerEnd="url(#sa-a)" />
        );
      })}
      <text x={590} y={top - 10} textAnchor="end" fontFamily={SANS} fontSize="11" letterSpacing="2" fill={MUTED}>DEPENDENCIES</text>
    </svg>
  );
};

/* 2. Business Framework: Revenue Infrastructure at the centre of five functions */
export const BusinessFramework = () => {
  const cx = 300, cy = 300, R = 205;
  const items = ["Strategy", "Acquisition", "Sales", "Operations", "Digital Systems"];
  const pts = items.map((t, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return { t, x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
  });
  return (
    <svg viewBox="0 0 600 600" role="img" aria-labelledby="bf-t" className="w-full h-auto">
      <title id="bf-t">Business framework: five functions connected to revenue infrastructure</title>
      <polygon points={pts.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke={LINE} strokeWidth="1" strokeDasharray="3 5" />
      {pts.map((p) => (
        <line key={p.t} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={INK} strokeWidth="1" />
      ))}
      <circle cx={cx} cy={cy} r="88" fill={PAPER} stroke={INK} strokeWidth="1.2" />
      <circle cx={cx} cy={cy} r="78" fill="none" stroke={ACCENT} strokeWidth="1" />
      <text x={cx} y={cy - 4} textAnchor="middle" fontFamily={SERIF} fontSize="27" fill={INK}>Revenue</text>
      <text x={cx} y={cy + 26} textAnchor="middle" fontFamily={SERIF} fontSize="27" fill={INK}>Infrastructure</text>
      {pts.map((p, i) => {
        const bw = p.t.length > 10 ? 168 : 136;
        return (
          <g key={p.t}>
            <rect x={p.x - bw / 2} y={p.y - 26} width={bw} height="52" fill={PAPER} stroke={INK} strokeWidth="1.2" />
            <text x={p.x} y={p.y + 7} textAnchor="middle" fontFamily={SERIF} fontSize="22" fill={INK}>{p.t}</text>
            <text x={p.x - bw / 2 + 8} y={p.y - 32} fontFamily={SANS} fontSize="11" letterSpacing="2" fill={MUTED}>{`0${i + 1}`}</text>
          </g>
        );
      })}
    </svg>
  );
};

/* 3. Systems & Feedback Loops: six functions in a directed loop with cross influences */
export const SystemsFeedbackLoops = () => {
  const cx = 300, cy = 300, R = 210;
  const nodes = ["Market Demand", "Lead Generation", "Sales Conversion", "Service Delivery", "Customer Retention", "Revenue Performance"];
  const pts = nodes.map((t, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
    return { t, x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
  });
  const r = 46;
  const arc = (a: { x: number; y: number }, b: { x: number; y: number }, bend: number, inset = r + 8) => {
    const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy);
    const ux = dx / d, uy = dy / d;
    const sx = a.x + ux * inset, sy = a.y + uy * inset, ex = b.x - ux * inset, ey = b.y - uy * inset;
    const mx = (sx + ex) / 2 - uy * bend, my = (sy + ey) / 2 + ux * bend;
    return `M${sx} ${sy} Q${mx} ${my} ${ex} ${ey}`;
  };
  const split = (t: string) => t.split(" ");
  return (
    <svg viewBox="0 0 600 600" role="img" aria-labelledby="sf-t" className="w-full h-auto">
      <title id="sf-t">Systems and feedback loops between six commercial functions</title>
      <defs><Arrow id="sf-a" color={INK} /><Arrow id="sf-b" color={ACCENT} /></defs>
      {pts.map((p, i) => (
        <path key={i} d={arc(p, pts[(i + 1) % 6], -28)} fill="none" stroke={INK} strokeWidth="1.1" markerEnd="url(#sf-a)" />
      ))}
      {/* feedback: retention to demand, revenue to lead generation */}
      <path d={arc(pts[4], pts[0], 40)} fill="none" stroke={ACCENT} strokeWidth="1.1" strokeDasharray="4 4" markerEnd="url(#sf-b)" />
      <path d={arc(pts[5], pts[1], 40)} fill="none" stroke={ACCENT} strokeWidth="1.1" strokeDasharray="4 4" markerEnd="url(#sf-b)" />
      <circle cx={cx} cy={cy} r="34" fill="none" stroke={LINE} strokeWidth="1" />
      <path d={`M${cx + 34} ${cy} A34 34 0 1 1 ${cx + 24} ${cy - 24}`} fill="none" stroke={INK} strokeWidth="1" markerEnd="url(#sf-a)" />
      {pts.map((p, i) => (
        <g key={p.t}>
          <circle cx={p.x} cy={p.y} r={r} fill={PAPER} stroke={INK} strokeWidth="1.2" />
          {split(p.t).map((w, k) => (
            <text key={w} x={p.x} y={p.y + (k === 0 ? -3 : 19)} textAnchor="middle" fontFamily={SERIF} fontSize="17" fill={INK}>{w}</text>
          ))}
          <text x={p.x} y={p.y - r - 8} textAnchor="middle" fontFamily={SANS} fontSize="10" letterSpacing="2" fill={MUTED}>{`0${i + 1}`}</text>
        </g>
      ))}
    </svg>
  );
};
