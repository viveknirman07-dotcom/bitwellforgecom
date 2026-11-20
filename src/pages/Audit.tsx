import ScrollReveal from "@/components/ScrollReveal";
import { useSEO } from "@/hooks/use-seo";
import { StructuralArchitecture, BusinessFramework, SystemsFeedbackLoops } from "@/components/diagrams/AuditDiagrams";

const frameworks = [
  { n: "I", t: "What the audit examines", d: "Five layers of the business are read together. Each layer depends on the ones beneath it, so a constraint in structure or commercial systems surfaces later as an acquisition or delivery problem.", C: StructuralArchitecture },
  { n: "II", t: "How the audit is framed", d: "Revenue infrastructure sits at the centre. Strategy, acquisition, sales, operations and digital systems are assessed as one connected framework rather than isolated activities.", C: BusinessFramework },
  { n: "III", t: "Why constraints compound", d: "The output of each function becomes the input of the next. Retention feeds demand and revenue funds lead generation, so a weak link quietly limits the whole system.", C: SystemsFeedbackLoops },
];

const timeline = [
  { t: "Client Delivery", w: "Within 5–6 days", d: "Send the complete audit report, Executive Findings PDF and 90-Day Priority Roadmap. Include the meeting link for the findings presentation." },
  { t: "Findings Presentation", w: "After delivery", d: "Conduct a 45–60-minute meeting. Explain the most important findings, their implications and the recommended order of priorities." },
];

const Audit = () => {
  useSEO({
    title: "Revenue Infrastructure Audit | BitwellForge",
    description: "A structured audit of business structure, commercial systems, acquisition, operations and digital infrastructure. $1,199 USD, delivered within 5–6 days.",
    canonicalPath: "/audit",
  });
  return (
    <div className="pt-20">
      <section className="section-padding section-y">
        <div className="max-w-[1400px] mx-auto max-w-3xl">
          <ScrollReveal>
            <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-5 eyebrow">Revenue Infrastructure Audit</p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <h1 className="font-heading text-[34px] md:text-[56px] lg:text-[64px] font-normal text-foreground leading-[1.06] tracking-tightest mb-6 md:mb-8 text-balance">
              Begin with the <span className="font-quote italic text-gold/95">commercial problem.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <p className="text-muted-foreground text-[15px] md:text-lg leading-[1.8] font-light max-w-2xl mb-8">
              A structured reading of how your business generates, converts and retains revenue, and where its structure quietly limits growth.
            </p>
            <p className="font-heading text-3xl md:text-4xl text-foreground">$1,199 <span className="text-base font-body text-muted-foreground tracking-[0.2em]">USD</span></p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto">
          {frameworks.map(({ n, t, d, C }, i) => (
            <div key={n} className={`border-t border-gold/15 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="lg:col-span-5">
                <span className="font-quote text-gold text-2xl block mb-5">{n}</span>
                <h2 className="font-heading text-3xl md:text-[40px] lg:text-[44px] font-normal text-foreground leading-[1.1] mb-5 tracking-tightest">{t}</h2>
                <p className="text-muted-foreground text-[15px] leading-[1.85] font-light max-w-xl">{d}</p>
              </div>
              <div className="lg:col-span-7 mx-auto w-full max-w-[560px]"><C /></div>
            </div>
          ))}
          <div className="border-t border-gold/15 pt-14 md:pt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
            {timeline.map((s) => (
              <div key={s.t}>
                <p className="text-[10px] tracking-[0.25em] uppercase text-gold/80 mb-4">{s.w}</p>
                <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-4">{s.t}</h3>
                <p className="text-muted-foreground text-[15px] leading-[1.85] font-light max-w-md">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Audit;
