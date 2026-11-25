import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const ink = "hsl(var(--foreground))";
const muted = "hsl(var(--muted-foreground))";
const line = "hsl(var(--border))";
const accent = "hsl(var(--accent-blue-2))";

const FigureNote = ({ children }: { children: React.ReactNode }) => (
  <figcaption className="mt-5 text-xs text-muted-foreground leading-relaxed">{children}</figcaption>
);

export const StrategicVisual = () => (
  <figure>
    <div className="border-y border-gold/20">
      {[
        ["01", "Commercial question", "What is limiting performance?"],
        ["02", "Available evidence", "What supports the observation?"],
        ["03", "System dependency", "What must change first?"],
        ["04", "Decision priority", "What should leadership address?"],
      ].map(([n, title, detail], i) => (
        <div key={n} className={`grid grid-cols-[32px_1fr] sm:grid-cols-[40px_1fr] gap-4 py-5 ${i ? "border-t border-gold/15" : ""}`}>
          <span className="font-heading text-2xl text-gold">{n}</span>
          <div><div className="font-heading text-2xl text-foreground">{title}</div><div className="font-body text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">{detail}</div></div>
        </div>
      ))}
    </div>
    <FigureNote>An assessment sequence, not a predetermined recommendation.</FigureNote>
  </figure>
);

export const DataVisual = () => {
  const lenses = [
    { r: 46, label: "Demand", sub: "Enquiry volume" },
    { r: 62, label: "Conversion", sub: "Win patterns" },
    { r: 78, label: "Capacity", sub: "Team load" },
    { r: 94, label: "Revenue", sub: "Margin by offer" },
  ];
  let x = 18;
  const placed = lenses.map((l, i) => { const cx = x + l.r; x = cx + l.r * 0.42; return { ...l, cx, i }; });
  const base = 250;
  return (
    <figure>
      <svg viewBox="0 0 480 330" role="img" aria-labelledby="audit-evidence-title audit-evidence-desc" className="w-full h-auto font-body overflow-visible">
        <title id="audit-evidence-title">Overlapping evidence lenses</title>
        <desc id="audit-evidence-desc">Four graduated, overlapping circles representing demand, conversion, capacity and revenue evidence. Their overlaps mark where findings are formed. No client metrics are depicted.</desc>
        <text x="18" y="26" fill={muted} fontSize="11" letterSpacing="2.5">EVIDENCE LENSES</text>
        <text x="462" y="26" fill={muted} fontSize="11" letterSpacing="2.5" textAnchor="end">ILLUSTRATIVE</text>
        <line x1="18" y1="40" x2="462" y2="40" stroke={line} />
        {placed.map((c) => (
          <circle key={c.label} cx={c.cx} cy={base - c.r} r={c.r} fill={accent} fillOpacity={0.1 + c.i * 0.07} stroke={accent} strokeOpacity={0.35 + c.i * 0.15} strokeWidth="1" />
        ))}
        {placed.map((c) => (
          <circle key={c.label + "c"} cx={c.cx} cy={base - c.r} r="2.5" fill={ink} />
        ))}
        <line x1="18" y1={base} x2="462" y2={base} stroke={ink} strokeWidth="1.25" />
        {placed.map((c) => (
          <g key={c.label + "t"}>
            <line x1={c.cx} y1={base} x2={c.cx} y2={base + 10} stroke={ink} />
            <text x={c.cx} y={base + 32} textAnchor="middle" fill={ink} fontSize="15" className="font-heading">{c.label}</text>
            <text x={c.cx} y={base + 50} textAnchor="middle" fill={muted} fontSize="10" letterSpacing="0.5">{c.sub}</text>
          </g>
        ))}
        <text x="462" y="66" textAnchor="end" fill={muted} fontSize="10" letterSpacing="1.5">OVERLAP = WHERE FINDINGS FORM</text>
      </svg>
      <FigureNote>Illustrative evidence relationships. Quantitative conclusions depend on the records supplied, their completeness and their comparability.</FigureNote>
    </figure>
  );
};

export const ReportsVisual = () => (
  <figure>
    <div className="grid grid-cols-3 gap-3 sm:gap-5 items-start">
      {["Audit Report", "Executive Findings", "Priority Roadmap"].map((title, i) => (
        <div key={title} className={`border border-gold/25 aspect-[3/4.6] flex flex-col p-3 sm:p-5 ${i === 1 ? "mt-7" : i === 2 ? "mt-14" : ""}`}>
          <span className="font-heading text-xl sm:text-3xl text-gold">0{i + 1}</span>
          <div className="mt-5 sm:mt-8 font-heading text-lg sm:text-2xl leading-tight text-foreground break-words">{title}</div>
          <div aria-hidden="true" className="mt-auto pt-5 space-y-2"><div className="h-px bg-gold/30" /><div className="h-px bg-gold/20 w-4/5" /><div className="h-px bg-gold/20 w-3/5" /></div>
        </div>
      ))}
    </div>
    <FigureNote>Document structure shown schematically. The engagement includes the three specified documents, not an additional slide deck.</FigureNote>
  </figure>
);

export const MotionVisual = () => {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const active = !reduced && !paused && visible;
  const D = 7.2;
  const units = Array.from({ length: 6 }, (_, i) => i);
  return (
    <figure>
      <motion.div onViewportEnter={() => setVisible(true)} onViewportLeave={() => setVisible(false)}>
        <svg viewBox="0 0 480 320" role="img" aria-labelledby="audit-motion-title audit-motion-desc" className="w-full h-auto font-body">
          <title id="audit-motion-title">A capacity constraint limits throughput</title>
          <desc id="audit-motion-desc">Work enters from demand at a steady rate. The delivery stage is narrower, so only part of the work passes through to revenue while the rest waits in a queue. Increasing demand alone lengthens the queue rather than revenue.</desc>
          <text x="20" y="28" fill={muted} fontSize="11" letterSpacing="2.5">SYSTEM FLOW</text>
          <text x="460" y="28" fill={muted} fontSize="11" letterSpacing="2.5" textAnchor="end">ILLUSTRATIVE</text>
          <line x1="20" y1="42" x2="460" y2="42" stroke={line} />
          {/* channel */}
          <path d="M20 110 H196 L222 134 H258 L284 110 H460 M20 210 H196 L222 186 H258 L284 210 H460" fill="none" stroke={ink} strokeWidth="1.25" />
          <rect x="222" y="134" width="36" height="52" fill={accent} fillOpacity="0.14" />
          <line x1="240" y1="70" x2="240" y2="134" stroke={accent} strokeDasharray="3 4" />
          <text x="240" y="62" textAnchor="middle" fill={accent} fontSize="11" letterSpacing="2">CONSTRAINT</text>
          {[110, 250, 370].map((x, i) => (
            <text key={x} x={x} y="244" textAnchor="middle" fill={ink} fontSize="17" className="font-heading">{["Demand", "Delivery", "Revenue"][i]}</text>
          ))}
          {[["Inflow", 110], ["Queue forms", 196], ["Throughput", 370]].map(([t, x]) => (
            <text key={t as string} x={x as number} y="262" textAnchor="middle" fill={muted} fontSize="10" letterSpacing="0.6">{t}</text>
          ))}
          {/* waiting queue */}
          {[0, 1, 2].map((q) => (
            <motion.rect key={q} x={180 - q * 16} y="152" width="10" height="16" fill={ink}
              initial={{ opacity: 0.25 }}
              animate={active ? { opacity: [0.15, 0.15, 0.85, 0.85, 0.15] } : { opacity: 0.6 }}
              transition={active ? { duration: D, delay: q * 0.8, times: [0, 0.3, 0.42, 0.85, 1], repeat: Infinity, ease: "easeInOut" } : { duration: 0 }} />
          ))}
          {/* flowing units */}
          {units.map((i) => {
            const pass = i % 2 === 0;
            return (
              <motion.circle key={i} cx="20" cy={pass ? 160 : 160 + (i % 3 - 1) * 22} r="5" fill={pass ? accent : ink}
                initial={{ opacity: 0 }}
                animate={active
                  ? pass
                    ? { x: [0, 170, 220, 260, 430], opacity: [0, 1, 1, 1, 0] }
                    : { x: [0, 150, 158, 158], opacity: [0, 1, 0.9, 0] }
                  : { x: pass ? 220 : 120, opacity: 0.9 }}
                transition={active ? { duration: D, delay: (i * D) / units.length, times: pass ? [0, 0.3, 0.55, 0.65, 1] : [0, 0.35, 0.7, 1], repeat: Infinity, ease: "easeInOut" } : { duration: 0 }} />
            );
          })}
          <line x1="20" y1="288" x2="460" y2="288" stroke={line} />
          <circle cx="26" cy="304" r="4" fill={accent} />
          <text x="38" y="308" fill={muted} fontSize="10">Work converted to revenue</text>
          <circle cx="220" cy="304" r="4" fill={ink} />
          <text x="232" y="308" fill={muted} fontSize="10">Work waiting on capacity</text>
        </svg>
      </motion.div>
      <div className="flex items-center justify-between gap-4 border-t border-gold/15 pt-4">
        <span className="text-xs text-muted-foreground">More demand lengthens the queue, not the revenue line.</span>
        {!reduced && <Button variant="ghost" size="icon" aria-label={paused ? "Play explainer" : "Pause explainer"} title={paused ? "Play explainer" : "Pause explainer"} onClick={() => setPaused(!paused)}>{paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}</Button>}
      </div>
      <FigureNote>A simplified explanation for the findings discussion. It is not a simulation of your business or an additional commissioned animation.</FigureNote>
    </figure>
  );
};

export const AuditVisualSection = ({ title, intro, detail, children }: { title: string; intro: string; detail: string; children: React.ReactNode }) => (
  <section aria-label={title} className="border-t border-gold/15 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
    <div className="lg:col-span-5">
      <h2 className="font-heading text-3xl md:text-[40px] lg:text-[44px] font-normal text-foreground leading-[1.1] mb-5 tracking-tightest">{title}</h2>
      <p className="text-muted-foreground text-[15px] leading-[1.85] font-light max-w-xl">{intro}</p>
      <p className="text-muted-foreground text-[15px] leading-[1.85] font-light max-w-xl mt-5">{detail}</p>
    </div>
    <div className="lg:col-span-7 w-full max-w-[560px] mx-auto">{children}</div>
  </section>
);