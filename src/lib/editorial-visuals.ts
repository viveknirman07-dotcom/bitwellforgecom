import chessKnight from "@/assets/photos/editorial/chess-knight.jpg";
import coins from "@/assets/photos/editorial/coins.jpg";
import gears from "@/assets/photos/editorial/gears.jpg";
import signalTower from "@/assets/photos/editorial/signal-tower.jpg";
import nautilus from "@/assets/photos/editorial/nautilus.jpg";
import lighthouse from "@/assets/photos/editorial/lighthouse-lens.jpg";
import balance from "@/assets/photos/editorial/balance-scale.jpg";
import column from "@/assets/photos/editorial/column-compass.jpg";
import towers from "@/assets/photos/editorial/towers.jpg";
import bridge from "@/assets/photos/editorial/bridge.jpg";
import lever from "@/assets/photos/editorial/lever-panel.jpg";

type Visual = { src: string; alt: string };

/** Additional editorial collages matched to insight subject matter. */
const byCategory: Record<string, Visual> = {
  "Strategy": { src: chessKnight, alt: "Chess knight standing on a torn architectural plan" },
  "Commercial Strategy": { src: chessKnight, alt: "Chess knight standing on a torn architectural plan" },
  "Revenue Infrastructure": { src: coins, alt: "Column of stacked coins against orange and charcoal paper" },
  "Sales Systems": { src: balance, alt: "Precision balance scale on navy and yellow paper" },
  "Growth Operations": { src: gears, alt: "Interlocking gears and a watch movement on olive paper" },
  "Acquisition": { src: signalTower, alt: "Radio tower sending red signal arcs" },
  "Lead Generation": { src: signalTower, alt: "Radio tower sending red signal arcs" },
  "Outbound": { src: lever, alt: "Row of industrial lever switches beside an orange circle" },
  "Demand": { src: lighthouse, alt: "Lighthouse lens circled by cobalt glass discs" },
  "Growth": { src: nautilus, alt: "Nautilus shell cross section on olive and cream paper" },
  "Positioning": { src: towers, alt: "Three distinct towers on a plinth before a red circle" },
  "Offer Clarity": { src: lighthouse, alt: "Lighthouse lens circled by cobalt glass discs" },
  "Foundations": { src: column, alt: "Compass resting on a classical stone column" },
};

export const editorialVisualFor = (category: string): Visual =>
  byCategory[category] ?? { src: bridge, alt: "Steel bridge truss emerging from a cobalt circle" };
