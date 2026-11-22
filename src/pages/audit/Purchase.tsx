import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Note, btn, btnGhost, call, field } from "./shared";

const Purchase = () => {
  const [params] = useSearchParams();
  const [form, setForm] = useState({ full_name: "", email: "" });
  const [busy, setBusy] = useState<"" | "paypal" | "nowpayments">("");
  const [error, setError] = useState("");
  const pay = async (provider: "paypal" | "nowpayments") => {
    if (!form.full_name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError("Please enter your name and a valid email.");
    setBusy(provider); setError("");
    try {
      const r = await call<{ approve_url: string }>("audit-checkout", { ...form, provider });
      if (!r.approve_url) throw new Error("The payment page could not be opened. Please try again.");
      window.location.href = r.approve_url;
    } catch (e) { setError((e as Error).message); setBusy(""); }
  };
  return (
    <div id="purchase" className="border-t border-gold/15 py-14 md:py-20 grid lg:grid-cols-12 gap-10 lg:gap-16">
      <div className="lg:col-span-5">
        <p className="text-[10px] tracking-[0.25em] uppercase text-gold/80 mb-4">Commission the audit</p>
        <p className="font-heading text-5xl text-foreground mb-3">$1,199 <span className="text-base font-body text-muted-foreground tracking-[0.2em]">USD</span></p>
        <p className="text-muted-foreground text-[15px] leading-[1.85] font-light max-w-md">Includes the Complete Audit Report, Executive Findings PDF, 90-Day Priority Roadmap and a 45–60-minute findings presentation.</p>
      </div>
      <div className="lg:col-span-7">
        {params.get("cancelled") && <div className="mb-6"><Note>Your payment was cancelled. Nothing has been charged.</Note></div>}
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 mb-10">
          <label className="block"><span className="block text-[11px] tracking-[0.18em] uppercase text-muted-foreground">Full name</span>
            <input className={field} maxLength={120} value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></label>
          <label className="block"><span className="block text-[11px] tracking-[0.18em] uppercase text-muted-foreground">Email</span>
            <input className={field} type="email" maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className={btn} disabled={!!busy} onClick={() => pay("paypal")}>{busy === "paypal" ? "Opening PayPal" : "Pay $1,199 with PayPal"}</button>
          <button className={btnGhost} disabled={!!busy} onClick={() => pay("nowpayments")}>{busy === "nowpayments" ? "Opening" : "Pay with crypto"}</button>
        </div>
        {error && <div className="mt-6"><Note tone="error">{error}</Note></div>}
      </div>
    </div>
  );
};
export default Purchase;
