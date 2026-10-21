"use client";

import { type FocusEvent, type PointerEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { useActiveSection } from "./useActiveSection";

const contactHref = "/#contact";

const sectionId = (href: string) => href.slice(href.indexOf("#") + 1);

const sectionIds = site.nav.map((item) => sectionId(item.href));

const clickLockFallbackMs = 1600;

function placeIndicator(indicator: HTMLElement, link: HTMLElement | null) {
  if (!link) {
    indicator.dataset.visible = "false";
    return;
  }
  const appearing = indicator.dataset.visible !== "true";
  if (appearing) indicator.style.transitionProperty = "opacity";
  indicator.style.translate = `${link.offsetLeft}px ${link.offsetTop}px`;
  indicator.style.width = `${link.offsetWidth}px`;
  indicator.style.height = `${link.offsetHeight}px`;
  if (appearing) {
    indicator.getBoundingClientRect();
    indicator.style.transitionProperty = "";
  }
  indicator.dataset.visible = "true";
}

export function Nav() {
  const activeId = useActiveSection(sectionIds);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [focusedHref, setFocusedHref] = useState<string | null>(null);
  const [clickedHref, setClickedHref] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const links = site.nav.filter((item) => item.href !== contactHref);
  const contact = site.nav.find((item) => item.href === contactHref);
  const activeHref = site.nav.find((item) => sectionId(item.href) === activeId)?.href ?? null;
  const targetHref = hoveredHref ?? focusedHref ?? clickedHref ?? activeHref;

  useEffect(() => {
    if (!clickedHref) return;
    const release = () => setClickedHref(null);
    const timeout = window.setTimeout(release, clickLockFallbackMs);
    window.addEventListener("scrollend", release, { once: true });
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("scrollend", release);
    };
  }, [clickedHref]);

  useLayoutEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;
    const place = () =>
      placeIndicator(indicator, targetHref ? list.querySelector<HTMLElement>(`a[href="${targetHref}"]`) : null);
    place();
    const observer = new ResizeObserver(place);
    observer.observe(list);
    return () => observer.disconnect();
  }, [targetHref]);

  const itemProps = (href: string) => ({
    href,
    "aria-current": href === activeHref ? ("location" as const) : undefined,
    "data-highlighted": href === targetHref,
    onPointerEnter: (event: PointerEvent) => {
      if (event.pointerType === "mouse") setHoveredHref(href);
    },
    onFocus: (event: FocusEvent<HTMLAnchorElement>) => {
      if (event.currentTarget.matches(":focus-visible")) setFocusedHref(href);
    },
    onBlur: () => setFocusedHref(null),
    onClick: () => setClickedHref(href),
  });

  return (
    <nav aria-label="Navigation principale" className="lg:mr-95">
      <ul
        ref={listRef}
        role="list"
        onPointerLeave={() => setHoveredHref(null)}
        className="relative isolate flex items-center justify-between lg:gap-130"
      >
        <span
          ref={indicatorRef}
          aria-hidden="true"
          data-visible="false"
          className="pointer-events-none absolute top-0 left-0 -z-10 rounded-tr-[0.72em] rounded-bl-[0.72em] bg-[linear-gradient(to_bottom_right,var(--color-sarcelle)_45%,var(--color-sapin))] text-nav opacity-0 transition-[translate,width,height,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[visible=true]:opacity-100 lg:rounded-tr-[0.92em] lg:rounded-bl-[0.92em]"
        />
        {links.map((item) => (
          <li key={item.href}>
            <Button variant="pill" {...itemProps(item.href)} className="mx-[-0.56em] lg:mx-[-1.1em]">
              {item.label}
            </Button>
          </li>
        ))}
        {contact && (
          <li className="lg:-ml-28">
            <Button variant="pill" {...itemProps(contact.href)}>
              {contact.label}
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
}
