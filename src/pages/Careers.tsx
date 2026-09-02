import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Upload,
  X,
  MapPin,
  Briefcase,
  Sparkles,
  Loader2,
  Mail,
  ShieldAlert,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { activeJobs, getJobBySlug, type Job } from "@/data/jobs";
import { getStatus, recordAttempt, formatUntil } from "@/lib/applicationGuard";
import { useSEO } from "@/hooks/use-seo";

type Stage =
  | "listing"
  | "detail"
  | "screening"
  | "rejected"
  | "form"
  | "confirmation"
  | "blocked";

const ease = [0.22, 1, 0.36, 1] as const;

const Careers = () => {
  useSEO({
    title: "Careers at BitwellForge | Open Roles",
    description:
      "Join BitwellForge. We hire operators who build commercial growth infrastructure. See open roles, the screening process, and how to apply.",
    canonicalPath: "/careers",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const slug = searchParams.get("job");
  const stageParam = searchParams.get("stage") as Stage | null;

  const job = slug ? getJobBySlug(slug) : undefined;
  const [stage, setStage] = useState<Stage>(job ? stageParam || "detail" : "listing");

  useEffect(() => {
    if (job && stageParam) setStage(stageParam);
    else if (job) setStage("detail");
    else setStage("listing");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const openJob = (j: Job) => {
    setSearchParams({ job: j.slug });
  };

  const backToList = () => {
    setSearchParams({});
  };

  const beginScreening = (j: Job) => {
    const status = getStatus(j.id);
    if (status.blocked) {
      setStage("blocked");
      return;
    }
    setStage("screening");
  };

  return (
    <div className="pt-20 min-h-screen">
      <AnimatePresence mode="wait">
        {stage === "listing" && (
          <motion.div
            key="listing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <ListingView onOpen={openJob} />
          </motion.div>
        )}
        {stage === "detail" && job && (
          <motion.div
            key={"detail-" + job.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease }}
          >
            <DetailView
              job={job}
              onBack={backToList}
              onApply={() => beginScreening(job)}
            />
          </motion.div>
        )}
        {stage === "screening" && job && (
          <motion.div
            key={"screen-" + job.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <ScreeningView
              job={job}
              onReject={() => {
                recordAttempt(job.id);
                setStage("rejected");
              }}
              onPass={() => setStage("form")}
              onCancel={() => setStage("detail")}
            />
          </motion.div>
        )}
        {stage === "rejected" && job && (
          <motion.div
            key="rejected"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <RejectionView onBack={backToList} />
          </motion.div>
        )}
        {stage === "form" && job && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <ApplicationForm
              job={job}
              onCancel={() => setStage("detail")}
              onSubmitted={() => setStage("confirmation")}
              onBlocked={() => setStage("blocked")}
            />
          </motion.div>
        )}
        {stage === "confirmation" && job && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <ConfirmationView job={job} onBack={backToList} />
          </motion.div>
        )}
        {stage === "blocked" && job && (
          <motion.div
            key="blocked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <BlockedView job={job} onBack={backToList} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* -------------------------- Listing -------------------------- */

const ListingView = ({ onOpen }: { onOpen: (j: Job) => void }) => {
  const jobs = activeJobs();
  return (
    <section className="section-padding section-y">
      <div className="max-w-[1200px] mx-auto">
        <ScrollReveal>
          <p className="eyebrow mb-6">
            <span className="eyebrow-line mr-3" /> Careers
          </p>
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <h1 className="font-heading text-4xl md:text-6xl font-semibold text-foreground leading-[1.05] text-balance mb-8 max-w-4xl">
            Careers at BitwellForge.
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={220}>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mb-16">
            We are building the future of commercial growth systems. If you are precise,
            ambitious, and want to work at the intersection of strategy and execution,
            explore the roles below.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={320}>
          <div className="border-t-global pt-10">
            <div className="flex items-baseline justify-between mb-10">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
                Current Openings
              </h2>
              <span className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                {jobs.length} {jobs.length === 1 ? "Role" : "Roles"}
              </span>
            </div>

            {jobs.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-muted-foreground">
                  No active openings at this time. Check back soon.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {jobs.map((j, i) => (
                  <motion.li
                    key={j.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease }}
                  >
                    <button
                      onClick={() => onOpen(j)}
                      className="w-full group text-left py-8 md:py-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 transition-all"
                    >
                      <div className="flex-1">
                        <h3 className="font-heading text-xl md:text-2xl text-foreground group-hover:text-accent transition-colors duration-300 mb-2">
                          {j.title}
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                          {j.summary}
                        </p>
                      </div>
                      <div className="flex items-center gap-6 text-xs tracking-[0.16em] uppercase text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={12} /> {j.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Briefcase size={12} /> {j.type}
                        </span>
                        <ArrowRight
                          size={18}
                          className="text-foreground transition-transform duration-500 group-hover:translate-x-1"
                        />
                      </div>
                    </button>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

/* -------------------------- Detail -------------------------- */

const DetailView = ({
  job,
  onBack,
  onApply,
}: {
  job: Job;
  onBack: () => void;
  onApply: () => void;
}) => {
  const status = getStatus(job.id);
  return (
    <section className="section-padding section-y">
      <div className="max-w-[900px] mx-auto">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft size={14} /> All Openings
        </button>

        <p className="eyebrow mb-5">
          <span className="eyebrow-line mr-3" /> Open Role
        </p>
        <h1 className="font-heading text-3xl md:text-5xl font-semibold text-foreground leading-tight mb-6 text-balance">
          {job.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs tracking-[0.16em] uppercase text-muted-foreground mb-12">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={12} /> {job.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Briefcase size={12} /> {job.type}
          </span>
          <span>{job.compensation}</span>
        </div>

        <div className="space-y-12">
          {job.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-heading text-xl md:text-2xl text-foreground mb-4">
                {s.heading}
              </h2>
              {s.body && (
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {s.body}
                </p>
              )}
              {s.bullets && (
                <ul className="space-y-3 mt-2">
                  {s.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex gap-4 text-muted-foreground leading-relaxed"
                    >
                      <span className="mt-2.5 h-px w-4 shrink-0 bg-foreground/40" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 border-t-global pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-sm text-foreground font-medium mb-1">
              Ready to apply?
            </p>
            <p className="text-xs text-muted-foreground">
              You will complete a brief screening before submitting your application.
            </p>
          </div>
          {status.blocked ? (
            <button
              disabled
              className="btn-primary opacity-50 cursor-not-allowed"
              aria-disabled
            >
              Application Limit Reached
            </button>
          ) : (
            <button onClick={onApply} className="btn-primary group">
              Apply Now
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

/* -------------------------- Screening -------------------------- */

const ScreeningView = ({
  job,
  onReject,
  onPass,
  onCancel,
}: {
  job: Job;
  onReject: () => void;
  onPass: () => void;
  onCancel: () => void;
}) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [advancing, setAdvancing] = useState(false);
  const total = job.screening.length;
  const q = job.screening[index];
  const progress = Math.round(((index + (selected ? 1 : 0)) / total) * 100);

  const submit = () => {
    if (!selected || advancing) return;
    setAdvancing(true);
    const passed = q.accept(selected);
    setTimeout(() => {
      if (!passed) {
        onReject();
        return;
      }
      if (index + 1 >= total) {
        onPass();
      } else {
        setIndex(index + 1);
        setSelected(null);
        setAdvancing(false);
      }
    }, 350);
  };

  return (
    <section className="section-padding section-y">
      <div className="max-w-[720px] mx-auto">
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={14} /> Cancel
          </button>
          <span className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
            Screening · {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="h-px w-full bg-border overflow-hidden mb-14 rounded-full">
          <motion.div
            className="h-full bg-foreground"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.45, ease }}
          >
            <p className="eyebrow mb-6">
              <span className="eyebrow-line mr-3" /> Question {index + 1}
            </p>
            <h2 className="font-heading text-2xl md:text-4xl text-foreground leading-tight mb-10 text-balance">
              {q.question}
            </h2>

            <div className="space-y-3 mb-10">
              {q.options?.map((opt) => {
                const active = selected === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setSelected(opt)}
                    className={`w-full text-left px-6 py-5 rounded-xl border transition-all duration-300 group flex items-center justify-between ${
                      active
                        ? "border-foreground bg-foreground/[0.04]"
                        : "border-border hover:border-foreground/60"
                    }`}
                  >
                    <span className="text-sm md:text-base text-foreground">{opt}</span>
                    <span
                      className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                        active ? "border-foreground bg-foreground" : "border-border"
                      }`}
                    >
                      {active && (
                        <Check size={12} className="text-background" strokeWidth={3} />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  if (index === 0) return;
                  setIndex(index - 1);
                  setSelected(null);
                }}
                disabled={index === 0}
                className="text-xs tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft size={14} /> Previous
              </button>
              <button
                onClick={submit}
                disabled={!selected || advancing}
                className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {advancing ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    {index + 1 === total ? "Finish" : "Continue"}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

/* -------------------------- Rejection -------------------------- */

const RejectionView = ({ onBack }: { onBack: () => void }) => (
  <section className="section-padding section-y">
    <div className="max-w-[720px] mx-auto text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className="w-16 h-16 rounded-full border border-border flex items-center justify-center mx-auto mb-10"
      >
        <ShieldAlert size={22} className="text-muted-foreground" />
      </motion.div>
      <p className="eyebrow mb-6">
        <span className="eyebrow-line mr-3" /> Assessment Complete
      </p>
      <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-8 leading-tight text-balance">
        Thank you for your interest in BitwellForge.
      </h1>
      <div className="space-y-5 text-muted-foreground leading-relaxed max-w-xl mx-auto mb-12">
        <p>
          Based on your responses, you currently do not meet the minimum requirements for this position.
        </p>
        <p>
          We genuinely appreciate your time and encourage you to apply for future opportunities that better match your experience.
        </p>
        <p>We wish you every success in your career.</p>
      </div>
      <button onClick={onBack} className="btn-ghost">
        Back to Careers
      </button>
    </div>
  </section>
);

/* -------------------------- Application Form -------------------------- */

type FormState = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  message: string;
  resumeName: string;
};

const ApplicationForm = ({
  job,
  onCancel,
  onSubmitted,
  onBlocked,
}: {
  job: Job;
  onCancel: () => void;
  onSubmitted: () => void;
  onBlocked: () => void;
}) => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    message: "",
    resumeName: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim() || form.name.length > 120) e.name = "Enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!/^[+\d][\d\s\-()]{6,20}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!/^https?:\/\/(www\.)?linkedin\.com\/.+/i.test(form.linkedin))
      e.linkedin = "Enter a valid LinkedIn URL";
    if (!form.resumeName) e.resumeName = "Attach your resume";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFile = (f: File | undefined) => {
    if (!f) return;
    const ok = /\.(pdf|docx?|DOC|DOCX|PDF)$/.test(f.name);
    if (!ok) {
      setErrors((p) => ({ ...p, resumeName: "PDF, DOC, or DOCX only" }));
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setErrors((p) => ({ ...p, resumeName: "Max 10MB" }));
      return;
    }
    setForm((p) => ({ ...p, resumeName: f.name }));
    setErrors((p) => ({ ...p, resumeName: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;
    setSubmitting(true);

    const status = recordAttempt(job.id);
    if (status.blocked) {
      setTimeout(() => onBlocked(), 500);
      return;
    }

    const subject = `Application – ${job.title} – ${form.name}`;
    const body = [
      `Applicant Name:`,
      form.name,
      ``,
      `Email Address:`,
      form.email,
      ``,
      `Phone Number:`,
      form.phone,
      ``,
      `LinkedIn Profile:`,
      form.linkedin,
      ``,
      `Message:`,
      form.message || "(none)",
      ``,
      `— Resume file selected: ${form.resumeName}`,
      `Please attach the resume file manually before sending.`,
    ].join("\n");

    const url = `mailto:v@bitwellforge.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Store latest payload for "Open Email Again"
    try {
      sessionStorage.setItem("bwf_last_mailto", url);
      sessionStorage.setItem("bwf_last_resume", form.resumeName);
    } catch {
      /* ignore */
    }

    window.location.href = url;

    setTimeout(() => {
      setSubmitting(false);
      onSubmitted();
    }, 800);
  };

  const field =
    "w-full bg-transparent border-b border-border px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300 text-sm";

  return (
    <section className="section-padding section-y">
      <div className="max-w-[720px] mx-auto">
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <span className="text-xs tracking-[0.22em] uppercase text-muted-foreground inline-flex items-center gap-2">
            <Check size={12} /> Screening Passed
          </span>
        </div>

        <p className="eyebrow mb-5">
          <span className="eyebrow-line mr-3" /> Application
        </p>
        <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-4 leading-tight">
          Complete your application.
        </h1>
        <p className="text-muted-foreground mb-12 max-w-lg">
          Applying for <span className="text-foreground">{job.title}</span>. All fields
          are required except the message.
        </p>

        <form onSubmit={submit} className="space-y-8" noValidate>
          <FormRow label="Full Name" error={errors.name}>
            <input
              className={field}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your full name"
              autoComplete="name"
            />
          </FormRow>
          <FormRow label="Email Address" error={errors.email}>
            <input
              type="email"
              className={field}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@email.com"
              autoComplete="email"
            />
          </FormRow>
          <FormRow label="Phone Number" error={errors.phone}>
            <input
              type="tel"
              className={field}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+00 000 000 0000"
              autoComplete="tel"
            />
          </FormRow>
          <FormRow label="LinkedIn Profile URL" error={errors.linkedin}>
            <input
              type="url"
              className={field}
              value={form.linkedin}
              onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/your-profile"
            />
          </FormRow>

          <FormRow label="Resume (PDF, DOC, DOCX)" error={errors.resumeName}>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full flex items-center justify-between border border-border rounded-xl px-5 py-4 text-sm text-foreground hover:border-foreground/60 transition-colors"
            >
              <span className={form.resumeName ? "text-foreground" : "text-muted-foreground"}>
                {form.resumeName || "Choose a file"}
              </span>
              <Upload size={16} className="text-muted-foreground" />
            </button>
          </FormRow>

          <FormRow label="Message (Optional)">
            <textarea
              className={field + " resize-none"}
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Anything you'd like us to know"
            />
          </FormRow>

          <div className="pt-6 border-t-global flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <p className="text-xs text-muted-foreground max-w-sm">
              On submit, your default email client will open with your details
              pre-filled. You will need to manually attach your resume before sending.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Preparing…
                </>
              ) : (
                <>
                  Submit Application <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const FormRow = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div>
    <label className="block text-xs tracking-[0.18em] uppercase text-muted-foreground mb-3">
      {label}
    </label>
    {children}
    {error && <p className="text-xs text-destructive mt-2">{error}</p>}
  </div>
);

/* -------------------------- Confirmation -------------------------- */

const ConfirmationView = ({ job, onBack }: { job: Job; onBack: () => void }) => {
  const reopen = () => {
    try {
      const url = sessionStorage.getItem("bwf_last_mailto");
      if (url) window.location.href = url;
    } catch {
      /* ignore */
    }
  };

  const items = [
    { done: true, label: "Email Prepared" },
    { done: true, label: "Verify Your Details" },
    { done: false, label: "Attach Your Resume" },
    { done: false, label: "Click Send" },
  ];

  return (
    <section className="section-padding section-y">
      <div className="max-w-[720px] mx-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease }}
          className="w-16 h-16 rounded-full border border-border flex items-center justify-center mb-10"
        >
          <Sparkles size={20} className="text-foreground" />
        </motion.div>

        <p className="eyebrow mb-5">
          <span className="eyebrow-line mr-3" /> Almost There
        </p>
        <h1 className="font-heading text-3xl md:text-5xl font-semibold text-foreground leading-tight mb-6 text-balance">
          Your application is almost ready.
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-xl mb-12">
          We've prepared your email successfully. Before sending your application, please
          attach the resume file you selected earlier. Once your resume is attached,
          simply click Send.
        </p>

        <ul className="space-y-4 mb-12">
          {items.map((it, i) => (
            <motion.li
              key={it.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease }}
              className="flex items-center gap-4 border-b border-border pb-4"
            >
              <span
                className={`h-6 w-6 rounded-md border flex items-center justify-center ${
                  it.done ? "border-foreground bg-foreground" : "border-border"
                }`}
              >
                {it.done && <Check size={13} className="text-background" strokeWidth={3} />}
              </span>
              <span
                className={`text-sm ${
                  it.done ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {it.label}
              </span>
            </motion.li>
          ))}
        </ul>

        <div className="glass-surface rounded-xl p-6 mb-12">
          <div className="flex gap-4">
            <Mail size={18} className="text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your resume is not attached automatically due to browser security
              restrictions. Please attach the same resume file you selected before
              sending the email.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button onClick={reopen} className="btn-primary">
            Open Email Again <ArrowRight size={16} />
          </button>
          <button onClick={onBack} className="btn-ghost">
            Back to Careers
          </button>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          Applied for <span className="text-foreground">{job.title}</span>.
        </p>
      </div>
    </section>
  );
};

/* -------------------------- Blocked -------------------------- */

const BlockedView = ({ job, onBack }: { job: Job; onBack: () => void }) => {
  const status = getStatus(job.id);
  return (
    <section className="section-padding section-y">
      <div className="max-w-[720px] mx-auto text-center">
        <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center mx-auto mb-10">
          <ShieldAlert size={22} className="text-muted-foreground" />
        </div>
        <p className="eyebrow mb-6">
          <span className="eyebrow-line mr-3" /> Application Limit Reached
        </p>
        <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-8 leading-tight text-balance">
          You've reached the maximum attempts for this position.
        </h1>
        <div className="space-y-5 text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10">
          <p>
            For security and fair hiring purposes, you have reached the maximum number of
            application attempts allowed for this position.
          </p>
          <p>
            You may apply again after the temporary restriction period has expired
            {status.blockedUntil ? ` on ${formatUntil(status.blockedUntil)}` : ""}.
          </p>
          <p>
            If you believe this is an error, please contact{" "}
            <a
              href="mailto:v@bitwellforge.com"
              className="text-foreground underline underline-offset-4"
            >
              v@bitwellforge.com
            </a>
            .
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button onClick={onBack} className="btn-ghost">
            Back to Careers
          </button>
          <Link to="/" className="btn-ghost">
            Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Careers;
