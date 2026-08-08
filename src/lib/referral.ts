import { supabase } from "@/integrations/supabase/client";

const KEY = "bwf_ref";
const TTL_DAYS = 60;

export const captureReferral = async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("ref");
  if (!code) return;
  try {
    const { data } = await supabase.functions.invoke("referral-track", {
      body: { code, landing_path: window.location.pathname, referer: document.referrer || undefined },
    });
    if (data?.valid) {
      localStorage.setItem(KEY, JSON.stringify({ code: data.code, at: Date.now() }));
    }
  } catch {
    /* attribution must never break the page */
  }
};

export const getReferral = (): string | null => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const { code, at } = JSON.parse(raw);
    if (Date.now() - at > TTL_DAYS * 864e5) return null;
    return code ?? null;
  } catch {
    return null;
  }
};
