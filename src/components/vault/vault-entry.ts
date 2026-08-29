/**
 * Forge Vault entry choreography: vertical ribbon pull and unroll.
 *
 * One canonical gesture, used by every intentional Vault entry point.
 * A handle is pulled from the bottom edge of the viewport, unrolling a narrow
 * painted ribbon behind it. Once the ribbon clears the top edge it expands
 * laterally into the field the Vault arrives in, and the field resolves away.
 *
 * The elements live on <body>, outside React, so the gesture survives the
 * route change and stays visually continuous even if the destination is slow.
 *
 * Every phase overlaps its neighbour and shares a single easing family, so the
 * motion reads as one continuous pull rather than a sequence of steps. Only
 * transform, opacity, clip-path and filter are animated.
 */
const INTENT_KEY = "bwf:vault-intent";
const CURTAIN_CLASS = "vault-curtain";

const SETTLE_MS = 90;   // the handle loads before it moves
const PULL_MS = 780;    // the long, eased ascent
const CLEAR_MS = 380;   // the handle leaves, the ribbon completes
const EXPAND_MS = 460;  // the ribbon becomes the environment
const RESOLVE_MS = 520; // the field dissolves into the destination

/** Total time before the destination is uncovered. */
export const COVER_MS = SETTLE_MS + PULL_MS + CLEAR_MS;

// A single easing family keeps the whole gesture feeling like one motion.
const EASE_LOAD = "cubic-bezier(0.34, 0.02, 0.2, 1)";
const EASE_PULL = "cubic-bezier(0.22, 0.62, 0.16, 1)";
const EASE_CLEAR = "cubic-bezier(0.18, 0.72, 0.12, 1)";
const EASE_EXPAND = "cubic-bezier(0.62, 0.02, 0.18, 1)";
const EASE_RESOLVE = "cubic-bezier(0.24, 0.8, 0.24, 1)";

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
    '<div class="vault-curtain__glow"></div>' +
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
  const glow = root.querySelector(".vault-curtain__glow") as HTMLElement;
  const ribbon = root.querySelector(".vault-curtain__ribbon") as HTMLElement;
  const handle = root.querySelector(".vault-curtain__handle") as HTMLElement;
  const ribbonWidth = ribbon.getBoundingClientRect().width || 112;
  const spread = Math.ceil((window.innerWidth / ribbonWidth) * 1.08);
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

  // The field arrives early and slowly, so nothing ever snaps into view.
  field.animate(
    [{ opacity: 0 }, { opacity: 0.55, offset: 0.5 }, { opacity: 1 }],
    timing(SETTLE_MS + PULL_MS * 0.86, 0, EASE_LOAD)
  );

  // A bloom of light travels ahead of the handle and fades as it clears.
  glow.animate(
    [
      { transform: "translate3d(0, 0, 0) scale(0.72)", opacity: 0 },
      { transform: "translate3d(0, -26vh, 0) scale(1)", opacity: 0.9, offset: 0.34 },
      { transform: "translate3d(0, -92vh, 0) scale(1.22)", opacity: 0.5, offset: 0.82 },
      { transform: "translate3d(0, -122vh, 0) scale(1.3)", opacity: 0 },
    ],
    timing(SETTLE_MS + PULL_MS + CLEAR_MS, 0, EASE_PULL)
  );

  // The handle loads, then is drawn upward in one long, unbroken arc.
  handle.animate(
    [
      { transform: "translate3d(0, 0, 0) scale(0.94)", opacity: 0 },
      { transform: "translate3d(0, -4vh, 0) scale(1)", opacity: 1 },
    ],
    timing(SETTLE_MS + 140, 0, EASE_LOAD)
  );
  handle.animate(
    [
      { transform: "translate3d(0, -4vh, 0)" },
      { transform: "translate3d(0, -46vh, 0)", offset: 0.52 },
      { transform: "translate3d(0, -82vh, 0)" },
    ],
    timing(PULL_MS, SETTLE_MS, EASE_PULL)
  );
  handle.animate(
    [
      { transform: "translate3d(0, -82vh, 0)", opacity: 1 },
      { transform: "translate3d(0, -100vh, 0)", opacity: 0.62, offset: 0.55 },
      { transform: "translate3d(0, -118vh, 0)", opacity: 0 },
    ],
    timing(CLEAR_MS, SETTLE_MS + PULL_MS, EASE_CLEAR)
  );

  // The ribbon unrolls beneath the handle, tracking it exactly.
  ribbon.animate(
    [
      { clipPath: "inset(100% 0 0 0)" },
      { clipPath: "inset(56% 0 0 0)", offset: 0.52 },
      { clipPath: "inset(18% 0 0 0)" },
    ],
    timing(PULL_MS, SETTLE_MS, EASE_PULL)
  );
  ribbon.animate(
    [{ clipPath: "inset(18% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)" }],
    timing(CLEAR_MS, SETTLE_MS + PULL_MS, EASE_CLEAR)
  );

  // The ribbon becomes the environment: a wide, eased lateral opening.
  const expand = ribbon.animate(
    [
      { transform: "scaleX(1)" },
      { transform: `scaleX(${(spread * 0.34).toFixed(2)})`, offset: 0.46 },
      { transform: `scaleX(${spread})` },
    ],
    timing(EXPAND_MS, COVER_MS - 60, EASE_EXPAND)
  );

  // The route swaps behind full cover, then the field resolves away slowly.
  window.setTimeout(() => {
    navigate();
    root.animate(
      [
        { opacity: 1, filter: "blur(0px)" },
        { opacity: 0.42, filter: "blur(3px)", offset: 0.55 },
        { opacity: 0, filter: "blur(8px)" },
      ],
      {
        duration: RESOLVE_MS,
        delay: EXPAND_MS * 0.55,
        easing: EASE_RESOLVE,
        fill: "forwards",
      }
    ).onfinish = finish;
  }, COVER_MS + EXPAND_MS * 0.35);

  expand.oncancel = finish;

  // Safety net: never trap the interface behind the curtain.
  window.setTimeout(finish, COVER_MS + EXPAND_MS + RESOLVE_MS + 900);
};

/** Called by the destination in case a curtain was orphaned. */
export const clearVaultCurtain = () => {
  if (!document.querySelector(`.${CURTAIN_CLASS}`)) {
    document.body.classList.remove("vault-transitioning");
  }
};
