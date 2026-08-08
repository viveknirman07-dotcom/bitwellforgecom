import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => setReady(Boolean(data.session)));
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
    <div className="portal font-body flex flex-col">
      <header className="border-b portal-line">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center">
          <Link to="/" className="font-heading text-lg md:text-xl tracking-tight">BitwellForge</Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <p className="text-[11px] tracking-[0.28em] uppercase portal-gold mb-5">Security</p>
          <h1 className="font-heading text-3xl tracking-tight portal-metal inline-block">Set a new password</h1>
          {!ready ? (
            <p className="mt-10 text-sm portal-muted">
              This link is invalid or has expired. Request a new reset email from the account page.
            </p>
          ) : done ? (
            <p className="mt-10 text-sm portal-gold">Password updated. Redirecting to Forge Vault.</p>
          ) : (
            <form onSubmit={submit} className="mt-12 space-y-5">
              <div>
                <label htmlFor="np" className="block text-[11px] tracking-[0.2em] uppercase portal-muted mb-2">New password</label>
                <input id="np" type="password" className="portal-input" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
              <button className="portal-btn portal-btn--solid w-full" disabled={busy}>{busy ? "Saving" : "Update password"}</button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
