import { useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import regularFont from "@/assets/fonts/opening-cormorant-normal-400.ttf.asset.json";
import boldFont from "@/assets/fonts/opening-cormorant-normal-700.ttf.asset.json";
import italicFont from "@/assets/fonts/opening-cormorant-italic-400.ttf.asset.json";
import "./opening.css";

let openingSeen = false;
let brandFonts: Promise<void> | undefined;
const hasOpened = () => {
  if (openingSeen) return true;
  try { return Boolean(sessionStorage.getItem("bf-preloaded")); } catch { return false; }
};
const loadBrandFonts = () => {
  if (!brandFonts) {
    brandFonts = Promise.all([
      [regularFont.url, "400", "normal"],
      [boldFont.url, "700", "normal"],
      [italicFont.url, "400", "italic"],
    ].map(async ([url, weight, style]) => {
      const face = new FontFace("BF Opening Cormorant", `url(${url})`, { weight, style });
      document.fonts.add(await face.load());
    })).then(() => {});
  }
  return brandFonts;
};

const Brand = () => (
  <div className="bf-opening-brand">
    <div className="bf-opening-line-mask">
      <p className="bf-opening-name">BITWELLFORGE</p>
    </div>
    <div className="bf-opening-line-mask">
      <p className="bf-opening-tagline">The business of <em>better.</em></p>
    </div>
  </div>
);

export default function HomePreloader({ onDone }: { images: string[]; headline: string; onDone: () => void }) {
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const done = useRef(onDone);
  done.current = onDone;
  const [show, setShow] = useState(() => !hasOpened() && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useLayoutEffect(() => {
    if (!show || reduced) { setShow(false); done.current(); return; }
    const element = root.current;
    if (!element) return;
    let active = true;
    let finished = false;
    const animations: Animation[] = [];
    const timers = new Map<number, () => void>();
    const html = document.documentElement;
    html.setAttribute("data-bf-opening", "");
    window.dispatchEvent(new Event("bf-opening-change"));
    const unlock = () => {
      html.removeAttribute("data-bf-opening");
      window.dispatchEvent(new Event("bf-opening-change"));
    };
    const finish = () => {
      if (!active || finished) return;
      finished = true;
      animations.forEach(animation => animation.cancel());
      openingSeen = true;
      try { sessionStorage.setItem("bf-preloaded", "1"); } catch { /* memory fallback */ }
      unlock();
      setShow(false);
      done.current();
    };
    const wait = (ms: number) => new Promise<void>(resolve => {
      const timer = window.setTimeout(() => { timers.delete(timer); resolve(); }, ms);
      timers.set(timer, resolve);
    });
    const animate = (target: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => {
      const animation = target.animate(frames, { fill: "both", easing: "cubic-bezier(0.22,1,0.36,1)", ...options });
      animations.push(animation);
      return animation.finished.catch(() => {});
    };
    // Fit only when a narrow viewport needs it. Never scale a composited text bitmap.
    const fit = () => {
      element.querySelectorAll<HTMLElement>(".bf-opening-brand").forEach(brand => {
        brand.style.removeProperty("--bf-brand-fit");
        const name = brand.querySelector<HTMLElement>(".bf-opening-name");
        if (name && name.scrollWidth > brand.clientWidth) {
          const size = parseFloat(getComputedStyle(name).fontSize);
          brand.style.setProperty("--bf-brand-fit", `${size * brand.clientWidth / name.scrollWidth}px`);
        }
      });
    };
    const resize = new ResizeObserver(fit);
    resize.observe(element);
    const run = async () => {
      // No fallback-font flash, no indefinite wait. Failed fonts bypass the intro.
      const ready = await Promise.race([loadBrandFonts().then(() => true).catch(() => false), wait(1400).then(() => false)]);
      if (!active || finished) return;
      if (!ready) { finish(); return; }
      fit();
      element.dataset.phase = "brand";
      const light = element.querySelector(".bf-opening-light");
      const navy = element.querySelector(".bf-opening-navy");
      const navyBackground = element.querySelector(".bf-opening-navy-background");
      if (!light || !navy || !navyBackground) { finish(); return; }
      await Promise.all(Array.from(light.querySelectorAll("p")).map((line, i) => animate(line,
        [{ transform: "translateY(115%)" }, { transform: "translateY(0)" }],
        { duration: 650, delay: i * 180 })));
      await wait(500);
      if (!active || finished) return;
      element.dataset.phase = "navy";
      // Only the empty background expands. The typography remains at native resolution.
      void animate(navyBackground, [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], { duration: 750 });
      await animate(navy, [{ opacity: 0 }, { opacity: 1 }], { duration: 380, delay: 240 });
      await wait(500);
      if (!active || finished) return;
      // Decode the actual homepage hero, never enlarge a 640px preview or distort its crop.
      const heroImage = document.querySelector<HTMLImageElement>("[data-opening-hero] img");
      if (heroImage) await Promise.race([heroImage.decode().catch(() => {}), wait(350)]);
      if (!active || finished) return;
      element.dataset.phase = "handoff";
      await animate(element, [{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }],
        { duration: 900, easing: "cubic-bezier(0.76,0,0.24,1)" });
      finish();
    };
    const guard = window.setTimeout(finish, 6000);
    void run().catch(finish);
    return () => {
      active = false;
      clearTimeout(guard);
      resize.disconnect();
      timers.forEach((resolve, timer) => { clearTimeout(timer); resolve(); });
      timers.clear();
      animations.forEach(animation => animation.cancel());
      unlock();
    };
  }, [show, reduced]);

  if (!show || reduced) return null;
  return (
    <div ref={root} data-visual-loading-exempt data-phase="preparing" className="bf-opening" aria-hidden="true">
      <div className="bf-opening-light"><Brand /></div>
      <div className="bf-opening-navy-background" />
      <div className="bf-opening-navy"><Brand /></div>
    </div>
  );
}