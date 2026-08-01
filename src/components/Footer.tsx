import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SocialLinks from "@/components/SocialLinks";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const columns = [
  {
    heading: "Practice",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Process", href: "/process" },
    ],
  },
  {
    heading: "Evidence",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Insights", href: "/insights" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const Footer = () => {
  const { ref, isVisible } = useScrollReveal({ once: true });

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 18 } as const,
    animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <footer ref={ref} className="relative bg-background text-foreground">
      <div className="hairline-rule" />
      <div className="sheet-inner section-padding pb-12 pt-20 md:pt-24">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 md:gap-10">
          <motion.div className="col-span-2 md:col-span-1" {...fade(0)}>
            <Link to="/" className="mb-5 inline-block">
              <span className="font-heading text-2xl font-semibold tracking-tightest text-foreground">
                Bitwell<span className="text-gold">Forge</span>
              </span>
            </Link>
            <p className="mb-8 max-w-xs text-[14px] font-light leading-[1.7] text-muted-foreground">
              Revenue infrastructure. Built to compound.
            </p>
            <SocialLinks size={16} animate />
          </motion.div>

          {columns.map((col, i) => (
            <motion.div key={col.heading} {...fade(0.08 * (i + 1))}>
              <h4 className="mb-5 text-[10px] uppercase tracking-[0.28em] text-muted-foreground/60">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="text-[13.5px] text-muted-foreground transition-colors duration-300 hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="hairline-t mt-16 flex flex-col items-center justify-between gap-3 pt-6 text-[11.5px] md:flex-row">
          <p className="text-muted-foreground/70">
            © {new Date().getFullYear()} BitwellForge. All rights reserved.
          </p>
          <p className="text-[12px] text-muted-foreground/70">Crafted To Last</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
