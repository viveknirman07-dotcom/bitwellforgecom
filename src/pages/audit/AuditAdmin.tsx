import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useSEO } from "@/hooks/use-seo";
import { Note, Page, STATUS_LABEL, btn, btnGhost, call, field , btnStyle } from "./shared";

const AuditAdmin = () => {
  useSEO({ title: "Audit Records | BitwellForge", description: "Internal audit records.", canonicalPath: "/audit/admin" });
  const [session, setSession] = useState<Session | null>(null);
  const [cred, setCred] = useState({ email: "", password: "" });
  const [items, setItems] = useState<any[]>([]);
  const [params, setParams] = useSearchParams();
  const id = params.get("id");
  const [detail, setDetail] = useState<any>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);
  const refresh = async () => {
    try {
      setItems((await call("audit-admin", { action: "list" })).items);
      if (id) setDetail(await call("audit-admin", { action: "detail", id }));
    } catch (e) { setMsg((e as Error).message); }
  };
  useEffect(() => { if (session) refresh(); }, [session, id]);

  const act = async (body: Record<string, unknown> | FormData) => {
    setBusy(true); setMsg("");
    try { await call("audit-admin", body); setMsg("Saved."); await refresh(); } catch (e) { setMsg((e as Error).message); }
    setBusy(false);
  };

  if (!session) return (
    <Page eyebrow="Internal" title="Audit Records">
      <form className="max-w-sm space-y-6" onSubmit={async (e) => { e.preventDefault(); const { error } = await supabase.auth.signInWithPassword(cred); if (error) setMsg(error.message); }}>
        <input className={field} type="email" placeholder="Email" required value={cred.email} onChange={(e) => setCred({ ...cred, email: e.target.value })} />
        <input className={field} type="password" placeholder="Password" required value={cred.password} onChange={(e) => setCred({ ...cred, password: e.target.value })} />
        <button className={btn} style={btnStyle}>Sign in</button>
        {msg && <Note tone="error">{msg}</Note>}
      </form>
    </Page>
  );

  return (
    <Page eyebrow="Internal" title="Audit Records">
      {msg && <div className="mb-6"><Note tone={msg === "Saved." ? "muted" : "error"}>{msg}</Note></div>}
      {!detail || !id ? (
        <div className="border-t border-border/70">
          {!items.length && <div className="py-6"><Note>No audits yet.</Note></div>}
          {items.map((r) => (
            <button key={r.id} onClick={() => setParams({ id: r.id })} className="w-full text-left grid grid-cols-1 md:grid-cols-4 gap-2 py-5 border-b border-border/70 hover:bg-foreground/[0.03]">
              <span className="font-heading text-xl text-foreground">{r.full_name ?? r.email}</span>
              <span className="text-[14px] text-muted-foreground">{r.order_ref}</span>
              <span className="text-[14px] text-foreground">{STATUS_LABEL[r.status]}</span>
              <span className="text-[13px] text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-10">
          <button onClick={() => { setParams({}); setDetail(null); }} className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">All audits</button>
          <div><p className="font-heading text-3xl text-foreground">{detail.full_name}</p><Note>{detail.email} · {detail.order_ref} · {STATUS_LABEL[detail.status]}</Note></div>
          {detail.intake && (
            <dl className="border-t border-border/70">
              {Object.entries(detail.intake).map(([k, v]) => (
                <div key={k} className="grid md:grid-cols-[220px_1fr] gap-2 py-3 border-b border-border/70">
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{k.replace(/_/g, " ")}</dt>
                  <dd className="text-[14px] text-foreground whitespace-pre-wrap">{String(v)}</dd>
                </div>
              ))}
            </dl>
          )}
          {!!detail.documents?.length && <div>{detail.documents.map((d: any) => <a key={d.url} href={d.url} target="_blank" rel="noreferrer" className="block text-foreground underline text-[14px]">{d.name}</a>)}</div>}
          <div className="flex flex-wrap gap-3">
            <button disabled={busy} className={btnGhost} onClick={() => act({ action: "status", id, status: "audit_in_progress" })}>Mark in progress</button>
            <button disabled={busy} className={btnGhost} onClick={() => act({ action: "status", id, status: "audit_ready" })}>Mark audit ready</button>
            <button disabled={busy} className={btnGhost} onClick={() => act({ action: "status", id, status: "presentation_completed" })}>Mark presentation completed</button>
          </div>
          <div className="border-t border-border/70 pt-8 space-y-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Deliverables (PDF)</p>
            {([["report", "Complete Audit Report", "report_path"], ["findings", "Executive Findings PDF", "findings_path"], ["roadmap", "90-Day Priority Roadmap", "roadmap_path"]] as const).map(([slot, label, key]) => (
              <label key={slot} className="flex flex-wrap items-center gap-4">
                <span className="w-64 text-foreground">{label} {detail[key] ? "· uploaded" : ""}</span>
                <input type="file" accept="application/pdf" disabled={busy} onChange={(e) => { const f = e.target.files?.[0]; if (!f) return; const fd = new FormData(); fd.set("action", "upload"); fd.set("id", id); fd.set("slot", slot); fd.set("file", f); act(fd); }} className="text-[13px]" />
              </label>
            ))}
            <button disabled={busy || !detail.report_path || !detail.findings_path || !detail.roadmap_path} className={btn} style={btnStyle} onClick={() => act({ action: "deliver", id })}>Send deliverables to client</button>
          </div>
          {detail.meeting_at && <Note>Presentation: {new Date(detail.meeting_at).toLocaleString()} · <a className="underline" href={detail.meeting_url}>{detail.meeting_url}</a></Note>}
          <div className="border-t border-border/70 pt-6">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">History</p>
            {detail.history?.map((h: any) => <Note key={h.created_at}>{new Date(h.created_at).toLocaleString()} · {STATUS_LABEL[h.status]}{h.note ? ` · ${h.note}` : ""}</Note>)}
          </div>
        </div>
      )}
    </Page>
  );
};
export default AuditAdmin;
