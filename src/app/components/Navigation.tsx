"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface NavigationProps {
  currentPage: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const navigateWithTransition = (path: string) => {
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      setIsNavigating(true);
      (document as Document & { startViewTransition: (callback: () => void) => void }).startViewTransition(() => {
        router.push(path);
        // Reset navigation state after transition
        setTimeout(() => setIsNavigating(false), 100);
      });
    } else {
      router.push(path);
    }
  };

  const getButtonClass = (page: string) => {
    const baseClass = "px-4 py-2 rounded-lg transition-all";
    return currentPage === page
      ? `${baseClass} bg-blue-600 text-white`
      : `${baseClass} bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800`;
  };

  return (
    <nav className="p-6">
      <div className="max-w-4xl mx-auto flex gap-4">
        <button
          onClick={() => navigateWithTransition("/")}
          className={getButtonClass("home")}
          disabled={isNavigating}
        >
          {isNavigating ? "Navigating..." : "Home"}
        </button>
        <button
          onClick={() => navigateWithTransition("/about")}
          className={getButtonClass("about")}
          disabled={isNavigating}
        >
          {isNavigating ? "Navigating..." : "About"}
        </button>
        <button
          onClick={() => navigateWithTransition("/projects")}
          className={getButtonClass("projects")}
          disabled={isNavigating}
        >
          {isNavigating ? "Navigating..." : "Projects"}
        </button>
        <button
          onClick={() => navigateWithTransition("/reorder")}
          className={getButtonClass("reorder")}
          disabled={isNavigating}
        >
          {isNavigating ? "Navigating..." : "Reorder"}
        </button>
      </div>
    </nav>
  );
} 