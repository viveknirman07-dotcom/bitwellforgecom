import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSEO } from "@/hooks/use-seo";
import { Lead, Note, Page, Progress, btn, call } from "./shared";

type State = { payment_status: string; order_ref: string; token: string | null };

const ThankYou = () => {
  useSEO({ title: "Audit Confirmed | BitwellForge", description: "Your Revenue Infrastructure Audit payment.", canonicalPath: "/audit/thank-you" });
  const [params] = useSearchParams();
  const order = params.get("order") ?? "";
  const paypalToken = params.get("token");
  const [state, setState] = useState<State | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let stop = false, tries = 0;
    const run = async () => {
      try {
        // PayPal returns here with its order token; capture and verify server-side.
        if (paypalToken && tries === 0) await call("paypal-capture", { order_id: order, paypal_order_id: paypalToken }).catch(() => null);
        const s = await call<State>("audit-portal", { action: "order", order_id: order });
        if (stop) return;
        setState(s);
        if (s.payment_status !== "paid" && !["failed", "expired", "refunded"].includes(s.payment_status) && tries++ < 40) setTimeout(run, 6000);
      } catch (e) { if (!stop) setError((e as Error).message); }
    };
    if (order) run(); else setError("This page needs an order reference.");
    return () => { stop = true; };
  }, [order, paypalToken]);

  const paid = state?.payment_status === "paid";
  const failed = state && ["failed", "expired", "refunded"].includes(state.payment_status);
  return (
    <Page eyebrow="Revenue Infrastructure Audit" title={paid ? "Your Revenue Infrastructure Audit Is Confirmed." : failed ? "Your Payment Was Not Completed." : "Confirming Your Payment."}>
      {error && <Note tone="error">{error}</Note>}
      {!state && !error && <Lead>We are verifying your payment with the payment provider. This usually takes a few seconds.</Lead>}
      {state && !paid && !failed && <Lead>Your payment is still being confirmed by the payment provider. This page updates automatically. Crypto payments can take several minutes to confirm.</Lead>}
      {failed && (<><Lead>No charge has been confirmed for this order. You can try again from the audit page.</Lead><Link to="/audit#purchase" className={btn}>Return to the audit</Link></>)}
      {paid && (
        <>
          <Lead>Your payment has been successfully received. The next step is to provide the information required for your audit.</Lead>
          <Lead>Our team will review your submission and begin the assessment process.</Lead>
          <Lead>Your complete audit deliverables will be provided within 5–6 days after we receive your completed intake form.</Lead>
          <Progress stages={["Payment Confirmed", "Business Information Submission", "Audit Preparation & Delivery"]} done={1} />
          <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">Order reference</p>
          <p className="font-heading text-2xl text-foreground mb-10">{state.order_ref}</p>
          {state.token && <Link to={`/audit/intake?t=${state.token}`} className={btn}>Complete Your Business Information</Link>}
        </>
      )}
    </Page>
  );
};
export default ThankYou;
