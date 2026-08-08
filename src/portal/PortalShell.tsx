import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

interface Props {
  title: string;
  eyebrow: string;
  variant?: "vault" | "affiliate";
  children: ReactNode;
}

/** Shared private-environment chrome. Never indexed. */
const PortalShell = ({ title, eyebrow, variant = "vault", children }: Props) => {
  const { user, signOut } = useAuth();

  useEffect(() => {
    let el = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", "robots");
      document.head.appendChild(el);
    }
    el.setAttribute("content", "noindex, nofollow");
    document.title = `${title} — BitwellForge`;
    return () => el?.setAttribute("content", "index, follow");
  }, [title]);

  return (
    <div className={`portal ${variant === "affiliate" ? "portal--affiliate" : ""} font-body`}>
      <header className="border-b portal-line">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <Link to="/" className="font-heading text-lg md:text-xl tracking-tight">
            BitwellForge
          </Link>
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline text-[11px] tracking-[0.2em] uppercase portal-muted">
              {user?.email}
            </span>
            <button
              onClick={signOut}
              className="text-[11px] tracking-[0.2em] uppercase portal-muted hover:portal-gold transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[11px] tracking-[0.28em] uppercase portal-gold mb-5">{eyebrow}</p>
        <h1 className="font-heading text-3xl md:text-5xl tracking-tight portal-metal inline-block">
          {title}
        </h1>
        <div className="mt-14 md:mt-20">{children}</div>
      </main>

      <footer className="border-t portal-line">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 text-[11px] tracking-[0.18em] uppercase portal-muted">
          BitwellForge — Private environment
        </div>
      </footer>
    </div>
  );
};

export default PortalShell;
