"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useNavDirection, type NavDirection } from "./NavigationHistory";

/**
 * Keeps rendering the route that was on screen when this subtree mounted.
 * Without it, Next.js swaps the outgoing page's content for the incoming one
 * the moment navigation starts, so an exit animation would animate the wrong
 * page. (Internal context, but stable across Next 13–15.)
 */
function FrozenRouter({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;
  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;

/*
 * Forward (opening a project) feels like entering a new interface: the new
 * page rises in from slightly below and out of focus. Back reverses it: the
 * current page drops away and the previous one settles in from above.
 */
const variants: Variants = {
  initial: (direction: NavDirection) => ({
    opacity: 0,
    y: direction === "back" ? -14 : 18,
    scale: direction === "back" ? 1.006 : 0.992,
    filter: "blur(6px)",
  }),
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.34, ease: EASE },
    // A lingering filter/transform would make this wrapper a containing
    // block and compositing layer for the whole page.
    transitionEnd: { filter: "none", transform: "none" },
  },
  exit: (direction: NavDirection) => ({
    opacity: 0,
    y: direction === "back" ? 16 : -12,
    filter: "blur(4px)",
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
  }),
};

const reducedVariants: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

/** Last scroll offset per route, for restoring it on Back. */
const scrollPositions = new Map<string, number>();

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const direction = useNavDirection();
  const reduced = useReducedMotion();
  // Skip the wrapper's own entrance on first load (the hero has its own boot
  // sequence). Deliberately not AnimatePresence `initial={false}`: that flag
  // flows down through context and would cancel every entrance animation on
  // the page, not just this wrapper's.
  const firstRender = useRef(true);
  // The route actually on screen — lags `pathname` during the exit animation.
  const displayed = useRef(pathname);
  const latest = useRef(pathname);
  const nodes = useRef(new Map<string, HTMLElement>());
  /** Scroll offset of the outgoing page at the moment navigation began. */
  const outgoingScroll = useRef<number | null>(null);

  if (latest.current !== pathname) {
    // The route just changed. Capture where the outgoing page was scrolled to
    // now, during render — Next.js scrolls it to the top in the commit phase.
    if (latest.current === displayed.current) {
      scrollPositions.set(displayed.current, window.scrollY);
      outgoingScroll.current = window.scrollY;
    }
    latest.current = pathname;
  }

  /**
   * Next.js resets the scroll position while the outgoing page is still
   * fading out, which would make it snap to its top first. Shift the page by
   * the same amount so it stays visually still for its exit.
   */
  function pinOutgoingPage() {
    if (outgoingScroll.current === null) return;
    const node = nodes.current.get(displayed.current);
    const delta = outgoingScroll.current - window.scrollY;
    if (node) node.style.marginTop = delta ? `${-delta}px` : "";
  }

  useLayoutEffect(pinOutgoingPage);

  useEffect(() => {
    firstRender.current = false;
    // The outgoing page stays mounted while it animates out, so the browser's
    // own restoration would scroll the wrong (shorter) document. Own it.
    window.history.scrollRestoration = "manual";

    let frame = 0;
    const onScroll = () => {
      if (displayed.current !== latest.current) pinOutgoingPage();
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        // Mid-transition scrolls belong to neither page.
        if (displayed.current !== latest.current) return;
        scrollPositions.set(displayed.current, window.scrollY);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /** Runs as the incoming page starts to fade in: it is mounted, still invisible. */
  function placeIncomingPage() {
    displayed.current = pathname;
    outgoingScroll.current = null;
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const target = hash ? document.getElementById(hash) : null;
    const saved = scrollPositions.get(pathname);

    if (direction === "back" && saved !== undefined) {
      window.scrollTo({ top: saved, behavior: "instant" });
    } else if (target) {
      target.scrollIntoView({ behavior: "instant", block: "start" });
    } else if (direction === "forward") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={pathname}
        ref={(node: HTMLDivElement | null) => {
          if (node) nodes.current.set(pathname, node);
          else nodes.current.delete(pathname);
        }}
        custom={direction}
        variants={reduced ? reducedVariants : variants}
        initial={firstRender.current ? false : "initial"}
        animate="enter"
        exit="exit"
        onAnimationStart={(definition) => {
          if (definition === "enter" && !firstRender.current) placeIncomingPage();
        }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
