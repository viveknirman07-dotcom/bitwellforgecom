import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// Foundry type system: Space Grotesk (display), IBM Plex Sans (body),
// IBM Plex Mono (utility/labels), IBM Plex Serif (italic quotes).
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/ibm-plex-sans/300.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-serif/400-italic.css";
import "@fontsource/ibm-plex-serif/500-italic.css";

import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
