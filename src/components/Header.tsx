import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import VaultLink from "@/components/vault/VaultLink";

const services = [
  { label: "Commercial Growth Strategy", href: "/services/growth-strategy" },
  { label: "Client Acquisition Architecture", href: "/services/lead-generation" },
  { label: "High-Ticket Revenue Systems", href: "/services/sales-systems" },
  { label: "AI-Powered Revenue Operations", href: "/services/ai-automation" },
];
const insights = [
  { label: "Insights Library", href: "/insights" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Our Process", href: "/process" },
];
const links = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Process", href: "/process" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Vault", href: "/vault" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<"Services" | "Insights" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(null); setMobileOpen(false); toggleRef.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a");
    first?.focus();
    return () => { document.body.style.overflow = previous; };
  }, [mobileOpen]);
  const close = () => { setOpen(null); setMobileOpen(false); };

  return (
    <header onMouseLeave={() => setOpen(null)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(null); }} className={`public-header fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${scrolled ? "shadow-subtle" : "public-header--top"}`}>
      <nav aria-label="Main navigation" className="section-padding mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-8">
        <Link to="/" onClick={close} className="font-heading text-[24px] font-semibold leading-none text-foreground md:text-[27px]">BitwellForge<span className="text-accent">.</span></Link>
        <div className="hidden lg:flex items-center gap-7 xl:gap-9">
          <Link className="public-nav-link text-[13px]" to="/about" aria-current={location.pathname === "/about" ? "page" : undefined}>About</Link>
          {(["Services", "Insights"] as const).map((name) => (
            <div key={name} onMouseEnter={() => setOpen(name)}>
              <Button variant="ghost" size="sm" aria-expanded={open === name} aria-controls="public-mega-menu" onClick={() => setOpen(open === name ? null : name)} onFocus={() => setOpen(name)} className="public-nav-link h-11 rounded-none px-0 text-[13px] hover:bg-transparent hover:text-accent">
                {name}<ChevronDown size={14} className={`transition-transform duration-300 ${open === name ? "rotate-180" : ""}`} />
              </Button>
            </div>
          ))}
          <Link className="public-nav-link text-[13px]" to="/case-studies" aria-current={location.pathname.startsWith("/case-studies") ? "page" : undefined}>Case Studies</Link>
          <Link className="public-nav-link text-[13px]" to="/process" aria-current={location.pathname === "/process" ? "page" : undefined}>Process</Link>
          <Link className="public-nav-link text-[13px]" to="/careers" aria-current={location.pathname === "/careers" ? "page" : undefined}>Careers</Link>
          <VaultLink to="/vault" className="public-nav-link text-[13px]">Vault</VaultLink>
          <Button asChild size="sm" className="h-11 rounded-none px-5 text-[12px]"><Link to="/contact?service=General+Inquiry">Book Infrastructure Audit <ArrowRight size={15} /></Link></Button>
        </div>
        <Button ref={toggleRef} variant="ghost" size="icon" className="lg:hidden h-11 w-11 rounded-none" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</Button>
      </nav>
      {open && !mobileOpen && (
         <div id="public-mega-menu" className="public-mega hidden lg:block absolute left-0 right-0">
          <div className="section-padding mx-auto grid max-w-[1440px] grid-cols-12 gap-10 py-10">
            <div className="col-span-4 border-r border-border pr-10"><span className="public-kicker">Explore {open}</span><h2 className="mt-5 font-heading text-[30px] leading-tight text-foreground">{open === "Services" ? "The architecture behind durable growth." : "Thinking for consequential decisions."}</h2></div>
            <div className="col-span-8 grid grid-cols-2 gap-x-10 gap-y-1">
              {(open === "Services" ? services : insights).map((item) => <Link to={item.href} key={item.href} onClick={close} className="group flex min-h-14 items-center justify-between border-b border-border py-3 text-[14px] text-foreground hover:text-accent">{item.label}<ArrowRight size={16} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" /></Link>)}
              {open === "Services" && <Link to="/services" onClick={close} className="group flex min-h-14 items-center justify-between border-b border-border py-3 text-[14px] text-accent">All services<ArrowRight size={16} /></Link>}
            </div>
          </div>
        </div>
      )}
      {mobileOpen && <div ref={menuRef} className="public-menu-panel fixed left-0 right-0 top-[72px] h-[calc(100dvh-72px)] overflow-y-auto border-t border-border section-padding py-6 lg:hidden" onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const focusable = menuRef.current?.querySelectorAll<HTMLElement>("a,button");
        if (!focusable?.length) return;
        const first = focusable[0]; const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }}>
        <div className="mx-auto max-w-[700px]">
           {links.map((item, i) => { const NavLink = item.href === "/vault" ? VaultLink : Link; return <div key={item.href} className="border-b border-border"><NavLink to={item.href} onClick={close} className="flex min-h-[62px] items-center justify-between font-heading text-[24px] text-foreground hover:text-accent"><span><span className="mr-5 font-body text-[11px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>{item.label}</span><ArrowRight size={18} /></NavLink></div>; })}
          <p className="mt-10 text-[13px] text-muted-foreground">Revenue infrastructure, built to compound.</p>
        </div>
      </div>}
    </header>
  );
};
export default Header;
