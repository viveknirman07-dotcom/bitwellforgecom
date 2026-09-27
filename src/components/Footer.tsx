import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const groups = [
  { title: "Firm", links: [{ label: "About", href: "/about" }, { label: "Our Process", href: "/process" }, { label: "Careers", href: "/careers" }] },
  { title: "Explore", links: [{ label: "Services", href: "/services" }, { label: "Case Studies", href: "/case-studies" }, { label: "Insights", href: "/insights" }, { label: "Forge Vault", href: "/forge-vault" }] },
  { title: "Connect", links: [{ label: "Contact", href: "/contact" }, { label: "Business enquiries", href: "mailto:business@bitwellforge.com" }, { label: "Client support", href: "mailto:support@bitwellforge.com" }] },
];

const Footer = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  return <footer className="public-deep section-padding pt-16 md:pt-24 pb-8">
    <div className="mx-auto max-w-[1440px]">
      <div className="grid grid-cols-1 gap-12 border-b border-border pb-14 md:grid-cols-12 md:gap-10 md:pb-20">
        <div className="md:col-span-5"><Link to="/" className="font-heading text-[34px] font-semibold text-foreground">BitwellForge<span className="text-accent">.</span></Link><p className="mt-5 max-w-[320px] text-[15px] leading-relaxed text-muted-foreground">Revenue infrastructure. Built to compound.</p><Link to="/contact?service=General+Inquiry" className="mt-9 inline-flex min-h-11 items-center gap-3 border-b border-border text-[13px] font-medium text-foreground hover:text-accent">Book Infrastructure Audit <ArrowUpRight size={16} /></Link></div>
        <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8">
          {groups.map((group) => <div key={group.title} className="border-t border-border md:border-0">
            <Button variant="ghost" onClick={() => setExpanded(expanded === group.title ? null : group.title)} aria-expanded={expanded === group.title} className="flex h-14 w-full justify-between rounded-none px-0 text-left text-[11px] font-semibold uppercase text-foreground hover:bg-transparent md:pointer-events-none md:h-auto md:justify-start md:pb-5"><span>{group.title}</span><ChevronDown size={16} className={`md:hidden transition-transform ${expanded === group.title ? "rotate-180" : ""}`} /></Button>
            <ul className={`${expanded === group.title ? "block" : "hidden"} space-y-4 pb-6 md:block md:pb-0`}>{group.links.map((link) => <li key={link.href}><Link to={link.href} className="inline-flex min-h-8 items-center text-[13px] text-muted-foreground hover:text-foreground">{link.label}</Link></li>)}</ul>
          </div>)}
        </div>
      </div>
      <div className="flex flex-col gap-3 pt-6 text-[11px] text-muted-foreground md:flex-row md:justify-between"><span>© {new Date().getFullYear()} BitwellForge. All rights reserved.</span><span>Worldwide advisory, delivered remotely.</span></div>
    </div>
  </footer>;
};
export default Footer;
