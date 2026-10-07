import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { useSEO } from "@/hooks/use-seo";
import aboutImage from "@/assets/photos/system-about.jpg";

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
      knowsAbout: [
        "Revenue Infrastructure",
        "Growth Strategy",
        "Client Acquisition",
        "Revenue Operations",
        "Digital Product Commercialisation",
      ],
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

const paragraphs = [
  "BitwellForge is a Revenue Infrastructure consulting firm serving agencies, consultants, coaches, and B2B service businesses across the commercial, operational, and digital dimensions of growth.",
  "Our work spans distinct areas of commercial development, from growth strategy and client acquisition to revenue systems, market authority, digital visibility, performance growth, revenue operations, and digital product commercialisation.",
  "The nature of the engagement is determined by the constraint at hand. Some requirements are discrete; others are less bounded, where the observed constraint is a consequence of interactions between several functions rather than a deficiency within one.",
  "We begin with the commercial problem rather than a predetermined intervention. The visible symptom is not always the underlying cause. Our analysis considers the relevant economic and organisational variables in conjunction, with attention to the dependencies and constraints that emerge as a business scales.",
  "Where the requirement is specific, we remain specific. Where the economics of the problem cross functional boundaries, we account for those dependencies, avoiding solutions that simply transfer the constraint elsewhere in the system.",
  "The appropriate scope is determined by the business model, the economics of the situation, the maturity of existing systems, and the constraints governing execution.",
  "Our work is designed to be proportionate to the problem, rigorous in application, and useful beyond the engagement.",
];
const chapters = [
  { n: "01", label: "Identity", paras: [0, 1] },
  { n: "02", label: "Way of thinking", paras: [2, 3] },
  { n: "03", label: "Method", paras: [4, 5] },
  { n: "04", label: "Role", paras: [6] },
];

const headingLines = [
  { text: "We work across the mechanisms", indent: "" },
  { text: "through which revenue is originated,", indent: "lg:pl-[9%]" },
  { text: "converted, operationalised,", indent: "sm:pl-[14%] lg:pl-[22%]" },
  { text: "and compounded.", indent: "sm:pl-[28%] lg:pl-[44%]" },
];

const eyebrow = "text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-[hsl(var(--eyebrow-color))] eyebrow";

const About = () => {
  useSEO({
    title: "About BitwellForge | Revenue Infrastructure Consulting",
    description: ABOUT_DESCRIPTION,
    canonicalPath: "/about",
    jsonLd: aboutJsonLd,
    jsonLdId: "about-jsonld",
  });

  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const chaptersWrap = useRef<HTMLDivElement>(null);
  const imgWrap = useRef<HTMLDivElement>(null);

  const { scrollYProgress: chapterProgress } = useScroll({ target: chaptersWrap, offset: ["start 60%", "end 60%"] });
  const progressScale = useTransform(chapterProgress, [0, 1], [0, 1]);

  const { scrollYProgress: imgProgress } = useScroll({ target: imgWrap, offset: ["start end", "end start"] });
  const imgScale = useTransform(imgProgress, [0, 1], reduced ? [1, 1] : [1.1, 1]);
  const imgX = useTransform(imgProgress, [0, 1], reduced ? ["0%", "0%"] : ["4%", "-2%"]);
  const clip = useTransform(
    imgProgress,
    [0.05, 0.5],
    reduced ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] : ["inset(0% 0% 0% 35%)", "inset(0% 0% 0% 0%)"]
  );

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx));
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const goTo = (i: number) => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });

  const renderChapter = (i: number) => {
    const c = chapters[i];
    return (
      <article
        key={c.n}
        data-idx={i}
        ref={(el) => (refs.current[i] = el)}
        className="scroll-mt-32 relative"
      >
        <ScrollReveal>
          <div className="flex items-baseline gap-5 border-t border-border/70 pt-5">
            <span className="font-heading text-[44px] sm:text-[56px] leading-none text-foreground/20 lg:hidden">{c.n}</span>
            <span className={eyebrow}>{c.label}</span>
          </div>
        </ScrollReveal>
        <div className="mt-8 sm:mt-10 space-y-8 sm:space-y-10">
          {c.paras.map((p, k) => (
            <ScrollReveal key={p} delay={k * 90} direction={k === 0 ? "up" : "left"}>
              <p
                className={
                  k === 0
                    ? "font-heading text-[23px] sm:text-[28px] lg:text-[32px] leading-[1.28] text-foreground max-w-[30ch]"
                    : "font-body text-muted-foreground text-[15.5px] sm:text-[16.5px] lg:text-[17px] leading-[1.85] font-light max-w-[54ch] sm:ml-[12%]"
                }
              >
                {paragraphs[p]}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </article>
    );
  };

  return (
    <div className="pt-20 overflow-x-clip">
      {/* Opening page */}
      <section className="section-padding min-h-[calc(100svh-5rem)] flex flex-col pt-10 sm:pt-14 pb-16 sm:pb-20">
        <div className="max-w-[1320px] w-full mx-auto flex-1 flex flex-col">
          <ScrollReveal>
            <div className="grid grid-cols-12 gap-x-6 border-t border-border/70 pt-4">
              <p className={`${eyebrow} col-span-6 sm:col-span-4`}>About BitwellForge</p>
              <nav aria-label="About index" className="hidden sm:flex col-span-8 justify-end gap-8">
                {chapters.map((c, i) => (
                  <button key={c.n} type="button" onClick={() => goTo(i)} className={`${eyebrow} min-h-[44px] -mt-3 hover:opacity-60 transition-opacity`}>
                    {c.n} {c.label}
                  </button>
                ))}
              </nav>
            </div>
          </ScrollReveal>

          <h1 className="mt-16 sm:mt-24 lg:mt-28 font-heading text-[34px] sm:text-[50px] lg:text-[68px] xl:text-[78px] font-normal text-foreground leading-[1.06] tracking-tightest">
            {headingLines.map((l, i) => (
              <span key={i} className={`block overflow-hidden pb-[0.08em] ${l.indent}`}>
                <motion.span
                  className="block"
                  initial={reduced ? false : { y: "105%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <div className="mt-auto pt-16 sm:pt-20 grid grid-cols-12 gap-x-6 items-end">
            <ScrollReveal delay={500} className="col-span-12 sm:col-span-5 lg:col-span-4 order-2 sm:order-1 mt-12 sm:mt-0">
              <button type="button" onClick={() => goTo(0)} className={`${eyebrow} flex items-center gap-4 min-h-[44px]`}>
                <span className="h-px w-10 bg-foreground/60" />
                Begin reading
              </button>
            </ScrollReveal>
            <ScrollReveal delay={420} className="col-span-12 sm:col-start-7 sm:col-span-6 lg:col-start-8 lg:col-span-5 order-1 sm:order-2">
              <p className="border-l border-border/60 pl-5 sm:pl-7 font-body text-muted-foreground text-[15px] sm:text-[16.5px] leading-[1.75] font-light max-w-[38ch]">
                Revenue Infrastructure is our lens, not a limitation on what we provide.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Reading sequence */}
      <section className="section-padding pt-16 sm:pt-24 lg:pt-32 pb-24 sm:pb-32 lg:pb-44">
        <div ref={chaptersWrap} className="max-w-[1320px] mx-auto grid grid-cols-12 gap-x-6 lg:gap-x-10">
          {/* Persistent index column (desktop) */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-32">
              <div className="relative h-[180px] overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={active}
                    initial={reduced ? false : { y: "60%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={reduced ? undefined : { y: "-60%", opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 top-0 block font-heading text-[160px] leading-none text-foreground/15"
                  >
                    {chapters[active].n}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="mt-6 flex gap-6">
                <div className="relative w-px bg-border/70">
                  <motion.div style={{ scaleY: progressScale }} className="absolute inset-0 origin-top bg-foreground" />
                </div>
                <ol className="space-y-2">
                  {chapters.map((c, i) => (
                    <li key={c.n}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={active === i ? "step" : undefined}
                        className={`${eyebrow} min-h-[44px] text-left transition-[opacity,transform] duration-500 ${active === i ? "opacity-100 translate-x-1" : "opacity-40 hover:opacity-75"}`}
                      >
                        {c.n} {c.label}
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </aside>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6 space-y-24 sm:space-y-32 lg:space-y-44">
            {renderChapter(0)}
            {renderChapter(1)}
          </div>
        </div>
      </section>

      {/* Structural break: image anchors the turn from thinking to method */}
      <div ref={imgWrap} className="relative">
        <div className="pr-5 sm:pr-[10vw] lg:pr-[26vw]">
          <motion.div style={{ clipPath: clip }} className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
            <motion.img
              style={{ scale: imgScale, x: imgX }}
              src={aboutImage}
              alt="Limestone columns and steel beams intersecting within a considered architectural structure"
              loading="lazy"
              decoding="async"
              width={1536}
              height={1024}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
        <p className={`${eyebrow} section-padding mt-4 text-right`}>02 / 03</p>
      </div>

      <section className="section-padding pt-24 sm:pt-32 lg:pt-44 pb-24 sm:pb-32 lg:pb-40">
        <div className="max-w-[1320px] mx-auto grid grid-cols-12 gap-x-6 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">{renderChapter(2)}</div>
        </div>
      </section>

      {/* Closing role statement */}
      <section className="section-padding pb-28 sm:pb-36 lg:pb-52">
        <div
          className="max-w-[1320px] mx-auto scroll-mt-32"
          data-idx={3}
          ref={(el) => (refs.current[3] = el)}
        >
          <ScrollReveal>
            <div className="flex items-baseline justify-between border-t border-border/70 pt-5">
              <span className={eyebrow}>04 {chapters[3].label}</span>
              <span className={`${eyebrow} hidden sm:block`}>04 / 04</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120} variant="scale">
            <p className="mt-16 sm:mt-24 lg:mt-32 font-heading text-[30px] sm:text-[44px] lg:text-[60px] leading-[1.12] tracking-tightest text-foreground max-w-[22ch] lg:ml-[16%] text-balance">
              {paragraphs[6]}
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default About;
