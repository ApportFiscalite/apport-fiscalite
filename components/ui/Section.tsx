import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { type DividerColor, SectionDivider } from "./SectionDivider";

export type Tone = "chair" | "sarcelle" | "gris" | "foret";

const tones: Record<Tone, string> = {
  chair: "bg-chair text-foret [--heading:var(--color-sapin)] [--focus:var(--color-sapin)]",
  sarcelle: "bg-sarcelle text-chair [--heading:var(--color-chair)] [--focus:var(--color-chair)]",
  gris: "bg-gris text-foret [--heading:var(--color-sapin)] [--focus:var(--color-sapin)]",
  foret: "bg-foret text-gris [--heading:var(--color-chair)] [--focus:var(--color-chair)]",
};

type SectionProps = ComponentProps<"section"> & {
  tone: Tone;
  divider?: DividerColor;
  decor?: ReactNode;
};

export function Section({ tone, divider, decor, className, children, ...props }: SectionProps) {
  return (
    <section className={cn("relative isolate", tones[tone], className)} {...props}>
      {divider && <SectionDivider color={divider} />}
      {decor && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {decor}
        </div>
      )}
      {children}
    </section>
  );
}
