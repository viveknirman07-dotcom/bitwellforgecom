import ScrollReveal from "@/components/ScrollReveal";
import { useSEO } from "@/hooks/use-seo";
import Purchase from "./audit/Purchase";
import { StructuralArchitecture, BusinessFramework, SystemsFeedbackLoops } from "@/components/diagrams/AuditDiagrams";

import { AuditVisualSection, StrategicVisual, DataVisual, ReportsVisual, MotionVisual } from "./audit/VisualSections";

const frameworks = [
  { n: "I", k: "Scope", t: "What the audit examines", d: "The assessment examines business structure, commercial systems, acquisition, operations and digital infrastructure together. It considers the offer and pricing model, pipeline and conversion process, demand sources, delivery capacity, reporting and supporting tools. The purpose is to identify where decisions in one area constrain performance in another.", C: StructuralArchitecture },
  { n: "II", k: "Framing", t: "How the audit is framed", d: "Revenue infrastructure is the arrangement through which a business attracts demand, converts opportunities, delivers its services and retains customers. The audit connects commercial objectives with the processes, responsibilities and systems intended to support them. Recommendations address those relationships rather than treating each function in isolation.", C: BusinessFramework },
  { n: "III", k: "Dynamics", t: "Why constraints compound", d: "The output of one function becomes the input of the next. More enquiries may not improve revenue if sales qualification is weak; more sales may strain a delivery model already at capacity. The audit examines these dependencies and feedback effects to distinguish an underlying constraint from the symptoms it produces.", C: SystemsFeedbackLoops },
];

const deliverables = [
  { t: "The Audit Report", d: "The detailed assessment across the five business layers, with observations, supporting evidence, dependencies and recommendations. Where information is incomplete, the analysis identifies the limitation rather than presenting an assumption as a verified fact." },
  { t: "Executive Findings", d: "A concise PDF for leadership discussion. It brings together the principal constraints, their commercial implications and the decisions they require. Financial effects are quantified only where the supplied evidence supports that conclusion." },
  { t: "90 Day Priority Roadmap", d: "A practical sequence of priorities for the next 90 days, distinguishing immediate decisions from work that depends on earlier changes. It provides a basis for allocating attention and resources, not a guarantee of a particular revenue outcome." },
];

const principles = [
  { t: "Diagnosis before prescription", d: "The assessment begins with the commercial problem and the available evidence. It does not assume that a new campaign, a new tool or a wider service engagement is the answer." },
  { t: "Structure over symptoms", d: "A reported problem is treated as a starting point for investigation. The analysis considers the processes, incentives and dependencies that could explain it before recommending action." },
  { t: "Clarity over volume", d: "Findings distinguish what is observed, what is inferred and what requires further validation. Priorities are explained in terms of consequence, dependency and the evidence available." },
];

const timeline = [
  { s: "01", t: "Payment and intake", w: "Day one", d: "After verified payment, a confirmation email provides your order reference and private intake link. The form covers your business model, commercial activity, operations and the constraints you want clarified. Supporting documents are optional." },
  { s: "02", t: "Analysis", w: "Days two to five", d: "The submitted information is reviewed across the five assessment layers. Observations are compared, dependencies are traced and the most consequential constraints are prioritised. The quality of the conclusions depends on the specificity and completeness of the information provided." },
  { s: "03", t: "Delivery", w: "Within five to six days", d: "The Complete Audit Report, Executive Findings and 90 Day Priority Roadmap are delivered together. Your delivery email provides access to the documents and a link to book the findings presentation on BitwellForge’s booking page." },
  { s: "04", t: "Findings presentation", w: "After delivery", d: "Select an available appointment for a 45 to 60 minute video conversation. Your booking confirmation includes the Google Meet link. The discussion reviews the principal findings, explains the recommended sequence and gives you an opportunity to question the reasoning." },
];

const fit = [
  "Agencies, consultancies and B2B service firms with established revenue",
  "Founders who sense the business has outgrown its current structure",
  "Leadership teams who want an independent reading before committing budget",
];

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-5 eyebrow">{children}</p>
);

const Audit = () => {
  useSEO({
    title: "Revenue Infrastructure Audit | BitwellForge",
    description: "An independent, structured audit of business structure, commercial systems, acquisition, operations and digital infrastructure. $1,199 USD, delivered within five to six days.",
    canonicalPath: "/audit",
  });
  return (
    <div className="pt-20">
      <section className="section-padding pt-16 md:pt-28 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <ScrollReveal><Eyebrow>Revenue Infrastructure Audit</Eyebrow></ScrollReveal>
            <ScrollReveal delay={150}>
              <h1 className="font-heading text-[36px] md:text-[60px] lg:text-[76px] font-normal text-foreground leading-[1.04] tracking-tightest mb-8 text-balance">
                Begin with the <span className="font-quote italic text-gold/95">commercial problem.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-muted-foreground text-[15px] md:text-lg leading-[1.85] font-light max-w-2xl">
                An independent assessment of how your service business generates demand, converts opportunities and delivers revenue. Understand the constraints across strategy, acquisition, sales, operations and digital execution before committing to the next intervention.
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={400}>
            <div className="lg:col-span-4 border-t border-gold/20 pt-8">
              <p className="font-heading text-4xl md:text-5xl text-foreground mb-3">$1,199 <span className="text-sm font-body text-muted-foreground tracking-[0.2em]">USD</span></p>
              <p className="text-muted-foreground text-sm leading-[1.8] font-light">One fixed fee. Delivered within five to six days, followed by a private findings presentation.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="border-t border-gold/15 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4"><Eyebrow>The premise</Eyebrow></div>
            <p className="lg:col-span-8 font-heading text-2xl md:text-[34px] leading-[1.35] text-foreground font-normal">
              A commercial problem rarely belongs to one function alone. The audit examines the structure behind performance, so leadership can distinguish a local symptom from a wider constraint and make a more informed decision about the next investment.
            </p>
          </div>

          <div className="border-t border-gold/15 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4"><Eyebrow>The assessment</Eyebrow></div>
            <div className="lg:col-span-8">
              <h2 className="font-heading text-3xl md:text-[40px] font-normal text-foreground leading-[1.1] mb-5">Business context first. Evidence next.</h2>
              <p className="text-muted-foreground text-[15px] leading-[1.85] font-light">The intake establishes your business model, customer segment, revenue sources, acquisition channels, sales cycle, team structure and delivery process. It also asks which constraints you consider most significant and what you need the audit to clarify.</p>
              <p className="text-muted-foreground text-[15px] leading-[1.85] font-light mt-5">Relevant supporting material can include sales reports, CRM exports, financial summaries and operational documentation. You can submit up to 10 files of 20 MB each through the private intake form. Document uploads are optional. Submitted files are stored privately and used to inform the assessment.</p>
              <p className="text-muted-foreground text-[15px] leading-[1.85] font-light mt-5">This is a structured consulting assessment of the information supplied, not a statutory financial audit, an assurance engagement or an exhaustive technical security review. Recommendations are proportionate to the evidence available.</p>
            </div>
          </div>

          {frameworks.map(({ n, k, t, d, C }, i) => (
            <div key={n} className={`border-t border-gold/15 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="lg:col-span-5">
                <p className="text-[10px] tracking-[0.25em] uppercase text-gold/80 mb-5"><span className="font-quote text-gold text-xl normal-case tracking-normal mr-3">{n}</span>{k}</p>
                <h2 className="font-heading text-3xl md:text-[40px] lg:text-[44px] font-normal text-foreground leading-[1.1] mb-5 tracking-tightest">{t}</h2>
                <p className="text-muted-foreground text-[15px] leading-[1.85] font-light max-w-xl">{d}</p>
              </div>
              <div className="lg:col-span-7 mx-auto w-full max-w-[560px]"><C /></div>
            </div>
          ))}

          <AuditVisualSection title="Strategic Frameworks"
            intro="A framework makes the assessment consistent without predetermining its outcome. Each commercial question is connected to evidence, a system dependency and a decision that leadership can evaluate."
            detail="This sequence helps separate the issue that is most visible from the issue that should be addressed first. The existing architecture and feedback diagrams provide the wider system context; the assessment applies that context to your business.">
            <StrategicVisual />
          </AuditVisualSection>

          <AuditVisualSection title="Data Visualizations"
            intro="The purpose of a data view is to make a relationship easier to evaluate. Depending on the records available, relevant questions may connect demand with capacity, conversion with sales handoffs, or revenue with delivery effort."
            detail="Comparisons are meaningful only when definitions, reporting periods and source records are compatible. Missing data and uncertainty remain visible in the reasoning. The illustrative view here contains no invented client metrics or claimed performance results.">
            <DataVisual />
          </AuditVisualSection>

          <div className="border-t border-gold/15 py-14 md:py-20">
            <Eyebrow>What you receive</Eyebrow>
            <h2 className="font-heading text-3xl md:text-[44px] font-normal text-foreground leading-[1.1] mb-12 tracking-tightest max-w-2xl">Three documents for informed decisions.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {deliverables.map((x, i) => (
                <div key={x.t} className="border-t border-gold/20 pt-6">
                  <span className="font-quote text-gold text-xl block mb-4">0{i + 1}</span>
                  <h3 className="font-heading text-2xl text-foreground mb-3">{x.t}</h3>
                  <p className="text-muted-foreground text-[15px] leading-[1.85] font-light">{x.d}</p>
                </div>
              ))}
            </div>
          </div>

          <AuditVisualSection title="Executive Reports & Decks"
            intro="Leadership communication should preserve the reasoning while reducing the reading burden. The full report carries the detail, Executive Findings supports the leadership discussion, and the roadmap translates the assessment into an ordered set of priorities."
            detail="These are three complementary documents rather than three versions of the same report. The executive narrative can inform an internal presentation, but a separate presentation deck is not an additional deliverable included in this audit.">
            <ReportsVisual />
          </AuditVisualSection>

          <div className="border-t border-gold/15 py-14 md:py-20">
            <Eyebrow>The engagement</Eyebrow>
            <h2 className="font-heading text-3xl md:text-[44px] font-normal text-foreground leading-[1.1] mb-12 tracking-tightest max-w-2xl">From business context to findings presentation.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {timeline.map((s) => (
                <div key={s.s}>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-gold/80 mb-4">{s.s} &nbsp; {s.w}</p>
                  <h3 className="font-heading text-2xl text-foreground mb-3">{s.t}</h3>
                  <p className="text-muted-foreground text-[15px] leading-[1.85] font-light">{s.d}</p>
                </div>
              ))}
            </div>
          </div>

          <AuditVisualSection title="Motion Explainers"
            intro="Some constraints are easier to understand as a sequence. This explanatory view shows how demand passes through delivery before it becomes revenue, and why a capacity limit can restrict the effect of increased acquisition."
            detail="The findings presentation focuses on the same practical questions: where the constraint sits, how it affects adjacent functions and what must change before the next investment is likely to be useful. The motion is illustrative, not a forecast or a commissioned video deliverable.">
            <MotionVisual />
          </AuditVisualSection>

          <div className="border-t border-gold/15 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4"><Eyebrow>After delivery</Eyebrow></div>
            <div className="lg:col-span-8">
              <h2 className="font-heading text-3xl md:text-[40px] font-normal text-foreground leading-[1.1] mb-5">A basis for action, not an automatic next engagement.</h2>
              <p className="text-muted-foreground text-[15px] leading-[1.85] font-light">Use the findings presentation to clarify the evidence, challenge the priorities and discuss the dependencies behind the roadmap. The documents then serve as a reference for leadership decisions and the sequencing of work over the next 90 days.</p>
              <p className="text-muted-foreground text-[15px] leading-[1.85] font-light mt-5">Implementation, ongoing advisory work and campaign or system execution are outside the audit’s fixed scope. You can act on the recommendations with your own team or existing partners. Any further BitwellForge engagement would be scoped and agreed separately.</p>
              <p className="text-muted-foreground text-[15px] leading-[1.85] font-light mt-5">For assistance with access, intake or the delivered documents, contact <a href="mailto:support@bitwellforge.com" className="text-foreground underline underline-offset-4">support@bitwellforge.com</a>. Keep your order reference available so the request can be connected to your audit.</p>
            </div>
          </div>

          <div className="border-t border-gold/15 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-14">
            <div>
              <Eyebrow>How we work</Eyebrow>
              <div className="space-y-8">
                {principles.map((p) => (
                  <div key={p.t}>
                    <h3 className="font-heading text-2xl text-foreground mb-2">{p.t}</h3>
                    <p className="text-muted-foreground text-[15px] leading-[1.85] font-light max-w-md">{p.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Eyebrow>Who it is for</Eyebrow>
              <div className="space-y-6">
                {fit.map((f) => (
                  <p key={f} className="font-heading text-xl md:text-2xl text-foreground leading-[1.4] border-t border-gold/15 pt-6">{f}</p>
                ))}
              </div>
            </div>
          </div>

          <Purchase />
        </div>
      </section>
    </div>
  );
};

export default Audit;
