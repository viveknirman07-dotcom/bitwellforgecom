import { useMemo, useRef, useState } from "react";
import { z } from "zod";
import { ArrowRight, Check, Loader2, Plus, Upload, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import ScrollReveal from "@/components/ScrollReveal";
import { mandates, mandateGroups, type Mandate } from "@/data/mandates";
import { useSEO } from "@/hooks/use-seo";
import { supabase } from "@/integrations/supabase/client";

const LOCATION = "Autonomous Practice Desk / Global Remote";

const schema = z.object({
  full_name: z.string().trim().min(1, "Full name is required").max(120),
  email: z.string().trim().email("Enter a valid work email").max(255),
  linkedin_url: z.string().trim().url("Enter a valid LinkedIn URL").max(500),
  audio_url: z.union([z.literal(""), z.string().trim().url("Enter a valid link").max(500)]),
  summary: z.string().trim().max(3000, "Keep this under 3000 characters"),
});
type Fields = z.infer<typeof schema>;
const empty: Fields = { full_name: "", email: "", linkedin_url: "", audio_url: "", summary: "" };

const Careers = () => {
  useSEO({
    title: "Practice Mandates & Institutional Careers | BitwellForge",
    description:
      "BitwellForge partners with rigorous practitioners across origination, revenue systems, econometric modeling, and practice governance. View open mandates.",
    canonicalPath: "/careers",
  });

  const [filter, setFilter] = useState<string>("All");
  const [open, setOpen] = useState<string | null>(null);
  const [applying, setApplying] = useState<Mandate | null>(null);

  const groups = useMemo(
    () => (filter === "All" ? mandateGroups : mandateGroups.filter((g) => g.name === filter)),
    [filter],
  );
  const byId = (id: string) => mandates.find((m) => m.id === id)!;

  return (
    <div className="pt-28 md:pt-36 pb-24 min-h-screen bg-background">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center justify-between border-t border-foreground/20 pt-4 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <span>Careers</span>
            <span>{mandates.length} open mandates</span>
          </div>
          <div className="grid gap-10 pt-12 md:pt-16 lg:grid-cols-12">
            <h1 className="font-heading font-normal text-foreground text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl lg:col-span-7">
              Practice Mandates &amp; Institutional Careers
            </h1>
            <div className="lg:col-span-5 lg:pt-4">
              <p className="text-base md:text-lg leading-relaxed text-foreground/80">
                BitwellForge deploys diagnostic revenue infrastructure and commercial advisory for mid-market
                practices. We partner with rigorous practitioners across origination, revenue systems, econometric
                modeling, and practice governance.
              </p>
              <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground">
                <span>Operating Cadence</span>
                <span className="text-muted-foreground">/</span>
                <span>Meritocratic Governance</span>
                <span className="text-muted-foreground">/</span>
                <span>Autonomous Mandates</span>
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <div
          role="tablist"
          aria-label="Filter by practice"
          className="mt-20 flex gap-6 overflow-x-auto border-b border-border pb-px [scrollbar-width:none]"
        >
          {["All", ...mandateGroups.map((g) => g.name)].map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`relative shrink-0 min-h-[44px] text-[12px] font-medium uppercase tracking-[0.14em] transition-colors ${
                filter === f ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
              <span
                className={`absolute inset-x-0 -bottom-px h-px bg-foreground origin-left transition-transform duration-500 ${
                  filter === f ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Directory */}
        <div className="mt-4">
          {groups.map((g) => (
            <section key={g.name} className="grid gap-6 pt-14 lg:grid-cols-12">
              <h2 className="lg:col-span-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground lg:sticky lg:top-28 self-start">
                {g.name}
              </h2>
              <ul className="lg:col-span-9 border-t border-foreground/20">
                {g.ids.map((id) => {
                  const m = byId(id);
                  const n = String(mandates.indexOf(m) + 1).padStart(2, "0");
                  const isOpen = open === id;
                  return (
                    <li key={id} className="border-b border-border">
                      <button
                        onClick={() => setOpen(isOpen ? null : id)}
                        aria-expanded={isOpen}
                        aria-controls={`m-${id}`}
                        className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-start gap-4 py-7 text-left"
                      >
                        <span className="pt-2 text-[11px] font-medium tracking-[0.14em] text-muted-foreground">{n}</span>
                        <span>
                          <span className="block font-heading text-2xl md:text-[2rem] leading-tight text-foreground">
                            {m.title}
                          </span>
                          <span className="mt-2 block text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
                            {m.practice} <span className="mx-2">/</span> {LOCATION}
                          </span>
                        </span>
                        <Plus
                          aria-hidden
                          className={`mt-2 h-5 w-5 text-foreground transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}
                        />
                      </button>
                      <div
                        id={`m-${id}`}
                        className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className={`overflow-hidden transition-[visibility] duration-500 ${isOpen ? "visible" : "invisible"}`}>
                          <div className="pb-10 sm:pl-[3.5rem]">
                            <Block label="Role Overview">
                              <p className="text-base leading-relaxed text-foreground/85">{m.overview}</p>
                            </Block>
                            <div className="grid gap-10 md:grid-cols-2 mt-10">
                              <Block label="Key Responsibilities">
                                <List items={m.responsibilities} />
                              </Block>
                              <Block label="Candidate Profile & Competencies">
                                <List items={m.requirements} />
                              </Block>
                            </div>
                            <button
                              onClick={() => setApplying(m)}
                              className="group/btn mt-10 inline-flex min-h-[48px] items-center gap-3 bg-primary px-7 text-[12px] font-medium [text-transform:uppercase] tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90"
                            >
                              Submit Candidacy
                              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <ApplyDialog mandate={applying} onClose={() => setApplying(null)} />
    </div>
  );
};

const Block = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
    {children}
  </div>
);

const List = ({ items }: { items: string[] }) => (
  <ol className="space-y-4">
    {items.map((t, i) => (
      <li key={i} className="grid grid-cols-[2rem_1fr] gap-2 text-[15px] leading-relaxed text-foreground/85">
        <span className="pt-[3px] text-[11px] tracking-[0.12em] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
        <span>{t}</span>
      </li>
    ))}
  </ol>
);

const ApplyDialog = ({ mandate, onClose }: { mandate: Mandate | null; onClose: () => void }) => {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields | "resume" | "form", string>>>({});
  const [file, setFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const honey = useRef<HTMLInputElement>(null);

  const close = () => {
    onClose();
    setTimeout(() => {
      setF(empty);
      setErrors({});
      setFile(null);
      setDone(false);
    }, 300);
  };

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...f, [k]: e.target.value };
    setF(next);
    if (errors[k]) {
      const r = schema.shape[k].safeParse(next[k]);
      setErrors((p) => ({ ...p, [k]: r.success ? undefined : r.error.issues[0].message }));
    }
  };

  const pickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const x = e.target.files?.[0] ?? null;
    if (x && (x.type !== "application/pdf" || x.size > 10 * 1024 * 1024)) {
      setErrors((p) => ({ ...p, resume: "Upload a PDF under 10 MB" }));
      setFile(null);
      e.target.value = "";
      return;
    }
    setErrors((p) => ({ ...p, resume: undefined }));
    setFile(x);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mandate || sending) return;
    const r = schema.safeParse(f);
    if (!r.success) {
      const errs: typeof errors = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as keyof Fields] ??= i.message));
      setErrors(errs);
      return;
    }
    setSending(true);
    setErrors({});
    const fd = new FormData();
    fd.append("role_id", mandate.id);
    fd.append("role_title", mandate.title);
    Object.entries(r.data).forEach(([k, v]) => fd.append(k, v));
    fd.append("website", honey.current?.value ?? "");
    if (file) fd.append("resume", file);
    const { data, error } = await supabase.functions.invoke("career-application", { body: fd });
    setSending(false);
    if (error || !data?.ok) {
      let msg = "Transmission failed. Please try again.";
      try {
        const body = await (error as { context?: Response })?.context?.json();
        if (body?.error) msg = body.error;
      } catch {
        /* keep default */
      }
      setErrors({ form: msg });
      return;
    }
    setDone(true);
  };

  const field =
    "w-full bg-transparent border-0 border-b border-foreground/25 px-0 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-foreground transition-colors";

  return (
    <Dialog open={!!mandate} onOpenChange={(o) => !o && close()}>
      <DialogContent className="max-w-2xl rounded-none border-foreground/20 p-0 max-h-[92vh] overflow-y-auto">
        {done ? (
          <div className="p-8 sm:p-12">
            <span className="flex h-12 w-12 items-center justify-center border border-foreground/30">
              <Check className="h-5 w-5" />
            </span>
            <DialogTitle className="mt-8 font-heading text-3xl font-normal">Candidacy received</DialogTitle>
            <DialogDescription className="mt-4 text-base leading-relaxed text-foreground/80">
              Your candidacy dossier has been transmitted to practice leadership (careers@bitwellforge.com). Selected
              candidates will receive direct correspondence.
            </DialogDescription>
            <button
              onClick={close}
              className="mt-10 inline-flex min-h-[48px] items-center bg-primary px-7 text-[12px] font-medium [text-transform:uppercase] tracking-[0.16em] text-primary-foreground"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="p-6 sm:p-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Submit Candidacy</p>
            <DialogTitle className="mt-3 font-heading text-2xl sm:text-3xl font-normal leading-tight">
              {mandate?.title}
            </DialogTitle>
            <DialogDescription className="sr-only">Application form for this mandate</DialogDescription>

            <div className="mt-8 space-y-7">
              <Row n="01" label="Target Mandate">
                <input readOnly value={mandate?.title ?? ""} className={`${field} text-foreground/70`} />
              </Row>
              <Row n="02" label="Full Name" error={errors.full_name}>
                <input className={field} value={f.full_name} onChange={set("full_name")} autoComplete="name" maxLength={120} required />
              </Row>
              <Row n="03" label="Work Email" error={errors.email}>
                <input type="email" className={field} value={f.email} onChange={set("email")} autoComplete="email" maxLength={255} required />
              </Row>
              <Row n="04" label="LinkedIn Profile URL" error={errors.linkedin_url}>
                <input type="url" className={field} value={f.linkedin_url} onChange={set("linkedin_url")} placeholder="https://linkedin.com/in/" maxLength={500} required />
              </Row>
              <Row n="05" label="Audio Brief / Drive Link" error={errors.audio_url}>
                <input type="url" className={field} value={f.audio_url} onChange={set("audio_url")} placeholder="Google Drive or Loom link containing audio introduction & discovery pitch" maxLength={500} />
              </Row>
              <Row n="06" label="Executive Summary / Note to Leadership" error={errors.summary}>
                <textarea rows={4} className={`${field} resize-none`} value={f.summary} onChange={set("summary")} placeholder="Summarize your relevant institutional engagements or technical credentials" maxLength={3000} />
              </Row>
              <Row n="07" label="Resume Upload (PDF)" error={errors.resume}>
                <label className="mt-2 flex min-h-[52px] cursor-pointer items-center justify-between gap-4 border border-dashed border-foreground/30 px-4 text-sm text-foreground/80 hover:border-foreground transition-colors">
                  <span className="truncate">{file ? file.name : "Select a PDF, up to 10 MB"}</span>
                  {file ? (
                    <button type="button" aria-label="Remove file" onClick={(e) => { e.preventDefault(); setFile(null); }}>
                      <X className="h-4 w-4" />
                    </button>
                  ) : (
                    <Upload className="h-4 w-4 shrink-0" />
                  )}
                  <input type="file" accept="application/pdf" className="sr-only" onChange={pickFile} />
                </label>
              </Row>
              <input ref={honey} name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            </div>

            {errors.form && <p role="alert" className="mt-6 text-sm text-destructive">{errors.form}</p>}

            <button
              type="submit"
              disabled={sending}
              className="group mt-10 flex min-h-[52px] w-full items-center justify-between bg-primary px-6 text-[12px] font-medium [text-transform:uppercase] tracking-[0.16em] text-primary-foreground disabled:opacity-70"
            >
              {sending ? "Transmitting" : "Transmit Candidacy"}
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

const Row = ({ n, label, error, children }: { n: string; label: string; error?: string; children: React.ReactNode }) => (
  <div>
    <p className="flex gap-3 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
      <span>{n}</span>
      <span className="text-foreground">{label}</span>
    </p>
    {children}
    {error && <p role="alert" className="mt-2 text-sm text-destructive">{error}</p>}
  </div>
);

export default Careers;
