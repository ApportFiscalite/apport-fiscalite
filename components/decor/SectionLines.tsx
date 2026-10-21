import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { BackgroundLine, type BackgroundLineVariant } from "./BackgroundLine";

type Placement = { x: number; width: number } & ({ y: number; bottom?: never } | { bottom: number; y?: never });

export type LinePlacement = {
  variant: BackgroundLineVariant;
  mobile: Placement;
  desktop: Placement;
};

type SectionLinesProps = {
  lines: readonly LinePlacement[];
  className: string;
};

export function SectionLines({ lines, className }: SectionLinesProps) {
  return lines.map(({ variant, mobile, desktop }) => (
    <BackgroundLine
      key={`${variant}-${desktop.x}-${desktop.width}`}
      variant={variant}
      className={cn(
        "absolute h-auto max-w-none",
        "top-[--spacing(var(--line-my))] bottom-[--spacing(var(--line-mb))] left-[--spacing(var(--line-mx))] w-[--spacing(var(--line-mw))]",
        "lg:top-[--spacing(var(--line-dy))] lg:bottom-[--spacing(var(--line-db))] lg:left-[--spacing(var(--line-dx))] lg:w-[--spacing(var(--line-dw))]",
        className,
      )}
      style={
        {
          "--line-mx": mobile.x,
          "--line-my": mobile.y,
          "--line-mb": mobile.bottom,
          "--line-mw": mobile.width,
          "--line-dx": desktop.x,
          "--line-dy": desktop.y,
          "--line-db": desktop.bottom,
          "--line-dw": desktop.width,
        } as CSSProperties
      }
    />
  ));
}
