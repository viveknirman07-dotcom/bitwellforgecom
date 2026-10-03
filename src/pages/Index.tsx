import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useSEO } from "@/hooks/use-seo";
import { articles } from "@/pages/Insights";
import { caseStudies } from "@/lib/case-studies-data";
import heroImg from "@/assets/photos/hero.jpg";
import caseImg from "@/assets/photos/case.jpg";
import acqImg from "@/assets/photos/acquisition.jpg";
import revImg from "@/assets/photos/revenue.jpg";
import stratImg from "@/assets/photos/strategy.jpg";
import opsImg from "@/assets/photos/operations.jpg";
import globalImg from "@/assets/photos/global.jpg";

const ease = [0.25, 0.1, 0.25, 1] as const;

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const reduced = useReducedMotion();
  return (
    <motion.div className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease }}>
      {children}
    </motion.div>
  );
};

const expertise = [
  { title: "Commercial Growth Strategy", body: "Positioning, pricing, and category resolved before any execution begins.", href: "/services/growth-strategy", img: stratImg },
  { title: "Client Acquisition Architecture", body: "Outbound and inbound demand engineered for pipeline density, not surface reach.", href: "/services/lead-generation", img: acqImg },
  { title: "High Ticket Revenue Systems", body: "Offers, discovery motions, and conversion logic that behave predictably.", href: "/services/sales-systems", img: revImg },
  { title: "AI Revenue Operations", body: "Scoring, routing, nurture, and reporting automated so teams own the irreplaceable work.", href: "/services/ai-automation", img: opsImg },
];

const labels = ["Insight", "Trends", "Operations", "Strategy", "Research", "Field Notes"];

const Index = () => {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);

  useSEO({
    title: "BitwellForge | Commercial Architecture & Constraint Advisory",
    description:
      "BitwellForge advises service businesses on the structural constraints governing commercial performance, identifying the interdependencies that impede growth across strategy, acquisition, operations, and digital execution.",
    canonicalPath: "/",
  });

  const featured = caseStudies[0];
  const latest = articles.slice(0, 6);

  return (
    <div className="bg-background text-foreground">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[92svh] flex items-end overflow-hidden">
        <motion.div className="absolute inset-0 -top-[10%] h-[120%] will-change-transform" style={{ y: imgY }}>
          <img src={heroImg} alt="BitwellForge advisors reviewing commercial strategy at dusk" width={1920} height={1088}
            className="w-full h-full object-cover" fetchPriority="high" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/10" aria-hidden />
        <div className="dark relative w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-10 pb-14 md:pb-20 pt-40">
          <motion.p className="text-[12px] md:text-[13px] uppercase tracking-[0.22em] text-foreground/80 mb-6"
            initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease }}>
            Commercial Architecture & Constraint Advisory
          </motion.p>
          <motion.h1 className="font-heading font-medium text-foreground leading-[1.04] tracking-[-0.02em] text-[40px] sm:text-[56px] md:text-[72px] lg:text-[88px] max-w-5xl"
            initial={reduced ? false : { opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35, ease }}>
            What's assembled breaks down.
            <br />
            What's engineered compounds.
          </motion.h1>
          <motion.div className="mt-8 md:mt-10 grid md:grid-cols-12 gap-8 items-end"
            initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6, ease }}>
            <p className="md:col-span-7 text-[16px] md:text-[18px] leading-[1.6] text-foreground/85">
              BitwellForge advises service businesses on the structural constraints governing commercial performance, identifying the interdependencies that impede growth across strategy, acquisition, operations, and digital execution.
            </p>
            <div className="md:col-span-5 md:justify-self-end w-full md:w-auto">
              <Link to="/contact?service=General+Inquiry" data-hero-primary-cta
                className="group w-full md:w-auto inline-flex items-center justify-center gap-2 h-14 px-8 bg-foreground text-background text-[14px] font-semibold tracking-wide transition-opacity hover:opacity-90">
                Book Infrastructure Audit
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED CASE */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-10">
          <FadeUp><p className="text-[12px] uppercase tracking-[0.22em] text-muted-foreground mb-8">In practice</p></FadeUp>
          <Link to={`/case-studies/${featured.id}`} className="group grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <FadeUp className="lg:col-span-7">
              <div className="overflow-hidden aspect-[3/2]">
                <img src={caseImg} alt="Founder and advisor reviewing a commercial plan" loading="lazy" width={1600} height={1072}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              </div>
            </FadeUp>
            <FadeUp delay={0.1} className="lg:col-span-5">
              <p className="text-[13px] font-medium text-muted-foreground mb-4">{featured.category} · Concept Study</p>
              <h2 className="font-heading text-[30px] md:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-0.01em] mb-6 group-hover:underline underline-offset-[6px] decoration-1">
                {featured.title}
              </h2>
              <p className="text-[16px] leading-[1.6] text-muted-foreground mb-8">{featured.subtitle}</p>
              <span className="inline-flex items-center gap-2 text-[14px] font-semibold">
                Read the study <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </FadeUp>
          </Link>
        </div>
      </section>

      {/* PERSPECTIVES */}
      <section className="py-12 md:py-16 lg:py-24 bg-secondary">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
            <FadeUp>
              <p className="text-[12px] uppercase tracking-[0.22em] text-muted-foreground mb-4">Latest perspectives</p>
              <h2 className="font-heading text-[32px] md:text-[44px] lg:text-[52px] leading-[1.08] tracking-[-0.01em] max-w-2xl">
                Thinking that shapes commercial decisions
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <Link to="/insights" className="group inline-flex items-center gap-2 text-[14px] font-semibold min-h-[44px]">
                View all insights <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </FadeUp>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-border">
            {latest.map((a, i) => (
              <FadeUp key={a.slug} delay={(i % 3) * 0.1}>
                <Link to={`/insights/${a.slug}`} className="group flex flex-col h-full py-8 md:pr-8 border-b border-border">
                  <p className="text-[13px] font-medium mb-5">
                    <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mx-2 text-muted-foreground">/</span>
                    {labels[i]}
                  </p>
                  <h3 className="font-heading text-[22px] md:text-[24px] leading-[1.25] mb-4 group-hover:underline underline-offset-4 decoration-1">{a.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-muted-foreground mb-6 line-clamp-3">{a.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-2 text-[13px] text-muted-foreground">
                    {a.category} · {a.date}
                    <ArrowRight size={14} className="ml-auto text-foreground transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-10">
          <FadeUp>
            <p className="text-[12px] uppercase tracking-[0.22em] text-muted-foreground mb-4">Our expertise</p>
            <h2 className="font-heading text-[32px] md:text-[44px] lg:text-[52px] leading-[1.08] tracking-[-0.01em] max-w-3xl mb-10 md:mb-14">
              Four disciplines engineered as one commercial system
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {expertise.map((e, i) => (
              <FadeUp key={e.href} delay={(i % 2) * 0.1}>
                <Link to={e.href} className="group block">
                  <div className="overflow-hidden aspect-[3/2] mb-6">
                    <img src={e.img} alt={e.title} loading="lazy" width={1200} height={800}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  </div>
                  <h3 className="font-heading text-[24px] md:text-[28px] leading-[1.2] mb-3 group-hover:underline underline-offset-4 decoration-1">{e.title}</h3>
                  <p className="text-[16px] leading-[1.6] text-muted-foreground mb-4 max-w-xl">{e.body}</p>
                  <span className="inline-flex items-center gap-2 text-[14px] font-semibold">
                    Explore <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL / CLOSING */}
      <section className="dark relative overflow-hidden bg-background text-foreground">
        <img src={globalImg} alt="" aria-hidden loading="lazy" width={1600} height={912} className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/20" aria-hidden />
        <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-10 py-20 md:py-28 lg:py-36">
          <FadeUp className="max-w-2xl">
            <p className="text-[12px] uppercase tracking-[0.22em] text-foreground/75 mb-4">Global footprint</p>
            <h2 className="font-heading text-[32px] md:text-[48px] lg:text-[56px] leading-[1.08] tracking-[-0.01em] mb-6">
              Advisory without borders. Delivered remotely, worldwide.
            </h2>
            <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/85 mb-10">
              We work with founders and operators across markets and time zones, building commercial architecture that holds wherever the business operates.
            </p>
            <Link to="/contact?service=General+Inquiry"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-8 bg-foreground text-background text-[14px] font-semibold transition-opacity hover:opacity-90">
              Book Infrastructure Audit <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
};

export default Index;
