/**
 * Density generator.
 *
 * The BitwellForge UI is written with Tailwind utilities (including arbitrary
 * pixel values). To recalibrate the site's real dimensions per viewport
 * category, without any transform scaling or wrapper trickery, this script
 * scans the source for the spacing and type utilities actually in use and
 * emits recalculated declarations for three viewport bands:
 *
 *   mobile  (<= 767px)   ~85% of the original visual scale
 *   tablet  (768-1023px) ~95%
 *   desktop (>= 1024px)  ~95%
 *
 * Output: src/styles/density.css (imported at the end of index.css so the
 * recalibrated values win over the generated Tailwind utilities).
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const SRC = "src";

const files: string[] = [];
const walk = (dir: string) => {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx|ts)$/.test(p)) files.push(p);
  }
};
walk(SRC);
const source = files.map((f) => readFileSync(f, "utf8")).join("\n");

/** Tailwind default spacing scale (rem) for the keys we care about. */
const SPACING: Record<string, number> = {
  "0.5": 0.125, "1": 0.25, "1.5": 0.375, "2": 0.5, "2.5": 0.625, "3": 0.75,
  "3.5": 0.875, "4": 1, "5": 1.25, "6": 1.5, "7": 1.75, "8": 2, "9": 2.25,
  "10": 2.5, "11": 2.75, "12": 3, "14": 3.5, "16": 4, "20": 5, "24": 6,
  "28": 7, "32": 8, "36": 9, "40": 10, "44": 11, "48": 12, "52": 13,
  "56": 14, "60": 15, "64": 16, "72": 18, "80": 20, "96": 24,
};

const PROPS: Record<string, string[]> = {
  p: ["padding"],
  px: ["padding-left", "padding-right"],
  py: ["padding-top", "padding-bottom"],
  pt: ["padding-top"],
  pb: ["padding-bottom"],
  pl: ["padding-left"],
  pr: ["padding-right"],
  m: ["margin"],
  mx: ["margin-left", "margin-right"],
  my: ["margin-top", "margin-bottom"],
  mt: ["margin-top"],
  mb: ["margin-bottom"],
  ml: ["margin-left"],
  mr: ["margin-right"],
  gap: ["gap"],
  "gap-x": ["column-gap"],
  "gap-y": ["row-gap"],
};

type Band = { name: string; min?: number; max?: number; type: number; space: number };

const BANDS: Band[] = [
  { name: "mobile", max: 767, type: 0.85, space: 0.85 },
  { name: "tablet", min: 768, max: 1023, type: 0.95, space: 0.95 },
  { name: "desktop", min: 1024, type: 0.95, space: 0.95 },
];

const VARIANTS: Record<string, number> = { base: 0, sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 };

const esc = (cls: string) =>
  "." + cls.replace(/([:[\]().%/])/g, "\\$1");

const round = (n: number) => Math.round(n * 100) / 100;

/** Type scale keeps copy comfortable: body never drops below 13px, labels 10px. */
const scaleType = (px: number, factor: number) => {
  const raw = px * factor;
  const floor = px >= 15 ? 13 : px >= 14 ? 12.5 : 10;
  return round(Math.max(raw, Math.min(px, floor)));
};

const media = (variantMin: number, band: Band) => {
  const min = Math.max(variantMin, band.min ?? 0);
  const max = band.max;
  if (max !== undefined && min > max) return null; // variant never active in this band
  const parts: string[] = [];
  if (min > 0) parts.push(`(min-width: ${min}px)`);
  if (max !== undefined) parts.push(`(max-width: ${max}px)`);
  return parts.length ? `@media ${parts.join(" and ")}` : null;
};

const blocks: string[] = [];

for (const band of BANDS) {
  for (const [variant, variantMin] of Object.entries(VARIANTS)) {
    const prefix = variant === "base" ? "" : `${variant}:`;
    const rules: string[] = [];

    // --- arbitrary pixel font sizes: text-[17px], md:text-[58px] ---
    const typeRe = new RegExp(`(?<![\\w:-])${variant === "base" ? "" : variant + ":"}text-\\[(\\d+(?:\\.\\d+)?)px\\]`, "g");
    const seenType = new Set<string>();
    for (const m of source.matchAll(typeRe)) {
      const px = parseFloat(m[1]);
      if (seenType.has(m[1])) continue;
      seenType.add(m[1]);
      const next = scaleType(px, band.type);
      if (next === px) continue;
      rules.push(`${esc(`${prefix}text-[${m[1]}px]`)}{font-size:${next}px}`);
    }

    // --- spacing utilities ---
    for (const [util, props] of Object.entries(PROPS)) {
      const re = new RegExp(`(?<![\\w:-])${prefix.replace(":", ":")}${util}-(\\d+(?:\\.\\d+)?)(?![\\w.[-])`, "g");
      const seen = new Set<string>();
      for (const m of source.matchAll(re)) {
        const key = m[1];
        if (seen.has(key)) continue;
        seen.add(key);
        const rem = SPACING[key];
        if (rem === undefined) continue;
        const next = round(rem * band.space * 1000) / 1000;
        rules.push(
          `${esc(`${prefix}${util}-${key}`)}{${props.map((p) => `${p}:${round(next * 1000) / 1000}rem`).join(";")}}`
        );
      }
      // space-y / space-x need the child selector form
      if (util === "gap-y" || util === "gap-x") continue;
    }

    for (const axis of ["y", "x"] as const) {
      const re = new RegExp(`(?<![\\w:-])${prefix}space-${axis}-(\\d+(?:\\.\\d+)?)(?![\\w.[-])`, "g");
      const seen = new Set<string>();
      for (const m of source.matchAll(re)) {
        const key = m[1];
        if (seen.has(key)) continue;
        seen.add(key);
        const rem = SPACING[key];
        if (rem === undefined) continue;
        const next = round(rem * band.space * 1000) / 1000;
        const sel = esc(`${prefix}space-${axis}-${key}`) + " > :not([hidden]) ~ :not([hidden])";
        rules.push(
          axis === "y"
            ? `${sel}{margin-top:calc(${next}rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(${next}rem * var(--tw-space-y-reverse))}`
            : `${sel}{margin-right:calc(${next}rem * var(--tw-space-x-reverse));margin-left:calc(${next}rem * calc(1 - var(--tw-space-x-reverse)))}`
        );
      }
    }

    if (!rules.length) continue;
    const mq = media(variantMin, band);
    const body = rules.join("\n  ");
    blocks.push(mq ? `${mq}{\n  ${body}\n}` : body);
  }
}

const out = `/* AUTO-GENERATED by scripts/generate-density.ts — do not edit by hand. */\n\n${blocks.join("\n\n")}\n`;
mkdirSync("src/styles", { recursive: true });
writeFileSync("src/styles/density.css", out);
console.log(`density.css written (${out.length} bytes)`);
