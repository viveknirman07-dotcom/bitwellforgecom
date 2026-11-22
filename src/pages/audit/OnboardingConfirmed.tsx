import { Link, useSearchParams } from "react-router-dom";
import { useSEO } from "@/hooks/use-seo";
import { StructuralArchitecture } from "@/components/diagrams/AuditDiagrams";
import { Lead, Page, btnGhost } from "./shared";

const OnboardingConfirmed = () => {
  useSEO({ title: "Information Received | BitwellForge", description: "Your audit intake has been received.", canonicalPath: "/audit/onboarding-confirmed" });
  const [params] = useSearchParams();
  const t = params.get("t");
  return (
    <Page eyebrow="Revenue Infrastructure Audit" title="Your Information Has Been Received.">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7">
          <Lead>Your business information has been successfully submitted.</Lead>
          <Lead>The BitwellForge team will now begin reviewing your business structure, commercial systems, acquisition processes and operational dependencies.</Lead>
          <Lead>Your complete audit deliverables will be prepared within 5–6 days.</Lead>
          <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-10 mb-4">Your audit includes</p>
          <ul className="border-t border-border/70 mb-10">
            {["Comprehensive Revenue Infrastructure Audit Report", "Executive Findings PDF", "90-Day Priority Roadmap", "Findings Presentation (45–60 minutes)"].map((d) => (
              <li key={d} className="py-4 border-b border-border/70 font-heading text-xl text-foreground">{d}</li>
            ))}
          </ul>
          <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">Status</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 mb-10 text-[14px]">
            <span className="text-foreground">Payment Confirmed</span>
            <span className="text-foreground">Intake Completed</span>
            <span className="text-muted-foreground">Audit Preparation Pending</span>
          </div>
          {t && <Link to={`/audit/client?t=${t}`} className={btnGhost}>View audit status</Link>}
        </div>
        <div className="lg:col-span-5 w-full max-w-[440px] mx-auto"><StructuralArchitecture /></div>
      </div>
    </Page>
  );
};
export default OnboardingConfirmed;
