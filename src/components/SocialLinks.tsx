import { Instagram, Linkedin, Twitter, Mail } from "lucide-react";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/bitwellforge?igsh=MXZwaGRsNms4c3Q1Yg%3D%3D&utm_source=qr",
    icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/bitwellforge/",
    icon: Linkedin,
  },
  {
    label: "X",
    href: "https://x.com/bitwellforge?s=21",
    icon: Twitter,
  },
  {
    label: "Email",
    href: "mailto:v@bitwellforge.com",
    icon: Mail,
  },
];

const SocialLinks = ({ size = 18 }: { size?: number }) => {
  return (
    <div className="flex items-center gap-4">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target={s.href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noopener noreferrer"
          aria-label={s.label}
          className="text-muted-foreground hover:text-foreground hover:scale-105 transition-all duration-300"
        >
          <s.icon size={size} strokeWidth={1.5} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
