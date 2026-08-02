import ScrollReveal from "@/components/ScrollReveal";
import { useSEO } from "@/hooks/use-seo";
import RevenueArchitecture from "@/components/about/RevenueArchitecture";

const About = () => {
  useSEO({
    title: "About | BitwellForge",
    description:
      "BitwellForge engineers revenue infrastructure for ambitious B2B businesses, turning unpredictable effort into compounding growth.",
    canonicalPath: "/about",
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
            <p className="mt-10 md:mt-16 max-w-2xl text-foreground/85 text-[17px] md:text-[22px] leading-[1.75] font-light">
              We partner with ambitious B2B businesses to engineer their revenue infrastructure. By aligning your commercial and operational systems, we turn unpredictable effort into compounding, sustainable growth.
            </p>
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
