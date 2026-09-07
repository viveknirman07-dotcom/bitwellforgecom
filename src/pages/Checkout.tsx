import { useEffect, useState, FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { getReferral, markReferralValidated } from "@/lib/referral";
import CurrencySelect, { CurrencyOption } from "@/components/CurrencySelect";
import { DEFAULT_CURRENCY, getCurrency, setCurrency } from "@/lib/currency";

interface Pricing {
  product: { name: string; tagline?: string; description?: string };
  display: { currency: string; amount: number; formatted: string };
  base: { currency: string; amount: number };
  currencies?: CurrencyOption[];
  conversion_unavailable?: boolean;
}

interface AppliedBenefit {
  code: string;
  discount_usd: number;
  formatted: string | null;
  display_amount: number | null;
}

const emailValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

const Checkout = () => {
  const [params] = useSearchParams();
  const cancelled = params.get("cancelled") === "1";

  const [currency, setCurrencyState] = useState(getCurrency);
  const [pricing, setPricing] = useState<Pricing | null>(null);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [provider, setProvider] = useState<"paypal" | "nowpayments">("paypal");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Affiliate benefit. Entirely optional: a purchase never depends on it.
  const [referral] = useState<string | null>(getReferral);
  const [affiliateCode, setAffiliateCode] = useState("");
  const [applying, setApplying] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [benefit, setBenefit] = useState<AppliedBenefit | null>(null);

  useEffect(() => {
    document.title = "Secure checkout — Commercial Growth System | BitwellForge";
  }, []);

  useEffect(() => {
    let cancelledReq = false;
    supabase.functions
      .invoke(`pricing?currency=${encodeURIComponent(currency)}`, { method: "GET" })
      .then(({ data }) => !cancelledReq && setPricing(data ?? null))
      .catch(() => !cancelledReq && setPricing(null));
    return () => {
      cancelledReq = true;
    };
  }, [currency]);

  // A currency change invalidates the converted benefit; it must be revalidated.
  useEffect(() => {
    setBenefit(null);
  }, [currency]);

  const chooseCurrency = (code: string) => {
    setCurrency(code);
    setCurrencyState(code);
    setError(null);
  };

  const options: CurrencyOption[] =
    pricing?.currencies && pricing.currencies.length > 0
      ? pricing.currencies
      : [{ code: DEFAULT_CURRENCY, name: "US Dollar" }];

  const canApply = Boolean(affiliateCode.trim() || referral) && emailValid(email);

  const applyCode = async () => {
    if (!canApply) {
      setCodeError("Enter your email address first, then apply the code.");
      return;
    }
    setApplying(true);
    setCodeError(null);
    try {
      const { data } = await supabase.functions.invoke("referral-track", {
        body: {
          action: "validate",
          ref: referral ?? undefined,
          code: affiliateCode.trim() || undefined,
          currency,
          email: email.trim().toLowerCase(),
        },
      });
      if (!data?.valid) {
        setBenefit(null);
        setCodeError(data?.message ?? "That affiliate code is not valid.");
        return;
      }
      markReferralValidated(data.code);
      setBenefit({
        code: data.code,
        discount_usd: data.discount_usd,
        formatted: data.display_discount?.formatted ?? null,
        display_amount: data.display_discount?.amount ?? null,
      });
    } catch {
      setBenefit(null);
      setCodeError("The affiliate code could not be validated. Please try again.");
    } finally {
      setApplying(false);
    }
  };

  /** Total shown to the buyer. The server recomputes and re-caps this value. */
  const formatTotal = (p: Pricing) => {
    if (!benefit?.display_amount) return p.display.formatted;
    const total = Math.max(0, p.display.amount - benefit.display_amount);
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: p.display.currency,
      }).format(total);
    } catch {
      return `${p.display.currency} ${total.toFixed(2)}`;
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("create-checkout", {
        body: {
          email: email.trim().toLowerCase(),
          full_name: fullName.trim() || undefined,
          provider,
          currency,
          ref: referral ?? undefined,
          affiliate_code: (benefit?.code ?? affiliateCode.trim()) || undefined,
        },
      });

      if (fnError) {
        // The real reason lives in the response body, not the generic wrapper.
        let detail: Record<string, unknown> | null = null;
        if (fnError instanceof FunctionsHttpError) {
          detail = await fnError.context.json().catch(() => null);
        }
        if (detail?.code === "currency_unsupported") {
          const supported = Array.isArray(detail.supported) ? (detail.supported as string[]) : [];
          throw new Error(
            `${detail.error} Choose a different payment method, or select one of: ${supported.join(", ")}.`,
          );
        }
        if (detail?.code === "rates_unavailable") {
          throw new Error(String(detail.error));
        }
        throw new Error(
          typeof detail?.error === "string" ? detail.error : "Checkout could not be started.",
        );
      }

      if (data?.error) throw new Error(typeof data.error === "string" ? data.error : "Checkout failed");
      if (!data?.approve_url) throw new Error("Payment session could not be started");
      window.location.href = data.approve_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout could not be started. Please try again.");
      setBusy(false);
    }
  };

  return (
    <div className="portal font-body flex min-h-screen w-full flex-col overflow-x-hidden">
      <header className="border-b portal-line">
        <div className="mx-auto flex h-14 w-full max-w-[1200px] items-center justify-between gap-4 px-5 sm:h-16 sm:px-8 lg:h-20 lg:px-10">
          <Link to="/" className="font-heading text-base tracking-tight sm:text-lg lg:text-xl">
            BitwellForge
          </Link>
          <span className="text-[10px] uppercase tracking-[0.18em] portal-muted sm:text-[11px] sm:tracking-[0.2em]">
            Secure checkout
          </span>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-[1000px] flex-1 grid-cols-1 gap-10 px-5 py-10 sm:px-8 sm:py-14 md:grid-cols-2 md:gap-14 lg:px-10 lg:py-20">
        <section className="min-w-0">
          <p className="mb-4 text-[10px] uppercase tracking-[0.24em] portal-gold sm:text-[11px] sm:tracking-[0.28em]">
            The product
          </p>
          <h1 className="portal-metal inline-block font-heading text-2xl tracking-tight sm:text-3xl lg:text-4xl">
            {pricing?.product?.name ?? "Commercial Growth System"}
          </h1>
          {pricing?.product?.tagline && (
            <p className="mt-5 text-sm leading-relaxed portal-muted">{pricing.product.tagline}</p>
          )}

          <div className="mt-8 border-t portal-line pt-7 sm:mt-10 sm:pt-8">
            {benefit && pricing && (
              <div className="mb-6 space-y-2 text-[13px]">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="portal-muted">Subtotal</span>
                  <span className="tabular-nums">{pricing.display.formatted}</span>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="min-w-0 break-words portal-muted">
                    Referral benefit · {benefit.code}
                  </span>
                  <span className="portal-gold tabular-nums">
                    {benefit.formatted ? `- ${benefit.formatted}` : `- $${benefit.discount_usd}`}
                  </span>
                </div>
              </div>
            )}

            <p className="mb-3 text-[10px] uppercase tracking-[0.18em] portal-muted sm:text-[11px] sm:tracking-[0.2em]">
              Total today
            </p>
            <p className="font-heading text-[clamp(1.9rem,9vw,2.5rem)] leading-none tracking-tight tabular-nums break-words">
              {pricing ? formatTotal(pricing) : "\u2014"}
            </p>

            {pricing?.conversion_unavailable && (
              <p role="status" className="mt-3 text-[12px] leading-relaxed portal-muted">
                Live conversion is temporarily unavailable, so the base price is shown.
              </p>
            )}
            {pricing && !pricing.conversion_unavailable && pricing.display.currency !== "INR" && (
              <p className="mt-3 text-[12px] leading-relaxed portal-muted">
                Billed as the local equivalent of ₹{pricing.base.amount.toLocaleString("en-IN")} at live
                rates.
              </p>
            )}

            <div className="mt-7 w-full max-w-full">
              <CurrencySelect value={currency} options={options} onChange={chooseCurrency} />
            </div>

            <p className="mt-7 text-[12px] leading-relaxed portal-muted">
              Lifetime access to the Forge Vault, including lifetime updates. Account access is delivered
              to your email the moment payment is verified.
            </p>
          </div>
        </section>

        <section className="min-w-0">
          <p className="mb-4 text-[10px] uppercase tracking-[0.24em] portal-gold sm:text-[11px] sm:tracking-[0.28em]">
            Complete purchase
          </p>
          {cancelled && (
            <p role="status" className="mb-5 text-sm portal-muted">
              That payment was cancelled. Nothing was charged.
            </p>
          )}

          <form onSubmit={submit} className="space-y-5">
            <div className="min-w-0">
              <label
                htmlFor="co-name"
                className="mb-2 block text-[10px] uppercase tracking-[0.18em] portal-muted sm:text-[11px] sm:tracking-[0.2em]"
              >
                Full name
              </label>
              <input
                id="co-name"
                className="portal-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                maxLength={120}
                autoComplete="name"
                required
              />
            </div>

            <div className="min-w-0">
              <label
                htmlFor="co-email"
                className="mb-2 block text-[10px] uppercase tracking-[0.18em] portal-muted sm:text-[11px] sm:tracking-[0.2em]"
              >
                Email
              </label>
              <input
                id="co-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                className="portal-input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setBenefit(null);
                }}
                required
              />
              <p className="mt-2 text-[11px] leading-relaxed portal-muted">
                Your access is bound to this address.
              </p>
            </div>

            <div className="min-w-0 pt-1">
              <label
                htmlFor="co-aff"
                className="mb-2 block text-[10px] uppercase tracking-[0.18em] portal-muted sm:text-[11px] sm:tracking-[0.2em]"
              >
                Affiliate code <span className="normal-case tracking-normal">(optional)</span>
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="co-aff"
                  className="portal-input min-w-0 sm:flex-1"
                  value={benefit ? benefit.code : affiliateCode}
                  onChange={(e) => {
                    setAffiliateCode(e.target.value.toUpperCase().slice(0, 24));
                    setBenefit(null);
                    setCodeError(null);
                  }}
                  maxLength={24}
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                />
                <button
                  type="button"
                  onClick={applyCode}
                  disabled={applying || Boolean(benefit) || !canApply}
                  className="portal-btn w-full whitespace-nowrap sm:w-auto"
                >
                  {applying ? "Checking" : benefit ? "Applied" : "Apply code"}
                </button>
              </div>
              {benefit ? (
                <p role="status" className="mt-2 text-[11px] leading-relaxed portal-gold">
                  {benefit.code} verified. Referral benefit applied.
                </p>
              ) : (
                <p className="mt-2 text-[11px] leading-relaxed portal-muted">
                  {referral
                    ? "You reached this offer through a partner. Apply the code to claim your benefit, or continue without it."
                    : "Have a partner code? Apply it to claim a benefit. It is not required to purchase."}
                </p>
              )}
              {codeError && (
                <p role="alert" className="mt-2 text-[12px] leading-relaxed text-red-400">
                  {codeError}
                </p>
              )}
            </div>

            <fieldset className="min-w-0 pt-1">
              <legend className="mb-3 block text-[10px] uppercase tracking-[0.18em] portal-muted sm:text-[11px] sm:tracking-[0.2em]">
                Payment method
              </legend>
              <div className="grid gap-3">
                {(
                  [
                    { id: "paypal", label: "PayPal or card" },
                    { id: "nowpayments", label: "Cryptocurrency" },
                  ] as const
                ).map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex min-w-0 cursor-pointer items-center gap-3 border px-4 py-3 transition-colors ${
                      provider === opt.id ? "portal-line portal-gold" : "portal-line portal-muted"
                    }`}
                  >
                    <input
                      type="radio"
                      name="provider"
                      value={opt.id}
                      checked={provider === opt.id}
                      onChange={() => setProvider(opt.id)}
                      className="accent-current"
                    />
                    <span className="text-[11px] uppercase tracking-[0.14em] sm:text-[12px] sm:tracking-[0.16em]">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {error && (
              <p role="alert" className="text-sm leading-relaxed text-red-400">
                {error}
              </p>
            )}

            <button type="submit" disabled={busy} className="portal-btn portal-btn--solid w-full">
              {busy ? "Starting secure session" : "Proceed to payment"}
            </button>

            <p className="text-[11px] leading-relaxed portal-muted">
              Payment is processed by PayPal or NOWPayments. BitwellForge never stores card or wallet
              details.
            </p>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Checkout;
