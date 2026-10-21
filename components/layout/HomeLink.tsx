"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { isPlainClick } from "@/lib/isPlainClick";

type HomeLinkProps = Omit<ComponentProps<typeof Link>, "href">;

export function HomeLink({ onClick, ...props }: HomeLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || pathname !== "/" || !isPlainClick(event)) return;
        event.preventDefault();
        if (window.location.hash) window.history.replaceState(window.history.state, "", "/");
        window.scrollTo({ top: 0 });
      }}
      {...props}
    />
  );
}
