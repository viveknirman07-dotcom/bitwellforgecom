import { useState } from "react";
import { useLocation } from "react-router-dom";
import HomePreloader from "@/components/home/HomePreloader";

// Plays the brand opening only when a visit begins on the homepage; lives outside the homepage itself.
export default function OpeningGate() {
  const { pathname } = useLocation();
  const [startedOnHome] = useState(() => pathname === "/");
  return startedOnHome ? <HomePreloader /> : null;
}
