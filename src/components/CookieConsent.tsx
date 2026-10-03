import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Choices = { necessary: true; analytics: boolean; marketing: boolean };
const KEY = "bitwellforge-cookie-consent-v1";
const essential: Choices = { necessary: true, analytics: false, marketing: false };

function savedChoices(): Choices | null {
  try {
    const value = localStorage.getItem(KEY);
    if (!value) return null;
    const parsed = JSON.parse(value) as Partial<Choices>;
    if (typeof parsed.analytics !== "boolean" || typeof parsed.marketing !== "boolean") return null;
    return { necessary: true, analytics: parsed.analytics, marketing: parsed.marketing };
  } catch { return null; }
}

export default function CookieConsent() {
  const [saved, setSaved] = useState<Choices | null>(savedChoices);
  const [open, setOpen] = useState(false);
  const [manage, setManage] = useState(false);
  const [choices, setChoices] = useState<Choices>(saved ?? essential);
  useEffect(() => {
    const reopen = () => { setChoices(savedChoices() ?? essential); setManage(true); setOpen(true); };
    window.addEventListener("bitwellforge:open-cookie-settings", reopen);
    return () => window.removeEventListener("bitwellforge:open-cookie-settings", reopen);
  }, []);

  const store = (next: Choices) => {
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* Private mode may disable storage */ }
    setSaved(next);
    setChoices(next);
    setOpen(false);
    setManage(false);
    window.dispatchEvent(new CustomEvent("bitwellforge:consent-change", { detail: next }));
  };

  return <>
    {(!saved || open) && <div role="dialog" aria-modal="false" aria-label="Cookie preferences" className="fixed z-[70] bottom-0 inset-x-0 bg-background border-t border-border shadow-elevated text-foreground">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-5 md:py-7 flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="max-w-[670px]">
          <div className="flex items-center justify-between gap-5"><h2 className="font-heading text-[25px] md:text-[31px] leading-tight">Your privacy, your choice.</h2>{saved && <Button variant="ghost" size="icon" aria-label="Close cookie preferences" onClick={() => setOpen(false)}><X size={18} /></Button>}</div>
          <p className="text-[13px] md:text-[14px] leading-relaxed text-muted-foreground mt-2">Necessary storage keeps the site working. Optional analytics and marketing stay off unless you choose otherwise. Read our <Link className="underline underline-offset-2 text-foreground" to="/privacy">Privacy Policy</Link> and <Link className="underline underline-offset-2 text-foreground" to="/cookies">Cookie Policy</Link>.</p>
          {manage && <div className="mt-4 grid sm:grid-cols-3 gap-4 text-[13px]">
            <label className="flex items-center gap-2"><input type="checkbox" checked disabled className="accent-primary" /> Necessary <span className="text-muted-foreground">Always on</span></label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={choices.analytics} onChange={(event) => setChoices({ ...choices, analytics: event.target.checked })} className="accent-primary" /> Analytics</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={choices.marketing} onChange={(event) => setChoices({ ...choices, marketing: event.target.checked })} className="accent-primary" /> Marketing</label>
          </div>}
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          {!manage && <Button variant="outline" onClick={() => setManage(true)}>Manage preferences</Button>}
          <Button variant="outline" onClick={() => store(essential)}>Essential only</Button>
          {manage && <Button onClick={() => store(choices)}>Save choices</Button>}
          <Button onClick={() => store({ necessary: true, analytics: true, marketing: true })}>Accept all</Button>
        </div>
      </div>
    </div>}
  </>;
}