/**
 * Shared state for the Forge Vault entry choreography.
 *
 * A single flag records that the user *intentionally* opened the Vault from
 * another page. Direct loads, refreshes and browser back/forward never set it,
 * so those get the shorter reveal instead of the full sequence.
 */
const INTENT_KEY = "bwf:vault-intent";
const DEPARTING_CLASS = "vault-departing";

/** Duration the outgoing page is allowed to recede before we navigate. */
export const DEPART_MS = 190;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const markVaultIntent = () => {
  try {
    sessionStorage.setItem(INTENT_KEY, "1");
  } catch {
    /* storage unavailable: fall back to the short reveal */
  }
};

export const consumeVaultIntent = () => {
  try {
    const value = sessionStorage.getItem(INTENT_KEY);
    sessionStorage.removeItem(INTENT_KEY);
    return value === "1";
  } catch {
    return false;
  }
};

export const beginDeparture = () => document.body.classList.add(DEPARTING_CLASS);
export const endDeparture = () => document.body.classList.remove(DEPARTING_CLASS);
