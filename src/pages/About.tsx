import ScrollReveal from "@/components/ScrollReveal";
import { useSEO } from "@/hooks/use-seo";

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
  "Our work spans distinct areas of commercial development—from growth strategy and client acquisition to revenue systems, market authority, digital visibility, performance growth, revenue operations, and digital product commercialisation.",
  "The nature of the engagement is determined by the constraint at hand. Some requirements are discrete; others are less bounded, where the observed constraint is a consequence of interactions between several functions rather than a deficiency within one.",
  "We begin with the commercial problem rather than a predetermined intervention. The visible symptom is not always the underlying cause. Our analysis considers the relevant economic and organisational variables in conjunction, with attention to the dependencies and constraints that emerge as a business scales.",
  "Where the requirement is specific, we remain specific. Where the economics of the problem cross functional boundaries, we account for those dependencies—avoiding solutions that simply transfer the constraint elsewhere in the system.",
  "The appropriate scope is determined by the business model, the economics of the situation, the maturity of existing systems, and the constraints governing execution.",
  "Our work is designed to be proportionate to the problem, rigorous in application, and useful beyond the engagement.",
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
      <section className="section-padding pt-20 sm:pt-28 lg:pt-40 pb-28 sm:pb-36 lg:pb-52">
        <div className="max-w-[1180px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 sm:gap-y-20 lg:gap-x-20 xl:gap-x-28">
            {/* LEFT — positioning anchor */}
            <div className="lg:col-span-6 xl:col-span-6">
              <div className="lg:sticky lg:top-32">
                <ScrollReveal>
                  <p className="text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-[hsl(var(--eyebrow-color))] eyebrow">
                    About BitwellForge
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                  <div className="mt-6 sm:mt-8 h-px w-14 sm:w-20 bg-border/70" />
                </ScrollReveal>

                <ScrollReveal delay={160}>
                  <h1 className="mt-8 sm:mt-10 lg:mt-12 font-heading text-[32px] sm:text-[44px] lg:text-[52px] xl:text-[58px] font-semibold text-foreground leading-[1.06] tracking-tightest text-balance max-w-[17ch] sm:max-w-[20ch]">
                    We work across the mechanisms through which revenue is originated, converted, operationalised, and compounded.
                  </h1>
                </ScrollReveal>

                <ScrollReveal delay={240}>
                  <p className="mt-10 sm:mt-14 lg:mt-16 border-l border-border/60 pl-5 sm:pl-7 font-body text-muted-foreground text-[15px] sm:text-[16.5px] leading-[1.75] font-light max-w-[38ch]">
                    Revenue Infrastructure is our lens, not a limitation on what we provide.
                  </p>
                </ScrollReveal>
              </div>
            </div>

            {/* RIGHT — substantive explanation */}
            <div className="lg:col-span-6 xl:col-start-8 xl:col-span-5">
              <div className="space-y-8 sm:space-y-10 lg:space-y-12 max-w-[62ch]">
                {paragraphs.map((text, i) => (
                  <ScrollReveal key={i} delay={i === 0 ? 0 : 60}>
                    <p className="font-body text-muted-foreground text-[15.5px] sm:text-[16.5px] lg:text-[17px] leading-[1.85] font-light">
                      {text}
                    </p>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
