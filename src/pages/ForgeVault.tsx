import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import CurrencySelect, { CurrencyOption } from "@/components/CurrencySelect";
import { DEFAULT_CURRENCY, getCurrency, hasExplicitCurrency, setCurrency } from "@/lib/currency";
import Eyebrow from "@/components/Eyebrow";
import { useSEO } from "@/hooks/use-seo";
import VaultStage from "@/components/vault/VaultStage";

interface PricingResponse {
  product: { name: string; tagline?: string; description?: string };
  base: { currency: string; amount: number };
  display: { currency: string; amount: number; formatted: string; rate: number };
  currencies?: CurrencyOption[];
  suggested_currency?: string;
  conversion_unavailable?: boolean;
  requested_currency_unsupported?: string | null;
}

const CONTENTS = [
  {
    title: "BitwellForge Blueprint\u2122",
    kind: "Knowledge Base",
    detail:
      "Nine parts covering revenue infrastructure philosophy, diagnostics, positioning, ideal client profiling, consultative sales, pipeline architecture and client delivery.",
    use: "Read this to understand why a commercial system behaves the way it does before changing anything.",
  },
  {
    title: "BitwellForge Operating System\u2122",
    kind: "Execution Protocol",
    detail:
      "Thirty-one modules across eight phases, from system initialization through the operating rhythm. Objectives, worksheets, scorecards, decision trees, trackers and validation checklists.",
    use: "Work through this sequentially to install the system inside your own business.",
  },
  {
    title: "BitwellForge Commercial Toolkit\u2122",
    kind: "Asset Library",
    detail:
      "Forty-four ready-to-fill commercial assets across strategy, positioning and offer engineering, acquisition, pipeline management, client delivery and operations.",
    use: "Use these when you need the artefact itself rather than the reasoning behind it.",
  },
];

/**
 * Public product page for the Commercial Growth System.
 * This is the destination for affiliate referral links; nothing on this page
 * reveals that a visitor arrived through one.
 */
const ForgeVault = () => {
  const [currency, setCurrencyState] = useState(getCurrency);
  const [pricing, setPricing] = useState<PricingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useSEO({
    title: "Forge Vault — Commercial Growth System™ | BitwellForge",
    description:
      "Lifetime access to the Commercial Growth System™: the BitwellForge Blueprint, Operating System and Commercial Toolkit, inside the private Forge Vault.",
    canonicalPath: "/forge-vault",
  });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setFailed(false);
    supabase.functions
      .invoke(`pricing?currency=${encodeURIComponent(currency)}`, { method: "GET" })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error || !data || data.error) {
          setFailed(true);
        } else {
          const res = data as PricingResponse;
          // Country detection only supplies the initial default. A manual
          // selection is never overridden.
          if (
            !hasExplicitCurrency() &&
            res.suggested_currency &&
            res.suggested_currency !== currency
          ) {
            setCurrencyState(res.suggested_currency);
            return;
          }
          setPricing(res);
        }
      })
      .catch(() => !cancelled && setFailed(true))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [currency]);

  const chooseCurrency = (code: string) => {
    setCurrency(code);
    setCurrencyState(code);
  };

  const options: CurrencyOption[] =
    pricing?.currencies && pricing.currencies.length > 0
      ? pricing.currencies
      : [{ code: DEFAULT_CURRENCY, name: "US Dollar" }];

  const priceUnavailable = failed || pricing?.conversion_unavailable;

  return (
   <VaultStage>
    <div className="font-body">
      <section className="section-padding pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-[900px] mx-auto">
          <div data-vault-reveal="lede">
            <Eyebrow>Forge Vault</Eyebrow>
          </div>
          <h1 data-vault-reveal="title" className="font-heading text-4xl md:text-6xl font-semibold text-foreground tracking-tight mt-6 text-balance">
            Commercial Growth System™
          </h1>
          <p data-vault-reveal="primary" className="mt-8 text-lg leading-relaxed text-muted-foreground max-w-[640px]">
            The complete commercial operating layer BitwellForge installs inside client businesses,
            documented and released as a system you can run yourself. Lifetime access, delivered
            inside the private Forge Vault.
          </p>
        </div>
      </section>

      <section className="section-padding pb-20 md:pb-28">
        <div className="max-w-[900px] mx-auto border-t border-border pt-14 md:pt-20">
          <Eyebrow>What you receive</Eyebrow>
          <div className="mt-12 space-y-14 md:space-y-20">
            {CONTENTS.map((c) => (
              <article key={c.title} className="max-w-[640px]">
                <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                  {c.kind}
                </p>
                <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground tracking-tight mt-4">
                  {c.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">{c.detail}</p>
                <p className="mt-4 text-base leading-relaxed text-foreground/80">{c.use}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding pb-20 md:pb-28">
        <div className="max-w-[900px] mx-auto border-t border-border pt-14 md:pt-20">
          <Eyebrow>Who this is built for</Eyebrow>
          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-14">
            {AUDIENCE.map((a) => (
              <div key={a.title} className="max-w-[42ch]">
                <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                  {a.title}
                </h3>
                <p className="mt-4 text-[15.5px] leading-[1.85] font-light text-muted-foreground">
                  {a.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-14 border-l border-border/60 pl-5 sm:pl-7 text-[15px] leading-[1.8] font-light text-muted-foreground max-w-[52ch]">
            It is not built for businesses looking for a single tactic or a shortcut around
            positioning, pricing, and delivery.
          </p>
        </div>
      </section>

      <section className="section-padding pb-20 md:pb-28">
        <div className="max-w-[900px] mx-auto border-t border-border pt-14 md:pt-20">
          <Eyebrow>How access works</Eyebrow>
          <div className="mt-12 space-y-12 md:space-y-16">
            {STEPS.map((s, i) => (
              <div key={s.title} className="grid gap-3 md:grid-cols-[6rem_1fr] md:gap-10">
                <p className="text-[11px] tracking-[0.24em] uppercase text-muted-foreground pt-1">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div className="max-w-[52ch]">
                  <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-[15.5px] leading-[1.85] font-light text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="section-padding pb-28 md:pb-40">
        <div className="max-w-[900px] mx-auto border-t border-border pt-14 md:pt-20">
          <Eyebrow>Access</Eyebrow>

          <div className="mt-12 grid gap-12 md:grid-cols-[1fr_320px] md:items-start">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
                One payment, lifetime access
              </p>

              {loading && (
                <p className="font-heading text-3xl md:text-4xl text-muted-foreground tracking-tight">
                  Loading price
                </p>
              )}

              {!loading && priceUnavailable && (
                <div role="status">
                  <p className="font-heading text-2xl md:text-3xl text-foreground tracking-tight">
                    Conversion temporarily unavailable
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-[420px]">
                    Live exchange rates could not be reached, so no converted price is shown. The
                    price remains ₹14,500 INR and you can continue to checkout.
                  </p>
                </div>
              )}

              {!loading && !priceUnavailable && pricing && (
                <>
                  <p className="font-heading text-4xl md:text-5xl text-foreground tracking-tight">
                    {pricing.display.formatted}
                  </p>
                  {pricing.display.currency !== "INR" && (
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-[420px]">
                      The price is set at ₹{pricing.base.amount.toLocaleString("en-IN")} INR and
                      converted at the live rate. You are charged the amount shown above.
                    </p>
                  )}
                  {pricing.requested_currency_unsupported && (
                    <p role="alert" className="mt-4 text-sm text-muted-foreground">
                      No live rate is available for {pricing.requested_currency_unsupported}. Showing{" "}
                      {pricing.display.currency} instead.
                    </p>
                  )}
                </>
              )}

              <div className="mt-10">
                <Link
                  to="/checkout"
                  className="vault-cta"
                >
                  Get Access
                </Link>
              </div>

              <p className="mt-6 text-[12px] leading-relaxed text-muted-foreground max-w-[420px]">
                Your Forge Vault account is created and sent to your email the moment payment is
                verified.
              </p>
            </div>

            <CurrencySelect value={currency} options={options} onChange={chooseCurrency} />
          </div>
        </div>
      </section>
    </div>
   </VaultStage>
  );
};

export default ForgeVault;
