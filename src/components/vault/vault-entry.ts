/**
 * Forge Vault opening transition.
 *
 * Implementation of the VERTICAL_PULL_RIBBON_OPENING_TRANSITION specification.
 * Every non-colour parameter (geometry, coordinates, timeline milestones,
 * easing, masking, scaling, cleanup) follows the spec verbatim; only the
 * colour system is the Forge Vault gold / black / warm-white palette, which
 * lives in index.css and adapts to the active theme.
 *
 * Total duration: 1150ms.
 *   0ms    REST_ORIGIN               puck at calc(100vh - 120px), mask 100%
 *   90ms   KINETIC_LAUNCH            puck 82vh, mask 82%, squash 0.98 / 1.04
 *   320ms  MAXIMUM_VELOCITY_CRUISE   puck 44vh, mask 44%, squash 0.99 / 1.02
 *   680ms  HIGH_DECELERATION_ZONE    puck 8vh,  mask 8%
 *   860ms  TOP_BOUNDARY_CLEARED      puck -150px, mask 0%, full 100vh column
 *   960ms  EXPANSION_INITIATION      puck -180px, ribbon scaleX(100vw / 112px)
 *   1150ms TERMINAL_STATE_RESOLUTION overlay alpha 0, overlay removed
 *
 * A reduced-motion variant runs the same three beats (cover, swap, reveal)
 * purely as opacity, with no travel, scale, blur or parallax.
 */
const INTENT_KEY = "bwf:vault-intent";
const CURTAIN_CLASS = "vault-curtain";
const CALM_CLASS = "vault-curtain--calm";

/** Spec: total_animation_duration_ms */
const TOTAL_MS = 1150;

/** Spec keyframe timestamps. */
const T_LAUNCH = 90;
const T_CRUISE = 320;
const T_DECEL = 680;
const T_CLEARED = 860;
const T_EXPAND = 960;

/** Spec: puck / ribbon geometry. */
const PUCK_PX = 112;
const RIBBON_PX = 112;

/** Spec: primary_ascent_curve. */
const EASE_ASCENT = "cubic-bezier(0.18, 1, 0.28, 1)";
/** Spec: gsap power2.inOut for the lateral expansion. */
const EASE_EXPAND = "cubic-bezier(0.45, 0, 0.55, 1)";

/** Time at which the destination is fully covered (route swap point). */
export const COVER_MS = T_CLEARED;

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

const ARROW_SVG =
  "<svg class='vault-curtain__arrow' viewBox='0 0 42 42' fill='none' xmlns='http://www.w3.org/2000/svg'>" +
  "<path d='M21 32V10M21 10L10 21M21 10L32 21' stroke='#C6A15B' stroke-width='3.2' " +
  "stroke-linecap='round' stroke-linejoin='round'/></svg>";

const buildCurtain = (calm: boolean) => {
  removeCurtain();
  const root = document.createElement("div");
  root.className = calm
    ? `${CURTAIN_CLASS} motion-viewport-overlay ${CALM_CLASS}`
    : `${CURTAIN_CLASS} motion-viewport-overlay`;
  root.setAttribute("aria-hidden", "true");
  root.innerHTML =
    '<div class="vault-curtain__field"></div>' +
    (calm
      ? ""
      : '<div class="vault-curtain__glow"></div>' +
        '<div class="vault-curtain__ribbon"></div>' +
        '<div class="vault-curtain__handle">' +
        '<span class="vault-curtain__notch"></span>' +
        ARROW_SVG +
        "</div>");
  document.body.appendChild(root);
  document.body.classList.add("vault-transitioning");
  if (calm) document.body.classList.add("vault-transitioning--calm");
  return root;
};

/**
 * Reduced-motion opening. Same three beats as the full gesture (cover, swap,
 * reveal) expressed purely as opacity.
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
 * Runs the canonical opening transition. `navigate` is invoked at
 * TOP_BOUNDARY_CLEARED (t = 860ms), when the ribbon covers the viewport, so
 * the route swap is never visible.
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
  const puck = root.querySelector(".vault-curtain__handle") as HTMLElement;

  const vh = window.innerHeight;
  const vw = window.innerWidth;
  /** Spec: exact 1:1 coupling between puck diameter and ribbon width. */
  const width = RIBBON_PX;
  const spread = vw / width;
  let done = false;

  const finish = () => {
    if (done) return;
    done = true;
    removeCurtain();
  };

  /** Spec Y positions, resolved against the live viewport. */
  const y0 = vh - 120;
  const y90 = vh * 0.82;
  const y320 = vh * 0.44;
  const y680 = vh * 0.08;
  const y860 = -150;
  const y960 = -180;

  const at = (ms: number) => ms / TOTAL_MS;

  /**
   * The puck: strict upward travel on the horizontal centreline, zero X
   * displacement, with the specified squash / stretch matrix at each
   * milestone. Each segment carries the primary ascent curve.
   */
  puck.animate(
    [
      { offset: 0, transform: `translate3d(0, ${y0}px, 0) scale(1, 1)`, easing: EASE_ASCENT },
      {
        offset: at(T_LAUNCH),
        transform: `translate3d(0, ${y90}px, 0) scale(0.98, 1.04)`,
        easing: EASE_ASCENT,
      },
      {
        offset: at(T_CRUISE),
        transform: `translate3d(0, ${y320}px, 0) scale(0.99, 1.02)`,
        easing: EASE_ASCENT,
      },
      {
        offset: at(T_DECEL),
        transform: `translate3d(0, ${y680}px, 0) scale(1, 1)`,
        easing: EASE_ASCENT,
      },
      {
        offset: at(T_CLEARED),
        transform: `translate3d(0, ${y860}px, 0) scale(1, 1)`,
        easing: EASE_ASCENT,
      },
      { offset: at(T_EXPAND), transform: `translate3d(0, ${y960}px, 0) scale(1, 1)` },
      { offset: 1, transform: `translate3d(0, ${y960}px, 0) scale(1, 1)` },
    ],
    { duration: TOTAL_MS, fill: "both" }
  );

  /**
   * The ribbon mask: the top edge tracks the puck's equator exactly, so the
   * junction never separates and the column unrolls in step with the pull.
   */
  ribbon.animate(
    [
      { offset: 0, clipPath: "inset(100% 0 0 0)", easing: EASE_ASCENT },
      { offset: at(T_LAUNCH), clipPath: "inset(82% 0 0 0)", easing: EASE_ASCENT },
      { offset: at(T_CRUISE), clipPath: "inset(44% 0 0 0)", easing: EASE_ASCENT },
      { offset: at(T_DECEL), clipPath: "inset(8% 0 0 0)", easing: EASE_ASCENT },
      { offset: at(T_CLEARED), clipPath: "inset(0% 0 0 0)" },
      { offset: 1, clipPath: "inset(0% 0 0 0)" },
    ],
    { duration: TOTAL_MS, fill: "both" }
  );

  /** Lateral expansion: t = 860ms, duration 240ms, power2.inOut. */
  const expand = ribbon.animate(
    [{ transform: "scaleX(1)" }, { transform: `scaleX(${spread})` }],
    { duration: 240, delay: T_CLEARED, easing: EASE_EXPAND, fill: "both", composite: "add" }
  );

  /** Gold bloom travelling ahead of the puck, resolving as it clears. */
  glow.animate(
    [
      { transform: "translate3d(0, 0, 0) scale(0.74)", opacity: 0 },
      { transform: "translate3d(0, -44vh, 0) scale(1.06)", opacity: 0.85, offset: 0.46 },
      { transform: "translate3d(0, -126vh, 0) scale(1.28)", opacity: 0 },
    ],
    { duration: T_CLEARED, easing: EASE_ASCENT, fill: "both" }
  );

  /** Background alpha: 1.0 through 900ms, then linear to 0 by 1150ms. */
  field.animate(
    [
      { offset: 0, opacity: 1, easing: "linear" },
      { offset: 900 / TOTAL_MS, opacity: 1, easing: "linear" },
      { offset: 1, opacity: 0 },
    ],
    { duration: TOTAL_MS, fill: "both" }
  );

  /** Overlay resolution: t = 970ms, duration 180ms, linear. */
  const resolve = root.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 180,
    delay: 970,
    easing: "linear",
    fill: "forwards",
  });
  resolve.onfinish = finish;
  resolve.oncancel = finish;
  expand.oncancel = finish;

  /** Route swap behind full cover. */
  window.setTimeout(navigate, T_CLEARED);

  /** Interaction hand-off: pointer events restored the moment the overlay goes. */
  window.setTimeout(() => {
    root.style.pointerEvents = "none";
  }, TOTAL_MS);

  /** Safety net: never trap the interface behind the overlay. */
  window.setTimeout(finish, TOTAL_MS + 600);
};

/** Called by the destination in case an overlay was orphaned. */
export const clearVaultCurtain = () => {
  if (!document.querySelector(`.${CURTAIN_CLASS}`)) {
    document.body.classList.remove("vault-transitioning");
    document.body.classList.remove("vault-transitioning--calm");
  }
};
