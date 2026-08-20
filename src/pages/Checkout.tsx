import { useEffect, useState, FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { getReferral, isReferralValidated, markReferralValidated } from "@/lib/referral";
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
}

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

  // Affiliate purchase mode
  const [referral] = useState<string | null>(getReferral);
  const [affiliateCode, setAffiliateCode] = useState("");
  const [applying, setApplying] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [benefit, setBenefit] = useState<AppliedBenefit | null>(null);

  useEffect(() => {
    document.title = "Checkout — BitwellForge";
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

  const applyCode = async () => {
    if (!referral) return;
    setApplying(true);
    setCodeError(null);
    try {
      const { data } = await supabase.functions.invoke("referral-track", {
        body: {
          action: "validate",
          ref: referral,
          code: affiliateCode.trim(),
          currency,
          email: email.trim().toLowerCase() || undefined,
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
      });
    } catch {
      setBenefit(null);
      setCodeError("The affiliate code could not be validated. Please try again.");
    } finally {
      setApplying(false);
    }
  };

  const blocked = Boolean(referral) && !benefit;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (blocked) {
      setCodeError("Enter and apply the affiliate code to continue.");
      return;
    }
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
          affiliate_code: referral ? benefit?.code ?? affiliateCode.trim() : undefined,
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
    <div className="portal font-body flex flex-col">
      <header className="border-b portal-line">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <Link to="/" className="font-heading text-lg md:text-xl tracking-tight">BitwellForge</Link>
          <span className="text-[11px] tracking-[0.2em] uppercase portal-muted">Secure checkout</span>
        </div>
      </header>

      <main className="flex-1 max-w-[1000px] w-full mx-auto px-6 md:px-10 py-16 md:py-24 grid gap-16 md:grid-cols-[1fr_1fr]">
        <section>
          <p className="text-[11px] tracking-[0.28em] uppercase portal-gold mb-5">The product</p>
          <h1 className="font-heading text-3xl md:text-4xl tracking-tight portal-metal inline-block">
            {pricing?.product?.name ?? "Commercial Growth System"}
          </h1>
          {pricing?.product?.tagline && (
            <p className="mt-6 text-sm leading-relaxed portal-muted">{pricing.product.tagline}</p>
          )}
          <div className="mt-12 border-t portal-line pt-8">
            {benefit && pricing && (
              <div className="mb-8 space-y-2 text-[13px]">
                <div className="flex items-baseline justify-between">
                  <span className="portal-muted">Subtotal</span>
                  <span>{pricing.display.formatted}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="portal-muted">Referral benefit · {benefit.code}</span>
                  <span className="portal-gold">
                    {benefit.formatted ? `- ${benefit.formatted}` : `- $${benefit.discount_usd}`}
                  </span>
                </div>
              </div>
            )}
            <p className="text-[11px] tracking-[0.2em] uppercase portal-muted mb-3">Total today</p>
            <p className="font-heading text-4xl tracking-tight">
              {pricing ? formatTotal(pricing) : "\u2014"}
            </p>

            {pricing?.conversion_unavailable && (
              <p role="status" className="mt-3 text-[12px] portal-muted">
                Live conversion is temporarily unavailable, so the base price is shown.
              </p>
            )}
            {pricing && !pricing.conversion_unavailable && pricing.display.currency !== "INR" && (
              <p className="mt-3 text-[12px] portal-muted">
                Billed as the local equivalent of ₹{pricing.base.amount.toLocaleString("en-IN")} at live rates.
              </p>
            )}

            <div className="mt-8">
              <CurrencySelect value={currency} options={options} onChange={chooseCurrency} />
            </div>

            <p className="mt-8 text-[12px] leading-relaxed portal-muted">
              Lifetime access to the Forge Vault. Account access is delivered to your email the moment payment
              is verified.
            </p>
          </div>
        </section>

        <section>
          <p className="text-[11px] tracking-[0.28em] uppercase portal-gold mb-5">Complete purchase</p>
          {cancelled && (
            <p role="status" className="mb-6 text-sm portal-muted">
              That payment was cancelled. Nothing was charged.
            </p>
          )}
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label htmlFor="co-name" className="block text-[11px] tracking-[0.2em] uppercase portal-muted mb-2">Full name</label>
              <input id="co-name" className="portal-input" value={fullName} onChange={(e) => setFullName(e.target.value)} maxLength={120} required />
            </div>
            <div>
              <label htmlFor="co-email" className="block text-[11px] tracking-[0.2em] uppercase portal-muted mb-2">Email</label>
              <input id="co-email" type="email" autoComplete="email" className="portal-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <p className="mt-2 text-[11px] portal-muted">Your access is bound to this address.</p>
            </div>

            <fieldset className="pt-2">
              <legend className="block text-[11px] tracking-[0.2em] uppercase portal-muted mb-3">Payment method</legend>
              <div className="grid gap-3">
                {([
                  { id: "paypal", label: "PayPal or card" },
                  { id: "nowpayments", label: "Cryptocurrency" },
                ] as const).map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 border px-4 py-3 cursor-pointer transition-colors ${
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
                    <span className="text-[12px] tracking-[0.16em] uppercase">{opt.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {error && <p role="alert" className="text-sm text-red-400">{error}</p>}

            <button type="submit" disabled={busy} className="portal-btn portal-btn--solid w-full">
              {busy ? "Starting secure session" : "Proceed to payment"}
            </button>
            <p className="text-[11px] leading-relaxed portal-muted">
              Payment is processed by PayPal or NOWPayments. BitwellForge never stores card or wallet details.
            </p>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Checkout;
