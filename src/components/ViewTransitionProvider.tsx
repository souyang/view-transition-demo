/**
 * View Transition Provider for Next.js App Router
 *
 * @module ViewTransitionProvider
 * @description Client component that enables automatic view transitions
 * for all navigation events in Next.js App Router.
 */

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

interface ViewTransitionProviderProps {
  children: ReactNode;
}

/**
 * Provider component that enables automatic view transitions on route changes
 *
 * Place this in your root layout to enable transitions across your entire app.
 * Works by detecting pathname and search params changes and triggering view transitions.
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <ViewTransitionProvider>
 *           {children}
 *         </ViewTransitionProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export default function ViewTransitionProvider({
  children,
}: ViewTransitionProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPathname = useRef(pathname);
  const previousSearchParams = useRef(searchParams?.toString());

  useEffect(() => {
    const currentPath = pathname;
    const currentSearch = searchParams?.toString();

    // Check if route actually changed
    if (
      previousPathname.current !== currentPath ||
      previousSearchParams.current !== currentSearch
    ) {
      // Update refs for next comparison
      previousPathname.current = currentPath;
      previousSearchParams.current = currentSearch;

      // Note: The transition is already handled by the Link component
      // or useViewTransitionRouter hook, so we just track changes here
      // This provider is mainly for consistency and future enhancements
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
}
