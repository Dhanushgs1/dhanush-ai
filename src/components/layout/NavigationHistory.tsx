"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export type NavDirection = "forward" | "back";

type NavigationHistory = { hasNavigated: boolean; direction: NavDirection };

const NavigationHistoryContext = createContext<NavigationHistory>({
  hasNavigated: false,
  direction: "forward",
});

/**
 * Tracks, for this tab's lifetime, whether the visitor has moved between at
 * least two in-app routes, and whether the latest move came from history
 * traversal (Back/Forward, `router.back()`) or a fresh push. Mounted once in
 * the root layout, which persists across client-side navigations.
 *
 * `window.history.length` can't answer "is there somewhere to go back to":
 * browsers count an initial blank entry, so it is already >1 on a page opened
 * directly from a shared link.
 */
export function NavigationHistoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const committedPathname = useRef(pathname);
  const popPending = useRef(false);
  const [state, setState] = useState<NavigationHistory>({
    hasNavigated: false,
    direction: "forward",
  });

  useEffect(() => {
    const onPop = () => {
      popPending.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Resolved during render so the page transition picks the right variant on
  // the same render that swaps the route; popstate always fires before
  // Next.js commits the new pathname.
  const changing = pathname !== committedPathname.current;
  const direction: NavDirection = changing
    ? popPending.current
      ? "back"
      : "forward"
    : state.direction;

  useEffect(() => {
    if (pathname === committedPathname.current) return;
    committedPathname.current = pathname;
    setState({
      hasNavigated: true,
      direction: popPending.current ? "back" : "forward",
    });
    popPending.current = false;
  }, [pathname]);

  return (
    <NavigationHistoryContext.Provider
      value={{ hasNavigated: state.hasNavigated, direction }}
    >
      {children}
    </NavigationHistoryContext.Provider>
  );
}

/** True once this tab has navigated between at least two in-app routes. */
export function useHasInAppHistory() {
  return useContext(NavigationHistoryContext).hasNavigated;
}

/** Direction of the most recent route change. */
export function useNavDirection() {
  return useContext(NavigationHistoryContext).direction;
}
