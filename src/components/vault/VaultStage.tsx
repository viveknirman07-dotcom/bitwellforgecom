import { ReactNode, useEffect, useState } from "react";
import { clearVaultCurtain, consumeVaultIntent, prefersReducedMotion } from "./vault-entry";

type Mode = "arrive" | "brief" | "reduced";

/**
 * Wraps a Forge Vault environment. After the opening gesture the content
 * settles once — a single quiet pass, not a cascade.
 */
const VaultStage = ({ children }: { children: ReactNode }) => {
  const [mode] = useState<Mode>(() => {
    const intentional = consumeVaultIntent();
    if (prefersReducedMotion()) return "reduced";
    return intentional ? "arrive" : "brief";
  });

  useEffect(() => {
    const id = window.requestAnimationFrame(clearVaultCurtain);
    return () => window.cancelAnimationFrame(id);
  }, []);

  return <div className={`vault-env vault-stage vault-stage--${mode}`}>{children}</div>;
};

export default VaultStage;
