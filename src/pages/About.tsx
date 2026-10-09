import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { useSEO } from "@/hooks/use-seo";
import columnImg from "@/assets/photos/editorial/column-compass.jpg";
import gearsImg from "@/assets/photos/editorial/gears.jpg";
import bridgeImg from "@/assets/photos/editorial/bridge.jpg";

const ABOUT_DESCRIPTION =
  "BitwellForge is a Revenue Infrastructure consulting firm strengthening the commercial, operational, and digital systems behind sustainable B2B growth.";

const aboutJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About BitwellForge",
    url: "https://bitwellforge.com/about",
    description: ABOUT_DESCRIPTION,
    mainEntity: {
      "@type": "Organization",
      name: "BitwellForge",
      url: "https://bitwellforge.com",
      description: ABOUT_DESCRIPTION,
      slogan: "Growth is not a tactic. It is infrastructure.",
      knowsAbout: ["Revenue Infrastructure", "Growth Strategy", "Client Acquisition", "Revenue Operations", "Digital Product Commercialisation"],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bitwellforge.com/" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://bitwellforge.com/about" },
    ],
  },
];

const Brand = () => <span className="font-heading font-bold">BitwellForge</span>;

const Note = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-[10px] sm:text-[11px] tracking-[0.3em] [text-transform:uppercase] text-[hsl(var(--eyebrow-color))] ${className}`}>{children}</p>
);

const domains = [
  "Growth strategy",
  "Client acquisition",
  "Revenue systems",
  "Market authority",
  "Digital visibility",
  "Performance growth",
  "Revenue operations",
  "Digital product commercialisation",
];

const principles = [
  {
    n: "I",
    word: "Proportionate",
    line: "to the problem.",
    detail: "Where the requirement is specific, we remain specific. Scope follows the business model, the economics of the situation, and the maturity of existing systems.",
  },
  {
    n: "II",
    word: "Rigorous",
    line: "in application.",
    detail: "Relevant economic and organisational variables are considered in conjunction, with attention to the dependencies that emerge as a business scales.",
  },
  {
    n: "III",
    word: "Useful",
    line: "beyond the engagement.",
    detail: "Where the economics cross functional boundaries, we account for those dependencies, avoiding solutions that simply transfer the constraint elsewhere.",
  },
];

/** Image cut into strips that settle into alignment as the reader arrives: a fragmented system becoming coherent. */
const AssemblingImage = ({ src, alt }: { src: string; alt: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const offsets = [-48, 32, -20, 44, -36];
  const ys = offsets.map((o) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [o, 0])
  );
  return (
    <div ref={ref} className="relative aspect-[4/5] w-full" role="img" aria-label={alt}>
      <div className="absolute inset-0 flex gap-[3px]">
        {ys.map((y, i) => (
          <motion.div key={i} style={{ y }} className="relative h-full flex-1 overflow-hidden">
            <img
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute top-0 h-full max-w-none object-cover"
              style={{ width: "500%", left: `${-i * 100}%` }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const About = () => {
  useSEO({
    title: "About BitwellForge | Revenue Infrastructure Consulting",
    description: ABOUT_DESCRIPTION,
    canonicalPath: "/about",
    jsonLd: aboutJsonLd,
    jsonLdId: "about-jsonld",
  });

  const [open, setOpen] = useState<number | null>(0);
  const [view, setView] = useState<"symptom" | "system">("symptom");

  return (
    <div className="pt-20 overflow-x-clip">
      {/* I. Opening: a typographic proposition */}
      <section className="section-padding pt-14 sm:pt-20 lg:pt-28 pb-20 sm:pb-28">
        <div className="max-w-[1320px] mx-auto">
          <ScrollReveal>
            <div className="flex items-baseline justify-between border-t border-foreground/80 pt-3">
              <Note>About</Note>
              <Note className="hidden sm:block">A practice of commercial architecture</Note>
            </div>
          </ScrollReveal>

          <div className="relative grid grid-cols-12 gap-x-6 mt-12 sm:mt-16 lg:mt-20">
            <h1 className="col-span-12 lg:col-span-9 font-heading font-normal text-foreground leading-[0.95] tracking-tightest">
              <ScrollReveal delay={80}><span style={{fontSize:"clamp(46px, 8.2vw, 112px)"}} className="block">Growth is not</span></ScrollReveal>
              <ScrollReveal delay={180}><span style={{fontSize:"clamp(46px, 8.2vw, 112px)"}} className="block pl-[12%] italic">a tactic.</span></ScrollReveal>
              <ScrollReveal delay={280}><span style={{fontSize:"clamp(46px, 8.2vw, 112px)"}} className="block text-right lg:text-left lg:pl-[22%]">It is</span></ScrollReveal>
              <ScrollReveal delay={380}><span style={{fontSize:"clamp(46px, 8.2vw, 112px)"}} className="block lg:pl-[22%] italic text-primary">infrastructure.</span></ScrollReveal>
            </h1>

            <div className="col-span-12 sm:col-span-7 sm:col-start-6 lg:col-span-3 lg:col-start-10 mt-12 lg:mt-0 lg:self-end">
              <ScrollReveal delay={460}>
                <div className="relative mx-auto max-w-[260px] lg:max-w-none">
                  <img src={columnImg} alt="Compass resting on a classical stone column" loading="eager" decoding="async" width={1024} height={1280} className="w-full aspect-[4/5] object-cover" />
                  <p className="mt-3 text-[11px] leading-[1.6] text-muted-foreground font-body">Fig. 1 &nbsp; Foundations before direction.</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* II. Identity: quiet, text-led */}
      <section className="section-padding pb-24 sm:pb-32 lg:pb-40">
        <div className="max-w-[1320px] mx-auto grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-3">
            <ScrollReveal><Note>01 &nbsp; What we are</Note></ScrollReveal>
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-7 mt-6 md:mt-0">
            <ScrollReveal delay={100}>
              <p className="font-heading leading-[1.22] text-foreground" style={{fontSize:"clamp(22px, 3.2vw, 42px)"}}>
                <Brand /> is a Revenue Infrastructure consulting firm serving agencies, consultants, coaches, and B2B service businesses across the commercial, operational, and digital dimensions of growth.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <p className="mt-8 max-w-[52ch] font-body text-muted-foreground text-[15.5px] sm:text-[17px] leading-[1.85] font-light">
                We work across the mechanisms through which revenue is originated, converted, operationalised, and compounded. Revenue Infrastructure is our lens, not a limitation on what we provide.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* III. The problem: symptom versus system */}
      <section className="section-padding py-24 sm:py-32 lg:py-40 bg-foreground text-background">
        <div className="max-w-[1320px] mx-auto grid grid-cols-12 gap-x-6 gap-y-14 items-center">
          <div className="col-span-12 md:col-span-6 lg:col-span-5 order-2 md:order-1">
            <div className="max-w-[420px] mx-auto md:mx-0">
              <AssemblingImage src={gearsImg} alt="Interlocking gears and a watch movement assembling into alignment" />
              <p className="mt-3 text-[11px] font-body opacity-60">Fig. 2 &nbsp; Parts acting in conjunction.</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-6 lg:col-start-7 order-1 md:order-2">
            <p className="text-[10px] sm:text-[11px] tracking-[0.3em] [text-transform:uppercase] opacity-60">02 &nbsp; What we examine</p>
            <h2 className="mt-6 font-heading font-normal leading-[1.04]" style={{fontSize:"clamp(32px, 4.6vw, 60px)"}} data-x=" tracking-tightest">
              The visible symptom is <em>not always</em> the underlying cause.
            </h2>

            <div role="tablist" aria-label="Two readings of a commercial problem" className="mt-10 flex border-b border-background/25">
              {(["symptom", "system"] as const).map((k) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={view === k}
                  onClick={() => setView(k)}
                  className={`relative min-h-[44px] pr-8 text-[11px] tracking-[0.28em] [text-transform:uppercase] transition-opacity duration-300 ${view === k ? "opacity-100" : "opacity-45 hover:opacity-80"}`}
                >
                  {k === "symptom" ? "Read as a symptom" : "Read as a system"}
                  <span className={`absolute left-0 -bottom-px h-px bg-background transition-transform duration-500 origin-left ${view === k ? "scale-x-100" : "scale-x-0"}`} style={{ width: "calc(100% - 2rem)" }} />
                </button>
              ))}
            </div>
            <div className="relative mt-8 min-h-[190px] sm:min-h-[160px]">
              {view === "symptom" ? (
                <motion.p key="s" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="font-body text-[15.5px] sm:text-[17px] leading-[1.85] font-light opacity-80 max-w-[50ch]">
                  A predetermined intervention treats the constraint as a deficiency within one function. The fix is local, and the constraint simply moves elsewhere in the system.
                </motion.p>
              ) : (
                <motion.p key="y" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="font-body text-[15.5px] sm:text-[17px] leading-[1.85] font-light opacity-80 max-w-[50ch]">
                  Some requirements are discrete. Others are less bounded, where the observed constraint is a consequence of interactions between several functions. We begin with the commercial problem and determine the engagement from the constraint at hand.
                </motion.p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* IV. Field of work: a typographic index */}
      <section className="section-padding py-24 sm:py-32 lg:py-40">
        <div className="max-w-[1320px] mx-auto grid grid-cols-12 gap-x-6">
          <div className="col-span-12 lg:col-span-4">
            <ScrollReveal><Note>03 &nbsp; Where the work spans</Note></ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="mt-6 max-w-[34ch] font-body text-muted-foreground text-[15px] sm:text-[16px] leading-[1.8] font-light">
                Distinct areas of commercial development, read together rather than as separate disciplines.
              </p>
            </ScrollReveal>
          </div>
          <ol className="col-span-12 lg:col-span-8 mt-10 lg:mt-0 border-t border-border/70">
            {domains.map((d, i) => (
              <li key={d} className="group border-b border-border/70">
                <ScrollReveal delay={i * 40}>
                  <div className="flex items-baseline gap-5 sm:gap-8 py-4 sm:py-5">
                    <span className="w-8 shrink-0 text-[11px] font-body tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-heading leading-[1.1]" style={{fontSize:"clamp(22px, 3.2vw, 40px)"}} data-x=" text-foreground transition-transform duration-500 group-hover:translate-x-2 group-hover:italic">
                      {d}
                    </span>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* V. Principles: progressive disclosure */}
      <section className="section-padding pb-24 sm:pb-32 lg:pb-40">
        <div className="max-w-[1320px] mx-auto">
          <ScrollReveal><Note>04 &nbsp; How we hold the work</Note></ScrollReveal>
          <div className="mt-10 sm:mt-14 border-t border-foreground/80">
            {principles.map((p, i) => {
              const isOpen = open === i;
              return (
                <div key={p.n} className="border-b border-border/70">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`principle-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full grid grid-cols-12 gap-x-6 items-baseline py-6 sm:py-8 text-left min-h-[44px]"
                  >
                    <span className="col-span-2 sm:col-span-1 font-heading italic text-[18px] sm:text-[22px] text-muted-foreground">{p.n}</span>
                    <span className="col-span-9 sm:col-span-10 font-heading leading-[1.02] tracking-tightest text-foreground break-words" style={{fontSize:"clamp(26px, 5vw, 68px)"}}>
                      {p.word} <span className="italic text-muted-foreground">{p.line}</span>
                    </span>
                    <span aria-hidden className={`col-span-1 justify-self-end text-[22px] text-foreground transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>+</span>
                  </button>
                  <div id={`principle-${i}`} className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className={`overflow-hidden ${isOpen ? "visible" : "invisible"}`}>
                      <p className="sm:ml-[8.33%] pb-8 max-w-[56ch] font-body text-muted-foreground text-[15px] sm:text-[16.5px] leading-[1.85] font-light">{p.detail}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VI. Conclusion: what it means */}
      <section className="relative">
        <div className="pl-5 sm:pl-[10vw] lg:pl-[40vw]">
          <ScrollReveal>
            <img src={bridgeImg} alt="Steel bridge truss emerging from a cobalt circle" loading="lazy" decoding="async" width={1536} height={1024} className="w-full aspect-[4/3] sm:aspect-[16/9] object-cover" />
          </ScrollReveal>
        </div>
        <div className="section-padding pt-14 sm:pt-20 pb-28 sm:pb-36 lg:pb-48">
          <div className="max-w-[1320px] mx-auto grid grid-cols-12 gap-x-6">
            <div className="col-span-12 md:col-span-3"><ScrollReveal><Note>05 &nbsp; What this means</Note></ScrollReveal></div>
            <div className="col-span-12 md:col-span-9 lg:col-span-7 mt-6 md:mt-0">
              <ScrollReveal delay={100}>
                <p className="font-heading leading-[1.1] tracking-tightest text-foreground" style={{fontSize:"clamp(30px, 4.4vw, 56px)"}}>
                  A structure that still holds <em>after we leave.</em>
                </p>
              </ScrollReveal>
              <ScrollReveal delay={180}>
                <p className="mt-8 max-w-[50ch] font-body text-muted-foreground text-[15.5px] sm:text-[17px] leading-[1.85] font-light">
                  Our work is designed to be proportionate to the problem, rigorous in application, and useful beyond the engagement.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
