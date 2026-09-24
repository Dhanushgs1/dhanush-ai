"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useHasInAppHistory } from "@/components/layout/NavigationHistory";

/**
 * Returns a navigation function that behaves like the browser "Back" button:
 * it returns to whichever page the visitor actually came from. If this tab
 * has no earlier in-app history entry — e.g. the page was opened directly
 * from a shared link or a new tab — `history.back()` would have nowhere
 * valid to land, so it falls back to `fallbackHref` instead.
 */
export function useSmartBack(fallbackHref: string) {
  const router = useRouter();
  const hasHistory = useHasInAppHistory();

  return useCallback(() => {
    if (hasHistory) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  }, [router, fallbackHref, hasHistory]);
}
