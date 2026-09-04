import { useState } from "react";
import Eyebrow from "@/components/Eyebrow";

const SLOTS = [
  "Weekday mornings",
  "Weekday afternoons",
  "Weekday evenings",
  "Weekend",
];

const FOCUS = [
  "Understanding what the system covers",
  "Fit for my business model",
  "Implementation sequence and timeline",
  "Team access and rollout",
];

/**
 * Booking request for a guided Forge Vault walkthrough.
 * Submits through the same mailto channel the rest of the site uses.
 */
const VaultBooking = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    slot: SLOTS[0],
    focus: FOCUS[0],
    note: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Forge Vault walkthrough request");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCompany: ${form.company}\nPreferred time: ${form.slot}\nFocus: ${form.focus}\nNote: ${form.note}`
    );
    window.location.href = `mailto:v@bitwellforge.com?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full bg-transparent border-b border-border px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300 text-sm";

  return (
    <section className="section-padding pb-28 md:pb-40">
      <div className="max-w-[900px] mx-auto border-t border-border pt-14 md:pt-20">
        <Eyebrow>Before you decide</Eyebrow>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="max-w-[46ch]">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
              Request a guided walkthrough.
            </h2>
            <p className="mt-6 text-[15.5px] leading-[1.85] font-light text-muted-foreground">
              A short conversation covering what the system contains, where it fits your current
              structure, and the sequence most businesses follow once inside. No obligation to
              purchase.
            </p>
            <p className="mt-5 text-[15.5px] leading-[1.85] font-light text-muted-foreground">
              Responses are sent within 24 hours.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div>
              <label htmlFor="vb-name" className="block text-sm font-medium text-foreground mb-2">Name</label>
              <input id="vb-name" required maxLength={100} value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={field} placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="vb-email" className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input id="vb-email" type="email" required maxLength={255} value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={field} placeholder="your@email.com" />
            </div>
            <div>
              <label htmlFor="vb-phone" className="block text-sm font-medium text-foreground mb-2">Phone</label>
              <input id="vb-phone" type="tel" maxLength={32} value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={field} placeholder="Include country code" />
            </div>
            <div>
              <label htmlFor="vb-company" className="block text-sm font-medium text-foreground mb-2">Company</label>
              <input id="vb-company" maxLength={120} value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className={field} placeholder="Your company" />
            </div>
            <div>
              <label htmlFor="vb-slot" className="block text-sm font-medium text-foreground mb-2">Preferred time</label>
              <select id="vb-slot" value={form.slot}
                onChange={(e) => setForm({ ...form, slot: e.target.value })}
                className={`${field} appearance-none cursor-pointer`}>
                {SLOTS.map((s) => (
                  <option key={s} value={s} className="bg-background text-foreground">{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="vb-focus" className="block text-sm font-medium text-foreground mb-2">Focus of the call</label>
              <select id="vb-focus" value={form.focus}
                onChange={(e) => setForm({ ...form, focus: e.target.value })}
                className={`${field} appearance-none cursor-pointer`}>
                {FOCUS.map((f) => (
                  <option key={f} value={f} className="bg-background text-foreground">{f}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="vb-note" className="block text-sm font-medium text-foreground mb-2">Context</label>
              <textarea id="vb-note" rows={4} maxLength={1000} value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className={`${field} resize-none`} placeholder="What are you trying to resolve?" />
            </div>

            <button type="submit" className="vault-cta mt-2">Request walkthrough</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VaultBooking;
