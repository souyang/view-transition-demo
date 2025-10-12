/**
 * View Transitions API Hook for React 19
 *
 * @module useViewTransition
 * @description A production-ready React hook that integrates the native View Transitions API
 * with React 19's concurrent features for smooth, hardware-accelerated UI transitions.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
 * @see https://react.dev/reference/react/startTransition
 */

import { startTransition } from "react";

/**
 * View Transition API Interface
 *
 * Represents the return value of document.startViewTransition()
 * Provides control and lifecycle hooks for view transitions
 *
 * @interface ViewTransition
 */
interface ViewTransition {
  /** Promise that resolves when the transition animation completes */
  finished: Promise<void>;
  /** Promise that resolves when pseudo-elements are created and animation is about to start */
  ready: Promise<void>;
  /** Promise that resolves when the callback completes */
  updateCallbackDone: Promise<void>;
  /** Method to skip the transition and jump to the end state */
  skipTransition(): void;
}

/**
 * Global type augmentation for the View Transitions API
 *
 * Extends the Document interface with the experimental View Transitions API
 * This declaration is compatible with TypeScript's lib.dom.d.ts
 */
declare global {
  interface Document {
    /**
     * Starts a view transition capturing before/after states
     *
     * @param callback - Function that updates the DOM (can be sync or async)
     * @returns ViewTransition object for controlling the transition
     */
    startViewTransition(callback: () => void | Promise<void>): ViewTransition;
  }
}

/**
 * Custom React hook for View Transitions with React 19 concurrent features
 *
 * @returns A function that wraps state updates with view transitions
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const viewTransition = useViewTransition();
 *   const [count, setCount] = useState(0);
 *
 *   const increment = () => {
 *     viewTransition(() => {
 *       setCount(c => c + 1);
 *     });
 *   };
 *
 *   return <button onClick={increment}>{count}</button>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Navigation with transitions
 * const router = useRouter();
 * const viewTransition = useViewTransition();
 *
 * const navigate = (path: string) => {
 *   viewTransition(() => {
 *     router.push(path);
 *   });
 * };
 * ```
 *
 * @remarks
 * - Uses native View Transitions API when available (Chrome 111+, Edge 111+)
 * - Falls back to React.startTransition for unsupported browsers
 * - Wraps updates in React.startTransition for optimal React 19 concurrent rendering
 * - Hardware-accelerated animations via the browser's compositor
 * - Set viewTransitionName in CSS/inline styles to customize specific element transitions
 *
 * @performance
 * - Zero-cost abstraction: Falls back gracefully without View Transitions API
 * - Leverages React 19's concurrent features to prevent blocking the main thread
 * - Hardware acceleration via CSS transforms (not JavaScript)
 *
 * @browserSupport
 * - Chrome/Edge: 111+ (full support)
 * - Safari: Not yet supported (graceful fallback)
 * - Firefox: Not yet supported (graceful fallback)
 */
export function useViewTransition() {
  return (updateFn: () => void) => {
    // Check for both browser environment and API availability
    // Note: Feature detection is more reliable than browser sniffing
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      // Native View Transitions API available
      // Captures "before" snapshot, runs callback, captures "after" snapshot,
      // then animates between them using browser compositor
      document.startViewTransition(() => {
        // Wrap in React.startTransition to mark as non-urgent update
        // This allows React 19 to prioritize user interactions over this transition
        // preventing the UI from feeling sluggish during heavy updates
        startTransition(updateFn);
      });
    } else {
      // Graceful fallback for unsupported browsers
      // Still benefits from React 19's concurrent features
      // Updates happen instantly without visual transition
      startTransition(updateFn);
    }
  };
}
