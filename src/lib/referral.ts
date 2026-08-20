import { supabase } from "@/integrations/supabase/client";

const KEY = "bwf_ref";
const TTL_DAYS = 60;

interface StoredReferral {
  code: string;
  at: number;
  validated?: boolean;
}

const read = (): StoredReferral | null => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredReferral;
    if (!parsed?.code) return null;
    if (Date.now() - parsed.at > TTL_DAYS * 864e5) return null;
    return parsed;
  } catch {
    return null;
  }
};

const write = (value: StoredReferral) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* storage may be unavailable */
  }
};

/**
 * Captures a referral arriving on the URL. Attribution is deterministic:
 * a newer link replaces an unvalidated attribution, but never silently
 * overwrites one the buyer has already validated at checkout.
 */
export const captureReferral = async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("ref");
  if (!code) return;

  const existing = read();
  if (existing?.validated && existing.code.toUpperCase() !== code.toUpperCase()) return;

  try {
    const { data } = await supabase.functions.invoke("referral-track", {
      body: {
        action: "track",
        code,
        landing_path: window.location.pathname,
        referer: document.referrer || undefined,
      },
    });
    if (data?.valid) write({ code: data.code, at: Date.now() });
  } catch {
    /* attribution must never break the page */
  }
};

export const getReferral = (): string | null => read()?.code ?? null;

export const isReferralValidated = (): boolean => Boolean(read()?.validated);

export const markReferralValidated = (code: string) => {
  const existing = read();
  write({ code, at: existing?.at ?? Date.now(), validated: true });
};
