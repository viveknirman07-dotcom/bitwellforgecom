import ScrollReveal from "@/components/ScrollReveal";
import { useSEO } from "@/hooks/use-seo";
import RevenueArchitecture from "@/components/about/RevenueArchitecture";

const ABOUT_DESCRIPTION =
  "BitwellForge is a Revenue Infrastructure consulting firm strengthening the commercial, operational, and digital systems behind sustainable B2B growth.";

const aboutJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About BitwellForge",
    url: "https://bitwellforgecom.lovable.app/about",
    description: ABOUT_DESCRIPTION,
    mainEntity: {
      "@type": "Organization",
      name: "BitwellForge",
      url: "https://bitwellforgecom.lovable.app",
      description: ABOUT_DESCRIPTION,
      slogan: "Growth is not a tactic. It is infrastructure.",
      knowsAbout: [
        "Revenue Infrastructure",
        "Strategic Clarity",
        "Commercial Systems",
        "Operations & Automation",
        "Execution",
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bitwellforgecom.lovable.app/" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://bitwellforgecom.lovable.app/about" },
    ],
  },
];

const About = () => {
  useSEO({
    title: "About BitwellForge | Revenue Infrastructure Consulting",
    description: ABOUT_DESCRIPTION,
    canonicalPath: "/about",
    jsonLd: aboutJsonLd,
    jsonLdId: "about-jsonld",
  });

  return (
    <div className="pt-20">
      {/* SECTION 1 — Introduction */}
      <section className="section-padding pt-24 md:pt-40 pb-20 md:pb-32">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <h1 className="font-heading text-[44px] md:text-[84px] lg:text-[104px] font-semibold text-foreground leading-[1.02] tracking-tightest">
              Who We <span className="font-quote italic text-gold/95">Are</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="mt-10 md:mt-16 max-w-2xl space-y-8 md:space-y-10">
              <p className="font-body text-foreground/85 text-[17px] md:text-[22px] leading-[1.8] font-light">
                BitwellForge is a Revenue Infrastructure consulting firm that partners with agencies, consultants, coaches, and B2B service businesses to strengthen the commercial, operational, and digital systems that support sustainable growth.
              </p>
              <p className="font-body text-foreground/70 text-[16px] md:text-[19px] leading-[1.85] font-light">
                We partner with knowledge driven businesses and independent advisors to improve strategic clarity, commercial execution, and organisational capability across the revenue lifecycle.
              </p>
              <p className="font-body text-foreground/70 text-[16px] md:text-[19px] leading-[1.85] font-light">
                Our work integrates strategy, commercial systems, operations, automation, and execution into a cohesive framework aligned with each client's growth objectives.
              </p>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* SECTION 2 — Core architecture diagram */}
      <section className="section-padding py-24 md:py-44">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal delay={100}>
            <RevenueArchitecture />
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3 — Belief & Vision */}
      <section className="section-padding pt-24 md:pt-40 pb-32 md:pb-52">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
          <ScrollReveal>
            <div>
              <p className="text-[10px] tracking-[0.32em] uppercase text-gold mb-6 eyebrow">The Belief</p>
              <h2 className="font-heading text-[26px] md:text-[38px] font-semibold text-foreground leading-[1.15] tracking-tightest text-balance">
                Growth is not a tactic. It is infrastructure.
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div>
              <p className="text-[10px] tracking-[0.32em] uppercase text-gold mb-6 eyebrow">The Vision</p>
              <h2 className="font-heading text-[26px] md:text-[38px] font-semibold text-foreground leading-[1.15] tracking-tightest text-balance">
                Businesses that grow through design, not desperation.
              </h2>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default About;
