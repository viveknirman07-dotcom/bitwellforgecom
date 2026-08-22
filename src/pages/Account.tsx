import { useState, FormEvent, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/Eyebrow";
import SocialAuth from "@/components/SocialAuth";

type Mode = "login" | "signup" | "forgot";

const LIBRARY = [
  {
    title: "BitwellForge Blueprint™",
    line: "The reasoning layer. How commercial systems behave, why they fail, and what actually governs revenue.",
  },
  {
    title: "BitwellForge Operating System™",
    line: "The sequence. Thirty-one modules that move a business from diagnosis to a working operating rhythm.",
  },
  {
    title: "BitwellForge Commercial Toolkit™",
    line: "The artefacts. Forty-four commercial assets for positioning, acquisition, pipeline and delivery.",
  },
];

const Account = () => {
  const [params] = useSearchParams();
  const requestedNext = params.get("next");
  const next = requestedNext?.startsWith("/") && !requestedNext.startsWith("//")
    ? requestedNext
    : "/vault";
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
    document.title = `${isAffiliate ? "Affiliate access" : "Forge Vault access"} — BitwellForge`;
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
          redirectTo: `${window.location.origin}/reset-password?next=${encodeURIComponent(next)}`,
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

  const field =
    "w-full bg-transparent border border-border text-foreground text-sm px-4 py-3 min-h-[48px] transition-colors focus:outline-none focus:border-foreground/50";

  const authPanel = (
    <div id="access" className="max-w-[440px]">
      <Eyebrow>{isAffiliate ? "Affiliate access" : "Access"}</Eyebrow>
      <h2 className="mt-6 font-heading text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
        {mode === "signup"
          ? "Create an account"
          : mode === "forgot"
            ? "Reset your password"
            : "Sign in"}
      </h2>

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
          className="w-full inline-flex items-center justify-center bg-black text-white dark:bg-gold dark:text-navy px-8 py-4 text-sm font-medium tracking-wide rounded-full transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] min-h-[48px] disabled:opacity-50"
        >
          {busy
            ? "Working"
            : mode === "signup"
              ? "Create an account"
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
            Create an account
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={`portal ${isAffiliate ? "portal--affiliate" : ""} font-body min-h-screen flex flex-col`}
    >
      <Header />

      <main className="flex-1">
        {isAffiliate ? (
          <section className="section-padding pt-28 pb-24 md:pt-40 md:pb-32">
            <div className="max-w-[900px] mx-auto">{authPanel}</div>
          </section>
        ) : (
          <>
            <section className="section-padding pt-28 pb-16 md:pt-40 md:pb-24">
              <div className="max-w-[900px] mx-auto">
                <Eyebrow>Forge Vault</Eyebrow>
                <h1 className="mt-6 font-heading text-4xl md:text-6xl font-semibold tracking-tight text-foreground text-balance max-w-[760px]">
                  Better decisions begin with better context.
                </h1>
                <p className="mt-8 text-lg leading-relaxed text-muted-foreground max-w-[640px]">
                  Forge Vault is BitwellForge's curated environment for understanding the mechanics
                  behind commercial growth. It holds the reasoning, sequences and working material
                  we use when we build revenue infrastructure inside client businesses.
                </p>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground max-w-[640px]">
                  It is intended for people examining how revenue, acquisition, positioning and
                  delivery actually behave as a connected system rather than a set of separate
                  activities.
                </p>
              </div>
            </section>

            <section className="section-padding pb-16 md:pb-24">
              <div className="max-w-[900px] mx-auto border-t border-border pt-14 md:pt-20">
                <h2 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                  Why Forge Vault exists.
                </h2>
                <p className="mt-8 text-base md:text-lg leading-relaxed text-muted-foreground max-w-[640px]">
                  The modern business environment produces no shortage of information. The
                  constraint is increasingly interpretive: knowing what matters, what connects, and
                  what deserves attention.
                </p>
                <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground max-w-[640px]">
                  Most commercial knowledge is fragmented across articles, conversations, tools and
                  operating experience. Individually each piece may be sound. Collectively they
                  rarely form a coherent view of cause and effect, which is where judgement is
                  usually lost.
                </p>
                <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground max-w-[640px]">
                  Forge Vault brings that thinking into one structured environment, ordered the way
                  a commercial system is actually assembled.
                </p>
              </div>
            </section>

            <section className="section-padding pb-16 md:pb-24">
              <div className="max-w-[900px] mx-auto border-t border-border pt-14 md:pt-20">
                <h2 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                  What you will find inside.
                </h2>
                <div className="mt-12 space-y-12 md:space-y-16">
                  {LIBRARY.map((item) => (
                    <article key={item.title} className="max-w-[640px]">
                      <h3 className="font-heading text-xl md:text-2xl font-semibold tracking-tight text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                        {item.line}
                      </p>
                    </article>
                  ))}
                </div>
                <p className="mt-12 text-sm leading-relaxed text-muted-foreground max-w-[560px]">
                  Access is released to your account once your purchase of the Commercial Growth
                  System™ is verified.
                </p>
              </div>
            </section>

            <section className="section-padding pb-16 md:pb-24">
              <div className="max-w-[900px] mx-auto border-t border-border pt-14 md:pt-20">
                <h2 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                  Information is useful. Context is consequential.
                </h2>
                <p className="mt-8 text-base md:text-lg leading-relaxed text-muted-foreground max-w-[640px]">
                  The material is not written for passive reading. It is written to change how a
                  problem is framed: which constraint is structural, which effect is first order and
                  which arrives later, and where a commercial dependency quietly determines the
                  outcome.
                </p>
                <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground max-w-[640px]">
                  Most growth decisions are asymmetric. A small number of them set the ceiling for
                  everything that follows. The intent is to make those decisions easier to see
                  before they are made.
                </p>
              </div>
            </section>

            <section className="section-padding pb-16 md:pb-24">
              <div className="max-w-[900px] mx-auto border-t border-border pt-14 md:pt-20">
                <h2 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                  Built for people responsible for outcomes.
                </h2>
                <p className="mt-8 text-base md:text-lg leading-relaxed text-muted-foreground max-w-[640px]">
                  Founders, business owners, operators, consultants, agency leaders and commercial
                  leaders. People who carry the consequence of a growth decision rather than only
                  the opinion about it.
                </p>
              </div>
            </section>

            <section className="section-padding pb-16 md:pb-24">
              <div className="max-w-[900px] mx-auto border-t border-border pt-14 md:pt-20">
                <h2 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                  Why BitwellForge built it.
                </h2>
                <p className="mt-8 text-base md:text-lg leading-relaxed text-muted-foreground max-w-[640px]">
                  Our work sits around commercial growth and revenue infrastructure. Across
                  engagements the same underlying questions kept returning, usually in different
                  language. Forge Vault exists so that the frameworks, sequences and observations
                  behind that work are documented in one place rather than rebuilt each time.
                </p>
              </div>
            </section>

            <section className="section-padding pb-16 md:pb-24">
              <div className="max-w-[900px] mx-auto border-t border-border pt-14 md:pt-20">
                <h2 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                  What to expect.
                </h2>
                <p className="mt-8 text-base md:text-lg leading-relaxed text-muted-foreground max-w-[640px]">
                  A structured environment that continues to develop. Additions are made as the
                  underlying work produces something worth documenting: analysis, frameworks,
                  case-based reasoning and operating principles. Nothing is added for volume.
                </p>
              </div>
            </section>

            <section className="section-padding pb-28 md:pb-40">
              <div className="max-w-[900px] mx-auto border-t border-border pt-14 md:pt-20">
                <p className="font-heading text-2xl md:text-3xl leading-snug tracking-tight text-foreground max-w-[640px]">
                  Good decisions rarely come from having more information. They come from
                  understanding the right information in the right context.
                </p>
                <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                  Enter Forge Vault.
                </p>

                <div className="mt-16">{authPanel}</div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Account;
