"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useLayoutEffect, useRef } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from "@/components/ui/Drawer";
import { privacySourceLink, setPrivacyDrawerOpen, transitionPrivacyDrawer } from "./privacyTransition";

const closeReasons = new Set(["close-press", "outside-press", "escape-key", "close-watcher"]);

type PrivacyDrawerProps = {
  title: string;
  closeLabel: string;
  children: ReactNode;
};

export function PrivacyDrawer({ title, closeLabel, children }: PrivacyDrawerProps) {
  const router = useRouter();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    scrollAreaRef.current?.scrollTo({ top: 0, behavior: "instant" });
    setPrivacyDrawerOpen(true);
    return () => setPrivacyDrawerOpen(false);
  }, []);

  return (
    <Drawer
      open
      onOpenChange={(open, details) => {
        if (open || !closeReasons.has(details.reason)) return;
        transitionPrivacyDrawer(false, () => router.back());
      }}
    >
      <DrawerContent data-privacy-drawer="" finalFocus={() => privacySourceLink() ?? true} className="pt-16">
        <DrawerClose
          aria-label={closeLabel}
          className="absolute top-20 right-20 z-20 grid size-48 cursor-pointer place-items-center rounded-pill bg-foret text-chair transition-[background-color,color,scale] duration-200 hover:bg-chair hover:text-foret active:scale-[0.94] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chair lg:top-32 lg:right-40 lg:size-56"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="size-24 lg:size-28">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
          </svg>
        </DrawerClose>
        <div ref={scrollAreaRef} className="mask-fade-top min-h-0 flex-1 overflow-y-auto overscroll-contain px-gutter pt-40 pb-80 [--mask-fade-max:calc(var(--spacing)*96)] lg:pt-64 lg:pb-120 lg:[--mask-fade-max:calc(var(--spacing)*120)]">
          <article className="mx-auto max-w-736 text-body [--policy-border:var(--color-gris)] [--policy-heading:var(--color-chair)] [--policy-link:var(--color-chair)]">
            <DrawerTitle data-privacy-title="" className="pr-56 text-display font-black text-chair">
              {title}
            </DrawerTitle>
            <div className="privacy-drawer-body">{children}</div>
          </article>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
