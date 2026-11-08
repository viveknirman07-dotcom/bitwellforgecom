import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import type { CaseStudy } from "@/lib/case-studies-data";
import { cn } from "@/lib/utils";
import revImg from "@/assets/photos/system-revenue.jpg";
import strategyImg from "@/assets/photos/system-strategy.jpg";
import operationsImg from "@/assets/photos/system-operations.jpg";
import acquisitionImg from "@/assets/photos/system-acquisition.jpg";
import processImg from "@/assets/photos/system-process.jpg";
import insightsImg from "@/assets/photos/system-insights.jpg";
import visibilityImg from "@/assets/photos/system-visibility.jpg";

/* Same image rotation the homepage client stories use, keyed by the study's position in the full archive. */
const images = [acquisitionImg, strategyImg, operationsImg, processImg, visibilityImg, insightsImg, revImg];
const HOLD = 4000;
const SLIDE = 1200;
const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const pad = (n: number) => String(n).padStart(2, "0");

interface Props {
  studies: CaseStudy[];
  archiveIndex: (s: CaseStudy) => number;
}

const CaseStudyExplorer = ({ studies, archiveIndex }: Props) => {
  const reduced = useReducedMotion();
  const total = studies.length;
  const slides = total > 1 ? [...studies, studies[0]] : studies;
  const [pos, setPos] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const resumeT = useRef<number>();
  const idx = total ? pos % total : 0;

  useEffect(() => { setAnimate(false); setPos(0); }, [studies]);

  useEffect(() => {
    if (total < 2) return;
    const next = studies[(idx + 1) % total];
    const image = new Image();
    image.src = images[archiveIndex(next) % images.length];
    image.decode?.().catch(() => {});
  }, [idx, total, studies, archiveIndex]);

  // Seamless wrap: after sliding onto the clone, snap back to the first slide without motion.
  useEffect(() => {
    if (pos !== total || total < 2) return;
    const t = window.setTimeout(() => { setAnimate(false); setPos(0); }, reduced ? 0 : SLIDE + 20);
    return () => clearTimeout(t);
  }, [pos, total, reduced]);

  useEffect(() => {
    if (paused || total < 2) return;
    const t = window.setTimeout(() => { setAnimate(true); setPos((p) => p + 1); }, HOLD + (animate && !reduced ? SLIDE : 0));
    return () => clearTimeout(t);
  }, [pos, paused, total, animate, reduced]);

  const nudge = () => {
    setPaused(true);
    clearTimeout(resumeT.current);
    resumeT.current = window.setTimeout(() => setPaused(false), HOLD);
  };

  const goTo = useCallback((target: number) => {
    nudge();
    if (target < 0) {
      // Jump to the clone without motion, then slide back one.
      setAnimate(false);
      setPos(total);
      requestAnimationFrame(() => requestAnimationFrame(() => { setAnimate(true); setPos(total - 1); }));
      return;
    }
    setAnimate(true);
    setPos(target);
  }, [total]);

  useEffect(() => () => clearTimeout(resumeT.current), []);

  if (!total) return null;

  const trackStyle: React.CSSProperties = {
    transform: `translate3d(${-pos * 100}%,0,0)`,
    transition: animate && !reduced ? `transform ${SLIDE}ms ${EASE}` : "none",
  };

  const label = "text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[hsl(var(--eyebrow-color))] eyebrow";

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Case studies"
    >
      {/* Stage */}
      <div className="lg:col-span-8 lg:order-2 min-w-0">
        <div className="flex items-center justify-between border-t border-foreground/80 pt-4">
          <p className={label}>Case study {pad(idx + 1)} / {pad(total)}</p>
          {total > 1 && (
            <div className="flex items-center gap-1">
              <button type="button" aria-label="Previous case study" onClick={() => goTo(pos - 1)} className="h-11 w-11 inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft size={16} />
              </button>
              <button type="button" aria-label="Next case study" onClick={() => goTo(pos + 1)} className="h-11 w-11 inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>

        <div
          className="overflow-hidden mt-6"
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 40) goTo(dx < 0 ? pos + 1 : pos - 1);
          }}
        >
          <div className="flex" style={trackStyle}>
            {slides.map((s, i) => {
              const a = archiveIndex(s);
              const head = s.metrics?.[0];
              return (
                <article key={`${s.id}-${i}`} className="w-full shrink-0" aria-hidden={i % total !== idx || (i === total && pos !== total)}>
                  <p className={label}>{s.category}</p>
                  <h2 className="mt-4 font-heading text-[28px] sm:text-[40px] lg:text-[48px] font-normal leading-[1.08] text-foreground text-balance max-w-[22ch] min-h-[2.2em]">
                    {s.title}
                  </h2>
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8">
                    <div className="sm:col-span-8 aspect-[4/3] sm:aspect-[16/11] overflow-hidden">
                      <img src={images[a % images.length]} alt="" loading={i < 2 ? "eager" : "lazy"} decoding="async" width={1536} height={1024} className="h-full w-full object-cover" />
                    </div>
                    <div className="sm:col-span-4 flex flex-col">
                      <p className="text-muted-foreground text-[14.5px] leading-[1.75] font-light">{s.subtitle}</p>
                      {head && (
                        <div className="mt-8 pt-5 border-t border-border/70">
                          <div className="font-heading text-[40px] leading-none text-foreground">{head.value}</div>
                          <div className="mt-2 text-[10.5px] uppercase tracking-widest text-muted-foreground leading-snug">{head.label}</div>
                        </div>
                      )}
                      <Link to={`/case-studies/${s.id}`} tabIndex={i % total === idx ? 0 : -1} className="group mt-8 sm:mt-auto pt-2 inline-flex items-center gap-3 min-h-[44px] text-[13px] text-foreground">
                        <span className="border-b border-foreground/40 group-hover:border-foreground transition-colors">Read the study</span>
                        <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Index */}
      <nav aria-label="Case study index" className="lg:col-span-4 lg:order-1">
        <ol className="border-t border-border/70 lg:max-h-[min(78vh,760px)] lg:overflow-y-auto lg:pr-2" data-lenis-prevent>
          {studies.map((s, i) => {
            const on = i === idx;
            return (
              <li key={s.id} className="border-b border-border/60">
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={on ? "true" : undefined}
                  className={cn("group relative w-full text-left flex gap-4 py-4 min-h-[44px] transition-opacity duration-500", on ? "opacity-100" : "opacity-45 hover:opacity-80")}
                >
                  <span className={cn("absolute left-0 top-0 h-px bg-foreground transition-all duration-700", on ? "w-full" : "w-0")} />
                  <span className="w-6 shrink-0 pt-0.5 text-[11px] tabular-nums text-muted-foreground">{pad(i + 1)}</span>
                  <span className={cn("transition-transform duration-500", on && "translate-x-1")}>
                    <span className="block text-[10px] tracking-[0.24em] uppercase text-muted-foreground">{s.category}</span>
                    <span className="mt-1.5 block font-heading text-[17px] sm:text-[18px] leading-[1.3] text-foreground">{s.title}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default CaseStudyExplorer;
