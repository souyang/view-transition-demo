"use client";

import { useRouter } from "next/navigation";
import { useViewTransition } from "../../hooks/useViewTransition";

interface NavigationProps {
  currentPage: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
  const router = useRouter();
  const viewTransition = useViewTransition();

  const navigateWithTransition = (path: string) => {
    viewTransition(() => {
      router.push(path);
    });
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
        >
          Home
        </button>
        <button
          onClick={() => navigateWithTransition("/about")}
          className={getButtonClass("about")}
        >
          About
        </button>
        <button
          onClick={() => navigateWithTransition("/projects")}
          className={getButtonClass("projects")}
        >
          Projects
        </button>
        <button
          onClick={() => navigateWithTransition("/reorder")}
          className={getButtonClass("reorder")}
        >
          Reorder
        </button>
      </div>
    </nav>
  );
} 