"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import FeatureCard from "./components/FeatureCard";
import CTASection from "./components/CTASection";

const features = [
  {
    title: "Smooth Transitions",
    description: "Elements smoothly animate between pages",
    gradient: "from-blue-500 to-blue-600",
    icon: "✨"
  },
  {
    title: "Performance",
    description: "Hardware-accelerated animations",
    gradient: "from-purple-500 to-purple-600",
    icon: "⚡"
  },
  {
    title: "Modern UX",
    description: "Enhanced user experience",
    gradient: "from-green-500 to-green-600",
    icon: "🎨"
  }
];

const ctaButtons = [
  {
    label: "Panel Transitions",
    path: "/panel-transition",
    color: "bg-blue-600",
    hoverColor: "bg-blue-700"
  },
  {
    label: "Card Animations",
    path: "/card-animation",
    color: "bg-purple-600",
    hoverColor: "bg-purple-700"
  },
  {
    label: "List Reordering",
    path: "/list-reorder",
    color: "bg-green-600",
    hoverColor: "bg-green-700"
  }
];

export default function HomePage() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const navigateWithTransition = (path: string) => {
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      setIsNavigating(true);
      (document as Document & { startViewTransition: (callback: () => void) => void }).startViewTransition(() => {
        router.push(path);
      });
    } else {
      router.push(path);
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <NavBar currentPage="home" />

      {/* Content */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
          <HeroSection
            title="Welcome to View Transitions Demo"
            description="Experience smooth transitions between different pages of this application. Click the navigation buttons above to see view transitions in action!"
            logoSrc="/next.svg"
            logoAlt="Next.js logo"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                gradient={feature.gradient}
                icon={feature.icon}
              />
            ))}
          </div>

          <CTASection
            title="Try the Navigation"
            description="Click on the &ldquo;About&rdquo; or &ldquo;Projects&rdquo; buttons in the navigation to experience smooth view transitions between pages."
            buttons={ctaButtons}
            onNavigate={navigateWithTransition}
          />
        </div>
      </main>
    </div>
  );
}
