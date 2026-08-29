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
 * Continuity rules followed here:
 *   every phase begins before its predecessor ends, so no segment ever
 *   decelerates to a stop and re-accelerates,
 *   handoffs happen at matched velocity: a phase that ends fast is followed by
 *   a phase whose curve starts fast,
 *   one easing family is shared by every element, so the ribbon, the handle
 *   and the light read as a single object in motion.
 *
 * Only transform, opacity, clip-path and filter are animated.
 *
 * A reduced-motion variant runs the same narrative with no movement at all:
 * the field simply resolves in, the route swaps behind it, and it resolves out.
 */
const INTENT_KEY = "bwf:vault-intent";
const CURTAIN_CLASS = "vault-curtain";
const CALM_CLASS = "vault-curtain--calm";

const SETTLE_MS = 120; // the handle loads before it moves
const PULL_MS = 860; // the long, eased ascent
const CLEAR_MS = 420; // the handle leaves, the ribbon completes
const EXPAND_MS = 520; // the ribbon becomes the environment
const RESOLVE_MS = 560; // the field dissolves into the destination

/** Overlaps: each phase starts this far before the previous one finishes. */
const PULL_LEAD = 70;
const CLEAR_LEAD = 90;
const EXPAND_LEAD = 130;

const PULL_AT = SETTLE_MS - PULL_LEAD;
const CLEAR_AT = PULL_AT + PULL_MS - CLEAR_LEAD;
const EXPAND_AT = CLEAR_AT + CLEAR_MS - EXPAND_LEAD;

/** Total time before the destination is uncovered. */
export const COVER_MS = CLEAR_AT + CLEAR_MS;

/**
 * A single easing family. Each curve leaves off at roughly the velocity the
 * next one picks up, which is what makes the whole gesture read as continuous.
 */
const EASE_LOAD = "cubic-bezier(0.32, 0.04, 0.24, 1)";
const EASE_PULL = "cubic-bezier(0.24, 0.58, 0.14, 1)";
const EASE_CLEAR = "cubic-bezier(0.30, 0.46, 0.12, 1)";
const EASE_EXPAND = "cubic-bezier(0.42, 0.06, 0.16, 1)";
const EASE_RESOLVE = "cubic-bezier(0.22, 0.72, 0.20, 1)";

/** Reduced motion: opacity only, gentle, short. */
const CALM_IN_MS = 300;
const CALM_HOLD_MS = 90;
const CALM_OUT_MS = 340;
const EASE_CALM = "cubic-bezier(0.4, 0, 0.2, 1)";

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
  document.body.classList.remove("vault-transitioning--calm");
};

const buildCurtain = (calm: boolean) => {
  removeCurtain();
  const root = document.createElement("div");
  root.className = calm ? `${CURTAIN_CLASS} ${CALM_CLASS}` : CURTAIN_CLASS;
  root.setAttribute("aria-hidden", "true");
  root.innerHTML =
    '<div class="vault-curtain__field"></div>' +
    (calm
      ? ""
      : '<div class="vault-curtain__glow"></div>' +
        '<div class="vault-curtain__ribbon"></div>' +
        '<div class="vault-curtain__handle"><span>&#8593;</span></div>');
  document.body.appendChild(root);
  document.body.classList.add("vault-transitioning");
  if (calm) document.body.classList.add("vault-transitioning--calm");
  return root;
};

/**
 * Reduced-motion opening. Same three beats as the full gesture (cover, swap,
 * reveal) expressed purely as opacity, with no travel, scale, blur or parallax.
 */
const runCalmOpening = (navigate: () => void) => {
  const root = buildCurtain(true);
  const field = root.querySelector(".vault-curtain__field") as HTMLElement;
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    removeCurtain();
  };

  field.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: CALM_IN_MS,
    easing: EASE_CALM,
    fill: "forwards",
  });

  window.setTimeout(() => {
    navigate();
    field.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: CALM_OUT_MS,
      delay: CALM_HOLD_MS,
      easing: EASE_CALM,
      fill: "forwards",
    }).onfinish = finish;
  }, CALM_IN_MS);

  window.setTimeout(finish, CALM_IN_MS + CALM_HOLD_MS + CALM_OUT_MS + 600);
};

/**
 * Runs the canonical opening transition. `navigate` is invoked at the moment
 * the ribbon covers the viewport, so the route swap is never visible.
 */
export const runVaultOpening = (navigate: () => void) => {
  if (typeof document === "undefined") {
    navigate();
    return;
  }
  if (prefersReducedMotion()) {
    runCalmOpening(navigate);
    return;
  }

  const root = buildCurtain(false);
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
    fill: "both",
  });

  // The field arrives early and slowly, so nothing ever snaps into view.
  field.animate(
    [
      { opacity: 0 },
      { opacity: 0.34, offset: 0.34 },
      { opacity: 0.78, offset: 0.68 },
      { opacity: 1 },
    ],
    timing(SETTLE_MS + PULL_MS * 0.9, 0, EASE_LOAD)
  );

  // A bloom of light travels ahead of the handle and fades as it clears.
  glow.animate(
    [
      { transform: "translate3d(0, 0, 0) scale(0.74)", opacity: 0 },
      { transform: "translate3d(0, -14vh, 0) scale(0.92)", opacity: 0.72, offset: 0.2 },
      { transform: "translate3d(0, -44vh, 0) scale(1.06)", opacity: 0.9, offset: 0.46 },
      { transform: "translate3d(0, -86vh, 0) scale(1.18)", opacity: 0.56, offset: 0.78 },
      { transform: "translate3d(0, -126vh, 0) scale(1.28)", opacity: 0 },
    ],
    timing(PULL_MS + CLEAR_MS + PULL_LEAD, 0, EASE_PULL)
  );

  // The handle loads, then is drawn upward in one long, unbroken arc.
  handle.animate(
    [
      { transform: "translate3d(0, 0, 0) scale(0.94)", opacity: 0 },
      { transform: "translate3d(0, -1.6vh, 0) scale(0.98)", opacity: 0.7, offset: 0.6 },
      { transform: "translate3d(0, -4vh, 0) scale(1)", opacity: 1 },
    ],
    timing(SETTLE_MS + 180, 0, EASE_LOAD)
  );
  handle.animate(
    [
      { transform: "translate3d(0, -4vh, 0)" },
      { transform: "translate3d(0, -22vh, 0)", offset: 0.26 },
      { transform: "translate3d(0, -50vh, 0)", offset: 0.56 },
      { transform: "translate3d(0, -70vh, 0)", offset: 0.8 },
      { transform: "translate3d(0, -82vh, 0)" },
    ],
    timing(PULL_MS, PULL_AT, EASE_PULL)
  );
  handle.animate(
    [
      { transform: "translate3d(0, -82vh, 0)", opacity: 1 },
      { transform: "translate3d(0, -96vh, 0)", opacity: 0.74, offset: 0.42 },
      { transform: "translate3d(0, -110vh, 0)", opacity: 0.3, offset: 0.76 },
      { transform: "translate3d(0, -120vh, 0)", opacity: 0 },
    ],
    timing(CLEAR_MS, CLEAR_AT, EASE_CLEAR)
  );

  // The ribbon unrolls beneath the handle, tracking its curve exactly.
  ribbon.animate(
    [
      { clipPath: "inset(100% 0 0 0)" },
      { clipPath: "inset(78% 0 0 0)", offset: 0.26 },
      { clipPath: "inset(50% 0 0 0)", offset: 0.56 },
      { clipPath: "inset(30% 0 0 0)", offset: 0.8 },
      { clipPath: "inset(18% 0 0 0)" },
    ],
    timing(PULL_MS, PULL_AT, EASE_PULL)
  );
  ribbon.animate(
    [
      { clipPath: "inset(18% 0 0 0)" },
      { clipPath: "inset(7% 0 0 0)", offset: 0.46 },
      { clipPath: "inset(0% 0 0 0)" },
    ],
    timing(CLEAR_MS, CLEAR_AT, EASE_CLEAR)
  );

  // The ribbon becomes the environment: a wide, eased lateral opening that
  // starts while the ribbon is still completing, so the two never separate.
  const expand = ribbon.animate(
    [
      { transform: "scaleX(1)" },
      { transform: `scaleX(${(1 + (spread - 1) * 0.14).toFixed(2)})`, offset: 0.28 },
      { transform: `scaleX(${(1 + (spread - 1) * 0.52).toFixed(2)})`, offset: 0.62 },
      { transform: `scaleX(${(1 + (spread - 1) * 0.88).toFixed(2)})`, offset: 0.85 },
      { transform: `scaleX(${spread})` },
    ],
    timing(EXPAND_MS, EXPAND_AT, EASE_EXPAND)
  );

  // The route swaps behind full cover, then the field resolves away slowly.
  window.setTimeout(() => {
    navigate();
    root.animate(
      [
        { opacity: 1, filter: "blur(0px)" },
        { opacity: 0.78, filter: "blur(1.4px)", offset: 0.32 },
        { opacity: 0.36, filter: "blur(3.6px)", offset: 0.66 },
        { opacity: 0, filter: "blur(8px)" },
      ],
      {
        duration: RESOLVE_MS,
        delay: EXPAND_MS * 0.6,
        easing: EASE_RESOLVE,
        fill: "forwards",
      }
    ).onfinish = finish;
  }, EXPAND_AT + EXPAND_MS * 0.4);

  expand.oncancel = finish;

  // Safety net: never trap the interface behind the curtain.
  window.setTimeout(finish, EXPAND_AT + EXPAND_MS + RESOLVE_MS + 900);
};

/** Called by the destination in case a curtain was orphaned. */
export const clearVaultCurtain = () => {
  if (!document.querySelector(`.${CURTAIN_CLASS}`)) {
    document.body.classList.remove("vault-transitioning");
    document.body.classList.remove("vault-transitioning--calm");
  }
};
