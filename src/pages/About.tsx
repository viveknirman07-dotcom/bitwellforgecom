import { motion, useReducedMotion } from "framer-motion";
import { useSEO } from "@/hooks/use-seo";
import columnImg from "@/assets/photos/editorial/column-compass.jpg";
import bridgeImg from "@/assets/photos/editorial/bridge.jpg";
import systemImg from "@/assets/photos/editorial/about-whole-system.jpg";
import "@/styles/about.css";

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

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const reduced = useReducedMotion();
  return (
    <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reduced ? 0 : 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
};

const About = () => {
  useSEO({
    title: "About BitwellForge | Revenue Infrastructure Consulting",
    description: ABOUT_DESCRIPTION,
    canonicalPath: "/about",
    jsonLd: aboutJsonLd,
    jsonLdId: "about-jsonld",
  });

  return (
    <div className="bf-about bg-background text-foreground">
      <section className="about-composition" aria-labelledby="about-heading">
        <Reveal className="about-introduction">
          <span className="about-label">The practice</span>
          <h1 id="about-heading">About <span className="brand-name">BitwellForge</span></h1>
          <p>A Revenue Infrastructure consulting firm for agencies, consultants, coaches, and B2B service businesses.</p>
        </Reveal>

        <div className="about-editorial-grid">
          <Reveal className="about-feature" delay={0.04}>
            <article className="about-card about-feature-card bg-card text-card-foreground">
              <img src={columnImg} alt="Compass positioned on a stone architectural column" width={1536} height={1024} loading="eager" decoding="async" className="about-feature-image" />
              <div className="about-card-copy">
                <span className="about-meta">Revenue Infrastructure</span>
                <h2>Structure Compounds Growth.</h2>
                <p>We work across the commercial, operational, and digital systems through which revenue is originated, converted, delivered, and compounded.</p>
              </div>
            </article>
          </Reveal>

          <Reveal className="about-system" delay={0.08}>
            <article className="about-card about-system-card bg-card text-card-foreground">
              <img src={systemImg} alt="Engraved compass and botanical paper fragments forming one whole on pale blue, with an orange accent" width={1264} height={848} loading="eager" decoding="async" className="about-system-image" />
              <div className="about-card-copy">
                <h2>Read the whole system.</h2>
                <p>Strategic, acquisition, operational, and digital decisions do not work in isolation.</p>
              </div>
            </article>
          </Reveal>

          <Reveal className="about-constraint" delay={0.12}>
            <article className="about-card about-constraint-card bg-card text-card-foreground">
              <span className="about-meta">Our starting point</span>
              <div className="about-card-copy">
                <h2>Begin with the commercial problem.</h2>
                <p>Not a predetermined intervention. Scope follows the evidence and the economics of the situation.</p>
              </div>
            </article>
          </Reveal>

          <Reveal className="about-durability" delay={0.16}>
            <article className="about-card about-wide-card bg-card text-card-foreground">
              <div className="about-card-copy">
                <span className="about-meta">Beyond the engagement</span>
                <h2>Build for continued use.</h2>
                <p>A commercial structure that remains useful as the business changes, strengthening how it makes decisions and operates.</p>
              </div>
              <img src={bridgeImg} alt="Engineered steel bridge structure built to span and support" width={1356} height={768} loading="lazy" decoding="async" className="about-wide-image" />
            </article>
          </Reveal>
        </div>
      </section>

      <section className="about-relationships" aria-labelledby="relationships-heading">
        <Reveal className="about-introduction">
          <span className="about-label">The systems view</span>
          <h2 id="relationships-heading">The relationships behind growth.</h2>
          <p>More activity does not always create more commercial coherence. We examine the relationships that govern commercial performance.</p>
        </Reveal>
        <div className="about-relationship-grid">
          {relationships.map((item, index) => (
            <Reveal key={item.number} delay={index * 0.04}>
              <article className="about-relationship">
                <span className="about-meta">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="about-intent">
          <p>Our work is designed to be proportionate to the problem, rigorous in application, and valuable beyond the immediate engagement.</p>
        </Reveal>
      </section>
    </div>
  );
};

export default About;
