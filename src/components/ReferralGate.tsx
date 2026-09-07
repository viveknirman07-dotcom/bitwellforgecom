import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { captureReferral } from "@/lib/referral";

/**
 * Handles affiliate referral arrivals.
 *
 * A referral link (bitwellforge.com/?ref=CODE) validates the code server-side,
 * stores the attribution locally, then sends the prospect to the public Forge
 * Vault product page. The ref parameter is removed from the URL so the visitor
 * sees the ordinary product experience with no sign of the referral.
 */
const ReferralGate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;

    const params = new URLSearchParams(location.search);
    const hasRef = Boolean(params.get("ref"));

    // Always attempt capture so attribution survives a deep link too.
    captureReferral();

    if (!hasRef) {
      handled.current = true;
      return;
    }
    handled.current = true;

    params.delete("ref");
    const rest = params.toString();

    // Referred prospects always land on the product page, never affiliate surfaces.
    const target = "/forge-vault";
    navigate({ pathname: target, search: rest ? `?${rest}` : "" }, { replace: true });
  }, [location.search, navigate]);

  return null;
};

export default ReferralGate;
