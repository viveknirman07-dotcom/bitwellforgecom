import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useSEO } from "@/hooks/use-seo";
import { Lead, Note, Page, btn, call, field } from "./shared";

type F = { name: string; label: string; long?: boolean; optional?: boolean; type?: string };
const sections: { id: string; title: string; fields: F[] }[] = [
  { id: "A", title: "Business Information", fields: [
    { name: "full_name", label: "Full Name" }, { name: "work_email", label: "Work Email", type: "email" },
    { name: "company", label: "Company / Business Name" }, { name: "website", label: "Website URL", type: "url" },
    { name: "linkedin_url", label: "LinkedIn Company URL", optional: true, type: "url" }, { name: "country", label: "Country" },
    { name: "industry", label: "Industry" }, { name: "business_model", label: "Business Model" } ] },
  { id: "B", title: "Commercial Information", fields: [
    { name: "products_services", label: "Primary Products or Services", long: true }, { name: "customer_segment", label: "Main Customer Segment" },
    { name: "deal_value", label: "Average Deal / Transaction Value" }, { name: "monthly_revenue", label: "Approximate Monthly Revenue", optional: true },
    { name: "revenue_sources", label: "Primary Revenue Sources", long: true }, { name: "acquisition_channels", label: "Current Customer Acquisition Channels", long: true },
    { name: "sales_cycle", label: "Sales Cycle Length" } ] },
  { id: "C", title: "Operations & Delivery", fields: [
    { name: "team_size", label: "Team Size" }, { name: "delivery_model", label: "Current Delivery Model", long: true },
    { name: "operational_tools", label: "Primary Operational Tools" }, { name: "crm", label: "Current CRM", optional: true },
    { name: "reporting_process", label: "Reporting and Performance Tracking Process", long: true }, { name: "operational_challenges", label: "Major Operational Challenges", long: true } ] },
  { id: "D", title: "Current Constraints", fields: [
    { name: "constraints", label: "What are the three most significant constraints currently affecting your business performance?", long: true },
    { name: "underperforming", label: "Where do you believe your current business structure is underperforming?", long: true },
    { name: "clarify", label: "What would you most like this audit to clarify?", long: true } ] },
];
const ACCEPT = ".pdf,.csv,.xls,.xlsx,.doc,.docx,.png,.jpg,.jpeg";

const Intake = () => {
  useSEO({ title: "Business Information | BitwellForge", description: "Revenue Infrastructure Audit intake.", canonicalPath: "/audit/intake" });
  const [params] = useSearchParams();
  const token = params.get("t") ?? "";
  const nav = useNavigate();
  const [ready, setReady] = useState<"loading" | "open" | "done" | "error">("loading");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const files = useRef<HTMLInputElement>(null);

  useEffect(() => {
    call("audit-portal", { action: "get", token })
      .then((s) => setReady(s.intake_submitted_at ? "done" : "open"))
      .catch((e) => { setError(e.message); setReady("error"); });
  }, [token]);

  if (ready === "done") return <Navigate to={`/audit/onboarding-confirmed?t=${token}`} replace />;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const fd = new FormData(e.currentTarget);
    const picked = Array.from(files.current?.files ?? []);
    if (picked.length > 10) return setError("Please upload up to 10 documents.");
    const big = picked.find((f) => f.size > 20 * 1024 * 1024);
    if (big) return setError(`${big.name} is larger than 20 MB.`);
    fd.set("action", "intake"); fd.set("token", token);
    setSending(true); setError("");
    try { await call("audit-portal", fd); nav(`/audit/onboarding-confirmed?t=${token}`); }
    catch (err) { setError((err as Error).message); setSending(false); }
  };

  return (
    <Page eyebrow="Revenue Infrastructure Audit" title="Business Information">
      <Lead>These answers shape the audit. Please be as specific as you can. Fields marked optional can be left blank.</Lead>
      {ready === "loading" && <Note>Loading your audit.</Note>}
      {ready === "error" && <Note tone="error">{error || "This link is not valid."}</Note>}
      {ready === "open" && (
        <form onSubmit={submit} className="mt-10">
          {sections.map((s) => (
            <fieldset key={s.id} className="border-t border-border/70 pt-10 pb-12">
              <legend className="font-heading text-2xl md:text-3xl text-foreground mb-6"><span className="font-quote text-gold mr-3">{s.id}</span>{s.title}</legend>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
                {s.fields.map((f) => (
                  <label key={f.name} className={f.long ? "md:col-span-2 block" : "block"}>
                    <span className="block text-[11px] tracking-[0.18em] uppercase text-muted-foreground">{f.label}{f.optional ? " (optional)" : ""}</span>
                    {f.long
                      ? <textarea name={f.name} required={!f.optional} maxLength={4000} rows={4} className={`${field} resize-y leading-[1.7]`} />
                      : <input name={f.name} type={f.type ?? "text"} required={!f.optional} maxLength={500} className={field} />}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <fieldset className="border-t border-border/70 pt-10 pb-12">
            <legend className="font-heading text-2xl md:text-3xl text-foreground mb-4"><span className="font-quote text-gold mr-3">E</span>Supporting Documents</legend>
            <Lead>Optional. Sales or revenue reports, CRM exports, financial summaries, operational documentation or process diagrams. Up to 10 files, 20 MB each. Files are stored privately.</Lead>
            <input ref={files} type="file" name="documents" multiple accept={ACCEPT} className="block text-[14px] text-foreground file:mr-4 file:px-5 file:py-3 file:border file:border-foreground file:bg-transparent file:text-foreground file:text-[11px] file:uppercase file:tracking-[0.2em]" />
          </fieldset>
          <label className="flex gap-4 items-start border-t border-border/70 pt-8 mb-10">
            <input type="checkbox" name="consent" value="yes" required className="mt-1 h-4 w-4 accent-foreground" />
            <span className="text-[14px] leading-[1.7] text-muted-foreground">I confirm the information submitted is accurate and may be used by BitwellForge for the purpose of conducting this audit.</span>
          </label>
          {error && <div className="mb-6"><Note tone="error">{error}</Note></div>}
          <button type="submit" disabled={sending} className={btn}>{sending ? "Submitting" : "Submit Business Information"}</button>
        </form>
      )}
    </Page>
  );
};
export default Intake;
