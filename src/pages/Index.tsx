import { useCallback, useState } from "react";
import HomePreloader from "@/components/home/HomePreloader";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useSEO } from "@/hooks/use-seo";
import { articles } from "@/pages/Insights";
import { caseStudies } from "@/lib/case-studies-data";
import heroImg from "@/assets/photos/system-hero.jpg";
import revImg from "@/assets/photos/system-revenue.jpg";
import strategyImg from "@/assets/photos/system-strategy.jpg";
import operationsImg from "@/assets/photos/system-operations.jpg";
import acquisitionImg from "@/assets/photos/system-acquisition.jpg";
import processImg from "@/assets/photos/system-process.jpg";
import insightsImg from "@/assets/photos/system-insights.jpg";
import visibilityImg from "@/assets/photos/system-visibility.jpg";
import preStratImg from "@/assets/photos/preloader/system-strategy-640.webp";
import preOpsImg from "@/assets/photos/preloader/system-operations-640.webp";
import preKnowledgeImg from "@/assets/photos/preloader/system-insights-640.webp";
import preConnectionsImg from "@/assets/photos/preloader/system-acquisition-640.webp";
import prePathwaysImg from "@/assets/photos/preloader/system-process-640.webp";
import preHeroImg from "@/assets/photos/preloader/system-hero-640.webp";

const ease = [0.22, 1, 0.36, 1] as const;
const wrap = "max-w-[1920px] mx-auto px-5 md:px-12 lg:px-[13.5%]";
const cap = "text-[13px] md:text-[14px] uppercase tracking-[0.02em] font-medium";

/** Word-by-word rising reveal for large editorial headlines. */
const SplitReveal = ({ text, lines, as: Tag = "h2", className = "", delay = 0, inView = true, play = true }: { text: string; lines?: string[]; as?: "h1" | "h2"; className?: string; delay?: number; inView?: boolean; play?: boolean }) => {
  const reduced = useReducedMotion();
  const MotionTag = Tag === "h1" ? motion.h1 : motion.h2;
  const trigger = reduced ? { animate: "show" } : inView ? { whileInView: "show", viewport: { once: true, margin: "-80px" } } : { animate: play ? "show" : "hide" };
  const renderWords = (t: string) => {
    const words = t.split(" ");
    return words.map((w, i) => (
      <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em]" aria-hidden>
        <motion.span className="inline-block" variants={{ hide: { y: "110%" }, show: { y: "0%", transition: { duration: reduced ? 0 : 0.8, ease } } }}>
          {w}{i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      </span>
    ));
  };
  return (
    <MotionTag className={className} initial={reduced ? false : "hide"} {...trigger}
      variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }} aria-label={text}>
      {lines
        ? lines.map((l, i) => <span key={i} className="block whitespace-nowrap">{renderWords(l)}</span>)
        : renderWords(text)}
    </MotionTag>
  );
};

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const reduced = useReducedMotion();
  return (
    <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, delay, ease }}>
      {children}
    </motion.div>
  );
};

const ArrowLink = ({ to, children, className = "" }: { to: string; children: React.ReactNode; className?: string }) => (
  <Link to={to} className={`group inline-flex items-center gap-3 min-h-[44px] ${cap} ${className}`}>
    <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
    <span className="bg-[length:0%_1px] bg-left-bottom bg-no-repeat bg-gradient-to-r from-current to-current transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">{children}</span>
  </Link>
);

const perspectiveLabels = ["Insight", "Analysis", "Trends"];
const perspectiveImgs = [strategyImg, operationsImg, insightsImg];

const Index = () => {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(!!reduced);
  const handleDone = useCallback(() => setReady(true), []);

  useSEO({
    title: "BitwellForge | Commercial Architecture & Constraint Advisory",
    description:
      "BitwellForge advises service businesses on the structural constraints governing commercial performance, identifying the interdependencies that impede growth across strategy, acquisition, operations, and digital execution.",
    canonicalPath: "/",
  });

  const story = caseStudies[0];
  const perspectives = articles.slice(0, 3);

  return (
    <div className="bf-home bg-background text-foreground">
      <HomePreloader images={[preStratImg, preOpsImg, preKnowledgeImg, preConnectionsImg, prePathwaysImg, preHeroImg]} headline="Real structure for compounding growth" onDone={handleDone} />

      {/* HERO */}
      <section className="relative mt-[72px] lg:mt-[113px]">
        <div className="relative h-[46svh] md:h-[62svh] min-h-[320px] overflow-hidden">
          <motion.img src={heroImg} alt="Concrete and steel transit spans converging into an engineered infrastructure system" width={1920} height={1088} fetchPriority="high" decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-[57%_center] md:object-center"
            initial={reduced ? false : { scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease }} />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" aria-hidden />
          <div className={`dark absolute inset-x-0 bottom-0 pb-10 md:pb-16`}>
            <div className={wrap}>
              <SplitReveal as="h1" inView={false} play={ready} delay={0.1} text="Real structure for compounding growth"
                lines={["Real structure for", "compounding growth"]}
                className="font-heading font-normal text-foreground text-[clamp(28px,9.6vw,52px)] md:text-[clamp(60px,8.2vw,78px)] lg:text-[clamp(80px,8.5vw,108px)] leading-[1] tracking-[-0.02em]" />
            </div>
          </div>
        </div>

        <div className={`${wrap} pt-10 md:pt-14 pb-24 md:pb-40`}>
          <Reveal>
            <p className="font-heading text-[28px] sm:text-[36px] md:text-[48px] lg:text-[54px] leading-[1.14] tracking-[-0.015em]">
              BitwellForge advises service businesses on the structural constraints governing commercial performance, identifying the interdependencies that impede growth across strategy, acquisition, operations, and digital execution.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CLIENT STORY */}
      <section className="pb-24 md:pb-40">
        <div className={`${wrap} grid md:grid-cols-12 gap-y-10 md:gap-x-8`}>
          <Reveal className="md:col-span-4"><p className={cap}>Client story</p></Reveal>
          <div className="md:col-span-8">
            <SplitReveal text={story.title} className="font-heading text-[32px] md:text-[48px] lg:text-[64px] leading-[1.1] tracking-[-0.02em] font-normal max-w-[18ch]" />
          </div>
          <Reveal className="md:col-span-4 md:col-start-1 md:row-start-2 md:self-end order-3 md:order-none">
            <div className="w-[60%] md:w-[72%] aspect-[225/243] overflow-hidden mb-5">
              <img src={revImg} alt="" aria-hidden loading="lazy" width={1536} height={1024} className="w-full h-full object-cover" />
            </div>
            <p className="text-[16px] leading-[1.5] max-w-[28ch] font-body mb-5">{story.subtitle}</p>
            <ArrowLink to={`/case-studies/${story.id}`}>Learn how we helped</ArrowLink>
            <p className="mt-3 text-[12px] text-muted-foreground">Concept study</p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-8 md:row-start-2">
            <Link to={`/case-studies/${story.id}`} className="block overflow-hidden aspect-[930/484] group">
              <img src={acquisitionImg} alt="Railway viaduct routes converging through an engineered junction" loading="lazy" width={1536} height={1024} className="w-full h-full object-cover transition-transform duration-1200 ease-out group-hover:scale-[1.04]" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FEATURED PERSPECTIVES */}
      <section className="pb-24 md:pb-40">
        <div className={wrap}>
          <SplitReveal text="Featured perspectives" className="font-heading text-[42px] md:text-[64px] lg:text-[80px] leading-[1] tracking-[-0.02em] font-normal mb-10 md:mb-14" />
        </div>
        <div className="max-w-[1920px] mx-auto px-5 md:px-12 lg:px-[12.5%]">
          <ol className="border-t border-foreground/60">
            {perspectives.map((a, i) => (
              <li key={a.slug} className="border-b border-foreground/60">
                <Link to={`/insights/${a.slug}`} className="group grid grid-cols-[48px_1fr_80px] md:grid-cols-12 gap-4 md:gap-8 py-6 md:py-5 md:px-5 items-start">
                  <span className="text-[14px] font-medium md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                  <div className="md:contents">
                    <span className={`${cap} block md:col-span-3 mb-3 md:mb-0`}>{perspectiveLabels[i]}</span>
                    <div className="md:col-span-6">
                      <h3 className="font-heading text-[24px] md:text-[32px] leading-[1.1] tracking-[-0.01em] font-normal mb-4 transition-colors">{a.title}</h3>
                      <span className={`inline-flex items-center gap-3 ${cap}`}>
                        <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
                        {a.category}
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-2 md:col-start-11 justify-self-end w-20 md:w-[108px] aspect-square overflow-hidden">
                    <img src={perspectiveImgs[i]} alt="" aria-hidden loading="lazy" width={1536} height={1024} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* TEAM COLLAGE */}
      <section className="pb-24 md:pb-32 overflow-hidden">
        <div className={`${wrap} grid grid-cols-12 gap-y-10 md:gap-x-6`}>
          <div className="col-span-12 md:col-span-6 relative h-[360px] md:h-[440px]">
            <Reveal className="absolute left-[30%] md:left-[30%] top-0 w-[52%] md:w-[48%] aspect-[224/280]"><img src={strategyImg} alt="" aria-hidden loading="lazy" width={1536} height={1024} className="w-full h-full object-cover" /></Reveal>
            <Reveal delay={0.15} className="absolute left-[8%] md:left-[10%] top-[34%] w-[52%] md:w-[48%]">
              <div className="aspect-[224/280] overflow-hidden"><img src={operationsImg} alt="" aria-hidden loading="lazy" width={1536} height={1024} className="w-full h-full object-cover" /></div>
              <ArrowLink to="/about" className="mt-2">Meet the practice</ArrowLink>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-6 relative h-[420px] md:h-[560px] md:mt-40">
            <Reveal className="absolute left-0 top-0 w-[70%] md:w-[60%]">
              <div className="aspect-[342/428] overflow-hidden"><img src={processImg} alt="" aria-hidden loading="lazy" width={1536} height={1024} className="w-full h-full object-cover" /></div>
              <ArrowLink to="/insights" className="mt-2">Recent insights</ArrowLink>
            </Reveal>
            <Reveal delay={0.15} className="absolute right-[4%] md:right-[8%] top-[58%] w-[40%] aspect-[224/280]"><img src={visibilityImg} alt="" aria-hidden loading="lazy" width={1536} height={1024} className="w-full h-full object-cover" /></Reveal>
          </div>
          <div className="col-span-12 md:col-span-6 md:row-start-2 md:-mt-40">
            <Reveal><p className={`${cap} mb-6`}>Be part of our team</p></Reveal>
            <SplitReveal text="Let's engineer real growth, together" className="font-heading text-[42px] md:text-[64px] lg:text-[80px] leading-[1] tracking-[-0.02em] font-normal max-w-[11ch]" />
            <ArrowLink to="/careers" className="mt-8">Careers</ArrowLink>
          </div>
        </div>
      </section>

      {/* CLOSING STATEMENT */}
      <section className="dark bg-background text-foreground relative">
        <div className={`${wrap} pt-10 md:pt-12 pb-32 md:pb-48`}>
          <Reveal>
            <h2 className="font-heading text-[52px] md:text-[88px] lg:text-[124px] leading-[1] tracking-[-0.02em] font-normal">
              <em className="italic">Structure</em> powers
              <br />growth
            </h2>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Index;
