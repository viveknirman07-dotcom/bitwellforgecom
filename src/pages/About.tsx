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
      <section className="section-padding pt-24 md:pt-44 pb-24 md:pb-36">
        <div className="max-w-[1180px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-3">
              <ScrollReveal>
                <p className="text-[10px] tracking-[0.32em] uppercase text-gold eyebrow md:pt-6">
                  01 &nbsp;/&nbsp; Introduction
                </p>
              </ScrollReveal>
            </div>

            <div className="md:col-span-9">
              <ScrollReveal>
                <h1 className="font-heading text-[46px] md:text-[92px] lg:text-[112px] font-semibold text-foreground leading-[0.98] tracking-tightest -ml-[0.04em]">
                  Who We <span className="font-quote italic text-gold/95">Are</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={180}>
                <p className="mt-12 md:mt-20 font-body text-foreground text-[21px] md:text-[30px] leading-[1.42] font-light max-w-[19ch] sm:max-w-[26ch] md:max-w-[22ch] tracking-tight text-balance">
                  BitwellForge is a Revenue Infrastructure consulting firm that partners with agencies, consultants, coaches, and B2B service businesses to strengthen the commercial, operational, and digital systems that support sustainable growth.
                </p>
              </ScrollReveal>

              <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-[900px]">
                <ScrollReveal delay={280}>
                  <p className="font-body text-muted-foreground text-[16px] md:text-[17.5px] leading-[1.8] font-light">
                    We partner with knowledge driven businesses and independent advisors to improve strategic clarity, commercial execution, and organisational capability across the revenue lifecycle.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={360}>
                  <p className="font-body text-muted-foreground text-[16px] md:text-[17.5px] leading-[1.8] font-light">
                    Our work integrates strategy, commercial systems, operations, automation, and execution into a cohesive framework aligned with each client's growth objectives.
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Core architecture diagram */}
      <section className="section-padding py-24 md:py-40">
        <div className="max-w-[1180px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-16 border-t border-border/40 pt-16 md:pt-24">
            <div className="md:col-span-3">
              <ScrollReveal>
                <p className="text-[10px] tracking-[0.32em] uppercase text-gold eyebrow">
                  02 &nbsp;/&nbsp; Architecture
                </p>
              </ScrollReveal>
            </div>
            <div className="md:col-span-9">
              <ScrollReveal delay={120}>
                <div className="max-w-[820px] mx-auto md:mx-0">
                  <RevenueArchitecture />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Belief & Vision */}
      <section className="section-padding pt-24 md:pt-36 pb-32 md:pb-52">
        <div className="max-w-[1180px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-16 border-t border-border/40 pt-16 md:pt-24">
            <div className="md:col-span-3">
              <ScrollReveal>
                <p className="text-[10px] tracking-[0.32em] uppercase text-gold eyebrow">
                  03 &nbsp;/&nbsp; Position
                </p>
              </ScrollReveal>
            </div>

            <div className="md:col-span-9 space-y-16 md:space-y-24">
              <ScrollReveal delay={120}>
                <div className="grid grid-cols-1 md:grid-cols-[9rem_1fr] gap-4 md:gap-10 md:items-baseline">
                  <p className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground eyebrow">
                    The Belief
                  </p>
                  <h2 className="font-heading text-[28px] md:text-[46px] font-semibold text-foreground leading-[1.12] tracking-tightest text-balance max-w-[20ch]">
                    Growth is not a tactic. It is infrastructure.
                  </h2>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={220}>
                <div className="grid grid-cols-1 md:grid-cols-[9rem_1fr] gap-4 md:gap-10 md:items-baseline">
                  <p className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground eyebrow">
                    The Vision
                  </p>
                  <h2 className="font-heading text-[28px] md:text-[46px] font-semibold text-foreground leading-[1.12] tracking-tightest text-balance max-w-[20ch]">
                    Businesses that grow through design, not desperation.
                  </h2>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


export default About;
