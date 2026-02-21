/**
 * View Transition Link Component for Next.js
 *
 * @module ViewTransitionLink
 * @description Drop-in replacement for Next.js Link that automatically
 * applies view transitions to navigation.
 */

"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { type MouseEvent, type ReactNode } from "react";
import { useViewTransition } from "@/hooks/useViewTransition";

interface ViewTransitionLinkProps extends Omit<LinkProps, "onClick"> {
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  /**
   * Disable view transition for this specific link
   * @default false
   */
  disableTransition?: boolean;
}

/**
 * Enhanced Next.js Link component with automatic view transitions
 *
 * Acts as a drop-in replacement for Next.js Link but adds smooth
 * view transitions when navigating between pages.
 *
 * @example
 * ```tsx
 * import ViewTransitionLink from '@/components/ViewTransitionLink';
 *
 * <ViewTransitionLink href="/about">
 *   About Us
 * </ViewTransitionLink>
 * ```
 *
 * @example Disable transition for specific link
 * ```tsx
 * <ViewTransitionLink href="/external" disableTransition>
 *   No Transition
 * </ViewTransitionLink>
 * ```
 */
export default function ViewTransitionLink({
  children,
  href,
  disableTransition = false,
  onClick,
  ...props
}: ViewTransitionLinkProps) {
  const router = useRouter();
  const withTransition = useViewTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick if provided
    if (onClick) {
      onClick(e);
    }

    // Don't intercept if:
    // - Transition is disabled
    // - Link is modified with cmd/ctrl/shift
    // - Right click or middle click
    // - Default was prevented
    // - Link has target="_blank"
    if (
      disableTransition ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.button !== 0 ||
      e.defaultPrevented ||
      props.target === "_blank"
    ) {
      return;
    }

    // Prevent default navigation
    e.preventDefault();

    // Navigate with transition
    const destination = typeof href === "string" ? href : href.pathname || "/";

    withTransition(() => {
      router.push(destination);
    });
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
