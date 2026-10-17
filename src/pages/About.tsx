import { useSEO } from "@/hooks/use-seo";
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
      <header className="about-opening">
        <h1>About <span className="brand-name">BitwellForge</span></h1>
        <p className="about-lead">A Revenue Infrastructure consulting firm for agencies, consultants, coaches, and B2B service businesses.</p>
      </header>

      <section className="about-practice" aria-labelledby="practice-heading">
        <div className="about-practice-copy">
          <h2 id="practice-heading">Structure Compounds Growth.</h2>
          <p>We work across the commercial, operational, and digital systems through which revenue is originated, converted, delivered, and compounded.</p>
          <p>Strategic, acquisition, operational, and digital decisions do not work in isolation.</p>
        </div>
        <img src={systemImg} alt="Engraved compass and botanical paper fragments forming one whole on pale blue, with an orange accent" width={1264} height={848} loading="eager" decoding="async" className="about-practice-image" />
      </section>

      <section className="about-systems" aria-labelledby="systems-heading">
        <div className="about-section-intro">
          <h2 id="systems-heading">Read the whole system.</h2>
          <p>More activity does not always create more commercial coherence. We examine the relationships that govern commercial performance.</p>
        </div>
        <div className="about-relationships">
          {relationships.map((item) => (
            <article className="about-relationship" key={item.number}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-principles" aria-label="Our approach">
        <article>
          <h2>Begin with the commercial problem.</h2>
          <p>Not a predetermined intervention. Scope follows the evidence and the economics of the situation.</p>
        </article>
        <article>
          <h2>Build for continued use.</h2>
          <p>A commercial structure that remains useful as the business changes, strengthening how it makes decisions and operates.</p>
        </article>
      </section>
      <p className="about-closing">Our work is designed to be proportionate to the problem, rigorous in application, and valuable beyond the immediate engagement.</p>
    </div>
  );
};

export default About;
