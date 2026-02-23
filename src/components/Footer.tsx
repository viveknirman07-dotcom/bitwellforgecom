import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="section-padding max-w-[1400px] mx-auto py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="font-heading text-xl font-semibold mb-4 text-foreground">BitwellForge</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Strategic growth systems designed for clarity, consistency, and long-term impact.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground tracking-wide">Navigate</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "About", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Process", href: "/process" },
                { label: "Insights", href: "/insights" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground tracking-wide">Connect</h4>
            <div className="flex flex-col gap-3">
              <Link
                to="/contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Book a Strategy Call
              </Link>
              <span className="text-sm text-muted-foreground">hello@bitwellforge.com</span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BitwellForge. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Designed for clarity.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
