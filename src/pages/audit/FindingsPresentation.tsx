import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSEO } from "@/hooks/use-seo";
import { Lead, Note, Page, btn, call, field } from "./shared";

const TZ = "Asia/Kolkata";
const dayKey = (iso: string) => new Date(iso).toLocaleDateString("en-CA", { timeZone: TZ });

const FindingsPresentation = () => {
  useSEO({ title: "Findings Presentation | BitwellForge", description: "Book your Revenue Infrastructure Audit findings presentation.", canonicalPath: "/audit/findings-presentation" });
  const [params] = useSearchParams();
  const token = params.get("t") ?? "";
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  const [day, setDay] = useState("");
  const [slot, setSlot] = useState("");
  const [form, setForm] = useState({ full_name: "", email: "", company: "" });
  const [sending, setSending] = useState(false);
  const [booked, setBooked] = useState<{ slot_start: string; meet_url: string } | null>(null);

  const load = () => call("audit-booking", { action: "slots", token }).then((d) => { setData(d); setForm(d.prefill); }).catch((e) => setError(e.message));
  useEffect(() => { load(); }, [token]);

  const days = useMemo(() => {
    const m = new Map<string, string[]>();
    (data?.slots ?? []).forEach((s: string) => { const k = dayKey(s); m.set(k, [...(m.get(k) ?? []), s]); });
    return [...m.entries()];
  }, [data]);
  useEffect(() => { if (!day && days.length) setDay(days[0][0]); }, [days, day]);

  const book = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slot || sending) return;
    setSending(true); setError("");
    try { const r = await call("audit-booking", { action: "book", token, slot, ...form }); setBooked(r); }
    catch (err) { setError((err as Error).message); setSlot(""); load(); }
    finally { setSending(false); }
  };

  const fmt = (iso: string, o: Intl.DateTimeFormatOptions) => new Date(iso).toLocaleString("en-GB", { timeZone: TZ, ...o });

  if (booked) return (
    <Page eyebrow="Findings Presentation" title="Your Presentation Is Booked.">
      <Lead>{fmt(booked.slot_start, { dateStyle: "full", timeStyle: "short" })} India Standard Time, for 45–60 minutes.</Lead>
      <Lead>A confirmation email and a calendar invitation are on their way to {form.email}.</Lead>
      <a href={booked.meet_url} target="_blank" rel="noreferrer" className={btn}>Open Google Meet link</a>
    </Page>
  );

  return (
    <Page eyebrow="Revenue Infrastructure Audit" title="Findings Presentation">
      <Lead>A 45–60-minute session to walk through the most important findings, their implications and the recommended order of priorities. Times are shown in India Standard Time.</Lead>
      {error && <div className="my-6"><Note tone="error">{error}</Note></div>}
      {!data && !error && <Note>Loading available times.</Note>}
      {data && !data.eligible && <Note>Booking opens once your audit deliverables have been sent to you.</Note>}
      {data?.current && <div className="my-6"><Note>You are booked for {fmt(data.current.slot_start, { dateStyle: "full", timeStyle: "short" })}. Choosing a new time below will reschedule it.</Note></div>}
      {data?.eligible && (
        <form onSubmit={book} className="mt-10">
          {!days.length && <Note>No times are available in the next three weeks. Please email support@bitwellforge.com and we will arrange one.</Note>}
          {!!days.length && (
            <>
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">Choose a date</p>
              <div className="flex gap-2 overflow-x-auto pb-3 mb-8 -mx-1 px-1">
                {days.map(([k, list]) => (
                  <button type="button" key={k} onClick={() => { setDay(k); setSlot(""); }}
                    className={`shrink-0 w-[92px] border px-3 py-4 text-left transition-colors ${day === k ? "border-foreground bg-foreground text-background" : "border-border/70 text-foreground hover:border-foreground"}`}>
                    <span className="block text-[10px] uppercase tracking-[0.2em] opacity-80">{fmt(list[0], { weekday: "short" })}</span>
                    <span className="block font-heading text-2xl">{fmt(list[0], { day: "numeric" })}</span>
                    <span className="block text-[11px] opacity-80">{fmt(list[0], { month: "short" })}</span>
                  </button>
                ))}
              </div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">Choose a time</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 mb-12">
                {(days.find(([k]) => k === day)?.[1] ?? []).map((s) => (
                  <button type="button" key={s} onClick={() => setSlot(s)} aria-pressed={slot === s}
                    className={`border py-3 text-[14px] transition-colors ${slot === s ? "border-foreground bg-foreground text-background" : "border-border/70 text-foreground hover:border-foreground"}`}>
                    {fmt(s, { hour: "2-digit", minute: "2-digit", hour12: false })}
                  </button>
                ))}
              </div>
              <div className="grid md:grid-cols-3 gap-x-8 gap-y-6 border-t border-border/70 pt-8 mb-10">
                {([["full_name", "Name", "text"], ["email", "Business email", "email"], ["company", "Company", "text"]] as const).map(([k, l, t]) => (
                  <label key={k} className="block">
                    <span className="block text-[11px] tracking-[0.18em] uppercase text-muted-foreground">{l}</span>
                    <input type={t} required maxLength={k === "email" ? 255 : 160} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className={field} />
                  </label>
                ))}
              </div>
              <button type="submit" disabled={!slot || sending} className={btn}>{sending ? "Booking" : slot ? `Confirm ${fmt(slot, { weekday: "short", day: "numeric", month: "short" })}, ${fmt(slot, { hour: "2-digit", minute: "2-digit", hour12: false })}` : "Select a time"}</button>
            </>
          )}
        </form>
      )}
    </Page>
  );
};
export default FindingsPresentation;
