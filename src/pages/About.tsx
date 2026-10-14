import { motion, useReducedMotion } from "framer-motion";
import { useSEO } from "@/hooks/use-seo";
import columnImg from "@/assets/photos/editorial/column-compass.jpg";
import bridgeImg from "@/assets/photos/editorial/bridge.jpg";

const ABOUT_DESCRIPTION =
  "BitwellForge is a Revenue Infrastructure consulting firm helping agencies, consultants, coaches, and B2B service businesses strengthen the systems behind durable commercial growth.";

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
      slogan: "Structure Compounds Growth.",
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

const relationships = [
  {
    number: "01",
    title: "Strategy and execution",
    text: "A commercial direction is only useful when the operating model can translate it into consistent decisions and action.",
  },
  {
    number: "02",
    title: "Positioning and acquisition",
    text: "Market relevance and demand generation work together. Weakness in either changes the quality, cost, and consistency of opportunity.",
  },
  {
    number: "03",
    title: "Revenue and operations",
    text: "Growth creates pressure beyond sales. Delivery capacity, information flow, and commercial ownership shape what can be sustained.",
  },
  {
    number: "04",
    title: "Activity and durability",
    text: "Short term movement matters, but repeatable growth depends on whether the underlying system becomes more capable over time.",
  },
];

const principles = [
  {
    number: "I",
    title: "Begin with the constraint",
    text: "We start with the commercial problem rather than a predetermined intervention. Scope follows the evidence and the economics of the situation.",
  },
  {
    number: "II",
    title: "Read the whole system",
    text: "We examine how strategic, acquisition, operational, and digital decisions interact before deciding where change should begin.",
  },
  {
    number: "III",
    title: "Build for continued use",
    text: "The work should remain useful beyond the engagement, strengthening how the business makes decisions and operates as conditions change.",
  },
];

const Brand = () => <span className="font-heading font-bold">BitwellForge</span>;

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: reduced ? 0 : 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

const SectionLabel = ({ number, children }: { number: string; children: React.ReactNode }) => (
  <div className="flex items-baseline gap-5 border-t border-foreground/30 pt-3 font-body text-[11px] font-medium uppercase tracking-[0.02em]">
    <span className="tabular-nums text-muted-foreground">{number}</span>
    <span>{children}</span>
  </div>
);

const About = () => {
  useSEO({
    title: "About BitwellForge | Revenue Infrastructure Consulting",
    description: ABOUT_DESCRIPTION,
    canonicalPath: "/about",
    jsonLd: aboutJsonLd,
    jsonLdId: "about-jsonld",
  });

  return (
    <div className="overflow-x-clip pt-[72px] lg:pt-[113px]">
      <section className="section-padding pb-24 pt-14 sm:pb-32 sm:pt-20 lg:pb-44 lg:pt-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex items-baseline justify-between border-t border-foreground pt-3 font-body text-[11px] font-medium uppercase tracking-[0.02em]">
              <span>About</span>
              <span className="hidden sm:block">Revenue Infrastructure</span>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-12 sm:mt-20 lg:mt-24 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-9">
              <Reveal delay={0.08}>
                <h1 className="max-w-[11ch] font-heading text-[clamp(48px,8.2vw,116px)] font-normal leading-[0.94] tracking-[-0.02em] text-foreground">
                  Commercial growth is a system before it is a result.
                </h1>
              </Reveal>
            </div>

            <div className="col-span-8 col-start-5 sm:col-span-5 sm:col-start-8 lg:col-span-3 lg:col-start-10 lg:self-end">
              <Reveal delay={0.16}>
                <figure>
                  <img
                    src={columnImg}
                    alt="Compass positioned on a stone architectural column"
                    width={1024}
                    height={1280}
                    loading="eager"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <figcaption className="mt-3 max-w-[28ch] font-body text-[11px] leading-[1.5] text-muted-foreground">
                    Direction depends on what the structure can support.
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding pb-24 sm:pb-32 lg:pb-44">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-x-6 gap-y-8 lg:gap-x-10">
          <div className="col-span-12 md:col-span-3">
            <Reveal><SectionLabel number="01">The practice</SectionLabel></Reveal>
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-7">
            <Reveal delay={0.08}>
              <p className="font-heading text-[clamp(31px,4.2vw,59px)] font-normal leading-[1.08] tracking-[-0.02em] text-foreground">
                <Brand /> is a Revenue Infrastructure consulting firm for agencies, consultants, coaches, and B2B service businesses.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-7 border-t border-foreground/30 pt-6 sm:grid-cols-2 sm:gap-10">
              <Reveal delay={0.12}>
                <p className="max-w-[42ch] font-body text-[15px] font-normal leading-[1.75] text-foreground">
                  We work across the commercial, operational, and digital systems through which revenue is originated, converted, delivered, and compounded.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="max-w-[42ch] font-body text-[15px] font-normal leading-[1.75] text-muted-foreground">
                  Revenue Infrastructure is the lens through which we understand the business. It connects the decisions that shape demand with the systems required to fulfil and sustain it.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-foreground text-background">
        <div className="section-padding py-24 sm:py-32 lg:py-44">
          <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-x-6 gap-y-14 lg:gap-x-10">
            <div className="col-span-12 md:col-span-3">
              <Reveal>
                <div className="flex items-baseline gap-5 border-t border-background/35 pt-3 font-body text-[11px] font-medium uppercase tracking-[0.02em]">
                  <span className="tabular-nums opacity-60">02</span>
                  <span>The problem</span>
                </div>
              </Reveal>
            </div>
            <div className="col-span-12 md:col-span-8 md:col-start-5">
              <Reveal delay={0.08}>
                <h2 className="max-w-[13ch] font-heading text-[clamp(38px,6.3vw,88px)] font-normal leading-[0.98] tracking-[-0.02em]">
                  More activity does not always create more commercial coherence.
                </h2>
              </Reveal>
              <div className="mt-12 grid gap-8 border-t border-background/30 pt-7 sm:grid-cols-2 sm:gap-12 lg:mt-16">
                <Reveal delay={0.12}>
                  <p className="max-w-[40ch] font-body text-[15px] font-normal leading-[1.78] opacity-90">
                    A visible shortfall in pipeline, conversion, delivery, or growth may appear to belong to one function. In practice, the cause can sit in the relationship between several functions.
                  </p>
                </Reveal>
                <Reveal delay={0.16}>
                  <p className="max-w-[40ch] font-body text-[15px] font-normal leading-[1.78] opacity-65">
                    Treating each symptom independently can produce local improvement while moving the constraint elsewhere. The organisation becomes busier without becoming structurally stronger.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding py-24 sm:py-32 lg:py-44">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8 lg:gap-x-10">
            <div className="col-span-12 md:col-span-3">
              <Reveal><SectionLabel number="03">The systems view</SectionLabel></Reveal>
            </div>
            <div className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-7">
              <Reveal delay={0.08}>
                <h2 className="font-heading text-[clamp(34px,5vw,68px)] font-normal leading-[1.02] tracking-[-0.02em]">
                  We examine the relationships that govern commercial performance.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-8 max-w-[52ch] font-body text-[15px] font-normal leading-[1.78] text-muted-foreground">
                  The objective is not to make every part of the business more complex. It is to identify where greater coherence changes the quality and durability of growth.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-16 border-t border-foreground sm:mt-20">
            {relationships.map((item, index) => (
              <Reveal key={item.number} delay={index * 0.04}>
                <article className="grid grid-cols-12 gap-x-4 border-b border-foreground/25 py-6 sm:gap-x-6 sm:py-8 lg:gap-x-10">
                  <p className="col-span-2 font-body text-[11px] tabular-nums text-muted-foreground sm:col-span-1">{item.number}</p>
                  <h3 className="col-span-10 font-heading text-[clamp(24px,3vw,41px)] font-normal leading-[1.08] tracking-[-0.02em] sm:col-span-5">
                    {item.title}
                  </h3>
                  <p className="col-span-10 col-start-3 mt-5 max-w-[48ch] font-body text-[14px] font-normal leading-[1.72] text-muted-foreground sm:col-span-5 sm:col-start-8 sm:mt-0">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32 lg:pb-44">
        <div className="grid grid-cols-12">
          <div className="col-span-11 col-start-2 sm:col-span-10 sm:col-start-3 lg:col-span-8 lg:col-start-5">
            <Reveal>
              <img
                src={bridgeImg}
                alt="Engineered bridge structure extending across a clear field"
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover sm:aspect-[16/9]"
              />
            </Reveal>
          </div>
        </div>

        <div className="section-padding mt-20 sm:mt-28 lg:mt-36">
          <div className="mx-auto max-w-[1400px]">
            <Reveal><SectionLabel number="04">Working principles</SectionLabel></Reveal>
            <div className="mt-10 grid gap-0 border-t border-foreground md:grid-cols-3">
              {principles.map((principle, index) => (
                <Reveal key={principle.number} delay={index * 0.06} className="h-full">
                  <article className={`h-full border-b border-foreground/25 py-7 md:min-h-[330px] md:px-8 md:py-8 ${index > 0 ? "md:border-l" : ""}`}>
                    <p className="font-heading text-[18px] italic text-muted-foreground">{principle.number}</p>
                    <h3 className="mt-12 max-w-[12ch] font-heading text-[clamp(27px,3vw,39px)] font-normal leading-[1.08] tracking-[-0.02em] md:mt-20">
                      {principle.title}
                    </h3>
                    <p className="mt-6 max-w-[38ch] font-body text-[14px] font-normal leading-[1.72] text-muted-foreground">
                      {principle.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding pb-28 sm:pb-40 lg:pb-52">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-x-6 gap-y-8 lg:gap-x-10">
          <div className="col-span-12 md:col-span-3">
            <Reveal><SectionLabel number="05">The intent</SectionLabel></Reveal>
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <Reveal delay={0.08}>
              <h2 className="max-w-[14ch] font-heading text-[clamp(38px,6.2vw,86px)] font-normal leading-[1] tracking-[-0.02em]">
                Build a commercial structure that remains useful as the business changes.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-9 max-w-[51ch] border-t border-foreground/30 pt-6 font-body text-[15px] font-normal leading-[1.78] text-muted-foreground sm:mt-12">
                Our work is designed to be proportionate to the problem, rigorous in application, and valuable beyond the immediate engagement.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;