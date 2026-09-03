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

const USAGE = [
  {
    title: "Diagnose",
    body: "Establish where commercial output is actually constrained before changing anything, using the diagnostics in the Blueprint.",
  },
  {
    title: "Install",
    body: "Work the Operating System phases in sequence, validating each module against your own numbers rather than assumptions.",
  },
  {
    title: "Operate",
    body: "Run the toolkit assets inside your weekly rhythm so the system keeps producing after the build is finished.",
  },
];

const SUITED = [
  "Agencies, consultants and B2B service businesses past first revenue.",
  "Operators who intend to build the system themselves rather than outsource it.",
  "Teams whose growth is limited by structure rather than effort.",
];

const NOT_SUITED = [
  "Pre offer businesses with nothing yet proven in market.",
  "Anyone looking for a single tactic rather than an operating layer.",
  "Teams unwilling to change how acquisition and delivery are run.",
];

const INCLUDED = [
  "Immediate access to the Blueprint, Operating System and Commercial Toolkit.",
  "Lifetime Updates as the system is revised.",
  "Private Forge Vault account created on payment verification.",
];

const BOOKING_TOPICS = [
  "Whether the system fits my business",
  "Installing the system with my team",
  "Diagnosing my current constraint",
  "Access and billing question",
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
          <Eyebrow>How it is used</Eyebrow>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {USAGE.map((u, i) => (
              <div key={u.title}>
                <p className="font-heading text-sm text-muted-foreground">0{i + 1}</p>
                <h3 className="font-heading text-xl text-foreground tracking-tight mt-3">{u.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding pb-24 md:pb-32">
        <div className="max-w-[900px] mx-auto border-t border-border pt-14 md:pt-20">
          <Eyebrow>Who it is for</Eyebrow>
          <div className="mt-12 grid gap-12 md:grid-cols-2 max-w-[760px]">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Suited to</p>
              <div className="mt-5 space-y-4">
                {SUITED.map((s) => (
                  <p key={s} className="text-[15px] leading-relaxed text-foreground/85">{s}</p>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Not suited to</p>
              <div className="mt-5 space-y-4">
                {NOT_SUITED.map((s) => (
                  <p key={s} className="text-[15px] leading-relaxed text-muted-foreground">{s}</p>
                ))}
              </div>
            </div>
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

              <div className="mt-10 space-y-3 max-w-[420px]">
                {INCLUDED.map((inc) => (
                  <p key={inc} className="text-[14px] leading-relaxed text-foreground/80">{inc}</p>
                ))}
              </div>

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

      <section id="booking" className="section-padding pb-32 md:pb-44 scroll-mt-28">
        <div className="max-w-[900px] mx-auto border-t border-border pt-14 md:pt-20">
          <Eyebrow>Speak to us first</Eyebrow>
          <div className="mt-10 grid gap-12 md:grid-cols-[1fr_1fr] md:gap-16">
            <div className="max-w-[42ch]">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                Book a working session before you buy.
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
                If you would rather understand where the system applies to your business before
                taking access, request a short session. We will look at your current commercial
                structure and tell you plainly whether the Vault is the right instrument, or whether
                the constraint calls for something else.
              </p>
            </div>
            <div>
              <EnquiryForm
                kind="booking"
                options={BOOKING_TOPICS}
                optionLabel="What you want to discuss"
                submitLabel="Request Session"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
   </VaultStage>
  );
};

export default ForgeVault;

