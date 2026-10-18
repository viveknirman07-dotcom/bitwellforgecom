import { useSEO } from "@/hooks/use-seo";
import systemImg from "@/assets/photos/editorial/about-whole-system.jpg";
import bridgeImg from "@/assets/photos/editorial/bridge.jpg";
import archiveImg from "@/assets/photos/editorial/archive-drawers.jpg";
import nautilusImg from "@/assets/photos/editorial/nautilus.jpg";
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
          <p>A business may attract attention without converting it into qualified demand. It may win new work while placing increasing pressure on delivery. It may introduce new tools without improving the decisions those tools are meant to support.</p>
          <p>We approach these questions as connected parts of one commercial system. The aim is to understand what is constraining progress, which relationships need strengthening, and where a considered intervention can make the wider structure more useful.</p>
        </div>
        <img src={systemImg} alt="Engraved compass and botanical paper fragments forming one whole on pale blue, with an orange accent" width={1264} height={848} loading="eager" decoding="async" className="about-practice-image" />
      </section>

      <section className="about-editorial" aria-labelledby="businesses-heading">
        <div className="about-editorial-copy">
          <h2 id="businesses-heading">For businesses built on expertise.</h2>
          <p>We work with agencies, consultants, coaches, and B2B service businesses. Their commercial systems must connect the value of their expertise with the way that expertise is positioned, sold, and delivered.</p>
          <p>For founders and operators, growth often brings a different kind of complexity. Acquisition becomes harder to coordinate. Commercial knowledge remains concentrated in a few people. Sales and delivery develop at different speeds.</p>
          <p>Our focus is the infrastructure beneath those pressures. That means looking beyond an individual channel or tool to understand how the business creates opportunity, qualifies demand, manages commitments, and supports the work that follows.</p>
        </div>
        <img src={bridgeImg} alt="Steel bridge truss on a paper collage with a cobalt blue accent" width={1376} height={768} loading="lazy" decoding="async" className="about-editorial-image" />
      </section>

      <section className="about-systems" aria-labelledby="systems-heading">
        <div className="about-section-intro">
          <h2 id="systems-heading">Read the whole system.</h2>
          <div>
            <p>More activity does not always create more commercial coherence. We examine the relationships that govern commercial performance.</p>
            <p>A change in positioning affects the opportunities entering the pipeline. Qualification shapes the conversations that follow. Delivery capacity influences what the business can responsibly promise. Reading these connections helps distinguish the visible symptom from the underlying constraint.</p>
          </div>
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

      <section className="about-editorial" aria-labelledby="evidence-heading">
        <div className="about-editorial-copy">
          <h2 id="evidence-heading">Begin with the commercial problem.</h2>
          <p>Not a predetermined intervention. Scope follows the evidence and the economics of the situation.</p>
          <p>We begin by examining the current acquisition, conversion, and operating system. What is happening today? Where are opportunities lost? Which decisions lack reliable information? What depends on repeated manual effort or individual knowledge?</p>
          <p>Diagnosis informs architecture. Before adding activity or implementing tools, the work establishes how the parts should connect, what needs to change, and which priorities should come first.</p>
          <p>Engineering and activation then translate that direction into working systems. Optimization uses feedback to revisit assumptions and improve the structure. Compounding means carrying that learning forward rather than treating each improvement as an isolated project.</p>
        </div>
        <img src={archiveImg} alt="Open wooden archive drawer with organized paper records and a blue paper accent" width={1152} height={768} loading="lazy" decoding="async" className="about-editorial-image" />
      </section>

      <section className="about-capabilities" aria-labelledby="capabilities-heading">
        <div className="about-section-intro">
          <h2 id="capabilities-heading">Connected capabilities.<br />Considered priorities.</h2>
          <div>
            <p>Our work spans growth strategy, acquisition, sales systems, LinkedIn positioning, AI and automation, SEO, performance marketing, and digital product systems.</p>
            <p>These capabilities are not a predetermined checklist. A positioning problem may require clarity before additional distribution. An acquisition problem may involve qualification as much as reach. An operational problem may call for better ownership and information flow before automation.</p>
            <p>The practical work can include market and offer architecture, acquisition pathways, discovery and proposal processes, CRM workflows, content systems, reporting, and digital product commercialization. The combination depends on the commercial question, the existing system, and the business’s capacity to act.</p>
          </div>
        </div>
      </section>

      <section className="about-editorial" aria-labelledby="continued-heading">
        <div className="about-editorial-copy">
          <h2 id="continued-heading">Build for continued use.</h2>
          <p>A commercial structure should remain useful as the business changes, strengthening how it makes decisions and operates.</p>
          <p>That requires more than a completed implementation. Processes need to be understandable. Responsibilities need to be clear. Information needs to reach the people making commercial decisions. The system should support consistent action without becoming unnecessarily complex.</p>
          <p>We treat measurement as a way to learn, not simply to report activity. Leading indicators and operating feedback help test whether the original diagnosis still holds and whether priorities need to change.</p>
          <p>Durability comes from that relationship between structure and learning. As the business develops, its infrastructure should provide a clearer basis for the next decision rather than demand a fresh start each time.</p>
        </div>
        <img src={nautilusImg} alt="Sectioned nautilus shell revealing its expanding chambers in an olive and paper collage" width={1152} height={768} loading="lazy" decoding="async" className="about-editorial-image" />
      </section>

      <section className="about-principles" aria-label="Our approach">
        <article>
          <h2>Clarity before complexity.</h2>
          <p>The appropriate response is not always the largest one. We look for the work that addresses the constraint and fits the commercial context, with a clear relationship between the problem, the proposed change, and its practical use.</p>
        </article>
        <article>
          <h2>Evidence over assumption.</h2>
          <p>A strategy is a working view of the situation, not a fixed belief. When evidence challenges the original thesis, the direction should be reconsidered. That discipline keeps the work connected to the business rather than to a preferred intervention.</p>
        </article>
      </section>
      <p className="about-closing">Our work is designed to be proportionate to the problem, rigorous in application, and valuable beyond the immediate engagement.</p>
    </div>
  );
};

export default About;
