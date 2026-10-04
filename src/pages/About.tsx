import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
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

const About = () => {
  useSEO({
    title: "About BitwellForge | Revenue Infrastructure Consulting",
    description: ABOUT_DESCRIPTION,
    canonicalPath: "/about",
    jsonLd: aboutJsonLd,
    jsonLdId: "about-jsonld",
  });

  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const imgWrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgWrap, offset: ["start end", "end start"] });
  const reduced = useReducedMotion();
  const imgScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.08, 1]);
  const clip = useTransform(scrollYProgress, [0, 0.45], reduced ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] : ["inset(0% 0% 0% 22%)", "inset(0% 0% 0% 0%)"]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx));
      }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="pt-20 overflow-x-clip">
      {/* Opening */}
      <section className="section-padding pt-16 sm:pt-24 lg:pt-32 pb-20 sm:pb-28 lg:pb-36">
        <div className="max-w-[1320px] mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between border-t border-border/70 pt-4">
              <p className="text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-[hsl(var(--eyebrow-color))] eyebrow">About BitwellForge</p>
              <p className="hidden sm:block text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-[hsl(var(--eyebrow-color))] eyebrow">01 / 04</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-12 mt-14 sm:mt-20 lg:mt-28">
            <div className="col-span-12 lg:col-span-10 xl:col-span-9">
              <ScrollReveal delay={120}>
                <h1 className="font-heading text-[34px] sm:text-[52px] lg:text-[68px] xl:text-[78px] font-normal text-foreground leading-[1.04] tracking-tightest text-balance">
                  We work across the mechanisms through which revenue is originated, converted, operationalised, and compounded.
                </h1>
              </ScrollReveal>
            </div>
            <div className="col-span-12 sm:col-start-5 sm:col-span-8 lg:col-start-8 lg:col-span-5 mt-14 sm:mt-20 lg:mt-24">
              <ScrollReveal delay={220}>
                <p className="border-l border-border/60 pl-5 sm:pl-7 font-body text-muted-foreground text-[15px] sm:text-[16.5px] leading-[1.75] font-light max-w-[38ch]">
                  Revenue Infrastructure is our lens, not a limitation on what we provide.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Visual anchor, bleeding to the right edge */}
      <div ref={imgWrap} className="pl-5 sm:pl-[12vw] lg:pl-[28vw]">
        <motion.div style={{ clipPath: clip }} className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
          <motion.img style={{ scale: imgScale }} src={aboutImage} alt="Limestone columns and steel beams intersecting within a considered architectural structure" loading="lazy" decoding="async" width={1536} height={1024} className="h-full w-full object-cover" />
        </motion.div>
      </div>

      {/* Chapters */}
      <section className="section-padding pt-24 sm:pt-32 lg:pt-44 pb-28 sm:pb-36 lg:pb-52">
        <div className="max-w-[1320px] mx-auto grid grid-cols-12 gap-x-6 lg:gap-x-10">
          <aside className="hidden md:block md:col-span-3">
            <nav aria-label="About sections" className="sticky top-32">
              <ol className="space-y-4">
                {chapters.map((c, i) => (
                  <li key={c.n}>
                    <button
                      type="button"
                      onClick={() => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" })}
                      className={`group flex items-center gap-4 min-h-[44px] text-left transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-40 hover:opacity-75"}`}
                    >
                      <span className={`h-px bg-foreground transition-all duration-500 ${active === i ? "w-10" : "w-4"}`} />
                      <span className="text-[10px] tracking-[0.28em] uppercase text-[hsl(var(--eyebrow-color))] eyebrow">{c.n} {c.label}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="col-span-12 md:col-span-9 lg:col-span-8 lg:col-start-5">
            {chapters.map((c, i) => (
              <article
                key={c.n}
                data-idx={i}
                ref={(el) => (refs.current[i] = el)}
                className={`scroll-mt-32 grid grid-cols-8 gap-x-6 border-t border-border/70 pt-8 sm:pt-10 ${i ? "mt-20 sm:mt-28 lg:mt-36" : ""}`}
              >
                <ScrollReveal className="col-span-8 sm:col-span-2">
                  <span className="block font-heading text-[56px] sm:text-[72px] lg:text-[96px] leading-none text-foreground/15">{c.n}</span>
                  <span className="md:hidden mt-3 block text-[10px] tracking-[0.28em] uppercase text-[hsl(var(--eyebrow-color))] eyebrow">{c.label}</span>
                </ScrollReveal>
                <div className="col-span-8 sm:col-span-6 mt-6 sm:mt-2 space-y-7 sm:space-y-9 max-w-[60ch]">
                  {c.paras.map((p, k) => (
                    <ScrollReveal key={p} delay={k * 80}>
                      <p className={k === 0 ? "font-heading text-[22px] sm:text-[26px] lg:text-[30px] leading-[1.3] text-foreground" : "font-body text-muted-foreground text-[15.5px] sm:text-[16.5px] lg:text-[17px] leading-[1.85] font-light"}>
                        {paragraphs[p]}
                      </p>
                    </ScrollReveal>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
