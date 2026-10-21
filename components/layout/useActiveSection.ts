"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const activationLine = 0.35;

function findActiveSection(ids: readonly string[]) {
  const sections = ids
    .map((id) => document.getElementById(id))
    .filter((section) => section !== null)
    .filter((section) => section.getClientRects().length > 0);
  if (sections.length === 0) return null;

  const scrolledToBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (scrolledToBottom) return sections[sections.length - 1].id;

  const line = window.innerHeight * activationLine;
  return sections.findLast((section) => section.getBoundingClientRect().top <= line)?.id ?? null;
}

export function useActiveSection(ids: readonly string[]) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setActiveId(findActiveSection(ids)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids, pathname]);

  return activeId;
}
