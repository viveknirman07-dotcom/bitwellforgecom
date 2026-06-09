import { articles } from "@/pages/Insights";

export type Article = (typeof articles)[number];

/** Estimate reading time in whole minutes based on ~220 wpm. */
export const readingTime = (content: string) => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
};

/** Pull section headings (lines wrapped in **bold**) to use as Key Takeaways. */
export const sectionHeadings = (content: string): string[] => {
  return content
    .split("\n\n")
    .map((p) => p.trim())
    .filter((p) => p.startsWith("**") && p.endsWith("**"))
    .map((p) => p.replace(/\*\*/g, ""));
};

/** Find related articles: prefer same category, then fill from others. */
export const relatedArticles = (slug: string, limit = 3): Article[] => {
  const current = articles.find((a) => a.slug === slug);
  if (!current) return [];
  const sameCategory = articles.filter(
    (a) => a.slug !== slug && a.category === current.category,
  );
  const others = articles.filter(
    (a) => a.slug !== slug && a.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
};
