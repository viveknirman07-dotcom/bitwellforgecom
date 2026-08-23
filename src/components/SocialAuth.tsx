import { useState } from "react";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";

interface Props {
  /** Path the user should land on once the provider redirect completes. */
  next: string;
  onError: (message: string) => void;
}

/**
 * Google and Apple sign-in. Supabase links a provider identity to the existing
 * account when the provider returns an already-verified email, so no duplicate
 * account is created for returning users. Authorization is unchanged: it stays
 * entitlement- and role-driven server-side.
 */
// Apple sign-in stays implemented but is hidden from the UI until BitwellForge
// holds its own Apple Developer credentials. Flip to true to re-enable.
const SHOW_APPLE = false;

const SocialAuth = ({ next, onError }: Props) => {
  const [busy, setBusy] = useState<string | null>(null);

  const start = async (provider: "google" | "apple") => {
    setBusy(provider);
    onError("");
    const callbackUrl = new URL("/account", window.location.origin);
    callbackUrl.searchParams.set("next", next);

    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: callbackUrl.toString(),
      extraParams: provider === "google" ? { prompt: "select_account" } : undefined,
    });

    if (result.error) {
      setBusy(null);
      onError(result.error.message);
      return;
    }

    if (!result.redirected) setBusy(null);
  };

  const cls =
    "w-full inline-flex items-center justify-center gap-3 border border-border text-foreground text-sm px-8 py-4 min-h-[48px] rounded-full transition-colors hover:border-foreground/60 disabled:opacity-50";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4 py-2">
        <span className="h-px flex-1 bg-border/40" />
        <span className="text-[10px] tracking-[0.24em] uppercase text-muted-foreground">or</span>
        <span className="h-px flex-1 bg-border/40" />
      </div>
      <Button type="button" variant="outline" onClick={() => start("google")} disabled={busy !== null} className={cls}>
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.2-2.2H12v4.1h6.5c-.1 1.1-.8 2.8-2.4 3.9l-.02.15 3.5 2.7.24.02c2.2-2.1 3.5-5 3.5-8.7Z" />
          <path fill="#34A853" d="M12 24c3.2 0 5.9-1 7.8-2.8l-3.7-2.9c-1 .7-2.3 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-4.9l-.14.01-3.6 2.8-.05.14C3.5 21.3 7.4 24 12 24Z" />
          <path fill="#FBBC05" d="M5.3 14.6a7.4 7.4 0 0 1 0-4.7l-.01-.16L1.6 6.9l-.12.06a12 12 0 0 0 0 10.8l3.8-3.1Z" />
          <path fill="#EA4335" d="M12 4.7c2.2 0 3.7.9 4.5 1.7l3.3-3.2C17.9 1.2 15.2 0 12 0 7.4 0 3.5 2.7 1.5 6.6l3.8 3a7.2 7.2 0 0 1 6.7-4.9Z" />
        </svg>
        {busy === "google" ? "Redirecting" : "Continue with Google"}
      </Button>
      <Button type="button" variant="outline" onClick={() => start("apple")} disabled={busy !== null} className={cls}>
        <svg viewBox="0 0 384 512" width="14" height="14" fill="currentColor" aria-hidden="true">
          <path d="M318.7 268c-.2-36.7 16.4-64.4 50-84.8-18.8-27-47.2-41.9-84.7-44.8-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 140.9 4 184.5 4 273.2c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-92.3zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
        </svg>
        {busy === "apple" ? "Redirecting" : "Continue with Apple"}
      </Button>
    </div>
  );
};

export default SocialAuth;
