import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import SocialLinks from "@/components/SocialLinks";
import { useSEO } from "@/hooks/use-seo";

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

const contactJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact BitwellForge",
    url: "https://bitwellforge.com/contact",
    description:
      "Begin a discovery conversation with BitwellForge and map the commercial architecture your business needs before scaling.",
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

const field =
  "w-full bg-transparent border-b border-border px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300 text-sm";
const labelClass = "block text-[13px] font-medium text-foreground mb-2";

const Contact = () => {
  useSEO({
    title: "Contact BitwellForge | Book an Infrastructure Audit",
    description:
      "Start a discovery conversation with BitwellForge. Book an infrastructure audit and map the commercial architecture your business needs before scaling.",
    canonicalPath: "/contact",
    jsonLd: contactJsonLd,
    jsonLdId: "contact-jsonld",
  });

  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "General Inquiry",
    challenge: "",
  });
  const [prefilled, setPrefilled] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("New Inquiry from BitwellForge Website");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCompany: ${form.company}\nInterested In: ${form.service}\nCurrent Challenge: ${form.challenge}`
    );
    window.location.href = `mailto:v@bitwellforge.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="pt-20">
      <section className="section-padding pt-20 sm:pt-28 lg:pt-40 pb-28 sm:pb-36 lg:pb-52">
        <div className="max-w-[1180px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 sm:gap-y-20 lg:gap-x-20 xl:gap-x-20">
            {/* LEFT: positioning anchor, mirroring the About page rail */}
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
                  <h1 className="mt-8 sm:mt-10 lg:mt-12 font-heading text-[32px] sm:text-[44px] lg:text-[52px] xl:text-[58px] font-semibold text-foreground leading-[1.06] tracking-tightest text-balance max-w-[17ch] sm:max-w-[20ch]">
                    Every engagement begins with a conversation about the constraint.
                  </h1>
                </ScrollReveal>

                <ScrollReveal delay={240}>
                  <p className="mt-10 sm:mt-14 lg:mt-16 border-l border-border/60 pl-5 sm:pl-7 font-body text-muted-foreground text-[15px] sm:text-[16.5px] leading-[1.75] font-light max-w-[38ch]">
                    Describe the situation as it stands. We will tell you plainly whether structured
                    work is warranted.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={320}>
                  <div className="mt-12 sm:mt-16 space-y-8">
                    <div>
                      <p className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-3">Email</p>
                      <a
                        href="mailto:v@bitwellforge.com"
                        className="text-[15px] text-foreground hover:text-muted-foreground transition-colors duration-300"
                      >
                        v@bitwellforge.com
                      </a>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-3">Response time</p>
                      <p className="text-[15px] font-light text-muted-foreground">Within 24 hours</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-3">Elsewhere</p>
                      <SocialLinks size={17} />
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* RIGHT: the form itself */}
            <div className="lg:col-span-6 xl:col-start-8 xl:col-span-5">
              <ScrollReveal delay={120}>
                <form onSubmit={handleSubmit} className="space-y-8 max-w-[52ch]">
                  <div>
                    <label htmlFor="name" className={labelClass}>Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={field}
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
                      className={field}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone <span className="text-muted-foreground font-light">(optional)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      maxLength={32}
                      pattern="[0-9+()\s.-]{6,32}"
                      title="Digits, spaces and + ( ) . - only"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={field}
                      placeholder="Include country code"
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
                      className={field}
                      placeholder="Your company"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className={labelClass}>What are you interested in</label>
                    <select
                      id="service"
                      value={form.service}
                      onChange={(e) => {
                        setForm({ ...form, service: e.target.value });
                        setPrefilled(false);
                      }}
                      className={`${field} appearance-none cursor-pointer`}
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-background text-foreground">
                          {opt}
                        </option>
                      ))}
                    </select>
                    {prefilled && (
                      <p className="text-xs text-accent mt-3">
                        Pre-selected based on your interest. You can change this
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="challenge" className={labelClass}>Current challenge</label>
                    <textarea
                      id="challenge"
                      required
                      rows={5}
                      maxLength={1000}
                      value={form.challenge}
                      onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                      className={`${field} resize-none`}
                      placeholder="Describe your current growth challenge"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center bg-black text-white dark:bg-gold dark:text-navy px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:opacity-90 hover:scale-[1.015] active:scale-[0.98] transition-all duration-300 mt-2"
                    style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                  >
                    Book Infrastructure Audit
                  </button>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
