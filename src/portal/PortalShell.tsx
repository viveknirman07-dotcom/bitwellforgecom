import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogOut, Moon, Sun } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/Eyebrow";
import { useAuth } from "@/hooks/use-auth";
import { useDarkMode } from "@/hooks/use-dark-mode";
import VaultStage from "@/components/vault/VaultStage";
import { Button } from "@/components/ui/button";


interface Props {
  title: string;
  eyebrow: string;
  variant?: "vault" | "affiliate";
  children: ReactNode;
}

/**
 * Private environments reuse the public BitwellForge chrome and design system.
 * Only the colour palette is swapped, via the `.portal` token overrides.
 */
const PortalShell = ({ title, eyebrow, variant = "vault", children }: Props) => {
  const { user, signOut } = useAuth();
  const { isDark, toggle } = useDarkMode();

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

  if (variant === "vault") {
    return (
      <VaultStage>
        <div className="portal vault-workspace-shell font-body min-h-screen">
          <header className="vault-workspace-header">
            <Link to="/" className="vault-workspace-brand" aria-label="BitwellForge home">
              <span>BitwellForge</span>
              <span>Forge Vault</span>
            </Link>
            <span className="vault-workspace-context">Private library</span>
            <div className="vault-workspace-account">
              {user?.email && <span className="vault-workspace-email">{user.email}</span>}
              <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme" title="Toggle theme">
                {isDark ? <Sun /> : <Moon />}
              </Button>
              <Button variant="ghost" size="icon" onClick={signOut} aria-label="Sign out" title="Sign out">
                <LogOut />
              </Button>
            </div>
          </header>
          <main className="vault-workspace-main" aria-label={title}>
            {children}
          </main>
        </div>
      </VaultStage>
    );
  }

  return (
    <VaultStage>
      <div
        className={`portal ${variant === "affiliate" ? "portal--affiliate" : ""} font-body min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          <section className="section-padding pt-28 pb-12 md:pt-40 md:pb-16">
            <div className="max-w-[1100px] mx-auto">
              <div data-vault-reveal="lede">
                <Eyebrow>{eyebrow}</Eyebrow>
              </div>
              <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
                <h1
                  data-vault-reveal="title"
                  className="font-heading text-4xl md:text-6xl font-semibold tracking-tight text-foreground text-balance"
                >
                  {title}
                </h1>
                {user && (
                  <div data-vault-reveal="secondary" className="flex items-center gap-5">
                    <span className="hidden sm:inline text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                      {user.email}
                    </span>
                    <button
                      onClick={signOut}
                      className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="section-padding pb-24 md:pb-36">
            <div data-vault-reveal="primary" className="max-w-[1100px] mx-auto">
              {children}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </VaultStage>
  );
};


export default PortalShell;
