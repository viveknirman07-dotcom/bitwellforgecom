import { useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import "./opening.css";

// Observed reference: 450ms character rise over a 750ms stagger, then
// 1100ms outward text movement with six overlapping center-out image masks.
const IMAGE_STARTS = [0, 250, 530, 680, 940, 1240];
const IMAGE_DURATIONS = [350, 450, 300, 500, 550, 600];
let openingSeen = false;
const hasOpened = () => {
  if (openingSeen) return true;
  try { return Boolean(sessionStorage.getItem("bf-preloaded")); } catch { return false; }
};

export default function HomePreloader({ images, headline, onDone }: { images: string[]; headline: string; onDone: () => void }) {
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
    const animations: Animation[] = [];
    const timers = new Set<number>();
    const html = document.documentElement;
    html.setAttribute("data-bf-opening", "");
    window.dispatchEvent(new Event("bf-opening-change"));
    const unlock = () => {
      html.removeAttribute("data-bf-opening");
      window.dispatchEvent(new Event("bf-opening-change"));
    };
    const finish = () => {
      if (!active) return;
      openingSeen = true;
      try { sessionStorage.setItem("bf-preloaded", "1"); } catch { /* memory fallback */ }
      unlock();
      setShow(false);
      done.current();
    };
    const wait = (ms: number) => new Promise<void>((resolve) => {
      const timer = window.setTimeout(() => { timers.delete(timer); resolve(); }, ms);
      timers.add(timer);
    });
    const animate = (target: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => {
      const animation = target.animate(frames, { fill: "both", ...options });
      animations.push(animation);
      return animation.finished.catch(() => {});
    };
    const run = async () => {
      const imgs = Array.from(element.querySelectorAll("img"));
      // Never hold visitors hostage to a slow or failed image/font request.
      await Promise.race([Promise.all([document.fonts.ready, ...imgs.map(img => img.decode().catch(() => {}))]), wait(900)]);
      if (!active) return;
      element.dataset.phase = "letters";
      const letters = Array.from(element.querySelectorAll(".bf-opening-letter"));
      await Promise.all(letters.map((letter, i) => animate(letter,
        [{ transform: "translateY(110%)" }, { transform: "translateY(0)" }],
        { duration: 450, delay: letters.length > 1 ? i * 750 / (letters.length - 1) : 0, easing: "cubic-bezier(0.215,0.61,0.355,1)" }))));
      await wait(100);
      if (!active) return;
      element.dataset.phase = "images";
      const title = element.querySelector(".bf-opening-title-mask");
      if (title) {
        title.classList.remove("bf-opening-title-mask");
        void animate(title, [{ transform: "translateY(0)" }, { transform: `translateY(${-Math.max(0, element.clientHeight / 2 - title.clientHeight / 2 - 40)}px)` }], { duration: 1100, easing: "cubic-bezier(0.25,0.46,0.45,0.94)" });
      }
      const frames = Array.from(element.querySelectorAll<HTMLElement>(".bf-opening-frame"));
      await Promise.all(frames.map((frame, i) => {
        const img = imgs[i];
        if (!img?.naturalWidth) return wait(IMAGE_STARTS[i] + IMAGE_DURATIONS[i]);
        // Transform-only crop expansion; inverse image scaling prevents stretching.
        const maskFrames: Keyframe[] = [], imageFrames: Keyframe[] = [];
        for (let step = 0; step <= 60; step++) {
          const t = step / 60;
          const scale = Math.max(.001, 1 - Math.pow(1 - t, 3));
          maskFrames.push({ offset: t, transform: `scale(${scale})` });
          imageFrames.push({ offset: t, transform: `scale(${(1 + .2 * (1 - scale)) / scale})` });
        }
        const options = { duration: IMAGE_DURATIONS[i], delay: IMAGE_STARTS[i] };
        void animate(img, imageFrames, options);
        return animate(frame, maskFrames, options);
      }));
      if (!active) return;
      const hero = document.querySelector<HTMLElement>("[data-opening-hero]");
      const final = frames[5];
      element.dataset.phase = "handoff";
      frames.slice(0, 5).forEach(frame => { frame.hidden = true; });
      element.querySelector(".bf-opening-title")?.setAttribute("hidden", "");
      if (hero && final && imgs[5]?.naturalWidth) {
        const rect = hero.getBoundingClientRect();
        // Connect the full-viewport last image to the unchanged hero's real box.
        await animate(final, [
          { transform: "translate(0,0) scale(1)", opacity: 1 },
          { transform: `translate(${rect.left + rect.width / 2 - element.clientWidth / 2}px,${rect.top + rect.height / 2 - element.clientHeight / 2}px) scale(${rect.width / element.clientWidth},${rect.height / element.clientHeight})`, opacity: 1, offset: .8 },
          { transform: `translate(${rect.left + rect.width / 2 - element.clientWidth / 2}px,${rect.top + rect.height / 2 - element.clientHeight / 2}px) scale(${rect.width / element.clientWidth},${rect.height / element.clientHeight})`, opacity: 0 },
        ], { duration: 600, easing: "cubic-bezier(0.65,0,0.35,1)" });
      }
      finish();
    };
    const guard = window.setTimeout(finish, 6000);
    void run().catch(finish);
    return () => {
      active = false;
      clearTimeout(guard);
      timers.forEach(clearTimeout);
      animations.forEach(animation => animation.cancel());
      unlock();
    };
  }, [show, reduced]);

  if (!show || reduced) return null;
  return (
    <div ref={root} data-visual-loading-exempt data-phase="preparing" className="bf-opening" aria-hidden="true">
      <p className="bf-opening-title bf-preloader-tagline font-heading font-normal leading-[0.91]" aria-label={headline}>
        <span className="bf-opening-title-mask">{Array.from(headline).map((char, i) => <span key={i} className="bf-opening-letter">{char === " " ? "\u00a0" : char}</span>)}</span>
      </p>
      {images.slice(0, 6).map((src, i) => (
        <div key={src} className={`bf-opening-frame bf-opening-frame-${i}`}>
          <img src={src} alt="" decoding="async" fetchPriority={i === 0 ? "high" : "low"} />
        </div>
      ))}
    </div>
  );
}
