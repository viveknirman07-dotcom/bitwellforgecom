import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import CurrencySelect, { CurrencyOption } from "@/components/CurrencySelect";
import { Button } from "@/components/ui/button";
import { DEFAULT_CURRENCY, getCurrency, hasExplicitCurrency, setCurrency } from "@/lib/currency";
import Eyebrow from "@/components/Eyebrow";
import { useSEO } from "@/hooks/use-seo";
import VaultStage from "@/components/vault/VaultStage";
import blueprintPreview from "@/assets/vault/blueprint.png.asset.json";
import operatingSystemPreview from "@/assets/vault/operating-system.png.asset.json";
import toolkitPreview from "@/assets/vault/commercial-toolkit.png.asset.json";

interface PricingResponse {
  product: { name: string; tagline?: string; description?: string };
  base: { currency: string; amount: number };
  display: { currency: string; amount: number; formatted: string; rate: number };
  currencies?: CurrencyOption[];
  suggested_currency?: string;
  conversion_unavailable?: boolean;
  requested_currency_unsupported?: string | null;
}

const LAYERS = [
  {
    number: "01",
    role: "Reasoning",
    title: "BitwellForge Blueprint™",
    quantity: "Nine parts",
    detail:
      "The knowledge base for understanding revenue infrastructure, diagnostics, positioning, client selection, consultative sales, pipeline architecture and delivery systems.",
  },
  {
    number: "02",
    role: "Sequence",
    title: "BitwellForge Operating System™",
    quantity: "31 modules across eight phases",
    detail:
      "The implementation protocol. Objectives, worksheets, scorecards, decision trees, trackers and validation checklists arranged as an operating sequence.",
  },
  {
    number: "03",
    role: "Execution",
    title: "BitwellForge Commercial Toolkit™",
    quantity: "44 commercial assets",
    detail:
      "Ready to fill working material across strategy, offer engineering, acquisition, pipeline management, client delivery and operations.",
  },
];

const PREVIEWS = [
  {
    id: "blueprint",
    label: "Blueprint™",
    title: "The reasoning layer",
    description:
      "A real view of the Blueprint contents, including commercial diagnostics, bottleneck isolation, offer architecture, positioning, demand generation and delivery systems.",
    src: blueprintPreview.url,
    alt: "Forge Vault Blueprint interface showing its commercial knowledge base and chapter contents",
  },
  {
    id: "operating-system",
    label: "Operating System™",
    title: "The implementation sequence",
    description:
      "The actual Operating System structure. Thirty one modules are organised across eight phases so implementation follows dependencies rather than disconnected lessons.",
    src: operatingSystemPreview.url,
    alt: "Forge Vault Operating System interface showing the genuine module sequence",
  },
  {
    id: "toolkit",
    label: "Commercial Toolkit™",
    title: "The working material",
    description:
      "The real Toolkit environment, organised around the commercial assets used to plan, diagnose, track and operate the system.",
    src: toolkitPreview.url,
    alt: "Forge Vault Commercial Toolkit interface showing genuine asset categories",
  },
];

const REASONING = [
  "Commercial problem",
  "Diagnosis",
  "Constraint",
  "Dependency",
  "Decision",
  "Sequence",
  "Execution",
];

const WORK_EXAMPLES = [
  {
    title: "A pipeline that depended on referrals",
    problem: "A consulting practice had no structured outreach and no reliable way to forecast demand.",
    intervention:
      "Positioning was narrowed, a defensible target was selected, and a measured daily outreach rhythm was installed.",
    outcome: "The system study records 11 qualified discovery calls in six weeks.",
  },
  {
    title: "A commercial motion that stopped during delivery",
    problem: "A small agency returned to business development only when current projects were ending.",
    intervention:
      "Targeting, outbound activity, content cadence and pipeline review were designed as one operating rhythm.",
    outcome: "The system study records 3× pipeline growth across 90 days.",
  },
  {
    title: "Founder time consumed by repeatable operations",
    problem: "Manual follow up, reporting and coordination left little capacity for commercial work.",
    intervention:
      "Repeatable work was mapped, consolidated and automated while decision work remained with the operator.",
    outcome: "The system study records 14 hours reclaimed each week.",
  },
];

const FOR = [
  ["Founders and business owners", "People carrying direct responsibility for commercial direction and resource allocation."],
  ["Operators and commercial leaders", "People expected to diagnose constraints and turn priorities into an operating sequence."],
  ["Consultants and agency leaders", "People whose expertise is real but whose acquisition, sales or delivery system remains too dependent on personal attention."],
];

const NOT_FOR = [
  "Motivational business content",
  "Passive video consumption",
  "Generic marketing hacks",
  "Overnight growth promises",
  "A done for you agency service",
  "A shortcut around commercial judgment",
];

const INCLUSIONS = [
  ["BitwellForge Blueprint™", "The commercial reasoning layer"],
  ["BitwellForge Operating System™", "31 modules across eight phases"],
  ["BitwellForge Commercial Toolkit™", "44 ready to fill commercial assets"],
  ["Future additions and refinements", "Released into the Vault under the applicable access terms"],
  ["Lifetime access", "Licensed to the account created from the purchase email"],
];

const FAQS = [
  ["What is Forge Vault?", "Forge Vault is the private environment containing the BitwellForge Blueprint™, Operating System™ and Commercial Toolkit™. Together they provide the reasoning, sequence and working material behind a commercial system."],
  ["What exactly is included?", "Access includes the Blueprint knowledge base, 31 Operating System modules across eight phases, and 44 Commercial Toolkit assets across strategy, positioning, acquisition, pipeline management, client delivery and operations."],
  ["Is Forge Vault a course?", "No. It is a self directed commercial environment built around reference material, implementation protocols, worksheets, scorecards, decision trees, trackers, templates and validation checklists."],
  ["Who is Forge Vault for?", "It is designed for founders, business owners, operators, consultants, agency leaders and commercial leaders who make or influence commercial decisions."],
  ["How is it different from generic business content?", "Forge Vault connects diagnosis to dependency, decision, sequence and execution. The material is organised to help you understand why a system behaves as it does before changing it."],
  ["How does access work?", "After payment is verified, a Forge Vault account is issued to the email used at checkout. The library is then available through that licensed account."],
  ["Is the content updated?", "Yes. Revisions, additions, research and framework refinements are released into the Vault according to the applicable access terms."],
  ["Do I need to complete the modules in order?", "The full library is available immediately. The Operating System is intentionally sequenced because later decisions often depend on earlier ones, while the Blueprint and Toolkit can also be consulted as references."],
  ["Is implementation or support included?", "The purchase provides self directed access to the Forge Vault. Personal consulting, done for you implementation and custom advisory work are not included."],
  ["Can I inspect the product before purchasing?", "Yes. The genuine product views on this page show the Vault environment, the Blueprint contents, the Operating System structure and the Commercial Toolkit organisation without exposing the complete paid material."],
  ["Is the ₹14,500 price one time or recurring?", "It is a one time purchase for lifetime access under the current offer terms. There is no recurring subscription shown for this product."],
];

const PurchaseLink = ({ className = "" }: { className?: string }) => (
  <Button asChild className={`vault-cta h-auto min-h-[52px] whitespace-normal px-6 py-4 text-center ${className}`}>
    <Link to="/checkout">Get access to Forge Vault</Link>
  </Button>
);

const ForgeVault = () => {
  const [currency, setCurrencyState] = useState(getCurrency);
  const [pricing, setPricing] = useState<PricingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [activePreview, setActivePreview] = useState(PREVIEWS[0].id);

  useSEO({
    title: "Forge Vault Commercial Growth System | BitwellForge",
    description:
      "Explore Forge Vault: BitwellForge commercial reasoning, a 31 module operating system and 44 commercial toolkit assets. Lifetime access for ₹14,500.",
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
          return;
        }
        const response = data as PricingResponse;
        if (
          !hasExplicitCurrency() &&
          response.suggested_currency &&
          response.suggested_currency !== currency
        ) {
          setCurrencyState(response.suggested_currency);
          return;
        }
        setPricing(response);
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
  const preview = PREVIEWS.find((item) => item.id === activePreview) ?? PREVIEWS[0];

  return (
    <VaultStage>
      <main className="font-body overflow-x-hidden">
        <section className="section-padding pb-20 pt-28 md:pb-28 md:pt-40">
          <div className="mx-auto max-w-[1100px]">
            <div data-vault-reveal="lede"><Eyebrow>Forge Vault</Eyebrow></div>
            <div className="mt-6 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end lg:gap-20">
              <div>
                <h1 data-vault-reveal="title" className="max-w-[780px] text-balance font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
                  A structured environment for understanding commercial growth.
                </h1>
                <p data-vault-reveal="primary" className="mt-8 max-w-[650px] text-base font-light leading-[1.85] text-muted-foreground md:text-lg">
                  Not a generic business course. Forge Vault contains the commercial reasoning,
                  operating sequence and working material behind better growth decisions.
                </p>
              </div>
              <div className="border-t border-border pt-7 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">One time access</p>
                <p className="mt-3 font-heading text-4xl tracking-tight text-foreground">₹14,500</p>
                <PurchaseLink className="mt-7 w-full" />
              </div>
            </div>

            <div className="mt-16 grid border-t border-border md:grid-cols-3 md:divide-x md:divide-border">
              {LAYERS.map((layer) => (
                <div key={layer.number} className="border-b border-border py-7 md:border-b-0 md:px-7 md:first:pl-0 md:last:pr-0">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{layer.role}</p>
                  <p className="mt-3 font-heading text-lg text-foreground">{layer.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding py-20 md:py-28">
          <div className="mx-auto grid max-w-[1100px] gap-12 border-t border-border pt-14 md:pt-20 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <div><Eyebrow>What it actually is</Eyebrow></div>
            <div>
              <h2 className="max-w-[650px] font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                Context before tactics. Diagnosis before activity.
              </h2>
              <div className="mt-8 max-w-[650px] space-y-5 text-[15.5px] font-light leading-[1.85] text-muted-foreground">
                <p>
                  Forge Vault is not passive coursework, motivational content, generic marketing
                  advice or a random template bundle.
                </p>
                <p>
                  It provides structured context for seeing how commercial systems behave, why they
                  fail, where constraints emerge and how dependencies shape the next decision. The
                  objective is not more information. It is a better basis for judgment and execution.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding py-20 md:py-28">
          <div className="mx-auto max-w-[1100px] border-t border-border pt-14 md:pt-20">
            <Eyebrow>What is inside</Eyebrow>
            <div className="mt-12 divide-y divide-border border-b border-border">
              {LAYERS.map((layer) => (
                <article key={layer.number} className="grid gap-5 py-10 md:grid-cols-[70px_0.8fr_1.2fr] md:gap-10">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{layer.number}</p>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{layer.role}</p>
                    <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{layer.title}</h2>
                    <p className="mt-3 text-sm font-medium text-foreground">{layer.quantity}</p>
                  </div>
                  <p className="max-w-[56ch] text-[15px] font-light leading-[1.85] text-muted-foreground">{layer.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding py-20 md:py-28">
          <div className="mx-auto max-w-[1100px] border-t border-border pt-14 md:pt-20">
            <Eyebrow>Inside Forge Vault</Eyebrow>
            <div className="mt-7 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
              <div>
                <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl">Inspect the real system before you buy it.</h2>
                <p className="mt-6 max-w-[50ch] text-[15.5px] font-light leading-[1.85] text-muted-foreground">
                  These are genuine views from the private Forge Vault. They show how the knowledge,
                  sequence and working material are organised without exposing the complete paid library.
                </p>
                <div role="tablist" aria-label="Forge Vault previews" className="mt-9 flex flex-col border-t border-border">
                  {PREVIEWS.map((item) => (
                    <Button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={activePreview === item.id}
                      aria-controls="vault-preview-panel"
                      onClick={() => setActivePreview(item.id)}
                      variant="ghost"
                      className={`h-auto min-h-[52px] justify-between rounded-none border-b border-border px-0 py-4 text-left text-sm whitespace-normal ${activePreview === item.id ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      <span>{item.label}</span><span aria-hidden>{activePreview === item.id ? "01" : "View"}</span>
                    </Button>
                  ))}
                </div>
              </div>
              <figure id="vault-preview-panel" role="tabpanel" className="min-w-0">
                <div className="overflow-hidden rounded-md border border-border bg-background">
                  <img
                    key={preview.id}
                    src={preview.src}
                    alt={preview.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="mt-6 max-w-[65ch]">
                  <p className="font-heading text-xl text-foreground">{preview.title}</p>
                  <p className="mt-3 text-sm font-light leading-[1.75] text-muted-foreground">{preview.description}</p>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="section-padding py-20 md:py-28">
          <div className="mx-auto max-w-[1100px] border-t border-border pt-14 md:pt-20">
            <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div>
                <Eyebrow>How the system is used</Eyebrow>
                <h2 className="mt-7 font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl">Reason through the system, then build.</h2>
                <p className="mt-6 max-w-[48ch] text-[15.5px] font-light leading-[1.85] text-muted-foreground">
                  The Blueprint establishes the context. The Operating System orders the work. The
                  Toolkit supplies the material needed to execute and measure it.
                </p>
              </div>
              <ol className="border-t border-border">
                {REASONING.map((step, index) => (
                  <li key={step} className="grid grid-cols-[44px_1fr] items-center gap-4 border-b border-border py-5 sm:grid-cols-[70px_1fr]">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                    <span className="font-heading text-xl text-foreground md:text-2xl">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="section-padding py-20 md:py-28">
          <div className="mx-auto max-w-[1100px] border-t border-border pt-14 md:pt-20">
            <Eyebrow>BitwellForge commercial work</Eyebrow>
            <div className="mt-7 grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div>
                <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl">The reasoning is grounded in commercial system design.</h2>
                <p className="mt-6 max-w-[50ch] text-[14px] font-light leading-[1.8] text-muted-foreground">
                  These are selected BitwellForge system studies, not outcomes attributed to Forge Vault.
                  They show the kind of commercial problems the underlying methodology is designed to address.
                </p>
              </div>
              <div className="divide-y divide-border border-t border-border">
                {WORK_EXAMPLES.map((example) => (
                  <article key={example.title} className="py-8">
                    <h3 className="font-heading text-2xl text-foreground">{example.title}</h3>
                    <dl className="mt-6 grid gap-5 text-sm leading-[1.75] sm:grid-cols-3 sm:gap-6">
                      <div><dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Problem</dt><dd className="mt-2 text-foreground/80">{example.problem}</dd></div>
                      <div><dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Intervention</dt><dd className="mt-2 text-foreground/80">{example.intervention}</dd></div>
                      <div><dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Outcome</dt><dd className="mt-2 text-foreground/80">{example.outcome}</dd></div>
                    </dl>
                  </article>
                ))}
                <p className="py-6 text-xs italic leading-relaxed text-muted-foreground">
                  Concept studies are based on real system design and tested methodology. Reported outcomes are presented as study context rather than a claim about Forge Vault performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding py-20 md:py-28">
          <div className="mx-auto grid max-w-[1100px] gap-16 border-t border-border pt-14 md:grid-cols-2 md:gap-20 md:pt-20">
            <div>
              <Eyebrow>Who it is for</Eyebrow>
              <div className="mt-9 divide-y divide-border border-t border-border">
                {FOR.map(([title, detail]) => (
                  <div key={title} className="py-7">
                    <h2 className="font-heading text-2xl text-foreground">{title}</h2>
                    <p className="mt-3 max-w-[48ch] text-sm font-light leading-[1.75] text-muted-foreground">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Eyebrow>Who it is not for</Eyebrow>
              <p className="mt-9 text-sm font-light leading-[1.75] text-muted-foreground">Forge Vault is probably not the right fit if you are looking for:</p>
              <div className="mt-5 divide-y divide-border border-y border-border">
                {NOT_FOR.map((item, index) => (
                  <p key={item} className="grid grid-cols-[36px_1fr] gap-3 py-4 text-sm text-foreground/85">
                    <span className="text-[10px] tracking-[0.18em] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>{item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding py-20 md:py-28">
          <div className="mx-auto max-w-[1100px] border-t border-border pt-14 md:pt-20">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div>
                <Eyebrow>What you receive</Eyebrow>
                <h2 className="mt-7 font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl">One commercial environment. Three connected layers.</h2>
              </div>
              <dl className="divide-y divide-border border-t border-border">
                {INCLUSIONS.map(([title, detail]) => (
                  <div key={title} className="grid gap-2 py-6 sm:grid-cols-[0.9fr_1.1fr] sm:gap-8">
                    <dt className="font-heading text-xl text-foreground">{title}</dt>
                    <dd className="text-sm font-light leading-[1.75] text-muted-foreground">{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-16 max-w-[720px] border-l border-border pl-6 sm:pl-8">
              <p className="font-heading text-2xl text-foreground">Built to remain active, not become an archive.</p>
              <p className="mt-4 text-[15px] font-light leading-[1.8] text-muted-foreground">
                Revisions, additional material, research and framework refinements are released into
                Forge Vault under the current access terms. This does not include personal consulting,
                custom implementation or unlimited support.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding py-20 md:py-32">
          <div className="mx-auto max-w-[1100px] border-y border-border py-14 md:py-20">
            <div className="grid gap-12 md:grid-cols-[1fr_320px] md:items-start md:gap-20">
              <div>
                <Eyebrow>Lifetime access</Eyebrow>
                <h2 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-foreground md:text-6xl">Forge Vault</h2>
                <p className="mt-6 max-w-[560px] text-[15.5px] font-light leading-[1.85] text-muted-foreground">
                  Full access to the Blueprint™, Operating System™, all 31 modules, the Commercial
                  Toolkit™, all 44 assets and future additions under the applicable access terms.
                </p>
                <div className="mt-10 max-w-[320px]">
                  <CurrencySelect value={currency} options={options} onChange={chooseCurrency} />
                </div>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">One time purchase</p>
                {loading && <p className="mt-4 font-heading text-4xl text-muted-foreground">₹14,500</p>}
                {!loading && priceUnavailable && (
                  <div role="status">
                    <p className="mt-4 font-heading text-4xl tracking-tight text-foreground">₹14,500 INR</p>
                    <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Live currency display is temporarily unavailable. The base price remains ₹14,500 INR.</p>
                  </div>
                )}
                {!loading && !priceUnavailable && pricing && (
                  <div>
                    <p className="mt-4 break-words font-heading text-4xl tracking-tight text-foreground md:text-5xl">{pricing.display.formatted}</p>
                    {pricing.display.currency !== "INR" && (
                      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Base price ₹{pricing.base.amount.toLocaleString("en-IN")} INR. You are charged the live amount shown.</p>
                    )}
                    {pricing.requested_currency_unsupported && (
                      <p role="alert" className="mt-4 text-xs leading-relaxed text-muted-foreground">No live rate is available for {pricing.requested_currency_unsupported}. Showing {pricing.display.currency} instead.</p>
                    )}
                  </div>
                )}
                <PurchaseLink className="mt-8 w-full" />
                <p className="mt-5 text-xs leading-relaxed text-muted-foreground">Your licensed account is created from the purchase email after payment is verified.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding py-20 md:py-28">
          <div className="mx-auto max-w-[900px]">
            <Eyebrow>Questions before purchase</Eyebrow>
            <h2 className="mt-7 max-w-[620px] font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl">The details, without a sales call.</h2>
            <div className="mt-12 divide-y divide-border border-y border-border">
              {FAQS.map(([question, answer]) => (
                <details key={question} className="group py-1">
                  <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-4 text-left font-heading text-lg text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-xl">
                    <span>{question}</span><span aria-hidden className="text-sm text-muted-foreground group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="max-w-[680px] pb-6 pr-10 text-sm font-light leading-[1.8] text-muted-foreground">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding pb-32 pt-20 md:pb-40 md:pt-28">
          <div className="mx-auto max-w-[900px] border-t border-border pt-14 text-center md:pt-20">
            <Eyebrow>Forge Vault</Eyebrow>
            <h2 className="mx-auto mt-7 max-w-[760px] text-balance font-heading text-4xl font-semibold tracking-tight text-foreground md:text-6xl">Better commercial decisions begin with better context.</h2>
            <p className="mx-auto mt-7 max-w-[600px] text-base font-light leading-[1.85] text-muted-foreground">Explore the system. Understand the mechanics. Build from there.</p>
            <p className="mt-9 font-heading text-3xl text-foreground">₹14,500</p>
            <PurchaseLink className="mt-7 w-full max-w-[360px]" />
          </div>
        </section>
      </main>
    </VaultStage>
  );
};

export default ForgeVault;