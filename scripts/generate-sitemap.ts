// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://www.bitwellforge.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const matchAll = (file: string, pattern: RegExp) => {
  const source = readFileSync(resolve(file), "utf8");
  return [...source.matchAll(pattern)].map((m) => m[1]);
};

const articleSlugs = matchAll("src/pages/Insights.tsx", /slug:\s*"([^"]+)"/g);
const caseStudyIds = matchAll("src/lib/case-studies-data.ts", /^\s{4}id:\s*"([^"]+)"/gm);
const serviceSlugs = matchAll("src/data/services.ts", /^\s{2}"([a-z0-9-]+)":\s*\{/gm);

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/case-studies", changefreq: "monthly", priority: "0.8" },
  { path: "/process", changefreq: "monthly", priority: "0.7" },
  { path: "/insights", changefreq: "weekly", priority: "0.8" },
  { path: "/careers", changefreq: "monthly", priority: "0.6" },
  { path: "/forge-vault", changefreq: "monthly", priority: "0.7" },
  { path: "/affiliate", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  ...serviceSlugs.map((slug) => ({
    path: `/services/${slug}`,
    changefreq: "monthly" as const,
    priority: "0.7",
  })),
  ...caseStudyIds.map((id) => ({
    path: `/case-studies/${id}`,
    changefreq: "monthly" as const,
    priority: "0.6",
  })),
  ...articleSlugs.map((slug) => ({
    path: `/insights/${slug}`,
    changefreq: "monthly" as const,
    priority: "0.6",
  })),
];

function generateSitemap(items: SitemapEntry[]) {
  const urls = items.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
