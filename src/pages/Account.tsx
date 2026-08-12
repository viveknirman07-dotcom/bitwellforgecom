import { useState, FormEvent, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/Eyebrow";
import SocialAuth from "@/components/SocialAuth";

type Mode = "login" | "signup" | "forgot";

const Account = () => {
  const [params] = useSearchParams();
  const next = params.get("next") || "/vault";
  const isAffiliate = params.get("type") === "affiliate" || next.startsWith("/affiliate");
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
    document.title = `${isAffiliate ? "Affiliate access" : "Member access"} — BitwellForge`;
  }, [isAffiliate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });
        if (error) throw error;
        navigate(next, { replace: true });
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/account?next=${encodeURIComponent(next)}`,
            data: { full_name: fullName },
          },
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

  const heading = isAffiliate ? "Affiliate Sign up / Login" : "Member access";
  const field =
    "w-full bg-transparent border border-border text-foreground text-sm px-4 py-3 min-h-[48px] transition-colors focus:outline-none focus:border-foreground/50";

  return (
    <div
      className={`portal ${isAffiliate ? "portal--affiliate" : ""} font-body min-h-screen flex flex-col`}
    >
      <Header />
      <main className="flex-1 section-padding pt-28 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-[440px] mx-auto">
          <Eyebrow>{heading}</Eyebrow>
          <h1 className="mt-6 font-heading text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            {mode === "signup"
              ? "Create account"
              : mode === "forgot"
                ? "Reset your password"
                : "Sign in"}
          </h1>

          <form onSubmit={submit} className="mt-10 space-y-5">
            {mode === "signup" && (
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-2"
                >
                  Full name
                </label>
                <input
                  id="fullName"
                  className={field}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  maxLength={120}
                />
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={field}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {mode !== "forgot" && (
              <div>
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <label
                    htmlFor="password"
                    className="block text-[11px] tracking-[0.2em] uppercase text-muted-foreground"
                  >
                    Password
                  </label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  className={field}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
            )}

            {error && (
              <p role="alert" className="text-sm text-red-400">
                {error}
              </p>
            )}
            {message && (
              <p role="status" className="text-sm text-foreground/80">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 text-sm font-medium tracking-wide rounded-full transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] min-h-[48px] disabled:opacity-50"
            >
              {busy
                ? "Working"
                : mode === "signup"
                  ? "Create account"
                  : mode === "forgot"
                    ? "Send reset link"
                    : "Sign in"}
            </button>
          </form>

          {mode !== "forgot" && (
            <div className="mt-6">
              <SocialAuth next={next} onError={(m) => setError(m || null)} />
            </div>
          )}

          <div className="mt-10 space-y-3 text-[12px] text-muted-foreground">
            {mode !== "login" && (
              <button
                onClick={() => setMode("login")}
                className="block hover:text-foreground transition-colors"
              >
                Already have an account? Sign in
              </button>
            )}
            {mode !== "signup" && (
              <button
                onClick={() => setMode("signup")}
                className="block hover:text-foreground transition-colors"
              >
                Create account
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
