import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { endDeparture } from "@/components/vault/vault-entry";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // Any receding state from a Forge Vault activation ends with the route change.
    endDeparture();
  }, [pathname]);


  return null;
};

export default ScrollToTop;
