import { ArrowDown } from "@/components/icons/ArrowDown";
import { cn } from "@/lib/cn";

export type DividerColor = "gris" | "sarcelle";

const colors: Record<DividerColor, string> = {
  gris: "text-gris",
  sarcelle: "text-sarcelle",
};

export function SectionDivider({ color }: { color: DividerColor }) {
  return (
    <ArrowDown className={cn("reveal-drop absolute -top-39 left-1/2 z-10 h-63 w-auto -translate-x-1/2", colors[color])} />
  );
}
