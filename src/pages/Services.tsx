import CTABlock from "@/components/CTABlock";
import ScrollReveal from "@/components/ScrollReveal";

const services = [
  {
    id: "growth-strategy",
    title: "Growth Strategy",
    description: "Architecting the roadmap that connects your business goals to measurable acquisition outcomes.",
    details: "We audit your current growth infrastructure, identify structural gaps, and design a strategic blueprint that aligns every channel, message, and system toward predictable, qualified demand.",
  },
  {
    id: "sales-systems",
    title: "High-Ticket Sales Systems",
    description: "Structured pipelines engineered for complex, high-value client acquisition.",
    details: "From lead qualification frameworks to proposal architecture, we design sales systems that convert consistently — without relying on personality or pressure.",
  },
  {
    id: "performance-marketing",
    title: "Performance Marketing Infrastructure",
    description: "Precision campaigns designed for compounding returns, not vanity metrics.",
    details: "We build measurement frameworks, creative systems, and optimization protocols that transform ad spend into predictable revenue infrastructure.",
  },
  {
    id: "lead-generation",
    title: "B2B Lead Generation",
    description: "Systematic engines for enterprise-grade demand generation.",
    details: "Combining outbound precision with inbound magnetism, we architect lead generation systems that fill pipelines with qualified, high-intent prospects.",
  },
  {
    id: "linkedin",
    title: "LinkedIn Positioning",
    description: "Authority-building frameworks for founders and executive teams.",
    details: "We design content architectures, engagement systems, and positioning strategies that establish thought leadership and generate inbound opportunities on LinkedIn.",
  },
  {
    id: "ai-automation",
    title: "AI & Automation Systems",
    description: "Intelligent workflows that eliminate friction and scale operations.",
    details: "From automated lead nurturing to AI-powered qualification, we integrate automation into your growth infrastructure to multiply output without multiplying effort.",
  },
  {
    id: "seo",
    title: "SEO & Digital Visibility",
    description: "Organic growth systems built on structural authority.",
    details: "We build SEO infrastructure — technical foundations, content architectures, and authority frameworks — that compound visibility over time.",
  },
  {
    id: "digital-products",
    title: "Digital Product Systems",
    description: "End-to-end systems for launching and scaling digital products.",
    details: "From market validation to launch infrastructure, we design the systems that take digital products from concept to consistent revenue.",
  },
];

const Services = () => {
  return (
    <div className="pt-20">
      <section className="section-padding section-y">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-20">
            <ScrollReveal>
              <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6">Services</p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <h1 className="font-heading text-4xl md:text-6xl font-semibold text-foreground leading-tight mb-8 text-balance">
                Systems designed for every stage of growth.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Each service pillar operates as part of an integrated growth architecture — designed to work independently or as a unified system.
              </p>
            </ScrollReveal>
          </div>

          <div className="space-y-0">
            {services.map((service, i) => (
              <ScrollReveal key={service.id}>
                <div
                  id={service.id}
                  className="group border-t border-border py-12 md:py-16 scroll-mt-24"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                    <div className="md:col-span-1">
                      <span className="text-sm text-muted-foreground font-medium">0{i + 1}</span>
                    </div>
                    <div className="md:col-span-4">
                      <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                        {service.title}
                      </h2>
                    </div>
                    <div className="md:col-span-7">
                      <p className="text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{service.details}</p>
                    </div>
                  </div>
                </div>
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
