import { useState } from "react";

interface InfoPanelProps {
  title: string;
  children: React.ReactNode;
  isVisible: boolean;
  onToggle: () => void;
}

export default function InfoPanel({ title, children, isVisible, onToggle }: InfoPanelProps) {
  const [isFlipping, setIsFlipping] = useState(false);

  const handleToggle = () => {
    setIsFlipping(true);
    setTimeout(() => {
      onToggle();
      setTimeout(() => setIsFlipping(false), 300);
    }, 150);
  };

  return (
    <div className="relative h-48 perspective-1000">
      <div 
        className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
          isVisible ? 'rotate-y-0' : 'rotate-y-180'
        }`}
        style={{
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Front of card (visible state) */}
        <div 
          className={`absolute w-full h-full backface-hidden ${
            isVisible ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-300`}
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl h-full">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300">
                {title}
              </h3>
              <button
                onClick={handleToggle}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors cursor-pointer"
                disabled={isFlipping}
              >
                Hide
              </button>
            </div>
            {children}
          </div>
        </div>

        {/* Back of card (hidden state) */}
        <div 
          className={`absolute w-full h-full backface-hidden rotate-y-180 ${
            isVisible ? 'opacity-0' : 'opacity-100'
          } transition-opacity duration-300`}
        >
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl h-full">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
                {title}
              </h3>
              <button
                onClick={handleToggle}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors cursor-pointer"
                disabled={isFlipping}
              >
                Show
              </button>
            </div>
            <div className="flex items-center justify-center h-32">
              <div className="text-center">
                <div className="text-4xl mb-2">🔄</div>
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  Click &quot;Show&quot; to reveal content
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 