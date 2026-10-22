"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const revealSelector = ".reveal-up, .reveal-left, .reveal-draw, .reveal-wipe, .reveal-drop, .reveal-zoom, .reveal-icon";

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const reachedOrPassed = entry.isIntersecting || entry.boundingClientRect.bottom < 0;
          if (!reachedOrPassed) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    document.querySelectorAll(revealSelector).forEach((element) => {
      if (!element.hasAttribute("data-revealed")) observer.observe(element);
    });
    document.documentElement.setAttribute("data-reveal-ready", "");

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
