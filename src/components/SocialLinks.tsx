import { Instagram, Linkedin, Mail } from "lucide-react";

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
    label: "Instagram",
    href: "https://www.instagram.com/bitwellforge?igsh=MXZwaGRsNms4c3Q1Yg%3D%3D&utm_source=qr",
    icon: Instagram,
    isCustom: false,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/bitwellforge/",
    icon: Linkedin,
    isCustom: false,
  },
  {
    label: "X",
    href: "https://x.com/bitwellforge?s=21",
    icon: XIcon,
    isCustom: true,
  },
  {
    label: "Email",
    href: "mailto:v@bitwellforge.com",
    icon: Mail,
    isCustom: false,
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
          {s.isCustom ? <s.icon size={size} /> : <s.icon size={size} strokeWidth={1.5} />}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
