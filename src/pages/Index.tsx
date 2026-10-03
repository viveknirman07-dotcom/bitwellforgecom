import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useSEO } from "@/hooks/use-seo";
import { articles } from "@/pages/Insights";
import { caseStudies } from "@/lib/case-studies-data";
import heroImg from "@/assets/photos/hero.jpg";
import caseImg from "@/assets/photos/case.jpg";
import stratImg from "@/assets/photos/strategy.jpg";

const ease = [0.22, 1, 0.36, 1] as const;
const wrap = "max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14";
const label = "font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em]";

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const reduced = useReducedMotion();
  return (
    <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay, ease }}>
      {children}
    </motion.div>
  );
};

const SectionHead = ({ n, eyebrow, title, className = "" }: { n: string; eyebrow: string; title: React.ReactNode; className?: string }) => (
  <div className={`grid lg:grid-cols-12 gap-6 lg:gap-10 mb-12 md:mb-16 ${className}`}>
    <Reveal className="lg:col-span-3"><p className={`${label} text-muted-foreground`}><span className="text-foreground">{n}</span> &nbsp;{eyebrow}</p></Reveal>
    <Reveal delay={0.08} className="lg:col-span-9">
      <h2 className="font-heading font-semibold text-[36px] sm:text-[44px] lg:text-[64px] leading-[1.02]">{title}</h2>
    </Reveal>
  </div>
);

const capabilities = [
  { name: "Commercial Growth Strategy", href: "/services/growth-strategy", objective: "Resolve positioning, pricing, and category before any execution begins.", changes: "Direction becomes explicit, so every downstream investment answers to one commercial thesis.", components: ["Market definition", "Offer architecture", "Pricing logic"], outputs: "Strategy document, priority roadmap, decision criteria", tech: "Market research tooling, analytics", related: [1, 3] },
  { name: "Client Acquisition Architecture", href: "/services/lead-generation", objective: "Engineer demand for pipeline density rather than surface reach.", changes: "Acquisition shifts from sporadic campaigns to a measured, repeatable intake system.", components: ["Ideal client definition", "Outbound systems", "Inbound pathways"], outputs: "Acquisition model, channel plan, qualification rules", tech: "CRM, enrichment, sequencing", related: [0, 2] },
  { name: "High Ticket Revenue Systems", href: "/services/sales-systems", objective: "Build offers, discovery motions, and conversion logic that behave predictably.", changes: "Sales conversations follow a structure, so outcomes stop depending on individual talent.", components: ["Discovery framework", "Proposal system", "Objection logic"], outputs: "Sales playbook, proposal templates, stage definitions", tech: "CRM pipelines, call intelligence", related: [1, 4] },
  { name: "Market Authority Positioning", href: "/services/linkedin", objective: "Establish a credible, specific point of view the market recognises.", changes: "Authority compounds through consistent thinking rather than volume of content.", components: ["Point of view", "Editorial system", "Founder presence"], outputs: "Narrative framework, editorial calendar", tech: "Publishing and analytics platforms", related: [0, 5] },
  { name: "AI Revenue Operations", href: "/services/ai-automation", objective: "Automate scoring, routing, nurture, and reporting.", changes: "Teams own the irreplaceable work while systems carry the repeatable work.", components: ["Lead scoring", "Routing", "Reporting"], outputs: "Automation map, deployed workflows, dashboards", tech: "AI models, workflow automation, CRM", related: [2, 6] },
  { name: "Search and Digital Visibility", href: "/services/seo", objective: "Make the business discoverable where buyers research decisions.", changes: "Visibility becomes an owned asset instead of rented attention.", components: ["Technical search", "Content architecture", "Authority signals"], outputs: "Search strategy, content plan, technical fixes", tech: "Search analytics, site infrastructure", related: [3, 6] },
  { name: "Performance Growth", href: "/services/performance-marketing", objective: "Deploy paid demand against a validated commercial model.", changes: "Spend is tied to unit economics rather than platform metrics.", components: ["Channel economics", "Creative testing", "Attribution"], outputs: "Media plan, testing framework, reporting", tech: "Ad platforms, attribution tooling", related: [1, 5] },
  { name: "Digital Product Commercialisation", href: "/services/digital-products", objective: "Turn expertise into productised, scalable offers.", changes: "Revenue decouples from hours through structured, repeatable products.", components: ["Product definition", "Packaging", "Launch system"], outputs: "Product blueprint, pricing, launch plan", tech: "Commerce and delivery platforms", related: [0, 2] },
];

const model = ["Strategy", "Positioning", "Acquisition", "Conversion", "Revenue Operations", "Compounding"];
const techFlow = ["Strategy", "Data", "AI", "Automation", "Systems", "Execution", "Revenue"];
const stages = [
  { name: "Diagnose", body: "Map the commercial system and locate the constraint that governs performance.", out: "Constraint diagnosis" },
  { name: "Architect", body: "Design the structure that removes the constraint and connects the parts.", out: "System blueprint" },
  { name: "Build", body: "Construct the offers, pathways, and infrastructure the design requires.", out: "Deployed assets" },
  { name: "Deploy", body: "Put the system into operation with clear ownership and measurement.", out: "Operating cadence" },
  { name: "Compound", body: "Refine against evidence so each cycle strengthens the next.", out: "Improvement loop" },
];
const fragments = ["Marketing", "Sales", "Positioning", "Technology", "Automation", "Content", "CRM", "Outreach"];

const HeroSystem = () => {
  const reduced = useReducedMotion();
  const nodes = [[40, 60], [130, 30], [220, 70], [90, 140], [190, 160], [280, 130], [150, 230], [260, 230]];
  const links = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5], [3, 6], [4, 6], [5, 7], [6, 7]];
  return (
    <svg viewBox="0 0 320 280" className="w-full h-full" aria-hidden>
      {links.map(([a, b], i) => (
        <motion.line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="hsl(var(--foreground) / 0.35)" strokeWidth="0.75"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 + i * 0.06, ease }} />
      ))}
      {nodes.map(([x, y], i) => (
        <motion.g key={i} initial={reduced ? false : { opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 + i * 0.05, ease }} style={{ transformOrigin: `${x}px ${y}px` }}>
          <rect x={x - 4} y={y - 4} width="8" height="8" fill={i === 7 ? "hsl(var(--lime))" : "hsl(var(--background))"} stroke="hsl(var(--foreground))" strokeWidth="0.75" />
        </motion.g>
      ))}
      <text x="268" y="252" className="font-mono" fontSize="7" fill="hsl(var(--foreground) / 0.7)" letterSpacing="1">COMPOUNDING</text>
      <text x="22" y="44" className="font-mono" fontSize="7" fill="hsl(var(--foreground) / 0.7)" letterSpacing="1">INPUT</text>
    </svg>
  );
};

const Index = () => {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const cap = capabilities[active];

  useSEO({
    title: "BitwellForge | Commercial Architecture & Constraint Advisory",
    description:
      "BitwellForge advises service businesses on the structural constraints governing commercial performance, identifying the interdependencies that impede growth across strategy, acquisition, operations, and digital execution.",
    canonicalPath: "/",
  });

  const studies = caseStudies.slice(0, 3);
  const latest = articles.slice(0, 4);
  const lead = articles[0];

  const enter = (d: number) => ({
    initial: reduced ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: d, ease },
  });

  return (
    <div className="bg-background text-foreground">
      {/* 01 HERO */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 border-b border-border">
        <div className={`${wrap} grid lg:grid-cols-12 gap-10 lg:gap-12 items-end`}>
          <div className="lg:col-span-8">
            <motion.p {...enter(0.1)} className={`${label} text-muted-foreground mb-8 flex items-center gap-3`}>
              <span className="w-2 h-2 bg-lime" aria-hidden /> A Growth Practice
            </motion.p>
            <motion.h1 {...enter(0.2)} className="font-heading font-bold uppercase text-[44px] sm:text-[60px] md:text-[80px] lg:text-[100px] leading-[0.94] tracking-[-0.035em]">
              What's assembled breaks down.
              <span className="block text-muted-foreground">What's engineered compounds.</span>
            </motion.h1>
            <motion.p {...enter(0.4)} className="mt-10 max-w-2xl text-[17px] md:text-[20px] leading-[1.55] text-muted-foreground">
              BitwellForge works alongside founders and operators building service-based businesses, designing the commercial infrastructure that sustains growth beyond any single campaign.
            </motion.p>
            <motion.div {...enter(0.5)} className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link to="/contact" data-hero-primary-cta className="group inline-flex items-center justify-center gap-3 h-14 px-8 bg-primary text-primary-foreground text-[13px] font-semibold uppercase tracking-[0.12em] hover:bg-lime hover:text-accent-foreground transition-colors">
                Start a Conversation <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/services" className="group inline-flex items-center justify-center gap-3 h-14 px-8 border border-foreground/30 text-[13px] font-semibold uppercase tracking-[0.12em] hover:border-foreground transition-colors">
                Explore Our Capabilities <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          </div>
          <motion.div {...enter(0.3)} className="lg:col-span-4 relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={heroImg} alt="Advisor reviewing commercial strategy" width={1920} height={1080} fetchPriority="high" className="absolute inset-0 w-full h-full object-cover grayscale contrast-110" />
              <div className="absolute inset-0 bg-background/70" aria-hidden />
              <div className="absolute inset-0 p-6"><HeroSystem /></div>
            </div>
            <p className={`${label} text-muted-foreground mt-4`}>Fig. 01 &nbsp;Systems, connections, compounding</p>
          </motion.div>
        </div>
      </section>

      {/* STRIP */}
      <section className="border-b border-border">
        <div className={`${wrap} grid grid-cols-2 md:grid-cols-4`}>
          {["Strategy", "Systems", "Technology", "Execution"].map((w, i) => (
            <div key={w} className={`py-8 md:py-10 flex items-center gap-4 ${i % 2 ? "pl-5 md:pl-8" : ""} ${i ? "md:border-l border-border md:pl-8" : ""} ${i === 1 || i === 3 ? "border-l border-border" : ""}`}>
              <span className="font-mono text-[11px] text-muted-foreground">{i ? "+" : "0" + (i + 1)}</span>
              <span className="font-heading font-semibold uppercase text-[18px] md:text-[24px] tracking-tight">{w}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 02 PROBLEM */}
      <section className="py-20 md:py-32">
        <div className={wrap}>
          <SectionHead n="02" eyebrow="The Problem" title="Growth rarely fails because the ambition is missing." />
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-10">
            <Reveal className="lg:col-span-4 lg:col-start-4 text-[17px] md:text-[19px] leading-[1.6] text-muted-foreground space-y-6">
              <p>Businesses accumulate disconnected activity: marketing, sales, positioning, technology, automation, content, CRM, outreach.</p>
              <p className="text-foreground">The problem is not the individual components. It is the architecture connecting them.</p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-px bg-border border border-border">
                {fragments.map((f, i) => (
                  <motion.div key={f} className="bg-background p-5 flex items-center justify-between"
                    initial={reduced ? false : { opacity: 0.25, x: i % 2 ? 14 : -14 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: i * 0.06, ease }}>
                    <span className="text-[15px] font-medium">{f}</span>
                    <span className={`w-1.5 h-1.5 ${i === fragments.length - 1 ? "bg-lime" : "bg-foreground/40"}`} />
                  </motion.div>
                ))}
              </div>
              <p className={`${label} text-muted-foreground mt-4`}>Fig. 02 &nbsp;Fragmented parts, one connected system</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 MODEL */}
      <section className="dark bg-background text-foreground py-20 md:py-32">
        <div className={wrap}>
          <SectionHead n="03" eyebrow="The BitwellForge Model" title={<>Six stages. <span className="text-muted-foreground">One compounding system.</span></>} />
          <ol className="grid md:grid-cols-3 lg:grid-cols-6 border-t border-border">
            {model.map((m, i) => (
              <Reveal key={m} delay={i * 0.07}>
                <li className="relative h-full py-8 lg:pr-6 border-b lg:border-b-0 border-border lg:border-r last:border-r-0 lg:pl-0">
                  <span className={`${label} ${i === model.length - 1 ? "text-lime" : "text-muted-foreground"}`}>Stage {String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-10 font-heading font-semibold text-[22px] lg:text-[20px] xl:text-[24px] leading-tight lg:pl-0">{m}</p>
                  <span className={`absolute left-0 top-0 h-px ${i === model.length - 1 ? "bg-lime w-full" : "bg-foreground w-10"}`} aria-hidden />
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 CAPABILITIES */}
      <section className="py-20 md:py-32 border-b border-border">
        <div className={wrap}>
          <SectionHead n="04" eyebrow="Capabilities" title="An operating model, not a menu of services." />
          <div className="grid lg:grid-cols-12 gap-10">
            <ul className="lg:col-span-6 border-t border-border" role="tablist" aria-label="Capabilities">
              {capabilities.map((c, i) => (
                <li key={c.name}>
                  <button role="tab" aria-selected={active === i} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
                    className="w-full min-h-[64px] flex items-center gap-5 py-4 border-b border-border text-left group">
                    <span className={`font-mono text-[12px] w-6 ${active === i ? "text-foreground" : "text-muted-foreground"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={`flex-1 font-heading font-semibold uppercase text-[16px] md:text-[20px] tracking-tight transition-colors ${active === i ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>{c.name}</span>
                    <span className={`w-2 h-2 transition-colors ${active === i ? "bg-lime" : "bg-transparent"}`} aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
            <div className="lg:col-span-6 lg:pl-10 lg:border-l border-border" role="tabpanel">
              <motion.div key={active} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}>
                <p className={`${label} text-muted-foreground mb-4`}>Strategic objective</p>
                <p className="font-heading font-semibold text-[26px] md:text-[34px] leading-[1.15] mb-10">{cap.objective}</p>
                <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-8 text-[15px] leading-[1.6]">
                  <div className="sm:col-span-2"><dt className={`${label} text-muted-foreground mb-2`}>What changes</dt><dd>{cap.changes}</dd></div>
                  <div><dt className={`${label} text-muted-foreground mb-2`}>System components</dt><dd>{cap.components.join(", ")}</dd></div>
                  <div><dt className={`${label} text-muted-foreground mb-2`}>Typical outputs</dt><dd>{cap.outputs}</dd></div>
                  <div><dt className={`${label} text-cobalt mb-2`}>Technologies</dt><dd>{cap.tech}</dd></div>
                  <div><dt className={`${label} text-muted-foreground mb-2`}>Related</dt><dd>{cap.related.map((r) => capabilities[r].name).join(", ")}</dd></div>
                </dl>
                <Link to={cap.href} className="group mt-10 inline-flex items-center gap-3 min-h-[44px] text-[13px] font-semibold uppercase tracking-[0.12em] border-b border-foreground">
                  Explore capability <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 TECHNOLOGY */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className={wrap}>
          <SectionHead n="05" eyebrow="Technology and AI" title={<>Strategy builds the direction.<br /><span className="text-cobalt">Technology builds the leverage.</span></>} />
          <div className="grid lg:grid-cols-12 gap-10">
            <Reveal className="lg:col-span-3 text-[17px] leading-[1.6] text-muted-foreground">
              A consulting practice that understands technology deeply. Data, AI, and automation are deployed in service of the commercial model, never as ends in themselves.
            </Reveal>
            <div className="lg:col-span-9 flex flex-col md:flex-row md:items-stretch">
              {techFlow.map((t, i) => (
                <Reveal key={t} delay={i * 0.06} className="flex md:flex-col flex-1 items-center md:items-stretch">
                  <div className={`flex-1 w-full border p-4 md:min-h-[120px] flex md:flex-col justify-between gap-3 ${t === "AI" ? "border-cobalt" : "border-border"} ${t === "Revenue" ? "bg-primary text-primary-foreground border-primary" : "bg-background"}`}>
                    <span className={`font-mono text-[10px] ${t === "AI" ? "text-cobalt" : "opacity-60"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-heading font-semibold uppercase text-[14px] tracking-tight">{t}</span>
                  </div>
                  {i < techFlow.length - 1 && <span className="hidden md:block" aria-hidden />}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 06 HOW WE WORK */}
      <section className="py-20 md:py-32">
        <div className={wrap}>
          <SectionHead n="06" eyebrow="How We Work" title="Five stages from diagnosis to compounding." />
          <ol className="grid md:grid-cols-5 gap-px bg-border border border-border">
            {stages.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.08} className="bg-background">
                <li className="h-full p-6 md:p-7 flex flex-col">
                  <span className="font-mono text-[12px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-8 font-heading font-bold uppercase text-[24px] tracking-tight">{s.name}</p>
                  <p className="mt-4 text-[15px] leading-[1.6] text-muted-foreground flex-1">{s.body}</p>
                  <p className={`${label} mt-8 pt-4 border-t border-border flex items-center gap-2`}><span className="w-1.5 h-1.5 bg-lime" />{s.out}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 07 IMPACT */}
      <section className="py-20 md:py-32 border-t border-border">
        <div className={wrap}>
          <SectionHead n="07" eyebrow="Impact" title="Engagements, documented as engagements." />
          <Reveal>
            <Link to={`/case-studies/${studies[0].id}`} className="group grid lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-border">
              <div className="lg:col-span-7 overflow-hidden aspect-[16/10]">
                <img src={caseImg} alt="Advisor and founder reviewing a commercial plan" loading="lazy" width={1600} height={1066} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="lg:col-span-5 flex flex-col">
                <p className={`${label} text-muted-foreground`}>{studies[0].category} &nbsp;Concept Study</p>
                <h3 className="mt-6 font-heading font-semibold text-[30px] md:text-[40px] leading-[1.08]">{studies[0].title}</h3>
                <p className="mt-6 text-[16px] leading-[1.6] text-muted-foreground">{studies[0].subtitle}</p>
                <dl className="mt-8 grid grid-cols-2 gap-4 text-[13px]">
                  {["Challenge", "Intervention", "System", "Result"].map((k) => <dt key={k} className={`${label} text-muted-foreground border-t border-border pt-3`}>{k}</dt>)}
                </dl>
                <span className="mt-auto pt-8 inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.12em]">Read the engagement <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          </Reveal>
          <div className="grid md:grid-cols-2">
            {studies.slice(1).map((s, i) => (
              <Reveal key={s.id} delay={i * 0.08}>
                <Link to={`/case-studies/${s.id}`} className={`group block py-10 ${i ? "md:pl-10 md:border-l border-border" : "md:pr-10"} border-b border-border`}>
                  <p className={`${label} text-muted-foreground`}>{s.category}</p>
                  <h3 className="mt-4 font-heading font-semibold text-[24px] leading-[1.2] group-hover:underline underline-offset-4 decoration-1">{s.title}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
          <Link to="/case-studies" className="group mt-10 inline-flex items-center gap-3 min-h-[44px] text-[13px] font-semibold uppercase tracking-[0.12em]">All case studies <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link>
        </div>
      </section>

      {/* 08 INSIGHTS + FEATURED THINKING */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className={wrap}>
          <SectionHead n="08" eyebrow="Insights" title="A point of view on commercial architecture." />
          <Reveal>
            <Link to={`/insights/${lead.slug}`} className="group block dark bg-background text-foreground p-8 md:p-14 mb-12">
              <p className={`${label} text-lime`}>Featured thinking &nbsp;The Revenue Infrastructure Report</p>
              <h3 className="mt-8 font-heading font-bold text-[32px] md:text-[56px] leading-[1.02] max-w-4xl">{lead.title}</h3>
              <p className="mt-6 max-w-2xl text-[17px] leading-[1.6] text-muted-foreground">{lead.excerpt}</p>
              <span className="mt-10 inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.12em]">Read the essay <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
            </Link>
          </Reveal>
          <div className="grid md:grid-cols-3 border-t border-border">
            {latest.slice(1).map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.08}>
                <Link to={`/insights/${a.slug}`} className={`group flex flex-col h-full py-8 ${i ? "md:pl-8 md:border-l border-border" : ""} md:pr-8 border-b md:border-b-0 border-border`}>
                  <p className={`${label} text-muted-foreground`}>{a.category}</p>
                  <h3 className="mt-5 font-heading font-semibold text-[22px] leading-[1.2] group-hover:underline underline-offset-4 decoration-1">{a.title}</h3>
                  <p className="mt-4 text-[15px] leading-[1.6] text-muted-foreground line-clamp-3">{a.excerpt}</p>
                  <p className="mt-auto pt-6 font-mono text-[11px] text-muted-foreground">{a.date}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Link to="/insights" className="group mt-10 inline-flex items-center gap-3 min-h-[44px] text-[13px] font-semibold uppercase tracking-[0.12em]">The full library <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link>
        </div>
      </section>

      {/* 09 PEOPLE */}
      <section className="py-20 md:py-32">
        <div className={`${wrap} grid lg:grid-cols-12 gap-10 items-center`}>
          <Reveal className="lg:col-span-6">
            <div className="aspect-[4/5] overflow-hidden"><img src={stratImg} alt="BitwellForge practitioners in a working session" loading="lazy" width={1200} height={800} className="w-full h-full object-cover" /></div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <p className={`${label} text-muted-foreground`}>09 &nbsp;The Practice</p>
            <h2 className="mt-6 font-heading font-semibold text-[36px] md:text-[52px] leading-[1.04]">Growth is not a campaign. Growth is an operating system.</h2>
            <p className="mt-6 text-[17px] leading-[1.6] text-muted-foreground">BitwellForge is a practice of operators and strategists who work inside the commercial system rather than around it.</p>
            <Link to="/about" className="group mt-10 inline-flex items-center gap-3 min-h-[44px] text-[13px] font-semibold uppercase tracking-[0.12em] border-b border-foreground">About the firm <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link>
          </Reveal>
        </div>
      </section>

      {/* CLOSING */}
      <section className="dark bg-background text-foreground py-24 md:py-36">
        <div className={`${wrap} grid lg:grid-cols-12 gap-10 items-end`}>
          <h2 className="lg:col-span-8 font-heading font-bold uppercase text-[44px] md:text-[80px] leading-[0.95] tracking-[-0.035em]">Build what comes next.</h2>
          <div className="lg:col-span-4 lg:justify-self-end w-full lg:w-auto">
            <Link to="/contact" className="group w-full inline-flex items-center justify-center gap-3 h-14 px-8 bg-lime text-accent-foreground text-[13px] font-semibold uppercase tracking-[0.12em] hover:opacity-90 transition-opacity">
              Start a Conversation <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
