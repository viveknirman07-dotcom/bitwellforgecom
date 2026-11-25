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

export const DataVisual = () => (
  <figure>
    <svg viewBox="0 0 480 360" role="img" aria-labelledby="audit-evidence-title audit-evidence-desc" className="w-full h-auto font-body">
      <title id="audit-evidence-title">Connecting commercial evidence to operational evidence</title>
      <desc id="audit-evidence-desc">Three paired evidence lenses connect demand to capacity, conversion to handoffs, and revenue to delivery effort. No client metrics or performance results are depicted.</desc>
      <text x="16" y="32" fill={muted} fontSize="16">COMMERCIAL</text>
      <text x="300" y="32" fill={muted} fontSize="16">OPERATIONAL</text>
      {[["Demand", "Capacity"], ["Conversion", "Handoffs"], ["Revenue", "Delivery effort"]].map(([a, b], i) => {
        const y = 94 + i * 91;
        return <g key={a}>
          <line x1="16" y1={y + 34} x2="464" y2={y + 34} stroke={line} />
          <text x="16" y={y} fill={ink} fontSize="21">{a}</text>
          <line x1="165" y1={y - 7} x2="274" y2={y - 7} stroke={accent} strokeWidth="2" />
          <circle cx="165" cy={y - 7} r="4" fill={accent} />
          <path d={`M266 ${y - 13} L274 ${y - 7} L266 ${y - 1}`} fill="none" stroke={accent} strokeWidth="2" />
          <text x="300" y={y} fill={ink} fontSize="21">{b}</text>
        </g>;
      })}
    </svg>
    <FigureNote>Illustrative evidence relationships. Quantitative conclusions depend on the records supplied, their completeness and their comparability.</FigureNote>
  </figure>
);

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
  return (
    <figure>
      <motion.div onViewportEnter={() => setVisible(true)} onViewportLeave={() => setVisible(false)}>
        <svg viewBox="0 0 480 300" role="img" aria-labelledby="audit-motion-title audit-motion-desc" className="w-full h-auto font-body">
          <title id="audit-motion-title">A constraint carries through to the next function</title>
          <desc id="audit-motion-desc">A signal travels from demand through delivery to revenue. A narrower delivery stage illustrates why increasing demand alone may not resolve a capacity constraint.</desc>
          <line x1="40" y1="140" x2="440" y2="140" stroke={line} strokeWidth="2" />
          {[80, 240, 400].map((x, i) => (
            <g key={x}>
              <rect x={x - (i === 1 ? 24 : 42)} y="94" width={i === 1 ? 48 : 84} height="92" fill="hsl(var(--background))" stroke={i === 1 ? accent : ink} strokeWidth="1.5" />
              <text x={x} y="222" textAnchor="middle" fontSize="20" fill={ink}>{["Demand", "Delivery", "Revenue"][i]}</text>
            </g>
          ))}
          <motion.circle cx="80" cy="140" r="7" fill={accent}
            animate={active ? { x: [0, 136, 160, 184, 320], opacity: [0, 1, 1, 1, 0] } : { x: 160, opacity: 1 }}
            transition={active ? { duration: 6, times: [0, 0.28, 0.6, 0.78, 1], repeat: Infinity, ease: "linear" } : { duration: 0 }} />
          <text x="240" y="58" textAnchor="middle" fontSize="16" fill={muted}>CAPACITY CONSTRAINT</text>
        </svg>
      </motion.div>
      <div className="flex items-center justify-between gap-4 border-t border-gold/15 pt-4">
        <span className="text-xs text-muted-foreground">Illustrative system behaviour</span>
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