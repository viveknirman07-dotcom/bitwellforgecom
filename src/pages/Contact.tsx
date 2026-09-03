import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import SocialLinks from "@/components/SocialLinks";
import EnquiryForm from "@/components/EnquiryForm";
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

const CONTACT_DESCRIPTION =
  "Start a discovery conversation with BitwellForge. Share the commercial constraint you are working against and book an infrastructure audit.";

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
      email: "v@bitwellforge.com",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "v@bitwellforge.com",
          availableLanguage: ["English"],
        },
      ],
    },
  },
];

const Contact = () => {
  useSEO({
    title: "Contact BitwellForge | Book an Infrastructure Audit",
    description: CONTACT_DESCRIPTION,
    canonicalPath: "/contact",
    jsonLd: contactJsonLd,
    jsonLdId: "contact-jsonld",
  });

  const [searchParams] = useSearchParams();
  const [defaultOption, setDefaultOption] = useState(serviceOptions[0]);
  const [prefilled, setPrefilled] = useState(false);

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (!serviceParam) return;
    const decoded = decodeURIComponent(serviceParam).replace(/\+/g, " ");
    const match = serviceOptions.find((opt) => opt.toLowerCase() === decoded.toLowerCase());
    if (match) {
      setDefaultOption(match);
      setPrefilled(true);
    }
  }, [searchParams]);

  return (
    <div className="pt-20">
      <section className="section-padding pt-16 sm:pt-24 lg:pt-32 pb-24 sm:pb-32 lg:pb-44">
        <div className="max-w-[1180px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-20 xl:gap-x-28">
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
                    Every engagement begins with the constraint, not the proposal.
                  </h1>
                </ScrollReveal>

                <ScrollReveal delay={240}>
                  <p className="mt-10 sm:mt-14 border-l border-border/60 pl-5 sm:pl-7 font-body text-muted-foreground text-[15px] sm:text-[16.5px] leading-[1.75] font-light max-w-[40ch]">
                    Describe what is currently limiting commercial output. If the problem is a fit
                    for structured work, we will say so. If it is not, we will say that too.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={320}>
                  <div className="mt-12 sm:mt-16 space-y-7 border-t border-border/60 pt-10">
                    <div>
                      <h2 className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-2">Email</h2>
                      <a
                        href="mailto:v@bitwellforge.com"
                        className="text-[15px] text-foreground hover:opacity-70 transition-opacity duration-300"
                      >
                        v@bitwellforge.com
                      </a>
                    </div>
                    <div>
                      <h2 className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-2">Phone</h2>
                      <a
                        href="tel:+919999999999"
                        className="text-[15px] text-foreground hover:opacity-70 transition-opacity duration-300"
                      >
                        +91 99999 99999
                      </a>
                      <p className="mt-1 text-[13px] text-muted-foreground">
                        Weekdays, 10:00 to 18:00 IST
                      </p>
                    </div>
                    <div>
                      <h2 className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-2">Response time</h2>
                      <p className="text-[15px] text-muted-foreground">Within one working day</p>
                    </div>
                    <div>
                      <h2 className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-2">Elsewhere</h2>
                      <SocialLinks size={17} />
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* RIGHT: the enquiry itself */}
            <div className="lg:col-span-6 xl:col-start-8 xl:col-span-5">
              <ScrollReveal delay={200}>
                <EnquiryForm
                  options={serviceOptions}
                  defaultOption={defaultOption}
                  prefilledNote={prefilled}
                  onOptionChange={() => setPrefilled(false)}
                />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
