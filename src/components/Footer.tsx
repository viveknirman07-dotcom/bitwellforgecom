import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SocialLinks from "@/components/SocialLinks";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const Footer = () => {
  const { ref, isVisible } = useScrollReveal({ once: true });

  const stagger = (i: number, base = 0.1) => ({
    initial: { opacity: 0, y: 24 } as const,
    animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.6, delay: base + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <footer ref={ref} className="border-t border-border bg-background/80 backdrop-blur-sm">
      <div className="section-padding max-w-[1400px] mx-auto py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <motion.h3
              className="font-heading text-lg font-semibold mb-3 text-foreground"
              {...stagger(0, 0.1)}
            >
              BitwellForge
            </motion.h3>
            <motion.p
              className="text-muted-foreground text-[13px] leading-relaxed max-w-sm mb-5"
              {...stagger(1, 0.1)}
            >
              Strategic growth systems designed for clarity, consistency, and long term impact.
            </motion.p>
            <SocialLinks size={16} animate />
          </div>

          <motion.div {...stagger(0, 0.25)}>
            <h4 className="text-[13px] font-semibold mb-3 text-foreground tracking-wide">Navigate</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "About", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Case Studies", href: "/case-studies" },
                { label: "Process", href: "/process" },
                { label: "Insights", href: "/insights" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-[13px] text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300"
                  style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div {...stagger(1, 0.25)}>
            <h4 className="text-[13px] font-semibold mb-3 text-foreground tracking-wide">Connect</h4>
            <div className="flex flex-col gap-2.5">
              <Link
                to="/contact?service=General+Inquiry"
                className="text-[13px] text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300"
                style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              >
                Start the Conversation
              </Link>
              <a
                href="mailto:v@bitwellforge.com"
                className="text-[13px] text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300"
                style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              >
                v@bitwellforge.com
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BitwellForge. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Designed for clarity.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
