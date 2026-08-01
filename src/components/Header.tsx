import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { hasActiveOpenings } from "@/data/jobs";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Process", href: "/process" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers", hiring: true },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isDark, toggle } = useDarkMode();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/70 backdrop-blur-2xl border-b border-foreground/10"
          : "bg-background/30 backdrop-blur-lg"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <nav className="section-padding flex items-center justify-between h-16 md:h-[72px] max-w-[1440px] mx-auto">
        <Link to="/" className="font-heading text-xl md:text-2xl font-semibold tracking-tight text-foreground">
          <motion.span
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            BitwellForge
          </motion.span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-9">
          {navItems.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={item.href}
                className={`relative whitespace-nowrap text-[13px] font-medium tracking-wide transition-colors duration-300 group ${
                  location.pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  {item.label}
                  {item.hiring && hasActiveOpenings() && (
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full bg-foreground/70"
                      aria-label="Hiring"
                      title="We're hiring"
                    />
                  )}
                </span>
                <span
                  className={`absolute -bottom-1.5 left-0 h-[2px] w-full bg-foreground transition-transform duration-500 ${
                    location.pathname === item.href
                      ? "scale-x-100 origin-left"
                      : "scale-x-0 origin-left group-hover:scale-x-100 group-hover:origin-left"
                  }`}
                  style={{ transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)" }}
                />
              </Link>
            </motion.div>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 300, damping: 20 }}
            onClick={toggle}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/contact?service=General+Inquiry"
              className="glow-cta inline-flex items-center rounded-full bg-black px-5 py-2.5 text-[12px] font-semibold tracking-wide text-white dark:bg-gold dark:text-navy"
            >
              Book Infrastructure Audit
            </Link>
          </motion.div>
        </div>


        {/* Mobile + Tablet */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggle}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-background/90 backdrop-blur-2xl border-t border-border/50 overflow-hidden"
          >
            <div className="section-padding py-6 flex flex-col gap-5">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={item.href}
                    className={`text-base font-medium transition-colors inline-flex items-center gap-2 ${
                      location.pathname === item.href
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                    {item.hiring && hasActiveOpenings() && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground/70" />
                        Hiring
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
              <Link
                to="/contact?service=General+Inquiry"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-black px-6 py-3.5 text-[13px] font-semibold tracking-wide text-white dark:bg-gold dark:text-navy"
              >
                Book Infrastructure Audit
              </Link>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
