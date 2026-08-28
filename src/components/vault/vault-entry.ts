/**
 * Forge Vault entry choreography: vertical ribbon pull and unroll.
 *
 * One canonical gesture, used by every intentional Vault entry point.
 * A handle appears at the bottom of the viewport and is pulled upward,
 * unrolling a narrow painted ribbon behind it. Once the ribbon has cleared
 * the top edge it expands laterally, becoming the field the Vault arrives in,
 * and the field fades to reveal the destination.
 *
 * The elements live on <body>, outside React, so the gesture survives the
 * route change and stays visually continuous even if the destination is slow.
 *
 * Timeline (transform / opacity / clip-path only):
 *   0 to 650ms     handle rises to 20vh, ribbon unrolls beneath it
 *   650 to 950ms   handle clears the top edge, ribbon reaches full height
 *   950 to 1200ms  ribbon expands across the viewport, field resolves
 */
const INTENT_KEY = "bwf:vault-intent";
const CURTAIN_CLASS = "vault-curtain";

const PULL_MS = 650;
const CLEAR_MS = 300;
const EXPAND_MS = 250;

/** Total time before the destination is uncovered. */
export const COVER_MS = PULL_MS + CLEAR_MS;

const EASE_PULL = "cubic-bezier(0.22, 1, 0.36, 1)";
const EASE_CLEAR = "cubic-bezier(0.16, 1, 0.3, 1)";
const EASE_EXPAND = "cubic-bezier(0.7, 0, 0.84, 0)";

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
    '<div class="vault-curtain__field"></div>' +
    '<div class="vault-curtain__ribbon"></div>' +
    '<div class="vault-curtain__handle"><span>&#8593;</span></div>';
  document.body.appendChild(root);
  document.body.classList.add("vault-transitioning");
  return root;
};

/**
 * Runs the canonical opening transition. `navigate` is invoked at the moment
 * the ribbon covers the viewport, so the route swap is never visible.
 */
export const runVaultOpening = (navigate: () => void) => {
  if (typeof document === "undefined" || prefersReducedMotion()) {
    navigate();
    return;
  }

  const root = buildCurtain();
  const field = root.querySelector(".vault-curtain__field") as HTMLElement;
  const ribbon = root.querySelector(".vault-curtain__ribbon") as HTMLElement;
  const handle = root.querySelector(".vault-curtain__handle") as HTMLElement;
  const ribbonWidth = ribbon.getBoundingClientRect().width || 112;
  const spread = Math.ceil((window.innerWidth / ribbonWidth) * 1.05);
  let done = false;

  const finish = () => {
    if (done) return;
    done = true;
    removeCurtain();
  };

  const timing = (duration: number, delay: number, easing: string): KeyframeAnimationOptions => ({
    duration,
    delay,
    easing,
    fill: "forwards",
  });

  // The current page recedes behind a quiet field while the pull begins.
  field.animate([{ opacity: 0 }, { opacity: 1 }], timing(PULL_MS * 0.72, 0, EASE_PULL));

  // Phase 1 and 2: the handle is pulled from the bottom edge past the top.
  handle.animate(
    [
      { transform: "translate3d(0, 0, 0)", opacity: 1 },
      { transform: "translate3d(0, -80vh, 0)", opacity: 1 },
    ],
    timing(PULL_MS, 0, EASE_PULL)
  );
  handle.animate(
    [
      { transform: "translate3d(0, -80vh, 0)", opacity: 1 },
      { transform: "translate3d(0, -108vh, 0)", opacity: 0 },
    ],
    timing(CLEAR_MS, PULL_MS, EASE_CLEAR)
  );

  // The ribbon unrolls beneath the handle, then completes to the top edge.
  ribbon.animate(
    [{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(20% 0 0 0)" }],
    timing(PULL_MS, 0, EASE_PULL)
  );
  ribbon.animate(
    [{ clipPath: "inset(20% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)" }],
    timing(CLEAR_MS, PULL_MS, EASE_CLEAR)
  );

  // Phase 3: the ribbon becomes the environment, then resolves away.
  const expand = ribbon.animate(
    [
      { transform: "scaleX(1)" },
      { transform: `scaleX(${spread})` },
    ],
    timing(EXPAND_MS, COVER_MS, EASE_EXPAND)
  );

  window.setTimeout(() => {
    navigate();
    root.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 320,
      delay: EXPAND_MS,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      fill: "forwards",
    }).onfinish = finish;
  }, COVER_MS + EXPAND_MS * 0.5);

  expand.oncancel = finish;

  // Safety net: never trap the interface behind the curtain.
  window.setTimeout(finish, COVER_MS + EXPAND_MS + 1200);
};

/** Called by the destination in case a curtain was orphaned. */
export const clearVaultCurtain = () => {
  if (!document.querySelector(`.${CURTAIN_CLASS}`)) {
    document.body.classList.remove("vault-transitioning");
  }
};
