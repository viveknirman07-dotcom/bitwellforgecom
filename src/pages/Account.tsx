import { useState, FormEvent, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

type Mode = "login" | "signup" | "forgot";

const Account = () => {
  const [params] = useSearchParams();
  const next = params.get("next") || "/vault";
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [mode, setMode] = useState<Mode>(params.get("mode") === "signup" ? "signup" : "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) navigate(next, { replace: true });
  }, [loading, user, next, navigate]);

  useEffect(() => {
    document.title = "Account — BitwellForge";
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
        if (error) throw error;
        navigate(next, { replace: true });
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: { emailRedirectTo: window.location.origin, data: { full_name: fullName } },
        });
        if (error) throw error;
        if (data.session) navigate(next, { replace: true });
        else setMessage("Check your inbox to confirm your email address, then sign in.");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setMessage("If an account exists for that address, a reset link is on its way.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
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
          <p className="text-[11px] tracking-[0.28em] uppercase portal-gold mb-5">
            {mode === "signup" ? "Create account" : mode === "forgot" ? "Password reset" : "Secure sign in"}
          </p>
          <h1 className="font-heading text-3xl md:text-4xl tracking-tight portal-metal inline-block">
            {mode === "signup" ? "Join BitwellForge" : mode === "forgot" ? "Reset your password" : "Account access"}
          </h1>

          <form onSubmit={submit} className="mt-12 space-y-5">
            {mode === "signup" && (
              <div>
                <label htmlFor="fullName" className="block text-[11px] tracking-[0.2em] uppercase portal-muted mb-2">Full name</label>
                <input id="fullName" className="portal-input" value={fullName} onChange={(e) => setFullName(e.target.value)} required maxLength={120} />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-[11px] tracking-[0.2em] uppercase portal-muted mb-2">Email</label>
              <input id="email" type="email" autoComplete="email" className="portal-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            {mode !== "forgot" && (
              <div>
                <label htmlFor="password" className="block text-[11px] tracking-[0.2em] uppercase portal-muted mb-2">Password</label>
                <input id="password" type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} className="portal-input" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
              </div>
            )}

            {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
            {message && <p role="status" className="text-sm portal-gold">{message}</p>}

            <button type="submit" disabled={busy} className="portal-btn portal-btn--solid w-full">
              {busy ? "Working" : mode === "signup" ? "Create account" : mode === "forgot" ? "Send reset link" : "Sign in"}
            </button>
          </form>

          <div className="mt-8 space-y-2 text-[12px] portal-muted">
            {mode !== "login" && (<button onClick={() => setMode("login")} className="block hover:portal-gold transition-colors">Already have an account? Sign in</button>)}
            {mode !== "signup" && (<button onClick={() => setMode("signup")} className="block hover:portal-gold transition-colors">Need an account? Create one</button>)}
            {mode !== "forgot" && (<button onClick={() => setMode("forgot")} className="block hover:portal-gold transition-colors">Forgot your password?</button>)}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account;
