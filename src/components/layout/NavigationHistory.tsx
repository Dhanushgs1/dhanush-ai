"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const NavigationHistoryContext = createContext(false);

/**
 * Tracks, for this tab's lifetime, whether the visitor has moved between at
 * least two in-app routes. Mounted once in the root layout, which persists
 * across client-side navigations (unlike the page components below it), so
 * a route change anywhere flips this to true. `window.history.length` can't
 * be used for this: browsers count an initial blank entry too, so it's
 * already >1 even on a page opened directly from a shared link.
 */
export function NavigationHistoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const firstPathname = useRef(pathname);
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (pathname !== firstPathname.current) setHasNavigated(true);
  }, [pathname]);

  return (
    <NavigationHistoryContext.Provider value={hasNavigated}>
      {children}
    </NavigationHistoryContext.Provider>
  );
}

/** True once this tab has navigated between at least two in-app routes. */
export function useHasInAppHistory() {
  return useContext(NavigationHistoryContext);
}
