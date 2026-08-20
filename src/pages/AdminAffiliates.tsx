import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import PortalShell from "@/portal/PortalShell";

interface Row {
  affiliate_id: string;
  name: string | null;
  email: string;
  code: string;
  status: string;
  clicks: number;
  validations: number;
  purchases: number;
  revenue_usd: number;
  discounts_usd: number;
  commission_usd: number;
  commission_paid_usd: number;
}

const money = (n: number) => `$${Number(n).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

/** Admin-only affiliate performance view. Access is gated server-side by has_role. */
const AdminAffiliates = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    supabase.functions
      .invoke("payout-batch?view=affiliates", { method: "GET" })
      .then(({ data, error: fnError }) => {
        if (!active) return;
        if (fnError || !data?.affiliates) {
          setError("This view is available to administrators only.");
          return;
        }
        setRows(data.affiliates as Row[]);
      })
      .catch(() => active && setError("Affiliate performance could not be loaded."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <PortalShell eyebrow="Administration" title="Affiliate Performance">
      {loading && <p className="text-sm portal-muted">Loading affiliate performance</p>}
      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      {!loading && !error && rows.length === 0 && (
        <p className="text-sm portal-muted">No affiliate accounts yet.</p>
      )}

      {rows.length > 0 && (
        <div className="overflow-x-auto border-t portal-line pt-8">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="text-[11px] tracking-[0.18em] uppercase portal-muted text-left">
                <th className="py-3 pr-6 font-normal">Affiliate</th>
                <th className="py-3 pr-6 font-normal">Code</th>
                <th className="py-3 pr-6 font-normal">Clicks</th>
                <th className="py-3 pr-6 font-normal">Validated</th>
                <th className="py-3 pr-6 font-normal">Purchases</th>
                <th className="py-3 pr-6 font-normal">Revenue</th>
                <th className="py-3 pr-6 font-normal">Discounts</th>
                <th className="py-3 pr-6 font-normal">Commission</th>
                <th className="py-3 font-normal">Paid</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.affiliate_id} className="border-t portal-line align-top">
                  <td className="py-4 pr-6">
                    <span className="block">{r.name ?? r.email}</span>
                    <span className="block text-[11px] tracking-[0.16em] uppercase portal-muted">
                      {r.status}
                    </span>
                  </td>
                  <td className="py-4 pr-6">
                    <span className="block">{r.code}</span>
                    <span className="block text-[11px] portal-muted break-all">
                      /forge-vault?ref={r.code}
                    </span>
                  </td>
                  <td className="py-4 pr-6">{r.clicks}</td>
                  <td className="py-4 pr-6">{r.validations}</td>
                  <td className="py-4 pr-6">{r.purchases}</td>
                  <td className="py-4 pr-6">{money(r.revenue_usd)}</td>
                  <td className="py-4 pr-6">{money(r.discounts_usd)}</td>
                  <td className="py-4 pr-6">{money(r.commission_usd)}</td>
                  <td className="py-4">{money(r.commission_paid_usd)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PortalShell>
  );
};

export default AdminAffiliates;
