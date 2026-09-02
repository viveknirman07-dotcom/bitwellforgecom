import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SocialLinks from "@/components/SocialLinks";
import { useSEO } from "@/hooks/use-seo";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const CONTACT_EMAIL = "bitwellforge@gmail.com";

const serviceOptions = [
  "General Inquiry",
  "Diagnose My Growth System",
  "Book Infrastructure Audit",
  "Commercial Growth Strategy",
  "Client Acquisition Architecture",
  "High-Ticket Revenue Systems",
  "Market Authority Positioning",
  "AI-Powered Revenue Operations",
  "Search & Digital Visibility",
  "Performance Growth",
  "Digital Product Commercialization",
];

const CONTACT_DESCRIPTION =
  "Start a discovery conversation with BitwellForge. Book an infrastructure audit and map the commercial architecture your business needs before scaling.";

const contactJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact BitwellForge",
    url: "https://bitwellforge.com/contact",
    description: CONTACT_DESCRIPTION,
    mainEntity: {
      "@type": "Organization",
      name: "BitwellForge",
      url: "https://bitwellforge.com",
      email: CONTACT_EMAIL,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Sales",
        email: CONTACT_EMAIL,
        availableLanguage: ["English"],
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bitwellforge.com/" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://bitwellforge.com/contact" },
    ],
  },
];

const fieldClass =
  "w-full bg-transparent border-b border-border/70 px-0 py-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors duration-300 text-[15px] font-light";

const labelClass =
  "block text-[10px] tracking-[0.28em] uppercase text-muted-foreground/80 mb-3";

const Contact = () => {
  useSEO({
    title: "Contact BitwellForge | Book an Infrastructure Audit",
    description: CONTACT_DESCRIPTION,
    canonicalPath: "/contact",
    jsonLd: contactJsonLd,
    jsonLdId: "contact-jsonld",
  });

  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "General Inquiry",
    challenge: "",
    website: "",
  });
  const [prefilled, setPrefilled] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      const decoded = decodeURIComponent(serviceParam).replace(/\+/g, " ");
      const match = serviceOptions.find((opt) => opt.toLowerCase() === decoded.toLowerCase());
      if (match) {
        setForm((prev) => ({ ...prev, service: match }));
        setPrefilled(true);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;

    if (form.challenge.trim().length < 10) {
      toast.error("Please describe your challenge in a little more detail.");
      return;
    }

    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-contact", { body: form });
      if (error) throw error;
      if (data && (data as { error?: string }).error) {
        throw new Error((data as { error?: string }).error);
      }
      setSent(true);
      toast.success("Received. We reply within 24 hours.");
    } catch (err) {
      toast.error(
        err instanceof Error && err.message.length < 120
          ? err.message
          : "Something interrupted the send. Please email us directly.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pt-20">
      <section className="section-padding pt-20 sm:pt-28 lg:pt-40 pb-28 sm:pb-36 lg:pb-52">
        <div className="max-w-[1180px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 sm:gap-y-20 lg:gap-x-20 xl:gap-x-28">
            {/* LEFT: positioning anchor */}
            <div className="lg:col-span-6">
              <div className="lg:sticky lg:top-32">
                <ScrollReveal>
                  <p className="text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-[hsl(var(--eyebrow-color))] eyebrow">
                    Contact
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                  <div className="mt-6 sm:mt-8 h-px w-14 sm:w-20 bg-border/70" />
                </ScrollReveal>

                <ScrollReveal delay={160}>
                  <h1 className="mt-8 sm:mt-10 lg:mt-12 font-heading text-[32px] sm:text-[44px] lg:text-[52px] font-semibold text-foreground leading-[1.06] tracking-tightest text-balance max-w-[18ch]">
                    Every engagement begins with a conversation about the constraint.
                  </h1>
                </ScrollReveal>

                <ScrollReveal delay={240}>
                  <p className="mt-10 sm:mt-14 border-l border-border/60 pl-5 sm:pl-7 font-body text-muted-foreground text-[15px] sm:text-[16.5px] leading-[1.75] font-light max-w-[40ch]">
                    Describe the situation as it stands. If a structured approach is warranted, we will say so. If it is not, we will say that too.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={320}>
                  <div className="mt-12 sm:mt-16 space-y-8">
                    <div>
                      <p className={labelClass}>Direct</p>
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="text-[15px] font-light text-foreground hover:text-[hsl(var(--eyebrow-color))] transition-colors duration-300"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                    <div>
                      <p className={labelClass}>Response</p>
                      <p className="text-[15px] font-light text-muted-foreground">Within 24 hours</p>
                    </div>
                    <div>
                      <p className={labelClass}>Elsewhere</p>
                      <SocialLinks size={17} />
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* RIGHT: form */}
            <div className="lg:col-span-6 xl:col-start-8 xl:col-span-5">
              <ScrollReveal delay={120}>
                {sent ? (
                  <div className="max-w-[46ch]">
                    <p className="font-heading text-[26px] sm:text-[32px] font-semibold text-foreground leading-[1.15] tracking-tightest">
                      Your message is with us.
                    </p>
                    <p className="mt-6 font-body text-muted-foreground text-[15.5px] leading-[1.85] font-light">
                      It has been recorded and routed to {CONTACT_EMAIL}. You can expect a considered reply within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSent(false);
                        setForm({
                          name: "",
                          email: "",
                          company: "",
                          service: "General Inquiry",
                          challenge: "",
                          website: "",
                        });
                      }}
                      className="mt-10 text-[13px] tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300 underline underline-offset-4"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-9 max-w-[52ch]">
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                      className="hidden"
                    />

                    <div>
                      <label htmlFor="name" className={labelClass}>Name</label>
                      <input
                        id="name"
                        type="text"
                        required
                        maxLength={100}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={fieldClass}
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClass}>Email</label>
                      <input
                        id="email"
                        type="email"
                        required
                        maxLength={255}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={fieldClass}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className={labelClass}>Company</label>
                      <input
                        id="company"
                        type="text"
                        maxLength={120}
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className={fieldClass}
                        placeholder="Your company"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className={labelClass}>Area of interest</label>
                      <select
                        id="service"
                        value={form.service}
                        onChange={(e) => {
                          setForm({ ...form, service: e.target.value });
                          setPrefilled(false);
                        }}
                        className={`${fieldClass} appearance-none cursor-pointer`}
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-background text-foreground">
                            {opt}
                          </option>
                        ))}
                      </select>
                      {prefilled && (
                        <p className="text-[12px] text-muted-foreground/70 mt-3 font-light">
                          Pre selected based on your interest. You can change this
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="challenge" className={labelClass}>Current constraint</label>
                      <textarea
                        id="challenge"
                        required
                        rows={5}
                        maxLength={4000}
                        value={form.challenge}
                        onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                        className={`${fieldClass} resize-none leading-[1.75]`}
                        placeholder="Describe the situation as it stands today"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex items-center gap-2 bg-black text-white dark:bg-gold dark:text-navy px-8 py-4 rounded-full text-[13px] font-medium tracking-wide hover:scale-[1.015] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100 transition-all duration-300 mt-2"
                      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                    >
                      {sending ? "Sending" : "Book Infrastructure Audit"}
                      <ArrowRight size={16} />
                    </button>
                  </form>
                )}
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
