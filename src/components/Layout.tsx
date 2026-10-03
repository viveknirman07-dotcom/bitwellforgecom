import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import MovingCursor from "@/components/MovingCursor";
import CookieConsent from "@/components/CookieConsent";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const Layout = () => {
  const location = useLocation();
  useSmoothScroll();

  return (
    <div className="min-h-screen flex flex-col font-body">
      <MovingCursor />
      <Header />
      <main className="flex-1">
        {/* The homepage and Forge Vault run their own entry choreography. */}
        {location.pathname === "/" || location.pathname === "/forge-vault" ? (
          <Outlet />
        ) : (
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        )}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Layout;
