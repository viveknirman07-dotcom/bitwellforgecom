import ScrollReveal from "@/components/ScrollReveal";
import { useSEO } from "@/hooks/use-seo";
import Purchase from "./audit/Purchase";
import { StructuralArchitecture, BusinessFramework, SystemsFeedbackLoops } from "@/components/diagrams/AuditDiagrams";

const frameworks = [
  { n: "I", k: "Scope", t: "What the audit examines", d: "Five layers of the business are read together: structure, commercial systems, acquisition, operations and digital infrastructure. Each rests on the one beneath it, which is why a weakness in structure so often appears later as a sales or delivery problem.", C: StructuralArchitecture },
  { n: "II", k: "Framing", t: "How the audit is framed", d: "Revenue infrastructure sits at the centre. Strategy, acquisition, sales, operations and digital systems are assessed as one connected arrangement, not as separate departments with separate fixes.", C: BusinessFramework },
  { n: "III", k: "Dynamics", t: "Why constraints compound", d: "The output of one function becomes the input of the next. Retention sustains demand, and revenue funds acquisition. A single weak link therefore limits the whole system, quietly and persistently.", C: SystemsFeedbackLoops },
];

const deliverables = [
  { t: "The Audit Report", d: "A complete written reading of your business, layer by layer, with the evidence behind every observation." },
  { t: "Executive Findings", d: "A concise document for decision makers, setting out the constraints that matter most and what they cost." },
  { t: "90 Day Priority Roadmap", d: "The recommended sequence of work, ordered so that each step makes the next one easier." },
];

const principles = [
  { t: "Diagnosis before prescription", d: "No intervention is assumed in advance. The recommendation follows the evidence." },
  { t: "Structure over symptoms", d: "We look for the arrangement that produces the problem, not only the problem itself." },
  { t: "Clarity over volume", d: "Fewer findings, stated plainly, with a clear order of priority." },
];

const timeline = [
  { s: "01", t: "Payment and intake", w: "Day one", d: "Once payment is confirmed you receive a private link to a structured intake form, where you share context and any supporting documents." },
  { s: "02", t: "Analysis", w: "Days two to five", d: "Your business is read as one system. Constraints are identified, weighed and placed in order of consequence." },
  { s: "03", t: "Delivery", w: "Within five to six days", d: "The report, Executive Findings and Roadmap arrive together, with an invitation to book your findings presentation." },
  { s: "04", t: "Findings presentation", w: "After delivery", d: "A 45 to 60 minute conversation on video call, walking through the most important findings and the order in which to act." },
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
                An independent, structured reading of how your business generates, converts and retains revenue, and of where its present arrangement quietly limits what it can become.
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
              Most growth problems are not effort problems. They are structural ones. The audit exists to locate that structure precisely, so that the next investment of time and capital is made in the right place.
            </p>
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

          <div className="border-t border-gold/15 py-14 md:py-20">
            <Eyebrow>What you receive</Eyebrow>
            <h2 className="font-heading text-3xl md:text-[44px] font-normal text-foreground leading-[1.1] mb-12 tracking-tightest max-w-2xl">Three documents, one clear direction.</h2>
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

          <div className="border-t border-gold/15 py-14 md:py-20">
            <Eyebrow>The engagement</Eyebrow>
            <h2 className="font-heading text-3xl md:text-[44px] font-normal text-foreground leading-[1.1] mb-12 tracking-tightest max-w-2xl">From first payment to final conversation.</h2>
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
