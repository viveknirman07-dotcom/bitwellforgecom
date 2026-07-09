import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CTABlock from "@/components/CTABlock";
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
              <h1 className="font-heading text-[36px] md:text-[58px] lg:text-[68px] font-semibold text-foreground leading-[1.05] tracking-tightest mb-8 text-balance">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gold/15 border border-gold/15 rounded-xl overflow-hidden">
            {services.map((s, i) => (
              <ScrollReveal key={s.id} delay={(i % 2) * 80}>
                <Link
                  to={`/services/${s.id}`}
                  className="group block h-full bg-background p-8 md:p-10 hover:bg-card/60 transition-colors duration-500 scroll-mt-24"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-quote italic text-gold text-xl">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[10px] tracking-[0.25em] uppercase text-gold/80">
                          {s.layer}
                        </span>
                      </div>
                      <h2 className="font-heading text-2xl md:text-[28px] font-semibold text-foreground tracking-tightest leading-[1.15] group-hover:text-gold/95 transition-colors duration-400">
                        {s.title.split(" ").slice(0, -1).join(" ")}{" "}
                        <span className="font-quote italic text-gold/95 font-normal">
                          {s.title.split(" ").slice(-1)[0]}
                        </span>
                      </h2>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-500 mt-2 shrink-0"
                    />
                  </div>

                  <div className="space-y-5 mt-6 border-t border-gold/10 pt-6">
                    <div>
                      <p className="text-[10px] tracking-[0.22em] uppercase text-gold/70 mb-2">
                        Solves
                      </p>
                      <p className="text-muted-foreground text-[13.5px] leading-[1.8] font-light">
                        {s.solves}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.22em] uppercase text-gold/70 mb-2">
                        Builds
                      </p>
                      <p className="text-muted-foreground text-[13.5px] leading-[1.8] font-light">
                        {s.builds}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.22em] uppercase text-gold/70 mb-2">
                        Creates
                      </p>
                      <p className="text-foreground/90 text-[13.5px] leading-[1.8] font-light italic">
                        {s.creates}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.22em] uppercase text-gold/70 mb-2">
                        Ideal For
                      </p>
                      <p className="text-muted-foreground text-[13.5px] leading-[1.8] font-light">
                        {s.idealFor}
                      </p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal>
        <CTABlock />
      </ScrollReveal>
    </div>
  );
};

export default Services;
