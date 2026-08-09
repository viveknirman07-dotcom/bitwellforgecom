import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/use-seo";

const steps = [
  { n: "01", t: "Apply for a partner code", d: "Create an account and activate your affiliate profile. Your referral code is issued instantly." },
  { n: "02", t: "Share the system", d: "Send your link to operators who need commercial growth infrastructure. Attribution lasts sixty days." },
  { n: "03", t: "Earn on every verified sale", d: "Fifty US dollars per verified purchase. Commission is recorded automatically the moment payment clears." },
  { n: "04", t: "Get paid monthly", d: "Commissions are batched by month and paid to your PayPal address after the settlement window closes." },
];

const AffiliateProgram = () => {
  useSEO({
    title: "Affiliate Program — BitwellForge",
    description:
      "Earn fifty US dollars per verified sale of the BitwellForge Commercial Growth System. Sixty day attribution, automatic commission tracking, monthly payouts.",
    canonicalPath: "/affiliate",
  });

  useEffect(() => {
    document.title = "Affiliate Program — BitwellForge";
  }, []);

  return (
    <div className="min-h-screen">
      <section className="max-w-[1100px] mx-auto px-6 md:px-10 pt-28 md:pt-40 pb-16">
        <p className="eyebrow mb-6">Partner program</p>
        <h1 className="font-heading text-4xl md:text-6xl tracking-tight leading-[1.05] max-w-3xl">
          Earn on every operator you send to the <em>system</em>
        </h1>
        <p className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">
          The BitwellForge affiliate program pays a flat fifty US dollars for every verified purchase of the
          Commercial Growth System. No tiers, no sliding scales, no negotiation.
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link to="/affiliate/dashboard" className="btn-primary">Become a partner</Link>
          <Link to="/checkout" className="btn-secondary">See the product</Link>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid gap-px md:grid-cols-4 border-t border-border">
          {steps.map((s) => (
            <div key={s.n} className="py-10 md:pr-8">
              <p className="text-[11px] tracking-[0.28em] uppercase text-muted-foreground">{s.n}</p>
              <h2 className="mt-4 font-heading text-lg tracking-tight">{s.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 md:px-10 pb-24 md:pb-32">
        <div className="border-t border-border pt-12 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl tracking-tight">The terms, plainly</h2>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground list-none">
              <li>Fifty US dollars per verified sale, paid in USD.</li>
              <li>Sixty day attribution window from first click.</li>
              <li>Self referral is not eligible and is detected automatically.</li>
              <li>Refunded or reversed orders void the related commission.</li>
              <li>Payouts run monthly once payout details are on file.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-2xl tracking-tight">What you receive</h2>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground list-none">
              <li>A private dashboard with clicks, commissions and payout history.</li>
              <li>The Affiliate Partner Guide and Product Sales Guide, access controlled.</li>
              <li>Your own referral code and link, issued on activation.</li>
            </ul>
            <Link to="/affiliate/dashboard" className="btn-primary mt-10 inline-flex">Open the partner portal</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AffiliateProgram;
