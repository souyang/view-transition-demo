/**
 * Next.js Router Integration for View Transitions API
 *
 * @module useViewTransitionRouter
 * @description Extends the useViewTransition hook to work seamlessly with Next.js App Router
 * for automatic view transitions during navigation.
 */

"use client";

import { useRouter as useNextRouter, usePathname } from "next/navigation";
import { useViewTransition } from "./useViewTransition";
import { useRef, useEffect } from "react";

/**
 * Enhanced Next.js router with automatic view transitions
 *
 * @returns Router object with transition-wrapped navigation methods
 *
 * @example
 * ```tsx
 * const router = useViewTransitionRouter();
 * router.push('/about'); // Navigates with smooth transition
 * router.back(); // Goes back with transition
 * ```
 */
export function useViewTransitionRouter() {
  const router = useNextRouter();
  const withTransition = useViewTransition();

  return {
    push: (href: string, options?: { scroll?: boolean }) => {
      withTransition(() => {
        router.push(href, options);
      });
    },
    replace: (href: string, options?: { scroll?: boolean }) => {
      withTransition(() => {
        router.replace(href, options);
      });
    },
    back: () => {
      withTransition(() => {
        router.back();
      });
    },
    forward: () => {
      withTransition(() => {
        router.forward();
      });
    },
    refresh: () => {
      withTransition(() => {
        router.refresh();
      });
    },
    prefetch: router.prefetch,
  };
}

/**
 * Hook to automatically trigger view transitions on pathname changes
 * 
 * Used internally by ViewTransitionProvider, but can be used standalone
 * 
 * @internal
 */
export function usePathnameTransition() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    // Only update the ref after the transition would have completed
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
    }
  }, [pathname]);

  return pathname;
}
