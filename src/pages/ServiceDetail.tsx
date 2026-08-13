import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import CTABlock from "@/components/CTABlock";
import IdealFor from "@/components/services/IdealFor";
import { ServiceHero } from "@/components/services/ServiceVisuals";
import { serviceData, type ServiceSlug } from "@/data/services";
import { useSEO } from "@/hooks/use-seo";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] tracking-[0.28em] uppercase text-[hsl(var(--eyebrow-color))] font-medium mb-3">
    {children}
  </p>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-heading text-[26px] md:text-[30px] font-semibold text-foreground leading-tight tracking-[-0.01em] mb-5">
    {children}
  </h2>
);

const Paragraphs = ({ items }: { items: string[] }) => (
  <div className="space-y-5">
    {items.map((p, i) => (
      <p key={i} className="text-[15.5px] md:text-[16px] text-foreground/75 leading-[1.78]">
        {p}
      </p>
    ))}
  </div>
);

const Divider = () => (
  <div className="my-16 md:my-20 h-px bg-[hsl(var(--foreground)/0.08)]" aria-hidden />
);

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug && slug in serviceData ? serviceData[slug as ServiceSlug] : null;

  useSEO({
    title: service ? `${service.title} | BitwellForge` : "Service not found | BitwellForge",
    description:
      service?.subtitle ??
      "Revenue infrastructure modules engineered by BitwellForge for B2B service businesses.",
    canonicalPath: `/services/${slug ?? ""}`,
    jsonLdId: "service-jsonld",
    jsonLd: service
      ? {
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.subtitle,
          serviceType: service.title,
          provider: {
            "@type": "Organization",
            name: "BitwellForge",
            url: "https://www.bitwellforge.com",
          },
          areaServed: "Worldwide",
          url: `https://www.bitwellforge.com/services/${slug ?? ""}`,
        }
      : undefined,
  });

  if (!service) {
    return (
      <div className="pt-20 section-padding section-y text-center">
        <h1 className="font-heading text-3xl text-foreground mb-4">Service not found</h1>
        <Link to="/services" className="text-accent hover:underline">Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="section-padding section-y">
        <div className="max-w-[760px] mx-auto">
          {/* ── Back link */}
          <ScrollReveal>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-10"
            >
              <ArrowLeft size={14} />
              All Services
            </Link>
          </ScrollReveal>

          {/* ── Hero / executive briefing */}
          <ScrollReveal delay={100}>
            <Eyebrow>Service Brief</Eyebrow>
            <h1 className="font-heading text-[40px] md:text-[52px] font-semibold text-foreground leading-[1.05] tracking-[-0.02em] mb-6">
              {service.title}
            </h1>
            <p className="text-[17.5px] md:text-[19px] text-foreground/80 leading-[1.6] mb-10 max-w-[680px]">
              {service.subtitle}
            </p>
          </ScrollReveal>

          {/* ── Single hero visual (only retained visual in body) */}
          <ScrollReveal delay={200}>
            <div className="mb-12">
              <ServiceHero slug={slug!} />
            </div>
          </ScrollReveal>

          {/* ── Executive briefing copy */}
          <ScrollReveal delay={250}>
            <div className="border-l-2 border-[hsl(var(--eyebrow-color)/0.55)] pl-6 md:pl-8">
              <Paragraphs items={service.briefing} />
            </div>
          </ScrollReveal>

          <Divider />

          {/* ── The Problem */}
          <ScrollReveal>
            <Eyebrow>01 — Diagnosis</Eyebrow>
            <SectionHeading>The Problem</SectionHeading>
            <Paragraphs items={service.problem} />
          </ScrollReveal>

          <Divider />

          {/* ── The Strategy */}
          <ScrollReveal>
            <Eyebrow>02 — Thesis</Eyebrow>
            <SectionHeading>The Strategy</SectionHeading>
            <Paragraphs items={service.strategy} />
          </ScrollReveal>

          <Divider />

          {/* ── System Approach — framework with explanations */}
          <ScrollReveal>
            <Eyebrow>03 — Framework</Eyebrow>
            <SectionHeading>System Approach</SectionHeading>
            <p className="text-[15.5px] text-foreground/70 leading-[1.78] mb-10 max-w-[640px]">
              Each component connects into the next. Together they operate as one architecture,
              not a sequence of independent activities.
            </p>
            <ol className="space-y-10">
              {service.approach.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-8">
                  <div className="pt-1">
                    <span className="block font-mono text-[11px] tracking-[0.2em] text-[hsl(var(--eyebrow-color))] tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading text-[18.5px] md:text-[20px] font-semibold text-foreground mb-2 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-[15px] text-foreground/72 leading-[1.78]">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </ScrollReveal>

          <Divider />

          {/* ── Why Most Businesses Fail Here */}
          <ScrollReveal>
            <Eyebrow>04 — Common Failures</Eyebrow>
            <SectionHeading>Why Most Businesses Fail Here</SectionHeading>
            <p className="text-[15.5px] text-foreground/70 leading-[1.78] mb-8 max-w-[640px]">
              The recurring patterns observed across engagements. Most are structural rather than
              tactical, which is why effort alone does not resolve them.
            </p>
            <ul className="space-y-5">
              {service.failures.map((f, i) => (
                <li key={i} className="grid grid-cols-[auto_1fr] gap-x-5 items-baseline">
                  <span className="font-mono text-[10.5px] tracking-[0.2em] text-[hsl(var(--eyebrow-color))] tabular-nums pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] text-foreground/75 leading-[1.78]">{f}</p>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <Divider />

          {/* ── What This Looks Like In Practice */}
          <ScrollReveal>
            <Eyebrow>05 — Operating Reality</Eyebrow>
            <SectionHeading>What This Looks Like In Practice</SectionHeading>
            <p className="text-[15.5px] text-foreground/70 leading-[1.78] mb-8 max-w-[640px]">
              How the system operates inside the business once it is in place. Day-to-day workflows,
              decision rhythms, and the texture of the operating environment.
            </p>
            <Paragraphs items={service.inPractice} />
          </ScrollReveal>

          <Divider />

          {/* ── Expected Outcomes — with explanations */}
          <ScrollReveal>
            <Eyebrow>06 — Outcomes</Eyebrow>
            <SectionHeading>Expected Outcomes</SectionHeading>
            <p className="text-[15.5px] text-foreground/70 leading-[1.78] mb-10 max-w-[640px]">
              Engineered results, not projected aspirations. Each outcome is a measurable property
              of the system once deployed and operated correctly.
            </p>
            <div className="space-y-9">
              {service.outcomes.map((o, i) => (
                <div key={o.title} className="grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-8">
                  <div className="pt-1">
                    <span className="block font-mono text-[11px] tracking-[0.2em] text-[hsl(var(--eyebrow-color))] tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading text-[18px] md:text-[19.5px] font-semibold text-foreground mb-2 leading-snug">
                      {o.title}
                    </h3>
                    <p className="text-[15px] text-foreground/72 leading-[1.78]">
                      {o.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <Divider />

          {/* ── Ideal For */}
          <IdealFor items={service.idealFor} />
        </div>
      </section>



      <ScrollReveal>
        <CTABlock service={service.contactService} />
      </ScrollReveal>
    </div>
  );
};

export default ServiceDetail;
