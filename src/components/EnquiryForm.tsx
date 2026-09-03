import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export interface EnquiryFormProps {
  kind?: "contact" | "booking";
  options: string[];
  defaultOption?: string;
  submitLabel?: string;
  optionLabel?: string;
  prefilledNote?: boolean;
  onOptionChange?: () => void;
}

type State = "idle" | "sending" | "sent" | "error";

const field =
  "w-full bg-transparent border-b border-border px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300 text-sm";

/**
 * Single enquiry pipeline for the public site and the Forge Vault booking
 * section. Submissions are validated and stored server side, never mailto.
 */
const EnquiryForm = ({
  kind = "contact",
  options,
  defaultOption,
  submitLabel = "Book Infrastructure Audit",
  optionLabel = "What are you interested in",
  prefilledNote = false,
  onOptionChange,
}: EnquiryFormProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: defaultOption ?? options[0],
    challenge: "",
    website: "",
  });
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setMessage(null);

    const { data, error } = await supabase.functions.invoke("contact-submit", {
      body: { ...form, kind },
    });

    if (error || !data?.ok) {
      setState("error");
      setMessage(
        typeof data?.message === "string"
          ? data.message
          : "Your message could not be sent. Please try again, or write to v@bitwellforge.com.",
      );
      return;
    }

    setState("sent");
    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: defaultOption ?? options[0],
      challenge: "",
      website: "",
    });
  };

  if (state === "sent") {
    return (
      <div role="status" className="border-t border-border pt-8">
        <p className="font-heading text-2xl text-foreground tracking-tight">Received.</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-[42ch]">
          Your enquiry has reached BitwellForge. You will hear back within one working day at the
          address you provided.
        </p>
        <button
          onClick={() => setState("idle")}
          className="mt-8 text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={form.website}
        onChange={set("website")}
        className="hidden"
      />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
        <input id="name" type="text" required maxLength={120} value={form.name} onChange={set("name")} className={field} placeholder="Your name" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
          <input id="email" type="email" required maxLength={255} value={form.email} onChange={set("email")} className={field} placeholder="your@email.com" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            Phone <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <input id="phone" type="tel" inputMode="tel" maxLength={40} value={form.phone} onChange={set("phone")} className={field} placeholder="+91 00000 00000" />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">Company</label>
        <input id="company" type="text" maxLength={160} value={form.company} onChange={set("company")} className={field} placeholder="Your company" />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">{optionLabel}</label>
        <select
          id="service"
          value={form.service}
          onChange={(e) => {
            set("service")(e);
            onOptionChange?.();
          }}
          className={`${field} appearance-none cursor-pointer`}
        >
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-background text-foreground">
              {opt}
            </option>
          ))}
        </select>
        {prefilledNote && (
          <p className="text-xs text-accent mt-2">Pre-selected based on your interest. You can change this</p>
        )}
      </div>

      <div>
        <label htmlFor="challenge" className="block text-sm font-medium text-foreground mb-2">
          {kind === "booking" ? "What you want to work through" : "Current Challenge"}
        </label>
        <textarea
          id="challenge"
          required
          rows={4}
          minLength={10}
          maxLength={4000}
          value={form.challenge}
          onChange={set("challenge")}
          className={`${field} resize-none`}
          placeholder={kind === "booking" ? "Where your commercial system is constrained today..." : "Describe your current growth challenge..."}
        />
      </div>

      {state === "error" && message && (
        <p role="alert" className="text-sm text-destructive">{message}</p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:opacity-90 hover:scale-[1.015] active:scale-[0.98] transition-all duration-300 mt-4 disabled:opacity-60 disabled:hover:scale-100"
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {state === "sending" ? "Sending" : submitLabel}
        <ArrowRight size={16} />
      </button>
    </form>
  );
};

export default EnquiryForm;
