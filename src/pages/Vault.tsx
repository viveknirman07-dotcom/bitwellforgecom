import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PortalShell from "@/portal/PortalShell";
import VaultLink from "@/components/vault/VaultLink";

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

const Vault = () => {
  const [loading, setLoading] = useState(true);
  const [entitled, setEntitled] = useState(false);
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    supabase.functions
      .invoke("vault-access", { method: "GET" })
      .then(({ data }) => {
        if (!active) return;
        setEntitled(Boolean(data?.entitled));
        setDocuments(data?.documents ?? []);
        setUpdates(data?.updates ?? []);
      })
      .catch(() => setError("The Vault could not be reached. Please refresh."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const openDocument = async (slug: string) => {
    setBusy(slug);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("vault-access", {
        body: { document_slug: slug },
      });
      if (fnError) throw fnError;
      if (!data?.url) throw new Error(typeof data?.error === "string" ? data.error : "Could not open document");
      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not open that document.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <PortalShell eyebrow="Private library" title="The Forge Vault">
      {loading && <p className="text-sm portal-muted">Loading your library</p>}

      {!loading && !entitled && (
        <div className="max-w-xl space-y-6 text-sm leading-relaxed portal-muted">
          <p>
            This account does not yet hold access to the Commercial Growth System. If you have purchased under a
            different email address, sign in with that address instead.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <VaultLink to="/forge-vault" className="portal-btn portal-btn--solid">Get access</VaultLink>
          </div>
        </div>
      )}

      {!loading && entitled && (
        <div className="space-y-20">
          {error && <p role="alert" className="text-sm text-red-400">{error}</p>}

          <section className="space-y-px">
            {documents.map((doc) => (
              <article key={doc.id} className="border-t portal-line py-8">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div className="max-w-2xl">
                    <p className="text-[11px] tracking-[0.24em] uppercase portal-gold mb-3">{doc.category}</p>
                    <h2 className="font-heading text-xl md:text-2xl tracking-tight">{doc.title}</h2>
                    {doc.subtitle && <p className="mt-2 text-sm portal-muted">{doc.subtitle}</p>}
                    {doc.summary && <p className="mt-4 text-sm leading-relaxed portal-muted">{doc.summary}</p>}
                    <p className="mt-4 text-[11px] tracking-[0.18em] uppercase portal-muted">
                      Version {doc.version}
                      {doc.page_count ? ` · ${doc.page_count} pages` : ""}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    {doc.sections.length > 0 && (
                      <button
                        onClick={() => setOpen(open === doc.id ? null : doc.id)}
                        className="portal-btn"
                      >
                        {open === doc.id ? "Hide contents" : "Contents"}
                      </button>
                    )}
                    <button
                      onClick={() => openDocument(doc.slug)}
                      disabled={busy === doc.slug}
                      className="portal-btn portal-btn--solid"
                    >
                      {busy === doc.slug ? "Preparing" : "Open"}
                    </button>
                  </div>
                </div>

                {open === doc.id && (
                  <ol className="mt-8 space-y-4 border-t portal-line pt-8">
                    {doc.sections.map((s) => (
                      <li key={s.slug} className="grid gap-1 md:grid-cols-[7rem_1fr]">
                        <span className="text-[11px] tracking-[0.2em] uppercase portal-muted">
                          {s.part ?? (s.page_start ? `Page ${s.page_start}` : "")}
                        </span>
                        <span>
                          <span className="text-sm">{s.title}</span>
                          {s.summary && <span className="block text-[12px] portal-muted mt-1">{s.summary}</span>}
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
              </article>
            ))}
          </section>

          {updates.length > 0 && (
            <section>
              <p className="text-[11px] tracking-[0.28em] uppercase portal-gold mb-8">Product updates</p>
              <div className="space-y-px">
                {updates.map((u) => (
                  <article key={`${u.title}-${u.published_at}`} className="border-t portal-line py-6">
                    <p className="text-[11px] tracking-[0.18em] uppercase portal-muted">
                      {new Date(u.published_at).toLocaleDateString(undefined, { year: "numeric", month: "long" })}
                      {u.version ? ` · v${u.version}` : ""}
                    </p>
                    <h3 className="mt-2 font-heading text-lg tracking-tight">{u.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed portal-muted">{u.body}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="border-t portal-line pt-10">
            <p className="text-[12px] leading-relaxed portal-muted max-w-2xl">
              Documents open through single-use links that expire in five minutes. Access is licensed to this
              account only and every open is logged.
            </p>
          </section>
        </div>
      )}
    </PortalShell>
  );
};

export default Vault;
