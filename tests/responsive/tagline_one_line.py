"""Responsive check: the homepage tagline stays on one line, unclipped, with no horizontal scrolling.

Run with the dev server up:  python3 tests/responsive/tagline_one_line.py [base_url]
Exits non zero when any viewport fails.
"""
import asyncio
import sys
from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8080"
TAGLINE = "Structure Compounds Growth."
VIEWPORTS = [(280, 640), (320, 640), (360, 780), (375, 812), (393, 852), (430, 932),
             (768, 1024), (834, 1194), (1024, 1366), (1280, 800), (1440, 900), (1920, 1080)]

CHECK = """(text) => {
  const h1 = document.querySelector('h1[aria-label]');
  if (!h1) return { error: 'tagline h1 not found' };
  const r = h1.getBoundingClientRect();
  const words = [...h1.querySelectorAll('span > span')].map(s => s.getBoundingClientRect());
  const tops = new Set(words.map(w => Math.round(w.top)));
  const right = Math.max(...words.map(w => w.right));
  const left = Math.min(...words.map(w => w.left));
  const doc = document.documentElement;
  return {
    label: h1.getAttribute('aria-label'),
    lines: tops.size,
    overflowX: doc.scrollWidth - doc.clientWidth,
    clipped: left < -0.5 || right > doc.clientWidth + 0.5 || h1.scrollWidth > Math.ceil(r.width) + 1,
  };
}"""


async def main() -> int:
    failures = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        for w, h in VIEWPORTS:
            ctx = await browser.new_context(viewport={"width": w, "height": h})
            page = await ctx.new_page()
            await page.goto(BASE, wait_until="domcontentloaded")
            await page.evaluate("sessionStorage.setItem('bf-preloaded','1')")
            await page.goto(BASE, wait_until="networkidle")
            await page.evaluate("document.fonts.ready")
            await page.wait_for_timeout(1500)
            res = await page.evaluate(CHECK, TAGLINE)
            ok = (not res.get("error") and res["label"] == TAGLINE and res["lines"] == 1
                  and res["overflowX"] <= 0 and not res["clipped"])
            print(f"{'PASS' if ok else 'FAIL'} {w}x{h} {res}")
            if not ok:
                failures.append(w)
            await ctx.close()
        await browser.close()
    if failures:
        print("Failed widths:", failures)
        return 1
    print("All viewports passed")
    return 0


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
