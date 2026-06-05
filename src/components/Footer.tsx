import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SocialLinks from "@/components/SocialLinks";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Process", href: "/process" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

const Footer = () => {
  const { ref, isVisible } = useScrollReveal({ once: true });

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 } as const,
    animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <footer
      ref={ref}
      className="relative bg-navy-deepest text-foreground border-t border-gold/15 overflow-hidden"
    >
      {/* Subtle gold grid */}
      <div className="absolute inset-0 bg-gold-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="relative section-padding max-w-[1400px] mx-auto pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10">
          {/* Brand */}
          <motion.div className="md:col-span-5" {...fade(0)}>
            <Link to="/" className="inline-block mb-5">
              <span className="font-heading text-2xl md:text-3xl font-semibold tracking-tightest text-foreground">
                Bitwell<span className="text-gold">Forge</span>
              </span>
            </Link>
            <p className="font-quote italic text-[17px] md:text-lg text-muted-foreground leading-[1.55] max-w-sm mb-8">
              Revenue infrastructure. Built to compound.
            </p>
            <SocialLinks size={16} animate />
          </motion.div>

          {/* Nav */}
          <motion.div className="md:col-span-7 md:text-right" {...fade(0.12)}>
            <h4 className="text-[10px] tracking-[0.28em] uppercase text-gold mb-5 md:pr-0">Navigate</h4>
            <ul className="space-y-3 md:ml-auto md:inline-block md:text-left">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-[13.5px] text-muted-foreground hover:text-gold transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="h-px w-0 bg-gold/60 transition-all duration-400 group-hover:w-3" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Gold divider */}
        <div className="mt-16 mb-6 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-[11.5px]">
          <p className="text-muted-foreground/70">
            © {new Date().getFullYear()} BitwellForge. All rights reserved.
          </p>
          <p className="font-quote italic text-gold/80 text-[13px]">Crafted To Last</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
