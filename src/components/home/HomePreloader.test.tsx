import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HomePreloader from "./HomePreloader";

vi.mock("framer-motion", () => ({ useReducedMotion: () => false }));

let root: Root | undefined;
const render = (element: React.ReactNode) => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const current = createRoot(container);
  root = current;
  act(() => current.render(element));
  return { unmount: () => act(() => current.unmount()) };
};

describe("opening lifecycle", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.useFakeTimers();
    Object.defineProperty(document, "fonts", { configurable: true, value: { ready: new Promise(() => {}) } });
  });
  afterEach(() => {
    act(() => root?.unmount());
    root = undefined;
    document.body.replaceChildren();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });
  it("does not replay on cached session visits", () => {
    sessionStorage.setItem("bf-preloaded", "1");
    const done = vi.fn();
    render(<HomePreloader images={[]} headline="Structure Compounds Growth" onDone={done} />);
    expect(done).toHaveBeenCalledTimes(1);
    expect(document.documentElement.hasAttribute("data-bf-opening")).toBe(false);
  });
  it("bypasses the opening for reduced-motion visitors", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({ matches: true } as MediaQueryList);
    const done = vi.fn();
    render(<HomePreloader images={[]} headline="Structure Compounds Growth" onDone={done} />);
    expect(done).toHaveBeenCalledTimes(1);
    expect(document.documentElement.hasAttribute("data-bf-opening")).toBe(false);
  });
  it("releases the scroll lock and timers on interrupted navigation", () => {
    const done = vi.fn();
    const view = render(<HomePreloader images={[]} headline="Structure Compounds Growth" onDone={done} />);
    expect(document.documentElement.hasAttribute("data-bf-opening")).toBe(true);
    view.unmount();
    expect(document.documentElement.hasAttribute("data-bf-opening")).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
    expect(done).not.toHaveBeenCalled();
  });
});