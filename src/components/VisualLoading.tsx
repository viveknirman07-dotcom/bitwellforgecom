import { useLayoutEffect } from "react";

/** Reveal each image only after the browser has decoded its current source. */
export default function VisualLoading() {
  useLayoutEffect(() => {
    const pending = new WeakMap<HTMLImageElement, number>();
    let sequence = 0;

    const prepare = (image: HTMLImageElement) => {
      // The opening sequence has its own timed opacity choreography.
      if (image.closest("[data-visual-loading-exempt]")) return;

      const token = ++sequence;
      pending.set(image, token);
      image.classList.remove("bf-media-ready");

      const reveal = () => {
        if (pending.get(image) !== token || !image.isConnected) return;
        image.classList.add("bf-media-ready");
      };

      // Cached images are available immediately; never wait for another load event.
      if (image.complete) {
        if (image.naturalWidth === 0) { reveal(); return; }
        image.decode?.().then(reveal, reveal) ?? reveal();
      }
    };

    const onLoad = (event: Event) => {
      const image = event.target;
      if (!(image instanceof HTMLImageElement) || image.closest("[data-visual-loading-exempt]")) return;
      const token = pending.get(image);
      if (token === undefined) { prepare(image); return; }
      const reveal = () => {
        if (pending.get(image) !== token || !image.isConnected) return;
        image.classList.add("bf-media-ready");
      };
      image.decode?.().then(reveal, reveal) ?? reveal();
    };

    const onError = (event: Event) => {
      const image = event.target;
      if (image instanceof HTMLImageElement) {
        image.classList.add("bf-media-ready");
      }
    };

    document.querySelectorAll("img").forEach(prepare);
    const observer = new MutationObserver((changes) => {
      for (const change of changes) {
        if (change.type === "attributes") {
          if (change.target instanceof HTMLImageElement) prepare(change.target);
          continue;
        }
        change.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node instanceof HTMLImageElement) prepare(node);
          node.querySelectorAll("img").forEach(prepare);
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["src", "srcset", "sizes"] });
    document.addEventListener("load", onLoad, true);
    document.addEventListener("error", onError, true);
    return () => {
      observer.disconnect();
      document.removeEventListener("load", onLoad, true);
      document.removeEventListener("error", onError, true);
    };
  }, []);

  return null;
}