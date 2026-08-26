import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { clearVaultCurtain } from "@/components/vault/vault-entry";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    clearVaultCurtain();
  }, [pathname]);


  return null;
};

export default ScrollToTop;
