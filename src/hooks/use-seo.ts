import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: "website" | "article";
  ogImage?: string;
  /** Optional JSON-LD structured data injected into <head>. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Unique id for the JSON-LD script tag. */
  jsonLdId?: string;
}

const SITE_URL = "https://bitwellforgecom.lovable.app";
const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/nhvvmPareMZp5Areto5BYur31l62/social-images/social-1771953048264-JPEG_image-477F-B949-86-0.webp";

const setMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

export const useSEO = ({
  title,
  description,
  canonicalPath,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
}: SEOOptions) => {
  useEffect(() => {
    document.title = title;
    const url = canonicalPath
      ? `${SITE_URL}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`
      : `${SITE_URL}${typeof window !== "undefined" ? window.location.pathname : ""}`;

    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:type"]', "property", "og:type", ogType);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:image"]', "property", "og:image", ogImage);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", ogImage);
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setCanonical(url);
  }, [title, description, canonicalPath, ogType, ogImage]);
};
