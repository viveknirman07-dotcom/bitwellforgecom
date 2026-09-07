import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import MovingCursor from "@/components/MovingCursor";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const Layout = () => {
  const location = useLocation();
  useSmoothScroll();

  return (
    <div className="min-h-screen flex flex-col font-body">
      <MovingCursor />
      <Header />
      <main className="flex-1">
        {/* Forge Vault runs its own entry choreography, so the global wipe is skipped there. */}
        {location.pathname === "/forge-vault" ? (
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
    </div>
  );
};

export default Layout;
