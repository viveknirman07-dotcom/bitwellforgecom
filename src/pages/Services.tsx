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
    title: "Growth Strategy",
    layer: "Strategic Layer",
    solves:
      "Market confusion, weak positioning, and channel misalignment that quietly compound across every acquisition effort.",
    builds:
      "Growth architecture, positioning systems, and a coherent go-to-market framework aligned to the business model.",
    creates: "Predictable demand from a defined market segment.",
    idealFor: "Consultants. Agencies. B2B service firms.",
  },
  {
    id: "lead-generation",
    title: "B2B Lead Generation",
    layer: "Acquisition Layer",
    solves:
      "Pipelines that depend on referrals, paid channels, or single platforms. Demand that arrives in unpredictable waves.",
    builds:
      "Outbound systems, inbound sequencing, ICP architecture, and channel orchestration mapped to a defined sales cycle.",
    creates: "Qualified conversations on a forecastable cadence.",
    idealFor: "Advisory firms. Boutique agencies. Executive-led brands.",
  },
  {
    id: "sales-systems",
    title: "High-Ticket Sales Systems",
    layer: "Conversion Layer",
    solves:
      "Inconsistent close rates, pricing erosion, and proposals that rely on the founder's presence to convert.",
    builds:
      "Qualification frameworks, discovery architecture, objection systems, proposal logic, and CRM stage mechanics.",
    creates: "Conversion that is repeatable across operators.",
    idealFor: "Consulting practices. Coaches. B2B specialists.",
  },
  {
    id: "linkedin",
    title: "LinkedIn Positioning",
    layer: "Authority Layer",
    solves:
      "Anonymous presence in a market where buyers research before they reply. Posts without a positioning thesis.",
    builds:
      "Content architecture, engagement systems, and an authority flywheel tuned for the buyer the practice actually wants.",
    creates: "Inbound opportunities from senior decision makers.",
    idealFor: "Founders. Executives. Independent advisors.",
  },
  {
    id: "ai-automation",
    title: "AI & Automation Systems",
    layer: "Operational Layer",
    solves:
      "Manual repetition, fragmented data, and operational drag that scales linearly with revenue.",
    builds:
      "Workflow engines, lead scoring logic, CRM automations, reporting pipelines, and AI-assisted qualification.",
    creates: "Operational leverage that multiplies team output.",
    idealFor: "Service businesses. Operations-heavy practices.",
  },
  {
    id: "seo",
    title: "SEO & Digital Visibility",
    layer: "Visibility Layer",
    solves:
      "Invisible practices in search. Content that ranks for nothing the buyer is actually looking for.",
    builds:
      "Technical foundations, semantic content architecture, and authority frameworks engineered to compound.",
    creates: "Visibility that grows in value the longer it runs.",
    idealFor: "Knowledge businesses. Long-cycle advisory practices.",
  },
  {
    id: "performance-marketing",
    title: "Performance Marketing Infrastructure",
    layer: "Performance Layer",
    solves:
      "Ad spend that produces clicks but not pipeline. Vanity metrics that obscure the underlying economics.",
    builds:
      "Measurement frameworks, creative systems, attribution logic, and optimization protocols built into the funnel.",
    creates: "Ad spend that behaves like infrastructure, not expense.",
    idealFor: "Scaled service firms. Brands with established offer-market fit.",
  },
  {
    id: "digital-products",
    title: "Digital Product Systems",
    layer: "Product Layer",
    solves:
      "Launches that depend on energy. Products that surge and then stall once attention moves elsewhere.",
    builds:
      "Validation systems, launch infrastructure, conversion architecture, and post-launch retention loops.",
    creates: "Recurring revenue from productized offers.",
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
                        {s.title}
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
