import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  FileText,
  Library,
  LoaderCircle,
  Search,
  ShieldCheck,
  Wrench,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import PortalShell from "@/portal/PortalShell";
import VaultLink from "@/components/vault/VaultLink";
import { Button } from "@/components/ui/button";

interface Section {
  slug: string;
  title: string;
  part: string | null;
  summary: string | null;
  page_start: number | null;
}

interface Doc {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  category: string;
  summary: string | null;
  page_count: number | null;
  version: string;
  sections: Section[];
}

interface Update {
  title: string;
  body: string;
  version: string | null;
  published_at: string;
}

const documentMeta: Record<string, { index: string; count: string; label: string }> = {
  blueprint: { index: "01", count: "12 chapters", label: "Reasoning" },
  "operating-system": { index: "02", count: "31 modules", label: "Sequence" },
  "commercial-toolkit": { index: "03", count: "44 assets", label: "Application" },
};

const documentIcon = (slug: string) => {
  if (slug === "operating-system") return Wrench;
  if (slug === "commercial-toolkit") return Library;
  return BookOpen;
};

const sectionGroups = (sections: Section[]) => {
  const groups = new Map<string, Section[]>();
  sections.forEach((section) => {
    const key = section.part ?? "Contents";
    groups.set(key, [...(groups.get(key) ?? []), section]);
  });
  return Array.from(groups.entries());
};

const Vault = () => {
  const [loading, setLoading] = useState(true);
  const [entitled, setEntitled] = useState(false);
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    supabase.functions
      .invoke("vault-access", { method: "GET" })
      .then(({ data }) => {
        if (!active) return;
        setEntitled(Boolean(data?.entitled));
        const nextDocuments = data?.documents ?? [];
        setDocuments(nextDocuments);
        setActiveSlug((current) => current ?? nextDocuments[0]?.slug ?? null);
        setUpdates(data?.updates ?? []);
      })
      .catch(() => {
        setLoadError(true);
        setError("The Vault could not be reached. Refresh and try again.");
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const openDocument = async (slug: string) => {
    setBusy(slug);
    setError(null);
    const destination = window.open("", "_blank");
    if (destination) {
      destination.document.title = "Preparing secure document";
      destination.document.body.textContent = "Preparing your secure document…";
    }
    try {
      const { data, error: fnError } = await supabase.functions.invoke("vault-access", {
        body: { document_slug: slug },
      });
      if (fnError) throw fnError;
      if (!data?.url) throw new Error(typeof data?.error === "string" ? data.error : "Could not open document");
      if (!destination) throw new Error("Your browser blocked the document window. Allow popups and try again.");
      destination.opener = null;
      destination.location.replace(data.url);
    } catch (err) {
      destination?.close();
      setError(err instanceof Error ? err.message : "Could not open that document.");
    } finally {
      setBusy(null);
    }
  };

  const activeDocument = documents.find((document) => document.slug === activeSlug) ?? documents[0];
  const groups = useMemo(() => sectionGroups(activeDocument?.sections ?? []), [activeDocument]);
  const searchResults = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    if (!term) return [];
    return documents.flatMap((document) =>
      document.sections
        .filter((section) =>
          [section.title, section.summary, section.part].some((value) => value?.toLocaleLowerCase().includes(term)),
        )
        .map((section) => ({ document, section })),
    );
  }, [documents, query]);

  const selectDocument = (slug: string) => {
    setActiveSlug(slug);
    setQuery("");
    setOpen(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PortalShell eyebrow="Private library" title="The Forge Vault">
      {loading && (
        <div className="vault-status" role="status">
          <LoaderCircle className="vault-spin" aria-hidden="true" />
          <div>
            <p>Preparing your Vault</p>
            <span>Verifying access and arranging your library</span>
          </div>
        </div>
      )}

      {!loading && !entitled && (
        <div className="vault-empty-state">
          <span className="vault-empty-icon"><ShieldCheck aria-hidden="true" /></span>
          <p className="vault-kicker">{loadError ? "Connection interrupted" : "Access required"}</p>
          <h1>{loadError ? "We could not verify your library." : "This Vault is linked to the email used at purchase."}</h1>
          <p className="portal-muted">
            {loadError
              ? "Your access has not changed. Refresh this page to reconnect securely."
              : "This account does not yet hold access to the Commercial Growth System. Sign in with the purchasing email, or get access below."}
          </p>
          <div className="vault-empty-actions">
            {loadError ? (
              <Button onClick={() => window.location.reload()} className="portal-btn portal-btn--solid">Try again</Button>
            ) : (
              <VaultLink to="/forge-vault" className="portal-btn portal-btn--solid">View Forge Vault</VaultLink>
            )}
          </div>
        </div>
      )}

      {!loading && entitled && activeDocument && (
        <div className="vault-workspace">
          <aside className="vault-library-rail" aria-label="Vault collections">
            <div className="vault-rail-heading">
              <p className="vault-kicker">Private library</p>
              <h1>The Forge Vault</h1>
              <p>One system. Three connected layers.</p>
            </div>

            <nav className="vault-collection-nav">
              {documents.map((document) => {
                const meta = documentMeta[document.slug];
                const Icon = documentIcon(document.slug);
                const selected = document.slug === activeDocument.slug;
                return (
                  <Button
                    key={document.id}
                    variant="ghost"
                    onClick={() => selectDocument(document.slug)}
                    className={`vault-collection-button ${selected ? "is-active" : ""}`}
                    aria-current={selected ? "page" : undefined}
                  >
                    <span className="vault-collection-index">{meta?.index ?? "•"}</span>
                    <span className="vault-collection-copy">
                      <strong>{document.title.replace("BitwellForge ", "")}</strong>
                      <span>{meta?.count ?? `${document.sections.length} sections`}</span>
                    </span>
                    <Icon aria-hidden="true" />
                  </Button>
                );
              })}
            </nav>

            <div className="vault-trust-note">
              <ShieldCheck aria-hidden="true" />
              <p><strong>Private access</strong><span>Secure links expire after five minutes.</span></p>
            </div>
          </aside>

          <section className="vault-library-canvas">
            <div className="vault-mobile-tabs" aria-label="Choose a collection">
              {documents.map((document) => (
                <Button
                  key={document.id}
                  variant="ghost"
                  className={document.slug === activeDocument.slug ? "is-active" : ""}
                  onClick={() => selectDocument(document.slug)}
                >
                  {documentMeta[document.slug]?.index ?? "•"}
                  <span>{document.title.replace("BitwellForge ", "").replace("™", "")}</span>
                </Button>
              ))}
            </div>

            <div className="vault-canvas-tools">
              <label className="vault-search">
                <Search aria-hidden="true" />
                <span className="sr-only">Search the Vault</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search modules, chapters and assets"
                />
                {query && (
                  <Button variant="ghost" size="icon" onClick={() => setQuery("")} aria-label="Clear search">
                    <X />
                  </Button>
                )}
              </label>
              <span className="vault-library-status"><span /> Library current</span>
            </div>

            {error && <p role="alert" className="vault-alert">{error}</p>}

            <AnimatePresence mode="wait">
              {query.trim() ? (
                <motion.div
                  key="search"
                  className="vault-search-results"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                >
                  <div className="vault-section-heading">
                    <p className="vault-kicker">Search results</p>
                    <h2>{searchResults.length ? `${searchResults.length} matches` : "No matches found"}</h2>
                  </div>
                  {searchResults.map(({ document, section }) => (
                    <Button
                      key={`${document.id}-${section.slug}`}
                      variant="ghost"
                      className="vault-search-result"
                      onClick={() => {
                        selectDocument(document.slug);
                        setOpen(section.part ?? "Contents");
                      }}
                    >
                      <span>
                        <small>{document.title.replace("BitwellForge ", "")} · {section.part ?? "Contents"}</small>
                        <strong>{section.title}</strong>
                      </span>
                      <ArrowUpRight aria-hidden="true" />
                    </Button>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key={activeDocument.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <header className="vault-document-hero">
                    <div className="vault-document-heading">
                      <p className="vault-kicker">{documentMeta[activeDocument.slug]?.label ?? activeDocument.category}</p>
                      <h2>{activeDocument.title}</h2>
                      {activeDocument.subtitle && <p className="vault-document-subtitle">{activeDocument.subtitle}</p>}
                      {activeDocument.summary && <p className="portal-muted">{activeDocument.summary}</p>}
                    </div>
                    <div className="vault-document-action">
                      <p><span>{documentMeta[activeDocument.slug]?.count ?? `${activeDocument.sections.length} sections`}</span><span>Version {activeDocument.version}{activeDocument.page_count ? ` · ${activeDocument.page_count} pages` : ""}</span></p>
                      <Button
                        onClick={() => openDocument(activeDocument.slug)}
                        disabled={busy === activeDocument.slug}
                        aria-busy={busy === activeDocument.slug}
                        className="portal-btn portal-btn--solid"
                      >
                        {busy === activeDocument.slug ? <LoaderCircle className="vault-spin" /> : <FileText />}
                        {busy === activeDocument.slug ? "Preparing" : "Open document"}
                      </Button>
                    </div>
                  </header>

                  <div className="vault-content-index">
                    <div className="vault-section-heading">
                      <p className="vault-kicker">Structured index</p>
                      <h2>{activeDocument.slug === "operating-system" ? "Follow the sequence." : "Find the right reference."}</h2>
                    </div>

                    <div className="vault-groups">
                      {groups.map(([part, sections], groupIndex) => {
                        const isOpen = open === part || (open === null && groupIndex === 0);
                        return (
                          <article key={part} className={`vault-group ${isOpen ? "is-open" : ""}`}>
                            <Button
                              variant="ghost"
                              className="vault-group-trigger"
                              onClick={() => setOpen(isOpen ? "" : part)}
                              aria-expanded={isOpen}
                            >
                              <span className="vault-group-number">{String(groupIndex + 1).padStart(2, "0")}</span>
                              <span className="vault-group-title">
                                <strong>{part}</strong>
                                <small>{sections.length} {sections.length === 1 ? "item" : "items"}</small>
                              </span>
                              <ChevronDown aria-hidden="true" />
                            </Button>
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.ol
                                  className="vault-section-list"
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                >
                                  {sections.map((section, sectionIndex) => (
                                    <li key={section.slug}>
                                      <span className="vault-section-number">{String(sectionIndex + 1).padStart(2, "0")}</span>
                                      <div>
                                        <h3>{section.title}</h3>
                                        {section.summary && <p>{section.summary}</p>}
                                      </div>
                                      {section.page_start && <span className="vault-page-number">p. {section.page_start}</span>}
                                    </li>
                                  ))}
                                </motion.ol>
                              )}
                            </AnimatePresence>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {updates.length > 0 && !query && (
              <section className="vault-updates">
                <div className="vault-section-heading">
                  <p className="vault-kicker">Product journal</p>
                  <h2>Latest updates.</h2>
                </div>
                <div>
                  {updates.map((update) => (
                    <article key={`${update.title}-${update.published_at}`}>
                      <time>{new Date(update.published_at).toLocaleDateString(undefined, { year: "numeric", month: "long" })}</time>
                      <h3>{update.title}</h3>
                      <p>{update.body}</p>
                      {update.version && <span>Version {update.version}</span>}
                    </article>
                  ))}
                </div>
              </section>
            )}
          </section>
        </div>
      )}
    </PortalShell>
  );
};

export default Vault;
