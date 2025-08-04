import { useState } from "react";
import { useRouter } from "next/navigation";

interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

interface NavBarProps {
  currentPage: string;
  title?: string;
  items?: NavItem[];
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { label: "Overview", path: "/", icon: "🏠" },
  { label: "Panel Transitions", path: "/panel-transition", icon: "ℹ️" },
  { label: "Card Animations", path: "/card-animation", icon: "💼" },
  { label: "List Reordering", path: "/list-reorder", icon: "🔄" },
];

export default function NavBar({ 
  currentPage, 
  title = "View Transitions Demo",
  items = defaultNavItems,
  className = "",
}: NavBarProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateWithTransition = (path: string) => {
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      setIsNavigating(true);
      (document as Document & { startViewTransition: (callback: () => void) => void }).startViewTransition(() => {
        router.push(path);
        setTimeout(() => setIsNavigating(false), 100);
      });
    } else {
      router.push(path);
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const getButtonClass = (page: string) => {
    const isActive = currentPage === page;
    const baseClass = "px-4 py-2 rounded-lg transition-all duration-300 font-medium cursor-pointer";
    
    if (isActive) {
      return `${baseClass} bg-blue-600 text-white shadow-lg hover:bg-blue-700`;
    }
    
    return `${baseClass} text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white`;
  };

  const getMobileButtonClass = (page: string) => {
    const isActive = currentPage === page;
    const baseClass = "w-full px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 text-left cursor-pointer";
    
    if (isActive) {
      return `${baseClass} bg-blue-600 text-white`;
    }
    
    return `${baseClass} text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`;
  };

  return (
    <nav className={`sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title Section */}
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
              {title}
            </h1>
            {isNavigating ? <div className="ml-3 flex items-center gap-2 text-blue-600">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs hidden sm:inline">Navigating...</span>
            </div> : null}
          </div>

          {/* Desktop Navigation - Text Only */}
          <div className="hidden md:flex items-center gap-2">
            {items.map((item) => (
              <button
                key={item.path}
                onClick={() => navigateWithTransition(item.path)}
                className={getButtonClass(item.path === "/" ? "home" : item.path.slice(1))}
                disabled={isNavigating}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`} />
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 mt-1 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`} />
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 mt-1 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Icons + Text */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="py-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            {items.map((item) => (
              <button
                key={item.path}
                onClick={() => navigateWithTransition(item.path)}
                className={getMobileButtonClass(item.path === "/" ? "home" : item.path.slice(1))}
                disabled={isNavigating}
              >
                {item.icon ? <span className="text-lg">{item.icon}</span> : null}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 