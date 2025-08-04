import { FAQItem } from "../data/FAQData";

interface FAQAccordionProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQAccordion({ faq, isOpen, onToggle }: FAQAccordionProps) {
  const handleToggle = () => {
    // Use View Transitions API if available
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as Document & { startViewTransition: (callback: () => void) => void }).startViewTransition(() => {
        onToggle();
      });
    } else {
      // Fallback for browsers that don't support View Transitions
      onToggle();
    }
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={handleToggle}
        className="w-full px-6 py-4 text-left bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 hover:from-green-100 hover:to-teal-100 dark:hover:from-green-800/30 dark:hover:to-teal-800/30 transition-all duration-300 flex justify-between items-center"
      >
        <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
          {faq.question}
        </h3>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          ▼
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          viewTransitionName: `faq-${faq.id}` // Unique transition name for each FAQ
        }}
      >
        <div className="px-6 py-4 bg-white/50 dark:bg-gray-800/50">
          <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
          <span className="inline-block mt-3 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm rounded-full">
            {faq.category}
          </span>
        </div>
      </div>
    </div>
  );
} 