import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useSEO } from "@/hooks/use-seo";

interface ServiceModule {
  id: string;
  title: string;
  layer: string;
  solves: string;
  builds: string;
  creates: string;
  idealFor: string;
}

const services: ServiceModule[] = [
  {
    id: "growth-strategy",
    title: "Commercial Growth Strategy",
    layer: "Strategy Layer",
    solves:
      "Fragmented positioning, unclear market focus, and growth decisions made without an underlying commercial thesis.",
    builds:
      "Business positioning, go-to-market architecture, market expansion planning, and a strategic decision framework the business operates against.",
    creates: "A commercial thesis every subsequent investment compounds against.",
    idealFor: "Founders. Executives. B2B service firms scaling past inflection.",
  },
  {
    id: "lead-generation",
    title: "Client Acquisition Architecture",
    layer: "Acquisition Layer",
    solves:
      "Pipelines dependent on referrals, single channels, or personal networks. Demand that arrives unpredictably.",
    builds:
      "Outbound systems, inbound engines, qualification frameworks, appointment infrastructure, and channel orchestration mapped to the sales cycle.",
    creates: "Predictable qualified conversations, engineered as infrastructure.",
    idealFor: "Advisory firms. Boutique agencies. Executive-led B2B brands.",
  },
  {
    id: "sales-systems",
    title: "High-Ticket Revenue Systems",
    layer: "Revenue Layer",
    solves:
      "Inconsistent close rates, price erosion, and revenue outcomes that depend on individual talent rather than shared infrastructure.",
    builds:
      "Revenue engine design, discovery architecture, proposal logic, CRM workflows, and closing systems that operate independently of any single seller.",
    creates: "Repeatable conversion at the price point the business intends to hold.",
    idealFor: "Consulting practices. Advisors. High-ticket B2B specialists.",
  },
  {
    id: "linkedin",
    title: "Market Authority Positioning",
    layer: "Authority Layer",
    solves:
      "Anonymous presence in categories where buyers evaluate credibility long before they respond.",
    builds:
      "Executive positioning, founder branding, thought leadership architecture, and content systems engineered to convert perception into pipeline.",
    creates: "Inbound demand from senior buyers who already trust the brand.",
    idealFor: "Founders. Executives. Independent advisors.",
  },
  {
    id: "ai-automation",
    title: "AI-Powered Revenue Operations",
    layer: "Operations Layer",
    solves:
      "Manual repetition, fragmented data, and operational drag that scales linearly with revenue.",
    builds:
      "Automation workflows, AI-assisted lead routing, CRM automation, reporting systems, and intelligent operational processes.",
    creates: "Operational leverage that multiplies team capacity without adding headcount.",
    idealFor: "Service businesses. Operations-heavy practices.",
  },
  {
    id: "seo",
    title: "Search & Digital Visibility",
    layer: "Visibility Layer",
    solves:
      "Invisibility in the searches buyers actually run. Content that ranks for nothing commercially relevant.",
    builds:
      "Technical SEO, semantic content architecture, topical authority, and long-horizon search infrastructure the business owns.",
    creates: "Organic visibility that appreciates as an asset the business owns.",
    idealFor: "Knowledge businesses. Long-cycle advisory practices.",
  },
  {
    id: "performance-marketing",
    title: "Performance Growth",
    layer: "Performance Layer",
    solves:
      "Paid spend that produces clicks without pipeline, and vanity metrics that obscure the underlying unit economics.",
    builds:
      "Attribution frameworks, creative testing systems, conversion optimization, and budget architecture engineered around measurable growth.",
    creates: "Paid acquisition that behaves like infrastructure, not expense.",
    idealFor: "Scaled service firms. Brands with established offer-market fit.",
  },
  {
    id: "digital-products",
    title: "Digital Product Commercialization",
    layer: "Product Layer",
    solves:
      "Launches driven by energy that stall the moment attention shifts elsewhere.",
    builds:
      "Digital product strategy, validation systems, launch infrastructure, monetization architecture, and post-launch scaling loops.",
    creates: "Recurring revenue from productized expertise, engineered to scale.",
    idealFor: "Experts productizing expertise. Founders scaling beyond services.",
  },
];

const num = (i: number) => String(i + 1).padStart(2, "0");

const Detail = ({ s }: { s: ServiceModule }) => (
  <div className="space-y-6">
    {([
      ["Solves", s.solves, false],
      ["Builds", s.builds, false],
      ["Creates", s.creates, true],
      ["Ideal For", s.idealFor, false],
    ] as const).map(([label, text, em]) => (
      <div key={label} className="grid grid-cols-1 md:grid-cols-[110px_1fr] gap-2 md:gap-6">
        <p className="text-[10px] tracking-[0.22em] uppercase text-gold/70 pt-1">{label}</p>
        <p className={`text-[13.5px] md:text-[15px] leading-[1.8] font-light ${em ? "text-foreground/90 italic" : "text-muted-foreground"}`}>{text}</p>
      </div>
    ))}
  </div>
);

const ServiceIndex = () => {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const s = services[active];

  return (
    <>
      {/* Tablet and desktop: index + detail panel */}
      <div className="hidden md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-20 border-t border-gold/20">
        <div className="flex items-baseline justify-between col-span-2 pt-5 -mb-4">
          <p className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">Service index</p>
          <p className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
            <span className="text-gold">{num(active)}</span> / {num(services.length - 1)}
          </p>
        </div>
        <ol role="tablist" aria-orientation="vertical" aria-label="Services">
          {services.map((item, i) => {
            const on = i === active;
            return (
              <li key={item.id} className="border-b border-gold/10">
                <button
                  role="tab"
                  aria-selected={on}
                  aria-controls="service-panel"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group w-full flex items-baseline gap-5 py-5 text-left"
                >
                  <span className={`w-7 shrink-0 font-quote italic text-lg transition-colors duration-500 ${on ? "text-gold" : "text-muted-foreground/60"}`}>{num(i)}</span>
                  <span className={`font-heading text-xl lg:text-[26px] leading-[1.2] tracking-tightest transition-all duration-500 ${on ? "text-foreground translate-x-2" : "text-muted-foreground group-hover:text-foreground"}`}>
                    {item.title}
                  </span>
                  <span className={`ml-auto h-px self-center bg-gold transition-all duration-500 origin-right ${on ? "w-8 opacity-100" : "w-0 opacity-0"}`} />
                </button>
              </li>
            );
          })}
        </ol>
        <div className="relative">
          <div id="service-panel" role="tabpanel" className="md:sticky md:top-28 pt-10">
            <motion.div key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-quote italic text-gold text-5xl lg:text-6xl leading-none">{num(active)}</span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-gold/80">{s.layer}</span>
              </div>
              <h2 className="font-heading text-3xl lg:text-[44px] font-normal text-foreground tracking-tightest leading-[1.1] mb-10 text-balance">
                {s.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="font-quote italic text-gold/95 font-normal">{s.title.split(" ").slice(-1)[0]}</span>
              </h2>
              <div className="border-t border-gold/15 pt-8">
                <Detail s={s} />
              </div>
              <Link
                to={`/services/${s.id}`}
                className="group inline-flex items-center gap-3 mt-10 text-[11px] tracking-[0.22em] uppercase text-foreground border-b border-gold/40 pb-2 hover:border-gold transition-colors duration-500"
              >
                Explore {s.title}
                <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile: vertical expanding index */}
      <ol className="md:hidden border-t border-gold/20">
        {services.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.id} className="border-b border-gold/10">
              <button
                aria-expanded={isOpen}
                aria-controls={`svc-${item.id}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-start gap-4 py-6 text-left"
              >
                <span className={`w-6 shrink-0 font-quote italic text-lg pt-0.5 transition-colors duration-500 ${isOpen ? "text-gold" : "text-muted-foreground/60"}`}>{num(i)}</span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[10px] tracking-[0.25em] uppercase text-gold/80 mb-2">{item.layer}</span>
                  <span className="block font-heading text-[22px] leading-[1.2] tracking-tightest text-foreground">{item.title}</span>
                </span>
                <span className={`relative w-3 h-3 mt-2 shrink-0 transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`} aria-hidden>
                  <span className="absolute inset-x-0 top-1/2 h-px bg-gold" />
                  <span className="absolute inset-y-0 left-1/2 w-px bg-gold" />
                </span>
              </button>
              <div
                id={`svc-${item.id}`}
                className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <div className={`pl-10 pb-8 transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}>
                    <Detail s={item} />
                    <Link
                      to={`/services/${item.id}`}
                      className="inline-flex items-center gap-3 mt-8 text-[11px] tracking-[0.22em] uppercase text-foreground border-b border-gold/40 pb-2"
                    >
                      Explore <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
};

const Services = () => {
  useSEO({
    title: "Services | BitwellForge",
    description:
      "Revenue infrastructure modules across strategy, acquisition, conversion, authority, automation, visibility, performance, and product.",
    canonicalPath: "/services",
  });

  return (
    <div className="pt-20">
      <section className="section-padding section-y">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-16 md:mb-20">
            <ScrollReveal>
              <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-5 eyebrow">
                Services
              </p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <h1 className="font-heading text-[36px] md:text-[58px] lg:text-[68px] font-normal text-foreground leading-[1.05] tracking-tightest mb-8 text-balance">
                Infrastructure modules.{" "}
                <span className="font-quote italic text-gold/95">One operating system.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-muted-foreground text-[15px] md:text-lg leading-[1.85] font-light">
                Each module operates as a layer of a single revenue architecture. Engaged independently, they solve a specific bottleneck. Engaged together, they compound into a self-reinforcing growth engine.
              </p>
            </ScrollReveal>
          </div>

          <ServiceIndex />
        </div>
      </section>
    </div>
  );
};

export default Services;
