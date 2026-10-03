import { useState, useEffect, useRef, FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, Search, ChevronDown, Globe, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { hasActiveOpenings } from "@/data/jobs";
import { Button } from "@/components/ui/button";

type Mega = { heading: string; intro: string; links: { label: string; href: string }[] };

const mega: Record<string, Mega> = {
  "Our Expertise": {
    heading: "Capabilities",
    intro: "Commercial architecture engineered across strategy, acquisition, revenue, and operations.",
    links: [
      { label: "Commercial Growth Strategy", href: "/services/growth-strategy" },
      { label: "High Ticket Sales Systems", href: "/services/sales-systems" },
      { label: "Performance Marketing", href: "/services/performance-marketing" },
      { label: "B2B Lead Generation", href: "/services/lead-generation" },
      { label: "LinkedIn Authority", href: "/services/linkedin" },
      { label: "AI Revenue Operations", href: "/services/ai-automation" },
      { label: "Search Visibility", href: "/services/seo" },
      { label: "Digital Products", href: "/services/digital-products" },
    ],
  },
  "Our Insights": {
    heading: "Perspectives",
    intro: "Research and field notes on the structures that govern commercial performance.",
    links: [
      { label: "All insights", href: "/insights" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Our process", href: "/process" },
    ],
  },
};

const navItems = [
  { label: "Our Expertise", href: "/services" },
  { label: "Our Approach", href: "/process" },
  { label: "Our Insights", href: "/insights" },
  { label: "Our Impact", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers", hiring: true },
  { label: "Contact", href: "/contact" },
];

const ease = [0.25, 0.1, 0.25, 1] as const;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggle } = useDarkMode();
  const reduced = useReducedMotion();
  const closeTimer = useRef<number>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSection(null);
    setOpenMega(null);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (mobileOpen) document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpenMega(null); setMobileOpen(false); setSearchOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKey); };
  }, [mobileOpen]);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/insights${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`);
    setMobileOpen(false);
    setSearchOpen(false);
  };

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + "/");
  const solid = scrolled || openMega || searchOpen || mobileOpen;
  const overHero = false;

  return (
    <header
      className={`${overHero ? "dark " : ""}fixed top-0 inset-x-0 z-50 transition-[background-color,border-color] duration-300 border-b ${
        solid ? "bg-background border-border" : "bg-background border-transparent"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.25,0.1,0.25,1)" }}
      onMouseLeave={() => { closeTimer.current = window.setTimeout(() => setOpenMega(null), 150); }}
      onMouseEnter={() => window.clearTimeout(closeTimer.current)}
    >
      {/* Utility bar */}
      <div className="hidden lg:block border-b border-border/60">
        <div className="max-w-[1440px] mx-auto px-10 h-9 flex items-center justify-end gap-6 text-[12px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Globe size={13} aria-hidden /> Global, remote delivery</span>
          <Button variant="ghost" onClick={toggle} aria-label="Toggle theme" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors min-h-[36px]">
            {isDark ? <Sun size={13} /> : <Moon size={13} />} {isDark ? "Light" : "Dark"}
          </Button>
        </div>
      </div>

      <nav className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-10 h-16 lg:h-[76px] flex items-center justify-between gap-6" aria-label="Main">
        <Link to="/" className="font-heading text-[22px] lg:text-[26px] font-semibold tracking-tight text-foreground shrink-0">
          BitwellForge
        </Link>

        <ul className="hidden lg:flex items-center gap-8 h-full">
          {navItems.map((item) => {
            const hasMega = !!mega[item.label];
            const active = isActive(item.href);
            return (
              <li key={item.href} className="h-full flex items-center relative"
                onMouseEnter={() => setOpenMega(hasMega ? item.label : null)}>
                <Link
                  to={item.href}
                  aria-haspopup={hasMega || undefined}
                  aria-expanded={hasMega ? openMega === item.label : undefined}
                  onFocus={() => setOpenMega(hasMega ? item.label : null)}
                  className={`group relative inline-flex items-center gap-1 text-[14.5px] font-medium h-full transition-colors ${
                    active ? "text-foreground" : "text-foreground/75 hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {hasMega && <ChevronDown size={14} className={`transition-transform duration-300 ${openMega === item.label ? "rotate-180" : ""}`} />}
                  {item.hiring && hasActiveOpenings() && <span className="h-1.5 w-1.5 rounded-full bg-foreground" aria-label="Hiring" />}
                  <span className={`absolute bottom-0 left-0 right-0 h-[2px] bg-foreground origin-left transition-transform duration-300 ${
                    active || openMega === item.label ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`} />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:flex items-center">
          <Button variant="ghost" onClick={() => setSearchOpen((v) => !v)} aria-label="Search insights" aria-expanded={searchOpen}
            className="h-11 w-11 inline-flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </Button>
        </div>

        <div className="flex lg:hidden items-center gap-1">
          <Button variant="ghost" onClick={toggle} aria-label="Toggle theme" className="h-11 w-11 inline-flex items-center justify-center text-foreground">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Button variant="ghost" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={mobileOpen} aria-controls="mobile-site-menu"
            className="h-11 w-11 inline-flex items-center justify-center text-foreground">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </Button>
        </div>
      </nav>

      {/* Search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.form onSubmit={onSearch} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease }} className="hidden lg:block border-t border-border bg-background">
            <div className="max-w-[1440px] mx-auto px-10 py-6 flex items-center gap-4">
              <Search size={20} className="text-muted-foreground" aria-hidden />
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search insights and perspectives"
                aria-label="Search insights" className="flex-1 bg-transparent text-2xl font-heading text-foreground placeholder:text-muted-foreground outline-none" />
              <Button type="submit" className="h-11 px-5 bg-primary text-primary-foreground text-[13px] font-semibold">Search</Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Mega menu */}
      <AnimatePresence>
        {openMega && mega[openMega] && (
          <motion.div key={openMega} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease }} className="hidden lg:block border-t border-border bg-background">
            <div className="max-w-[1440px] mx-auto px-10 py-12 grid grid-cols-12 gap-10">
              <div className="col-span-4">
                <p className="text-[12px] uppercase tracking-[0.2em] text-muted-foreground mb-4">{mega[openMega].heading}</p>
                <p className="font-heading text-[28px] leading-[1.2] text-foreground">{mega[openMega].intro}</p>
              </div>
              <ul className="col-span-8 grid grid-cols-2 gap-x-10">
                {mega[openMega].links.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="group flex items-center justify-between py-4 border-b border-border text-[16px] text-foreground">
                      {l.label}
                      <ArrowRight size={16} className="opacity-50 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile full screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={reduced ? false : { opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={reduced ? { opacity: 0 } : { opacity: 0, x: "100%" }}
            transition={{ duration: reduced ? 0 : 0.45, ease }}
            id="mobile-site-menu" aria-label="Mobile navigation" role="navigation"
            className="lg:hidden fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] bg-background overflow-y-auto overscroll-contain touch-pan-y shadow-elevated">
            <div className="px-4 md:px-8 py-6 pb-16 flex flex-col">
              <form onSubmit={onSearch} className="flex items-center gap-3 border-b border-border pb-4 mb-2">
                <Search size={18} className="text-muted-foreground" aria-hidden />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search insights" aria-label="Search insights"
                  className="flex-1 h-11 bg-transparent text-foreground placeholder:text-muted-foreground outline-none" />
              </form>
              {navItems.map((item, i) => (
                <motion.div key={item.href} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05, duration: 0.35, ease }}>
                  <div className="flex items-center border-b border-border">
                  <Link to={item.href} onClick={() => setMobileOpen(false)} className={`flex flex-1 items-center justify-between min-h-[56px] font-heading text-[24px] ${isActive(item.href) ? "text-foreground" : "text-foreground/80"}`}>
                    <span className="inline-flex items-center gap-2">{item.label}
                      {item.hiring && hasActiveOpenings() && <span className="text-[10px] font-body uppercase tracking-[0.2em] text-muted-foreground">Hiring</span>}
                    </span>
                    {!mega[item.label] && <ArrowRight size={18} />}
                  </Link>
                  {mega[item.label] && <Button variant="ghost" size="icon" className="shrink-0 h-12 w-12" aria-label={`Show ${item.label} links`} aria-expanded={mobileSection === item.label} aria-controls={`mobile-submenu-${i}`} onClick={() => setMobileSection(mobileSection === item.label ? null : item.label)}><ChevronDown size={18} className={`transition-transform ${mobileSection === item.label ? "rotate-180" : ""}`} /></Button>}
                  </div>
                  {mega[item.label] && mobileSection === item.label && <div id={`mobile-submenu-${i}`} className="border-b border-border pb-3 pl-4">{mega[item.label].links.map((link) => <Link key={link.href} to={link.href} onClick={() => setMobileOpen(false)} className="block py-3 text-[15px] text-foreground/80 hover:text-foreground">{link.label}</Link>)}</div>}
                </motion.div>
              ))}
              <p className="mt-6 inline-flex items-center gap-2 text-[13px] text-muted-foreground"><Globe size={14} aria-hidden /> Global, remote delivery</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
