import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import FilmGrain from "@/components/FilmGrain";
import GoldLightBleed from "@/components/GoldLightBleed";
import LoadingSequence from "@/components/LoadingSequence";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useState, useCallback } from "react";

const Layout = () => {
  const location = useLocation();
  useSmoothScroll();

  const [showLoading, setShowLoading] = useState(() => {
    if (typeof sessionStorage !== "undefined") {
      return !sessionStorage.getItem("bwf-loaded");
    }
    return false;
  });

  const handleLoadingComplete = useCallback(() => {
    setShowLoading(false);
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem("bwf-loaded", "1");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-body">
      {showLoading && <LoadingSequence onComplete={handleLoadingComplete} />}
      <CustomCursor />
      <ScrollProgress />
      <FilmGrain />
      <GoldLightBleed />
      <Header />
      <main className="flex-1" style={{ opacity: showLoading ? 0 : 1, transition: "opacity 0.5s ease" }}>
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
