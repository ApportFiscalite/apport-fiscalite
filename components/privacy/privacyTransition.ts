const openAttribute = "data-privacy-open";

const sourceAttribute = "data-privacy-source";

const directionAttribute = "data-privacy-transition";

const settleTimeoutMs = 2000;

export function setPrivacyDrawerOpen(open: boolean) {
  document.documentElement.toggleAttribute(openAttribute, open);
}

function privacyDrawerIsOpen() {
  return document.documentElement.hasAttribute(openAttribute);
}

export function privacySourceLink() {
  return document.querySelector<HTMLElement>(`[${sourceAttribute}]`);
}

export function markPrivacySource(link: HTMLElement) {
  privacySourceLink()?.removeAttribute(sourceAttribute);
  link.setAttribute(sourceAttribute, "");
}

function canAnimate() {
  return (
    typeof document.startViewTransition === "function" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function waitForDrawer(open: boolean) {
  return new Promise<void>((resolve) => {
    if (privacyDrawerIsOpen() === open) return resolve();
    const observer = new MutationObserver(() => {
      if (privacyDrawerIsOpen() !== open) return;
      finish();
    });
    const timeout = window.setTimeout(() => finish(), settleTimeoutMs);
    function finish() {
      observer.disconnect();
      window.clearTimeout(timeout);
      resolve();
    }
    observer.observe(document.documentElement, { attributes: true, attributeFilter: [openAttribute] });
  });
}

export function transitionPrivacyDrawer(open: boolean, navigate: () => void) {
  if (!canAnimate()) {
    navigate();
    return;
  }
  const root = document.documentElement;
  root.setAttribute(directionAttribute, open ? "opening" : "closing");
  const transition = document.startViewTransition(async () => {
    navigate();
    await waitForDrawer(open);
  });
  transition.finished.finally(() => root.removeAttribute(directionAttribute));
}
