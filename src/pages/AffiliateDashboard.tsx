import { useEffect, useState, FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import PortalShell from "@/portal/PortalShell";

interface Affiliate {
  id: string;
  code: string;
  full_name: string | null;
  status: string;
  payout_recipient_name: string | null;
  payout_country: string | null;
  paypal_email: string | null;
}

interface Metrics {
  commission_rate_usd: number;
  eligible_sales: number;
  total_commission_usd: number;
  pending_commission_usd: number;
  paid_commission_usd: number;
  referral_clicks: number;
  code_validations: number;
  purchases: number;
  revenue_usd: number;
  buyer_discounts_usd: number;
  next_payout_period: string;
}

interface Commission {
  id: string;
  amount_usd: number;
  status: string;
  period_month: string;
  created_at: string;
}

interface Payout {
  id: string;
  period_month: string;
  sales_count: number;
  amount_usd: number;
  status: string;
  paid_at: string | null;
  failure_reason: string | null;
}

interface Resource {
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  resource_type: string;
  version: string;
}

const money = (n: number) => `$${Number(n).toLocaleString("en-US", { minimumFractionDigits: 0 })}`;

const AffiliateDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const [joinName, setJoinName] = useState("");
  const [terms, setTerms] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [country, setCountry] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");

  const applyPayload = (data: {
    affiliate?: Affiliate | null;
    metrics?: Metrics;
    commissions?: Commission[];
    payouts?: Payout[];
  }) => {
    setAffiliate(data.affiliate ?? null);
    setMetrics(data.metrics ?? null);
    setCommissions(data.commissions ?? []);
    setPayouts(data.payouts ?? []);
    if (data.affiliate) {
      setRecipient(data.affiliate.payout_recipient_name ?? data.affiliate.full_name ?? "");
      setCountry(data.affiliate.payout_country ?? "");
      setPaypalEmail(data.affiliate.paypal_email ?? "");
    }
  };

  useEffect(() => {
    let active = true;
    supabase.functions
      .invoke("affiliate-account", { method: "GET" })
      .then(({ data }) => active && applyPayload(data ?? {}))
      .catch(() => active && setError("The partner portal could not be reached."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!affiliate || affiliate.status !== "active") return;
    supabase.functions
      .invoke("affiliate-resource-access", { method: "GET" })
      .then(({ data }) => setResources(data?.resources ?? []))
      .catch(() => undefined);
  }, [affiliate]);

  const join = async (e: FormEvent) => {
    e.preventDefault();
    setBusy("join");
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("affiliate-account", {
        body: { action: "join", full_name: joinName.trim(), accept_terms: true },
      });
      if (fnError) throw fnError;
      if (!data?.affiliate) throw new Error("Could not create your partner account.");
      applyPayload(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create your partner account.");
    } finally {
      setBusy(null);
    }
  };

  const savePayout = async (e: FormEvent) => {
    e.preventDefault();
    setBusy("payout");
    setError(null);
    setNotice(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("affiliate-account", {
        body: {
          action: "payout_settings",
          payout_recipient_name: recipient.trim(),
          payout_country: country.trim(),
          paypal_email: paypalEmail.trim().toLowerCase(),
        },
      });
      if (fnError) throw fnError;
      if (!data?.affiliate) throw new Error("Could not save payout details.");
      applyPayload(data);
      setNotice("Payout details saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save payout details.");
    } finally {
      setBusy(null);
    }
  };

  const openResource = async (slug: string, type: "READ" | "DOWNLOAD") => {
    setBusy(slug);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("affiliate-resource-access", {
        body: { slug, access_type: type },
      });
      if (fnError) throw fnError;
      if (!data?.url) throw new Error("Could not open that resource.");
      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not open that resource.");
    } finally {
      setBusy(null);
    }
  };

  const link = affiliate ? `${window.location.origin}/forge-vault?ref=${affiliate.code}` : "";

  return (
    <PortalShell eyebrow="Partner portal" title="Affiliate Dashboard">
      {loading && <p className="text-sm portal-muted">Loading your partner account</p>}

      {!loading && !affiliate && (
        <form onSubmit={join} className="max-w-lg space-y-6">
          <p className="text-sm leading-relaxed portal-muted">
            Activate your partner account to receive a referral code. Commission is a flat
            {" "}fifty US dollars per verified sale.
          </p>
          <div>
            <label htmlFor="aff-name" className="block text-[11px] tracking-[0.2em] uppercase portal-muted mb-2">Full name</label>
            <input id="aff-name" className="portal-input" value={joinName} onChange={(e) => setJoinName(e.target.value)} maxLength={120} required />
          </div>
          <label className="flex items-start gap-3 text-[12px] leading-relaxed portal-muted">
            <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-1" required />
            <span>
              I accept the partner terms. Self referral is not eligible, and refunded orders void the related
              commission.
            </span>
          </label>
          {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
          <button type="submit" disabled={busy === "join" || !terms} className="portal-btn portal-btn--solid">
            {busy === "join" ? "Activating" : "Activate partner account"}
          </button>
        </form>
      )}

      {!loading && affiliate && (
        <div className="space-y-20">
          {error && <p role="alert" className="text-sm text-red-400">{error}</p>}

          <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 border-t portal-line pt-10">
            {[
              { l: "Referral clicks", v: String(metrics?.referral_clicks ?? 0) },
              { l: "Code validations", v: String(metrics?.code_validations ?? 0) },
              { l: "Purchases", v: String(metrics?.purchases ?? 0) },
              { l: "Revenue generated", v: money(metrics?.revenue_usd ?? 0) },
              { l: "Buyer discounts granted", v: money(metrics?.buyer_discounts_usd ?? 0) },
              { l: "Verified sales", v: String(metrics?.eligible_sales ?? 0) },
              { l: "Commission earned", v: money(metrics?.total_commission_usd ?? 0) },
              { l: "Awaiting payout", v: money(metrics?.pending_commission_usd ?? 0) },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-[11px] tracking-[0.22em] uppercase portal-muted">{s.l}</p>
                <p className="mt-3 font-heading text-3xl tracking-tight">{s.v}</p>
              </div>
            ))}
          </section>

          <section className="border-t portal-line pt-10">
            <p className="text-[11px] tracking-[0.28em] uppercase portal-gold mb-6">Your referral link</p>
            <div className="flex flex-wrap items-center gap-4">
              <code className="text-sm break-all">{link}</code>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(link);
                  setNotice("Referral link copied.");
                }}
                className="portal-btn"
              >
                Copy link
              </button>
            </div>
            <p className="mt-4 text-[11px] tracking-[0.18em] uppercase portal-muted">
              Code {affiliate.code} · Status {affiliate.status}
            </p>
            {notice && <p className="mt-4 text-sm portal-gold">{notice}</p>}
          </section>

          <section className="border-t portal-line pt-10">
            <p className="text-[11px] tracking-[0.28em] uppercase portal-gold mb-6">Payout details</p>
            <form onSubmit={savePayout} className="grid gap-5 max-w-xl">
              <div>
                <label htmlFor="p-name" className="block text-[11px] tracking-[0.2em] uppercase portal-muted mb-2">Recipient name</label>
                <input id="p-name" className="portal-input" value={recipient} onChange={(e) => setRecipient(e.target.value)} maxLength={120} required />
              </div>
              <div>
                <label htmlFor="p-country" className="block text-[11px] tracking-[0.2em] uppercase portal-muted mb-2">Country</label>
                <input id="p-country" className="portal-input" value={country} onChange={(e) => setCountry(e.target.value)} maxLength={60} required />
              </div>
              <div>
                <label htmlFor="p-paypal" className="block text-[11px] tracking-[0.2em] uppercase portal-muted mb-2">PayPal email</label>
                <input id="p-paypal" type="email" className="portal-input" value={paypalEmail} onChange={(e) => setPaypalEmail(e.target.value)} required />
              </div>
              <button type="submit" disabled={busy === "payout"} className="portal-btn portal-btn--solid justify-self-start">
                {busy === "payout" ? "Saving" : "Save payout details"}
              </button>
            </form>
          </section>

          {resources.length > 0 && (
            <section className="border-t portal-line pt-10">
              <p className="text-[11px] tracking-[0.28em] uppercase portal-gold mb-6">Partner materials</p>
              <div className="space-y-px">
                {resources.map((r) => (
                  <article key={r.slug} className="border-t portal-line py-6 flex flex-wrap items-baseline justify-between gap-4">
                    <div className="max-w-2xl">
                      <h3 className="font-heading text-lg tracking-tight">{r.title}</h3>
                      {r.subtitle && <p className="mt-1 text-sm portal-muted">{r.subtitle}</p>}
                      {r.description && <p className="mt-3 text-sm leading-relaxed portal-muted">{r.description}</p>}
                      <p className="mt-3 text-[11px] tracking-[0.18em] uppercase portal-muted">Version {r.version}</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => openResource(r.slug, "READ")} disabled={busy === r.slug} className="portal-btn">
                        {busy === r.slug ? "Preparing" : "Read"}
                      </button>
                      <button onClick={() => openResource(r.slug, "DOWNLOAD")} disabled={busy === r.slug} className="portal-btn portal-btn--solid">
                        Download
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="border-t portal-line pt-10">
            <p className="text-[11px] tracking-[0.28em] uppercase portal-gold mb-6">Commission ledger</p>
            {commissions.length === 0 ? (
              <p className="text-sm portal-muted">No commissions recorded yet.</p>
            ) : (
              <div className="space-y-px">
                {commissions.map((c) => (
                  <div key={c.id} className="border-t portal-line py-4 flex items-baseline justify-between gap-6 text-sm">
                    <span className="portal-muted">
                      {new Date(c.created_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                    </span>
                    <span className="text-[11px] tracking-[0.2em] uppercase portal-muted">{c.status}</span>
                    <span>{money(c.amount_usd)}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="border-t portal-line pt-10">
            <p className="text-[11px] tracking-[0.28em] uppercase portal-gold mb-6">Payout history</p>
            {payouts.length === 0 ? (
              <p className="text-sm portal-muted">
                No payouts yet. The next settlement covers {metrics?.next_payout_period ?? "the previous month"}.
              </p>
            ) : (
              <div className="space-y-px">
                {payouts.map((p) => (
                  <div key={p.id} className="border-t portal-line py-4 flex flex-wrap items-baseline justify-between gap-4 text-sm">
                    <span className="portal-muted">
                      {new Date(p.period_month).toLocaleDateString(undefined, { year: "numeric", month: "long" })}
                    </span>
                    <span className="portal-muted">{p.sales_count} sales</span>
                    <span className="text-[11px] tracking-[0.2em] uppercase portal-muted">
                      {p.status}
                      {p.failure_reason ? ` · ${p.failure_reason}` : ""}
                    </span>
                    <span>{money(p.amount_usd)}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </PortalShell>
  );
};

export default AffiliateDashboard;
