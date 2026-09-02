import { Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-6.8-8.5L20 4h-2l-5.2 6.3L8 4H4z" />
  </svg>
);

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/bitwellforge/",
    icon: Linkedin,
    isCustom: false,
  },
  {
    label: "Email",
    href: "mailto:v@bitwellforge.com",
    icon: Mail,
    isCustom: false,
  },
];

const SocialLinks = ({ size = 18, animate = false }: { size?: number; animate?: boolean }) => {
  const { ref, isVisible } = useScrollReveal({ once: true });

  return (
    <div ref={ref} className="flex items-center gap-4">
      {socials.map((s, i) => (
        <motion.a
          key={s.label}
          href={s.href}
          target={s.href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noopener noreferrer"
          aria-label={s.label}
          className="text-muted-foreground hover:text-foreground transition-colors duration-300"
          initial={animate ? { opacity: 0, y: 10, scale: 0.8 } : false}
          animate={animate && isVisible ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.2, y: -3, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          {s.isCustom ? <s.icon size={size} /> : <s.icon size={size} strokeWidth={1.5} />}
        </motion.a>
      ))}
    </div>
  );
};

export default SocialLinks;
