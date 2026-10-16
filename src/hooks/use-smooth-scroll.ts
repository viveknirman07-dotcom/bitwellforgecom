import { useEffect } from "react";
import Lenis from "lenis";

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      infinite: false,
    });

    const syncOpening = () => {
      if (document.documentElement.hasAttribute("data-bf-opening")) lenis.stop();
      else lenis.start();
    };
    window.addEventListener("bf-opening-change", syncOpening);
    syncOpening();
    let frame: number;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("bf-opening-change", syncOpening);
      lenis.destroy();
    };
  }, []);
}
