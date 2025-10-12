import { startTransition } from 'react';

declare global {
  interface Document {
    startViewTransition?: (cb: () => void) => void;
  }
}

export function useViewTransition() {
  return (updateFn: () => void) => {
    if (typeof document !== 'undefined' && document.startViewTransition) {
      document.startViewTransition(() => {
        startTransition(updateFn);
      });
    } else {
      startTransition(updateFn);
    }
  };
}

