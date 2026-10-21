import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "pill" | "badge" | "outline" | "solid";

const base =
  "inline-flex items-center justify-center text-center active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--focus,var(--color-sapin))";

const transitions = "transition-[filter,background-color,color,scale,border-radius] duration-200";

const gradient =
  "bg-[linear-gradient(to_bottom_right,var(--color-sarcelle)_45%,var(--color-sapin))] text-chair hover:brightness-110";

const variants: Record<ButtonVariant, string> = {
  pill: cn(
    base,
    transitions,
    "relative text-sarcelle data-[highlighted=true]:text-chair",
    "rounded-tr-[0.72em] rounded-bl-[0.72em] px-[0.56em] py-[0.28em] text-nav font-black leading-none tracking-[0.08em]",
    "lg:rounded-tr-[0.92em] lg:rounded-bl-[0.92em] lg:px-[1.1em] lg:py-[0.42em]",
  ),
  badge: cn(
    base,
    transitions,
    gradient,
    "rounded-tr-[1.1em] rounded-bl-[1.1em] px-[1.3em] py-[1.1em] text-action font-bold leading-none hover:rounded-tr-[1.6em] hover:rounded-bl-[1.6em]",
    "lg:rounded-tr-[1em] lg:rounded-bl-[1em] lg:px-[0.78em] lg:py-[0.54em] lg:leading-tight lg:hover:rounded-tr-[1.5em] lg:hover:rounded-bl-[1.5em]",
  ),
  outline: cn(
    base,
    "relative isolate rounded-tl-[1em] rounded-br-[1em] border border-sarcelle px-[1em] py-[0.48em] text-button text-sarcelle hover:text-chair",
    "[transition:color_150ms_ease-out,scale_200ms] hover:[transition:color_150ms_ease-out_120ms,scale_200ms]",
    "before:absolute before:inset-0 before:-z-10 before:origin-bottom-right before:scale-0 before:rounded-[inherit] before:bg-sarcelle before:opacity-0 before:[transition:opacity_150ms_ease-out,scale_0s_150ms]",
    "hover:before:scale-100 hover:before:opacity-100 hover:before:[transition:scale_320ms_cubic-bezier(0.22,1,0.36,1),opacity_0s]",
  ),
  solid: cn(
    base,
    transitions,
    gradient,
    "w-full rounded-tr-[0.9em] rounded-bl-[0.9em] py-[0.54em] text-action font-bold hover:rounded-tr-[1.5em] hover:rounded-bl-[1.5em] lg:py-[0.28em]",
  ),
};

type LinkButtonProps = { variant: ButtonVariant; href: string } & Omit<ComponentProps<"a">, "href">;
type NativeButtonProps = { variant: ButtonVariant; href?: undefined } & ComponentProps<"button">;

export function Button(props: LinkButtonProps | NativeButtonProps) {
  if (props.href !== undefined) {
    const { variant, href, className, ...rest } = props;
    const classes = cn(variants[variant], className);
    if (/^(mailto:|tel:|https?:)/.test(href)) {
      return <a href={href} className={classes} {...rest} />;
    }
    return <Link href={href} className={classes} {...rest} />;
  }
  const { variant, className, type = "button", ...rest } = props;
  return <button type={type} className={cn(variants[variant], "cursor-pointer", className)} {...rest} />;
}
