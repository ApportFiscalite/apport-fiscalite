"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { site } from "@/content/site";
import { isPlainClick } from "@/lib/isPlainClick";
import { markPrivacySource, transitionPrivacyDrawer } from "./privacyTransition";

type PrivacyLinkProps = Omit<ComponentProps<typeof Link>, "href">;

export function PrivacyLink({ onClick, ...props }: PrivacyLinkProps) {
  const router = useRouter();
  const { href } = site.footer.privacy;

  return (
    <Link
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || !isPlainClick(event)) return;
        event.preventDefault();
        markPrivacySource(event.currentTarget);
        transitionPrivacyDrawer(true, () => router.push(href, { scroll: false }));
      }}
      {...props}
    />
  );
}
