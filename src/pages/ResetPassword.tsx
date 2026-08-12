import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/Eyebrow";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.title = "Reset password — BitwellForge";
    const isRecoveryLink = new URLSearchParams(window.location.hash.slice(1)).get("type") === "recovery";
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) setReady(true);
    });
    if (isRecoveryLink) {
      supabase.auth.getSession().then(({ data }) => setReady(Boolean(data.session)));
    }
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return setError(error.message);
    setDone(true);
    setTimeout(() => navigate("/vault", { replace: true }), 1400);
  };

  return (
    <div className="portal font-body min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 section-padding pt-28 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-[440px] mx-auto">
          <Eyebrow>Member access</Eyebrow>
          <h1 className="mt-6 font-heading text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Set a new password
          </h1>
          {!ready ? (
            <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
              This link is invalid or has expired. Request a new reset email from the account page.
            </p>
          ) : done ? (
            <p className="mt-10 text-sm text-foreground/80">Password updated. Redirecting to Forge Vault.</p>
          ) : (
            <form onSubmit={submit} className="mt-10 space-y-5">
              <div>
                <label htmlFor="np" className="block text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-2">New password</label>
                <input
                  id="np"
                  type="password"
                  className="w-full bg-transparent border border-border text-foreground text-sm px-4 py-3 min-h-[48px] transition-colors focus:outline-none focus:border-foreground/50"
                  minLength={8}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
              <button
                className="w-full inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 text-sm font-medium tracking-wide rounded-full transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] min-h-[48px] disabled:opacity-50"
                disabled={busy}
              >
                {busy ? "Saving" : "Update password"}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPassword;
