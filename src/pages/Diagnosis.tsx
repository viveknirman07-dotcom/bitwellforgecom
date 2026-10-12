import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";
import { supabase } from "@/integrations/supabase/client";

type Diagnosis = {
  headline: string;
  summary: string;
  constraints: { title: string; explanation: string }[];
  focusAreas: { area: string; why: string; firstMove: string }[];
  question: string;
};

const cap = "text-[13px] uppercase tracking-[0.02em] font-medium";
const field = "w-full bg-transparent border-0 border-b border-foreground/40 focus:border-foreground focus:outline-none py-3 text-[16px] font-body transition-colors";

export default function DiagnosisPage() {
  useSEO({
    title: "Systems Diagnosis | BitwellForge",
    description: "Describe your growth challenge and receive an AI-powered systems diagnosis with recommended focus areas from BitwellForge.",
    canonicalPath: "/diagnosis",
  });
  const [form, setForm] = useState({ businessType: "", teamSize: "", revenue: "", challenge: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Diagnosis | null>(null);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.challenge.trim().length < 40) { setError("Please describe your challenge in at least a few sentences."); return; }
    setLoading(true); setError(""); setResult(null);
    const { data, error: fnError } = await supabase.functions.invoke("growth-diagnosis", { body: form });
    setLoading(false);
    if (fnError || !data?.diagnosis) {
      let msg = "The diagnosis could not be completed. Please try again.";
      try { const b = await (fnError as { context?: Response })?.context?.json(); if (b?.error) msg = b.error; } catch { /* keep default */ }
      if (data?.error) msg = data.error;
      setError(msg); return;
    }
    setResult(data.diagnosis);
    requestAnimationFrame(() => document.getElementById("diagnosis-result")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div className="pt-32 md:pt-44 pb-24 md:pb-40 max-w-[1920px] mx-auto px-5 md:px-12 lg:px-[13.5%] text-foreground">
      <div className="grid md:grid-cols-12 gap-y-12 md:gap-x-10">
        <div className="md:col-span-5">
          <p className={`${cap} mb-6`}>Systems diagnosis</p>
          <h1 className="font-heading text-[42px] md:text-[64px] leading-[1.02] tracking-[-0.02em] font-normal">Describe the problem. We will read the system behind it.</h1>
          <p className="mt-8 text-[16px] leading-[1.7] text-muted-foreground max-w-[42ch]">Tell us where growth is stalling. An AI-powered first reading identifies the structural constraints at work and the areas that deserve attention first. It is a starting point for a conversation, not a substitute for a full audit.</p>
        </div>
        <form onSubmit={submit} className="md:col-span-6 md:col-start-7 space-y-8" noValidate>
          <label className="block"><span className={cap}>01 Business type</span>
            <input className={field} value={form.businessType} onChange={set("businessType")} maxLength={120} placeholder="Agency, consultancy, B2B services" /></label>
          <div className="grid sm:grid-cols-2 gap-8">
            <label className="block"><span className={cap}>02 Team size</span>
              <input className={field} value={form.teamSize} onChange={set("teamSize")} maxLength={60} placeholder="12 people" /></label>
            <label className="block"><span className={cap}>03 Annual revenue</span>
              <input className={field} value={form.revenue} onChange={set("revenue")} maxLength={60} placeholder="$1.5M" /></label>
          </div>
          <label className="block"><span className={cap}>04 Your growth challenge</span>
            <textarea required className={`${field} min-h-[180px] resize-y`} value={form.challenge} onChange={set("challenge")} maxLength={4000}
              placeholder="What is happening, what you have tried, and what it is costing you." /></label>
          {error && <p role="alert" className="text-[14px] text-destructive">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-between bg-primary text-primary-foreground px-6 min-h-[56px] text-[14px] font-medium [text-transform:uppercase] tracking-[0.02em] disabled:opacity-70">
            {loading ? "Reading your system" : "Generate diagnosis"}
            {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} strokeWidth={1.5} />}
          </button>
        </form>
      </div>

      {result && (
        <section id="diagnosis-result" aria-live="polite" className="mt-24 md:mt-36 border-t border-foreground/60 pt-12 scroll-mt-32">
          <p className={`${cap} mb-6`}>Your diagnosis</p>
          <h2 className="font-heading text-[34px] md:text-[56px] leading-[1.05] tracking-[-0.02em] font-normal max-w-[20ch]">{result.headline}</h2>
          <p className="mt-6 text-[17px] leading-[1.7] max-w-[60ch]">{result.summary}</p>

          <h3 className={`${cap} mt-16 mb-6`}>Structural constraints</h3>
          <ol className="border-t border-foreground/30">
            {result.constraints.map((c, i) => (
              <li key={i} className="grid md:grid-cols-12 gap-4 md:gap-8 py-6 border-b border-foreground/30">
                <span className="text-[14px] font-medium md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-heading text-[24px] md:text-[28px] leading-[1.15] md:col-span-4">{c.title}</p>
                <p className="text-[15px] leading-[1.7] text-muted-foreground md:col-span-7">{c.explanation}</p>
              </li>
            ))}
          </ol>

          <h3 className={`${cap} mt-16 mb-6`}>Recommended focus areas</h3>
          <div className="grid md:grid-cols-3 gap-10">
            {result.focusAreas.map((f, i) => (
              <div key={i} className="border-t border-foreground pt-6">
                <span className="text-[14px] font-medium">Priority {String(i + 1).padStart(2, "0")}</span>
                <p className="font-heading text-[26px] leading-[1.15] mt-3">{f.area}</p>
                <p className="mt-4 text-[15px] leading-[1.7] text-muted-foreground">{f.why}</p>
                <p className="mt-4 text-[15px] leading-[1.7]"><span className="font-medium">First move. </span>{f.firstMove}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-secondary/60 p-8 md:p-12">
            <p className={`${cap} mb-4`}>The question to answer next</p>
            <p className="font-heading text-[26px] md:text-[34px] leading-[1.2] max-w-[40ch]">{result.question}</p>
          </div>
        </section>
      )}
    </div>
  );
}
