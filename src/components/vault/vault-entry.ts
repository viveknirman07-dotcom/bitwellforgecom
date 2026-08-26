/**
 * Forge Vault entry choreography.
 *
 * One canonical transition, used by every intentional Vault entry point:
 * a handle appears at the bottom-centre of the viewport and is pulled upward,
 * carrying a ribbon that covers the current page (bottom -> top), then keeps
 * travelling upward to uncover the Vault beneath it.
 *
 * The element lives on <body>, outside React, so it survives the route change
 * and the gesture stays visually continuous even if the destination is slow.
 */
const INTENT_KEY = "bwf:vault-intent";
const CURTAIN_CLASS = "vault-curtain";

/** Cover phase: the ribbon is pulled up over the current page. */
export const COVER_MS = 620;
/** Small hold at full cover so the gesture reads as one continuous pull. */
const HOLD_MS = 90;
/** Uncover phase: the ribbon continues upward, revealing the Vault. */
const UNCOVER_MS = 700;

const EASE_PULL = "cubic-bezier(0.22, 0.9, 0.16, 1)";
const EASE_SETTLE = "cubic-bezier(0.16, 1, 0.3, 1)";

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

const removeCurtain = () => {
  document.querySelectorAll(`.${CURTAIN_CLASS}`).forEach((el) => el.remove());
  document.body.classList.remove("vault-transitioning");
};

const buildCurtain = () => {
  removeCurtain();
  const root = document.createElement("div");
  root.className = CURTAIN_CLASS;
  root.setAttribute("aria-hidden", "true");
  root.innerHTML =
    '<div class="vault-curtain__panel"><span class="vault-curtain__edge"></span><span class="vault-curtain__handle"></span></div>';
  document.body.appendChild(root);
  document.body.classList.add("vault-transitioning");
  return root;
};

/**
 * Runs the canonical opening transition. `navigate` is invoked at the moment
 * the viewport is fully covered, so the route swap is never visible.
 */
export const runVaultOpening = (navigate: () => void) => {
  if (typeof document === "undefined" || prefersReducedMotion()) {
    navigate();
    return;
  }

  const root = buildCurtain();
  const panel = root.firstElementChild as HTMLElement;
  let done = false;

  const finish = () => {
    if (done) return;
    done = true;
    removeCurtain();
  };

  const cover = panel.animate(
    [
      { transform: "translate3d(0, 100%, 0)" },
      { transform: "translate3d(0, 0, 0)" },
    ],
    { duration: COVER_MS, easing: EASE_PULL, fill: "forwards" }
  );

  cover.onfinish = () => {
    navigate();
    window.setTimeout(() => {
      const uncover = panel.animate(
        [
          { transform: "translate3d(0, 0, 0)" },
          { transform: "translate3d(0, -100%, 0)" },
        ],
        { duration: UNCOVER_MS, easing: EASE_SETTLE, fill: "forwards" }
      );
      uncover.onfinish = finish;
      uncover.oncancel = finish;
    }, HOLD_MS);
  };
  cover.oncancel = finish;

  // Safety net: never trap the interface behind the curtain.
  window.setTimeout(finish, COVER_MS + HOLD_MS + UNCOVER_MS + 900);
};

/** Called by the destination in case a curtain was orphaned. */
export const clearVaultCurtain = () => {
  if (!document.querySelector(`.${CURTAIN_CLASS}`)) {
    document.body.classList.remove("vault-transitioning");
  }
};
