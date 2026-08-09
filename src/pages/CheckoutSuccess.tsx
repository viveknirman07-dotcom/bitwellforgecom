import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Status {
  status: string;
  currency?: string;
  amount?: number;
  email_masked?: string;
  error?: string;
}

const CheckoutSuccess = () => {
  const [params] = useSearchParams();
  const orderId = params.get("order");
  const [state, setState] = useState<Status | null>(null);
  const [tries, setTries] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    document.title = "Payment received — BitwellForge";
  }, []);

  useEffect(() => {
    if (!orderId) return;
    let active = true;

    const poll = async () => {
      try {
        const { data } = await supabase.functions.invoke(`order-status?order=${orderId}`, {
          method: "GET",
        });
        if (!active) return;
        setState(data ?? null);
        if (data?.status !== "paid" && tries < 20) {
          timer.current = window.setTimeout(() => setTries((t) => t + 1), 3000);
        }
      } catch {
        if (active && tries < 20) timer.current = window.setTimeout(() => setTries((t) => t + 1), 3000);
      }
    };

    poll();
    return () => {
      active = false;
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [orderId, tries]);

  const paid = state?.status === "paid";

  return (
    <div className="portal font-body flex flex-col">
      <header className="border-b portal-line">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center">
          <Link to="/" className="font-heading text-lg md:text-xl tracking-tight">BitwellForge</Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-xl">
          <p className="text-[11px] tracking-[0.28em] uppercase portal-gold mb-5">
            {paid ? "Access granted" : "Confirming payment"}
          </p>
          <h1 className="font-heading text-3xl md:text-5xl tracking-tight portal-metal inline-block">
            {paid ? "Your purchase is confirmed" : "Verifying your payment"}
          </h1>

          <div className="mt-12 space-y-6 text-sm leading-relaxed portal-muted">
            {!orderId && <p>No order reference was provided.</p>}

            {orderId && !paid && (
              <p>
                Payments are confirmed by the provider, not the browser. This page updates itself the moment
                verification completes. You can safely close it — confirmation is also sent by email.
              </p>
            )}

            {paid && (
              <>
                <p>
                  Payment verified{state?.amount ? ` (${state.currency} ${state.amount})` : ""}. Lifetime access
                  to the Forge Vault has been issued to {state?.email_masked ?? "your email address"}.
                </p>
                <p>
                  First time here? Use the password reset link sent to your inbox to set a password, then sign
                  in to open the Vault.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link to="/vault" className="portal-btn portal-btn--solid">Open the Forge Vault</Link>
                  <Link to="/account" className="portal-btn">Sign in</Link>
                </div>
              </>
            )}

            {orderId && (
              <p className="pt-6 text-[11px] tracking-[0.18em] uppercase">
                Order reference {orderId.slice(0, 8)}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutSuccess;
