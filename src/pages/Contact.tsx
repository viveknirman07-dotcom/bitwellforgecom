import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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

const Contact = () => {
  useSEO({
    title: "Contact BitwellForge | Book an Infrastructure Audit",
    description:
      "Start a discovery conversation with BitwellForge. Book an infrastructure audit and map the commercial architecture your business needs before scaling.",
    canonicalPath: "/contact",
  });

  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "General Inquiry",
    challenge: "",
  });
  const [prefilled, setPrefilled] = useState(false);

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      const decoded = decodeURIComponent(serviceParam).replace(/\+/g, " ");
      const match = serviceOptions.find(
        (opt) => opt.toLowerCase() === decoded.toLowerCase()
      );
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
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nInterested In: ${form.service}\nCurrent Challenge: ${form.challenge}`
    );

    window.location.href = `mailto:bitwellforge@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="pt-20">
      <section className="section-padding section-y">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <ScrollReveal>
                <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-6">Contact</p>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-8 text-balance">
                  Let's discuss your growth architecture.
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <p className="text-muted-foreground leading-relaxed mb-10">
                  Every engagement begins with a conversation. Share your current challenge and explore whether a structured approach could help.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div className="space-y-5">
                  <div>
                    <h3 className="text-[13px] font-semibold text-foreground mb-1">Email</h3>
                    <a href="mailto:bitwellforge@gmail.com" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-300">bitwellforge@gmail.com</a>
                  </div>
                  <div>
                    <h3 className="text-[13px] font-semibold text-foreground mb-1">Response Time</h3>
                    <p className="text-[13px] text-muted-foreground">Within 24 hours</p>
                  </div>
                  <div>
                    <h3 className="text-[13px] font-semibold text-foreground mb-1">Follow Us</h3>
                    <SocialLinks size={17} />
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={200}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border-b border-border px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300 text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent border-b border-border px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300 text-sm"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">Company</label>
                  <input
                    id="company"
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full bg-transparent border-b border-border px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300 text-sm"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">What are you interested in</label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={(e) => {
                      setForm({ ...form, service: e.target.value });
                      setPrefilled(false);
                    }}
                    className="w-full bg-transparent border-b border-border px-0 py-3 text-foreground focus:outline-none focus:border-foreground transition-colors duration-300 text-sm appearance-none cursor-pointer"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-background text-foreground">
                        {opt}
                      </option>
                    ))}
                  </select>
                  {prefilled && (
                    <p className="text-xs text-accent mt-2">
                      Pre-selected based on your interest. You can change this
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="challenge" className="block text-sm font-medium text-foreground mb-2">Current Challenge</label>
                  <textarea
                    id="challenge"
                    required
                    rows={4}
                    value={form.challenge}
                    onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                    className="w-full bg-transparent border-b border-border px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300 resize-none text-sm"
                    placeholder="Describe your current growth challenge..."
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:opacity-90 hover:scale-[1.015] active:scale-[0.98] transition-all duration-300 mt-4"
                  style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                >
                  Book Infrastructure Audit
                  <ArrowRight size={16} />
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
