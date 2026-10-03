import { useEffect, useState } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("bwf-theme");
    if (stored) return stored === "dark";
    return false; // ice blue light theme by default
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("bwf-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("bwf-theme", "light");
    }
  }, [isDark]);

  return { isDark, toggle: () => setIsDark((v) => !v) };
}
