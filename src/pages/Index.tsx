import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { useSEO } from "@/hooks/use-seo";
import founderSession from "@/assets/advisory-founder-session.jpg";
import operatorReview from "@/assets/advisory-operator-review.jpg";
import strategySession from "@/assets/advisory-strategy-session.jpg";

const capabilities = [
  { number: "01", title: "Commercial Growth Strategy", copy: "Resolve market, offer, pricing, and growth decisions before execution compounds the wrong assumptions.", href: "/services/growth-strategy" },
  { number: "02", title: "Client Acquisition Architecture", copy: "Design the connected demand, qualification, and conversion paths that create dependable commercial momentum.", href: "/services/lead-generation" },
  { number: "03", title: "Revenue Systems", copy: "Build offer, pipeline, sales, and reporting infrastructure around the economics of the business.", href: "/services/sales-systems" },
  { number: "04", title: "Market Authority Positioning", copy: "Make the firm legible to the right market through precise category, narrative, and evidence design.", href: "/services/linkedin" },
  { number: "05", title: "Digital Visibility", copy: "Create durable discovery systems across search, content, and owned digital environments.", href: "/services/seo" },
  { number: "06", title: "Performance Growth", copy: "Align paid growth with contribution economics, conversion quality, and operational capacity.", href: "/services/performance-marketing" },
  { number: "07", title: "Revenue Operations", copy: "Remove manual friction from commercial workflows while preserving human judgment where it matters.", href: "/services/ai-automation" },
  { number: "08", title: "Digital Product Commercialisation", copy: "Turn expertise into structured, valuable digital products with coherent routes to market.", href: "/services/digital-products" },
];

const systems = [
  { name: "FounderOS", descriptor: "Decision infrastructure", copy: "A disciplined operating layer for founders making interconnected commercial and operational decisions." },
  { name: "Client Acquisition OS", descriptor: "Demand infrastructure", copy: "A connected system for market selection, outreach, qualification, follow up, and pipeline learning." },
  { name: "Forge Vault", descriptor: "Commercial knowledge system", copy: "Thirty one modules and forty four working assets for building a more rigorous commercial operation.", href: "/forge-vault" },
];

const insights = [
  { slug: "the-cost-of-an-undecided-offer", category: "Commercial Strategy", date: "Sep 2026", title: "The Cost of an Undecided Offer", excerpt: "An unfinished offer transfers the work of definition to the buyer, then pays for it through slower cycles and weaker margin." },
  { slug: "retention-is-an-operational-outcome", category: "Growth Operations", date: "Sep 2026", title: "Retention Is an Operational Outcome, Not a Relationship Skill", excerpt: "Clients rarely leave because the relationship failed. They leave when the operating rhythm stops making progress visible." },
  { slug: "the-trust-window-why-speed-to-decision-defines-modern-b2b-sales", category: "Revenue Infrastructure", date: "Sep 2026", title: "The Trust Window", excerpt: "Between buyer intent and buyer inertia sits a narrow window. Commercial architecture determines whether a firm can move inside it." },
];

const Index = () => {
  const reduced = useReducedMotion();
  useSEO({
    title: "BitwellForge | Commercial Architecture & Constraint Advisory",
    description: "BitwellForge advises service businesses on the structural constraints governing commercial performance, identifying the interdependencies that impede growth across strategy, acquisition, operations, and digital execution.",
    canonicalPath: "/",
  });

  return (
    <div className="bf-home">
      <section className="bf-hero" aria-labelledby="home-title">
        <motion.img
          src={founderSession}
          width={1600}
          height={1200}
          alt="A founder and advisor reviewing commercial performance together"
          className="bf-hero-image"
          initial={false}
          animate={reduced ? undefined : { scale: [1.035, 1] }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <div className="bf-hero-shade" aria-hidden="true" />
        <div className="bf-shell bf-hero-content">
          <motion.p className="bf-kicker" initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>Revenue Infrastructure Advisory</motion.p>
          <motion.h1 id="home-title" initial={reduced ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }}>Growth rarely fails in one place.</motion.h1>
          <motion.p className="bf-hero-copy" initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.42 }}>BitwellForge works across the commercial, operational, and digital constraints that govern performance. We begin with the problem, then determine the intervention.</motion.p>
          <motion.div className="bf-actions" initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.58 }}>
            <Link className="bf-action bf-action-primary" to="/contact?service=Commercial+Constraint">Discuss a Commercial Constraint <ArrowRight aria-hidden size={16} /></Link>
            <Link className="bf-action bf-action-secondary" to="/process">Explore Our Approach <ArrowRight aria-hidden size={16} /></Link>
          </motion.div>
          <p className="bf-image-disclosure">Editorial illustration. Not a client engagement.</p>
        </div>
      </section>

      <section className="bf-section bf-ivory" aria-labelledby="problem-title">
        <div className="bf-shell bf-editorial-split">
          <ScrollReveal><p className="bf-kicker">The commercial problem</p><h2 id="problem-title">The visible issue is rarely the governing constraint.</h2></ScrollReveal>
          <ScrollReveal delay={100}><div className="bf-copy-stack"><p>When growth slows, businesses often respond with a predetermined intervention. More activity. A new channel. Another hire. A different tool.</p><p>But acquisition, offer design, sales, delivery, and operations are interdependent. Improving one in isolation can move pressure elsewhere without changing the economics of the whole.</p><p>Our work is to identify the constraint that governs the system, understand its second order effects, and design a proportionate response.</p></div></ScrollReveal>
        </div>
      </section>

      <section className="bf-section bf-dark" aria-labelledby="approach-title">
        <div className="bf-shell">
          <div className="bf-image-editorial">
            <ScrollReveal className="bf-image-wrap"><img src={operatorReview} width={1600} height={1200} loading="lazy" alt="An operator reviewing business information and commercial documents" /></ScrollReveal>
            <ScrollReveal className="bf-image-copy" delay={120}><p className="bf-kicker">Our approach</p><h2 id="approach-title">Diagnosis before prescription.</h2><p>We assess the business model, economics, maturity, operating capacity, and dependencies surrounding the problem. Scope follows evidence, not a fixed menu of interventions.</p><Link className="bf-text-link" to="/process">How we work <ArrowRight aria-hidden size={15} /></Link></ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bf-section bf-ivory" aria-labelledby="capabilities-title">
        <div className="bf-shell">
          <ScrollReveal className="bf-section-head"><p className="bf-kicker">Capabilities</p><h2 id="capabilities-title">Connected disciplines for connected problems.</h2><p>Each capability can stand alone. The value emerges from understanding how it affects the broader revenue infrastructure.</p></ScrollReveal>
          <div className="bf-capability-list">
            {capabilities.map((item, index) => <ScrollReveal key={item.title} delay={(index % 4) * 70}><Link to={item.href} className="bf-capability"><span>{item.number}</span><h3>{item.title}</h3><p>{item.copy}</p><ArrowRight aria-hidden size={18} /></Link></ScrollReveal>)}
          </div>
        </div>
      </section>

      <section className="bf-section bf-navy" aria-labelledby="systems-title">
        <div className="bf-shell">
          <ScrollReveal className="bf-section-head"><p className="bf-kicker">Systems and playbooks</p><h2 id="systems-title">Infrastructure that remains useful beyond the engagement.</h2></ScrollReveal>
          <div className="bf-systems">
            {systems.map((system, index) => <ScrollReveal key={system.name} delay={index * 90}><article className="bf-system"><p className="bf-system-index">0{index + 1}</p><p className="bf-kicker">{system.descriptor}</p><h3>{system.name}</h3><p>{system.copy}</p>{system.href && <Link className="bf-text-link" to={system.href}>Access Forge Vault <ArrowRight aria-hidden size={15} /></Link>}</article></ScrollReveal>)}
          </div>
        </div>
      </section>

      <section className="bf-section bf-ivory" aria-labelledby="human-title">
        <div className="bf-shell bf-human-grid">
          <ScrollReveal className="bf-human-copy"><p className="bf-kicker">Human judgment</p><h2 id="human-title">Systems clarify the work. People still make the decisions.</h2><p>Commercial infrastructure is not an abstraction. It changes how founders allocate attention, how teams coordinate, and how clients experience the business. The strongest system supports judgment rather than attempting to replace it.</p><Link className="bf-text-link" to="/about">About BitwellForge <ArrowRight aria-hidden size={15} /></Link></ScrollReveal>
          <ScrollReveal className="bf-image-wrap" delay={100}><img src={strategySession} width={1600} height={1200} loading="lazy" alt="A small strategy group examining a commercial operating model" /></ScrollReveal>
        </div>
      </section>

      <section className="bf-section bf-dark" aria-labelledby="insights-title">
        <div className="bf-shell">
          <ScrollReveal className="bf-section-head"><p className="bf-kicker">Latest insights</p><h2 id="insights-title">Thinking for the commercial decisions that compound.</h2></ScrollReveal>
          <div className="bf-insights">
            {insights.map((article, index) => <ScrollReveal key={article.slug} delay={index * 100}><Link to={`/insights/${article.slug}`} className="bf-insight"><p className="bf-insight-meta">{article.category}<span>{article.date}</span></p><h3>{article.title}</h3><p>{article.excerpt}</p><span className="bf-text-link">Read insight <ArrowRight aria-hidden size={15} /></span></Link></ScrollReveal>)}
          </div>
        </div>
      </section>

      <section className="bf-closing" aria-labelledby="closing-title"><div className="bf-shell"><ScrollReveal><p className="bf-kicker">Begin with the constraint</p><h2 id="closing-title">A serious commercial problem deserves a precise first conversation.</h2><p>Tell us what is changing, where performance is stalling, and what the business has already tried.</p><Link className="bf-action bf-action-primary" to="/contact?service=Commercial+Constraint">Discuss a Commercial Constraint <ArrowRight aria-hidden size={16} /></Link></ScrollReveal></div></section>
    </div>
  );
};

export default Index;