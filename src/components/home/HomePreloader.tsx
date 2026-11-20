import { useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import "./opening.css";

// Standalone brand opening, mounted once at the app root (not inside the homepage).
// Timeline: 650ms rise-in, 900ms hold, 350ms text fade-out, 450ms screen fade-out.
let openingSeen = false;
const hasOpened = () => {
  if (openingSeen) return true;
  try { return Boolean(sessionStorage.getItem("bf-preloaded")); } catch { return false; }
};

export default function HomePreloader({ headline = "The business of better.", onDone }: { images?: string[]; headline?: string; onDone?: () => void }) {
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const done = useRef(onDone);
  done.current = onDone;
  const [show, setShow] = useState(() => !hasOpened() && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useLayoutEffect(() => {
    if (!show || reduced) { setShow(false); done.current?.(); return; }
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
      active = false;
      openingSeen = true;
      try { sessionStorage.setItem("bf-preloaded", "1"); } catch { /* memory fallback */ }
      unlock();
      setShow(false);
      done.current?.();
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
      // Never hold visitors on a slow font request.
      await Promise.race([document.fonts.ready, wait(900)]);
      if (!active) return;
      const title = element.querySelector(".bf-opening-title");
      if (!title) return finish();
      await animate(title, [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 650, easing: "cubic-bezier(0.22,1,0.36,1)" });
      await wait(900);
      if (!active) return;
      await animate(title, [{ opacity: 1 }, { opacity: 0 }], { duration: 350, easing: "ease-in-out" });
      if (!active) return;
      element.style.pointerEvents = "none";
      await animate(element, [{ opacity: 1 }, { opacity: 0 }], { duration: 450, easing: "ease-out" });
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
    <div ref={root} data-visual-loading-exempt className="bf-opening" aria-hidden="true">
      <div className="bf-opening-title" aria-label={headline}>
        <span className="bf-opening-strong">The business</span>{" "}
        <span className="bf-opening-italic">of better.</span>
      </div>
    </div>
  );
}
