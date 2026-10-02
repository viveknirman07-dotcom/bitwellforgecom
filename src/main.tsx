import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/density.css";
import "./styles/public-editorial.css";

createRoot(document.getElementById("root")!).render(<App />);
