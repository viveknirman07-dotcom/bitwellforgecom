import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import SocialLinks from "@/components/SocialLinks";
import { Button } from "@/components/ui/button";
import BrandWordmark from "@/components/BrandWordmark";

const columns = [
  {
    title: "Capabilities",
    links: [
      { label: "Growth Strategy", href: "/services/growth-strategy" },
      { label: "Sales Systems", href: "/services/sales-systems" },
      { label: "Lead Generation", href: "/services/lead-generation" },
      { label: "AI Revenue Operations", href: "/services/ai-automation" },
      { label: "All services", href: "/services" },
    ],
  },
  {
    title: "Perspectives",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Process", href: "/process" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Affiliate Program", href: "/affiliate" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "business@bitwellforge.com", href: "mailto:business@bitwellforge.com" },
      { label: "support@bitwellforge.com", href: "mailto:support@bitwellforge.com" },
    ],
  },
];

const FooterLink = ({ label, href }: { label: string; href: string }) =>
  href.startsWith("mailto:") ? (
    <a href={href} className="text-[14px] opacity-80 hover:opacity-100 hover:underline underline-offset-4 break-all">{label}</a>
  ) : (
    <Link to={href} className="text-[14px] opacity-80 hover:opacity-100 hover:underline underline-offset-4">{label}</Link>
  );

const Footer = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <footer className="dark bg-background text-foreground">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-10 pt-16 md:pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-border">
          <div className="lg:col-span-4">
            <Link to="/" className="text-[30px]"><BrandWordmark /></Link>
            <p className="mt-4 text-[15px] leading-[1.6] text-muted-foreground max-w-sm">
              Commercial architecture and constraint advisory for service businesses, delivered remotely worldwide.
            </p>
            <div className="mt-6"><SocialLinks size={16} /></div>
          </div>

          {/* Desktop columns */}
          <div className="hidden md:grid lg:col-span-8 grid-cols-4 gap-8">
            {columns.map((c) => (
              <div key={c.title}>
                <h4 className="text-[12px] uppercase tracking-[0.2em] text-muted-foreground mb-5">{c.title}</h4>
                <ul className="space-y-3">{c.links.map((l) => <li key={l.href}><FooterLink {...l} /></li>)}</ul>
              </div>
            ))}
          </div>

          {/* Mobile accordions */}
          <div className="md:hidden">
            {columns.map((c) => {
              const isOpen = open === c.title;
              return (
                <div key={c.title} className="border-t border-border">
                  <Button variant="ghost" onClick={() => setOpen(isOpen ? null : c.title)} aria-expanded={isOpen}
                    className="w-full min-h-[56px] px-0 flex items-center justify-between text-[15px] font-medium hover:bg-transparent">
                    {c.title}
                    <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </Button>
                  <div className={`grid transition-[grid-template-rows] duration-400 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <ul className="overflow-hidden space-y-4">
                      {c.links.map((l, i) => <li key={l.href} className={i === c.links.length - 1 ? "pb-5" : ""}><FooterLink {...l} /></li>)}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[13px] text-muted-foreground">
          <p>© {new Date().getFullYear()} <BrandWordmark />. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link to="/cookies" className="hover:text-foreground">Cookie Policy</Link>
            <Button variant="ghost" size="sm" onClick={() => window.dispatchEvent(new Event("bitwellforge:open-cookie-settings"))} className="h-auto p-0 text-[13px] text-muted-foreground hover:text-foreground hover:bg-transparent">Cookie settings</Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
