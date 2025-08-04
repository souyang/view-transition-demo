"use client";

import NavBar from "../components/NavBar";
import FAQAccordion from "../components/FAQAccordion";
import InfoPanel from "../components/InfoPanel";
import LayoutToggle from "../components/LayoutToggle";
import { faqData } from "../data/FAQData";
import { useState, useCallback } from "react";

export default function AboutPage() {
  const [layoutMode, setLayoutMode] = useState<"grid" | "list">("grid");
  const [openFAQs, setOpenFAQs] = useState<number[]>([]);
  const [visiblePanels, setVisiblePanels] = useState({
    benefits: true,
    howItWorks: true,
    browserSupport: true,
  });

  const toggleFAQ = (id: number) => {
    setOpenFAQs(prev => 
      prev.includes(id) 
        ? prev.filter(faqId => faqId !== id)
        : [...prev, id],
    );
  };

  const togglePanel = (panel: keyof typeof visiblePanels) => {
    setVisiblePanels(prev => ({
      ...prev,
      [panel]: !prev[panel],
    }));
  };

  // Memoized callback functions to avoid react/jsx-no-bind warnings
  const handleShowAll = useCallback(() => {
    setVisiblePanels({
      benefits: true,
      howItWorks: true,
      browserSupport: true,
    });
  }, []);

  const handleToggleBenefits = useCallback(() => togglePanel("benefits"), [togglePanel]);
  const handleToggleHowItWorks = useCallback(() => togglePanel("howItWorks"), [togglePanel]);
  const handleToggleBrowserSupport = useCallback(() => togglePanel("browserSupport"), [togglePanel]);

  const handleToggleFAQ = useCallback((id: number) => {
    toggleFAQ(id);
  }, [toggleFAQ]);

  // Create memoized FAQ toggle functions
  const createFAQToggleHandler = useCallback((id: number) => {
    return () => handleToggleFAQ(id);
  }, [handleToggleFAQ]);

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-green-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      <NavBar currentPage="panel-transition" />

      {/* Content */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                About View Transitions
              </h1>
              {Object.values(visiblePanels).some(visible => !visible) && (
                <button
                  onClick={handleShowAll}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-md cursor-pointer"
                >
                  Show All
                </button>
              )}
            </div>
            <LayoutToggle 
              layoutMode={layoutMode}
              onLayoutChange={setLayoutMode}
            />
          </div>

          {/* Info Panels */}
          <div className={`space-y-4 transition-all duration-500 ${
            layoutMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"
          }`}>
            <InfoPanel 
              title="Benefits" 
              isVisible={visiblePanels.benefits}
              onToggle={handleToggleBenefits}
            >
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>• Smooth, hardware-accelerated animations</li>
                <li>• Better user experience with visual continuity</li>
                <li>• Reduced perceived loading time</li>
                <li>• Native browser support</li>
              </ul>
            </InfoPanel>

            <InfoPanel 
              title="How it works" 
              isVisible={visiblePanels.howItWorks}
              onToggle={handleToggleHowItWorks}
            >
              <p className="text-gray-700 dark:text-gray-300">
                The browser captures snapshots of the old and new states, then creates a smooth animation
                between them. This creates a seamless transition that feels natural and responsive.
              </p>
            </InfoPanel>

            <InfoPanel 
              title="Browser Support" 
              isVisible={visiblePanels.browserSupport}
              onToggle={handleToggleBrowserSupport}
            >
              <p className="text-gray-700 dark:text-gray-300">
                View Transitions API is currently supported in Chromium-based browsers (Chrome, Edge, Opera).
                For other browsers, the application gracefully falls back to instant transitions.
              </p>
            </InfoPanel>
          </div>

          {/* FAQ Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqData.map((faq) => (
                <FAQAccordion
                  key={faq.id}
                  faq={faq}
                  isOpen={openFAQs.includes(faq.id)}
                  onToggle={createFAQToggleHandler(faq.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 