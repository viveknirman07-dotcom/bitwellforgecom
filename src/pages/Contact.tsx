import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SocialLinks from "@/components/SocialLinks";
import { useSEO } from "@/hooks/use-seo";

const serviceOptions = [
  "General Inquiry",
  "Diagnose My Growth System",
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
  "peer w-full bg-transparent border-0 px-0 pt-1 pb-4 text-foreground text-[15px] sm:text-base placeholder:text-muted-foreground/45 focus:outline-none transition-colors duration-300";

const Row = ({
  n,
  htmlFor,
  label,
  note,
  children,
}: {
  n: string;
  htmlFor: string;
  label: string;
  note?: string;
  children: React.ReactNode;
}) => (
  <div className="group relative grid grid-cols-1 md:grid-cols-[150px_1fr] gap-x-8 pt-6 md:pt-7 border-b border-border/70">
    <label htmlFor={htmlFor} className="flex items-baseline gap-3 mb-2 md:mb-0 md:pt-1 cursor-pointer">
      <span className="font-heading italic text-[15px] text-muted-foreground/60 transition-colors duration-500 group-focus-within:text-foreground">{n}</span>
      <span className="text-[10px] tracking-[0.24em] uppercase text-muted-foreground transition-colors duration-500 group-focus-within:text-foreground">
        {label}
        {note && <span className="block normal-case tracking-normal text-[11px] text-muted-foreground/60 mt-1">{note}</span>}
      </span>
    </label>
    <div className="min-w-0">{children}</div>
    <span aria-hidden className="pointer-events-none absolute left-0 right-0 -bottom-px h-px bg-foreground origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:scale-x-100" />
  </div>
);

const Contact = () => {
  useSEO({
    title: "Contact BitwellForge | Commercial Enquiries",
    description:
      "Start a discovery conversation with BitwellForge and map the commercial architecture your business needs before scaling.",
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
    window.location.href = `mailto:business@bitwellforge.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="pt-20">
      <section className="section-padding pt-16 sm:pt-24 lg:pt-32 pb-28 sm:pb-36 lg:pb-48">
        <div className="max-w-[1280px] mx-auto">
          {/* Masthead strip */}
          <ScrollReveal>
            <div className="flex items-baseline justify-between border-t border-foreground/80 pt-4">
              <p className="text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-[hsl(var(--eyebrow-color))] eyebrow">
                Contact
              </p>
              <p className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">Within 24 hours</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 sm:gap-y-20 lg:gap-x-16 mt-12 sm:mt-16 lg:mt-24">
            {/* Introduction */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <ScrollReveal delay={120}>
                  <h1 className="font-heading text-[34px] sm:text-[52px] lg:text-[56px] xl:text-[64px] font-normal text-foreground leading-[1.04] tracking-tightest text-balance max-w-[16ch]">
                    Every engagement begins with a conversation about the constraint.
                  </h1>
                </ScrollReveal>

                <ScrollReveal delay={220}>
                  <p className="mt-8 sm:mt-12 font-body text-muted-foreground text-[15px] sm:text-[16.5px] leading-[1.75] font-light max-w-[40ch]">
                    Describe the situation as it stands. We will tell you plainly whether structured
                    work is warranted.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={300}>
                  <dl className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 border-t border-border/70">
                    <div className="py-5 sm:pr-6 lg:pr-0 border-b border-border/70 sm:border-b-0 lg:border-b flex sm:block lg:flex items-baseline justify-between gap-6">
                      <dt className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground sm:mb-3 lg:mb-0">Email</dt>
                      <dd>
                        <a href="mailto:business@bitwellforge.com" className="text-[15px] text-foreground border-b border-transparent hover:border-foreground transition-colors duration-300 break-all">
                          business@bitwellforge.com
                        </a>
                      </dd>
                    </div>
                    <div className="py-5 sm:px-6 lg:px-0 border-b border-border/70 sm:border-b-0 sm:border-l lg:border-l-0 lg:border-b flex sm:block lg:flex items-baseline justify-between gap-6">
                      <dt className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground sm:mb-3 lg:mb-0">Response time</dt>
                      <dd className="text-[15px] font-light text-muted-foreground">Within 24 hours</dd>
                    </div>
                    <div className="py-5 sm:pl-6 lg:pl-0 sm:border-l lg:border-l-0 border-border/70 flex sm:block lg:flex items-center justify-between gap-6">
                      <dt className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground sm:mb-3 lg:mb-0">Elsewhere</dt>
                      <dd><SocialLinks size={17} /></dd>
                    </div>
                  </dl>
                </ScrollReveal>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 lg:col-start-6 xl:col-span-6 xl:col-start-7">
              <ScrollReveal delay={160}>
                <p className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-2">Enquiry</p>
                <form onSubmit={handleSubmit} className="border-t border-border/70">
                  <Row n="01" htmlFor="name" label="Name">
                    <input id="name" type="text" required maxLength={100} value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={field} placeholder="Your name" />
                  </Row>
                  <Row n="02" htmlFor="email" label="Email">
                    <input id="email" type="email" required maxLength={255} value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={field} placeholder="your@email.com" />
                  </Row>
                  <Row n="03" htmlFor="phone" label="Phone" note="(optional)">
                    <input id="phone" type="tel" inputMode="tel" maxLength={32}
                      pattern="[0-9+()\s.-]{6,32}" title="Digits, spaces and + ( ) . - only"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={field} placeholder="Include country code" />
                  </Row>
                  <Row n="04" htmlFor="company" label="Company">
                    <input id="company" type="text" maxLength={120} value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className={field} placeholder="Your company" />
                  </Row>
                  <Row n="05" htmlFor="service" label="What are you interested in">
                    <div className="relative">
                      <select id="service" value={form.service}
                        onChange={(e) => { setForm({ ...form, service: e.target.value }); setPrefilled(false); }}
                        className={`${field} appearance-none cursor-pointer pr-8`}>
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-background text-foreground">{opt}</option>
                        ))}
                      </select>
                      <ChevronDown size={15} aria-hidden className="pointer-events-none absolute right-0 top-2 text-muted-foreground" />
                    </div>
                    {prefilled && (
                      <p className="text-xs text-accent -mt-2 pb-4">
                        Pre-selected based on your interest. You can change this
                      </p>
                    )}
                  </Row>
                  <Row n="06" htmlFor="challenge" label="Current challenge">
                    <textarea id="challenge" required rows={5} maxLength={1000} value={form.challenge}
                      onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                      className={`${field} resize-none leading-[1.7]`}
                      placeholder="Describe your current growth challenge" />
                  </Row>

                  <div className="md:grid md:grid-cols-[150px_1fr] gap-x-8 pt-10 sm:pt-12">
                    <span className="hidden md:block" />
                    <button
                      type="submit"
                      className="group w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-10 bg-primary text-primary-foreground px-7 py-5 text-[11px] tracking-[0.26em] uppercase font-medium transition-[opacity,transform] duration-500 hover:opacity-90 active:scale-[0.99]"
                    >
                      Send inquiry
                      <ArrowRight size={16} className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5" />
                    </button>
                  </div>
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
