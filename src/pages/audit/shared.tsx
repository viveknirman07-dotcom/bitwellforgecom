import { ReactNode } from "react";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const field = "w-full bg-transparent border-0 border-b border-border/70 focus:border-foreground focus:outline-none py-3 text-[15px] text-foreground placeholder:text-muted-foreground/60 transition-colors";
export const btn = "inline-flex items-center justify-center px-7 py-4 text-[11px] font-medium uppercase [letter-spacing:0.26em] bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50";
export const btnGhost = "inline-flex items-center justify-center px-7 py-4 text-[11px] font-medium uppercase [letter-spacing:0.26em] border border-foreground text-foreground transition-opacity hover:opacity-80 disabled:opacity-50";

/** Inline colour guards against global button/link colour rules. */
export const btnStyle = { color: "hsl(var(--background))" };

export async function call<T = any>(fn: string, body: Record<string, unknown> | FormData): Promise<T> {
  const { data, error } = await supabase.functions.invoke(fn, { body });
  if (error) {
    let msg = "Something went wrong. Please try again.";
    if (error instanceof FunctionsHttpError) {
      try { const j = await error.context.json(); if (j?.error) msg = typeof j.error === "string" ? j.error : msg; } catch { /* default */ }
    }
    throw new Error(msg);
  }
  return data as T;
}

export const Page = ({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children: ReactNode }) => (
  <div className="pt-20">
    <section className="section-padding section-y">
      <div className="max-w-[960px] mx-auto">
        <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-5 eyebrow">{eyebrow}</p>
        <h1 className="font-heading text-[34px] md:text-[52px] font-normal text-foreground leading-[1.08] tracking-tightest mb-8 text-balance">{title}</h1>
        {children}
      </div>
    </section>
  </div>
);

export const Lead = ({ children }: { children: ReactNode }) => (
  <p className="text-muted-foreground text-[15px] md:text-[17px] leading-[1.8] font-light max-w-2xl mb-5">{children}</p>
);

/** Numbered progress indicator; `done` = number of completed stages. */
export const Progress = ({ stages, done }: { stages: string[]; done: number }) => (
  <ol className="grid grid-cols-1 sm:grid-cols-3 border-t border-border/70 my-10">
    {stages.map((s, i) => {
      const state = i < done ? "Complete" : i === done ? "Current" : "Pending";
      return (
        <li key={s} className={`py-5 sm:pr-6 border-b sm:border-b-0 border-border/70 ${i < done ? "" : "opacity-70"}`}>
          <span className={`block h-[2px] mb-4 ${i < done ? "bg-foreground" : i === done ? "bg-gold" : "bg-border"}`} />
          <span className="block font-quote text-gold text-xl mb-1">0{i + 1}</span>
          <span className="block text-[15px] text-foreground">{s}</span>
          <span className="block text-[10px] tracking-[0.22em] uppercase text-muted-foreground mt-1">{state}</span>
        </li>
      );
    })}
  </ol>
);

export const Note = ({ tone = "muted", children }: { tone?: "muted" | "error"; children: ReactNode }) => (
  <p role={tone === "error" ? "alert" : undefined} className={`text-[15px] leading-[1.7] ${tone === "error" ? "text-destructive" : "text-muted-foreground"}`}>{children}</p>
);

export const STATUS_LABEL: Record<string, string> = {
  payment_confirmed: "Payment Confirmed", intake_pending: "Intake Pending", intake_completed: "Intake Completed",
  audit_in_progress: "Audit In Progress", audit_ready: "Audit Ready", deliverables_sent: "Deliverables Sent",
  presentation_scheduled: "Presentation Scheduled", presentation_completed: "Presentation Completed",
};
