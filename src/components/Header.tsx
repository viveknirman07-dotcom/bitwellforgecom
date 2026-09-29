import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { Button } from "@/components/ui/button";

const primaryNav = [
  { label: "Approach", href: "/process" },
  { label: "Capabilities", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isDark, toggle } = useDarkMode();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className={`bf-header ${scrolled || mobileOpen ? "is-scrolled" : ""}`}>
      <nav className="bf-header-inner" aria-label="Primary navigation">
        <Link to="/" className="bf-wordmark" aria-label="BitwellForge home">BitwellForge</Link>
        <div className="bf-desktop-nav">
          {primaryNav.map(item => <Link key={item.href} to={item.href} className={location.pathname.startsWith(item.href) ? "is-active" : ""}>{item.label}</Link>)}
          <Link to="/forge-vault">Forge Vault</Link>
          <Link className="bf-header-cta" to="/contact?service=Commercial+Constraint">Discuss a Constraint <ArrowRight size={14} aria-hidden /></Link>
          <Button variant="ghost" size="icon" onClick={toggle} className="bf-icon-button" aria-label={isDark ? "Use light theme" : "Use dark theme"}>{isDark ? <Sun /> : <Moon />}</Button>
        </div>
        <div className="bf-mobile-controls">
          <Button variant="ghost" size="icon" onClick={toggle} className="bf-icon-button" aria-label={isDark ? "Use light theme" : "Use dark theme"}>{isDark ? <Sun /> : <Moon />}</Button>
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(value => !value)} className="bf-icon-button" aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label={mobileOpen ? "Close menu" : "Open menu"}>{mobileOpen ? <X /> : <Menu />}</Button>
        </div>
      </nav>
      <AnimatePresence>
        {mobileOpen && <motion.div id="mobile-navigation" className="bf-mobile-menu" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}>
          <div className="bf-mobile-menu-inner">
            <p className="bf-kicker">Navigate</p>
            {primaryNav.map((item, index) => <motion.div key={item.href} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}><Link to={item.href}>{item.label}<ArrowRight size={18} aria-hidden /></Link></motion.div>)}
            <Link to="/forge-vault">Forge Vault<ArrowRight size={18} aria-hidden /></Link>
            <Link className="bf-mobile-cta" to="/contact?service=Commercial+Constraint">Discuss a Commercial Constraint</Link>
            <div className="bf-mobile-meta"><Link to="/careers">Careers</Link><Link to="/contact">Contact</Link><Link to="/vault">Client access</Link></div>
          </div>
        </motion.div>}
      </AnimatePresence>
    </header>
  );
};

export default Header;