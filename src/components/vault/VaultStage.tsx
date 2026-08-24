import { ReactNode, useEffect, useState } from "react";
import { consumeVaultIntent, endDeparture, prefersReducedMotion } from "./vault-entry";

type Mode = "full" | "brief" | "reduced";

/**
 * Wraps a Forge Vault environment. Children marked with `data-vault-reveal`
 * ("title" | "lede" | "primary" | "secondary") resolve in one staggered
 * composition behind a single refined surface pass.
 */
const VaultStage = ({ children }: { children: ReactNode }) => {
  const [mode] = useState<Mode>(() => {
    const intentional = consumeVaultIntent();
    if (prefersReducedMotion()) return "reduced";
    return intentional ? "full" : "brief";
  });

  useEffect(() => {
    // The outgoing page has been replaced; release its receded state.
    const id = window.requestAnimationFrame(endDeparture);
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <div className={`vault-stage vault-stage--${mode}`}>
      {mode === "full" && <div className="vault-veil" aria-hidden="true" />}
      {children}
    </div>
  );
};

export default VaultStage;
