import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/cormorant-garamond/600.css";
import "./index.css";
import "./styles/density.css";

createRoot(document.getElementById("root")!).render(<App />);
