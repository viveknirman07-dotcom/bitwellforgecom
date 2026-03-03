import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode } from "@/hooks/use-dark-mode";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Process", href: "/process" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isDark, toggle } = useDarkMode();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
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
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-background/60 backdrop-blur-2xl border-b border-border/30 shadow-[0_1px_20px_hsl(var(--foreground)/0.04)]"
          : "bg-background/20 backdrop-blur-lg"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <nav className="section-padding flex items-center justify-between h-16 md:h-20 max-w-[1400px] mx-auto">
        <Link to="/" className="font-heading text-xl md:text-2xl font-semibold tracking-tight text-foreground">
          BitwellForge
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={item.href}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 group ${
                  location.pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-full bg-accent transition-transform duration-250 ${
                    location.pathname === item.href
                      ? "scale-x-100 origin-left"
                      : "scale-x-0 origin-left group-hover:scale-x-100 group-hover:origin-left"
                  }`}
                  style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                />
              </Link>
            </motion.div>
          ))}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            onClick={toggle}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>
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
            className="lg:hidden bg-background/80 backdrop-blur-2xl border-t border-border/50 overflow-hidden"
          >
            <div className="section-padding py-6 flex flex-col gap-5">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={item.href}
                    className={`text-base font-medium transition-colors ${
                      location.pathname === item.href
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
