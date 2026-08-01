import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  as?: "div" | "figure" | "article" | "section";
}

const GlassPanel = ({ children, className, as: Tag = "div" }: Props) => (
  <Tag className={cn("glass-panel rounded-none", className)}>{children}</Tag>
);

export default GlassPanel;
