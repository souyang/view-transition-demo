import { startTransition } from 'react';

// Type for the View Transition API
interface ViewTransition {
  finished: Promise<void>;
  ready: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition(): void;
}

// Extend Document interface only if not already defined
declare global {
  interface Document {
    startViewTransition(callback: () => void | Promise<void>): ViewTransition;
  }
}

export function useViewTransition() {
  return (updateFn: () => void) => {
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      document.startViewTransition(() => {
        startTransition(updateFn);
      });
    } else {
      startTransition(updateFn);
    }
  };
}

