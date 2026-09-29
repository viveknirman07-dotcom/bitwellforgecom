import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const groups = [
  { title: "Firm", links: [["About", "/about"], ["Approach", "/process"], ["Case Studies", "/case-studies"], ["Careers", "/careers"]] },
  { title: "Work", links: [["Capabilities", "/services"], ["Revenue Infrastructure Audit", "/contact?service=Infrastructure+Audit"], ["Forge Vault", "/forge-vault"], ["Client Access", "/vault"]] },
  { title: "Thinking", links: [["Insights", "/insights"], ["Commercial Strategy", "/insights"], ["Revenue Infrastructure", "/insights"], ["Growth Operations", "/insights"]] },
];

const Footer = () => {
  const [open, setOpen] = useState<string | null>(null);
  return <footer className="bf-footer"><div className="bf-footer-inner">
    <div className="bf-footer-intro"><Link to="/" className="bf-footer-brand">BitwellForge</Link><p>Revenue infrastructure for businesses built to endure.</p><div><a href="mailto:business@bitwellforge.com">business@bitwellforge.com</a><a href="mailto:support@bitwellforge.com">support@bitwellforge.com</a></div></div>
    <div className="bf-footer-groups">{groups.map(group => <section key={group.title} className={open === group.title ? "is-open" : ""}><Button variant="ghost" className="bf-footer-trigger" onClick={() => setOpen(open === group.title ? null : group.title)} aria-expanded={open === group.title}>{group.title}<ChevronDown size={16} /></Button><h2>{group.title}</h2><div className="bf-footer-links">{group.links.map(([label, href]) => <Link key={href + label} to={href}>{label}</Link>)}</div></section>)}</div>
    <div className="bf-footer-bottom"><p>© {new Date().getFullYear()} BitwellForge. All rights reserved.</p><p>Worldwide advisory, delivered remotely.</p></div>
  </div></footer>;
};

export default Footer;