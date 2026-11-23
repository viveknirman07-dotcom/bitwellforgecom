import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSEO } from "@/hooks/use-seo";
import { Lead, Note, Page, Progress, STATUS_LABEL, btn, call , btnStyle } from "./shared";

const ORDER = ["intake_pending", "intake_completed", "audit_in_progress", "audit_ready", "deliverables_sent", "presentation_scheduled", "presentation_completed"];

const ClientStatus = () => {
  useSEO({ title: "Your Audit | BitwellForge", description: "Revenue Infrastructure Audit status.", canonicalPath: "/audit/client" });
  const [params] = useSearchParams();
  const token = params.get("t") ?? "";
  const [s, setS] = useState<any>(null);
  const [error, setError] = useState("");
  useEffect(() => { call("audit-portal", { action: "get", token }).then(setS).catch((e) => setError(e.message)); }, [token]);
  const i = s ? ORDER.indexOf(s.status) : 0;
  const done = i <= 0 ? 1 : i < 4 ? 2 : 3;
  return (
    <Page eyebrow={s ? `Order ${s.order_ref}` : "Revenue Infrastructure Audit"} title="Your Audit">
      {error && <Note tone="error">{error}</Note>}
      {s && (
        <>
          <Lead>Current status: {STATUS_LABEL[s.status] ?? s.status}</Lead>
          <Progress stages={["Payment & Business Information", "Audit Preparation", "Deliverables & Presentation"]} done={done} />
          {s.status === "intake_pending" && <Link to={`/audit/intake?t=${token}`} className={btn} style={btnStyle}>Complete Your Business Information</Link>}
          {s.deliverables && (
            <div className="border-t border-border/70">
              {[["report", "Complete Audit Report"], ["findings", "Executive Findings PDF"], ["roadmap", "90-Day Priority Roadmap"]].map(([k, label]) => (
                <div key={k} className="flex items-center justify-between gap-6 py-5 border-b border-border/70">
                  <span className="font-heading text-xl text-foreground">{label}</span>
                  {s.deliverables[k] ? <a href={s.deliverables[k]} target="_blank" rel="noreferrer" className="text-[11px] uppercase tracking-[0.22em] text-foreground border-b border-foreground">Download</a> : <span className="text-muted-foreground text-sm">Unavailable</span>}
                </div>
              ))}
              <p className="text-muted-foreground text-xs mt-3 mb-10">Download links stay valid for one hour. Reload this page for fresh links.</p>
            </div>
          )}
          {s.meeting_at && (
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">Findings presentation</p>
              <p className="font-heading text-2xl text-foreground mb-2">{new Date(s.meeting_at).toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}</p>
              {s.meeting_url && <a href={s.meeting_url} target="_blank" rel="noreferrer" className="text-foreground border-b border-foreground text-[15px]">Join Google Meet</a>}
            </div>
          )}
          {s.booking_url && <Link to={`/audit/findings-presentation?t=${token}`} className={btn} style={btnStyle}>{s.meeting_at ? "Reschedule Presentation" : "Schedule Your Findings Presentation"}</Link>}
        </>
      )}
    </Page>
  );
};
export default ClientStatus;
