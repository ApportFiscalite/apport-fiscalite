"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const activationLine = 0.35;

function findSections(ids: readonly string[]) {
  return ids
    .map((id) => document.getElementById(id))
    .filter((section) => section !== null)
    .filter((section) => section.getClientRects().length > 0);
}

function findActiveSection(sections: readonly HTMLElement[]) {
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
    const sections = findSections(ids);
    const update = () => setActiveId(findActiveSection(sections));

    const observer = new IntersectionObserver(update, {
      rootMargin: `0px 0px -${(1 - activationLine) * 100}% 0px`,
    });
    sections.forEach((section) => observer.observe(section));

    update();
    window.addEventListener("scrollend", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("scrollend", update);
    };
  }, [ids, pathname]);

  return activeId;
}
