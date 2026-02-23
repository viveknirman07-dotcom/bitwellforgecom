import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    challenge: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
                  Every engagement begins with a conversation. Share your current challenge, and we'll explore whether a structured approach could help.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-sm text-muted-foreground">hello@bitwellforge.com</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">Response Time</h3>
                    <p className="text-sm text-muted-foreground">Within 24 hours</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={200}>
              {submitted ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">Thank you.</h2>
                    <p className="text-muted-foreground">We'll be in touch within 24 hours.</p>
                  </div>
                </div>
              ) : (
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
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:opacity-90 transition-opacity duration-300 mt-4"
                  >
                    Book a Strategy Call
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
