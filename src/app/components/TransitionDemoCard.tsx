import { useState } from "react";

interface TransitionDemoCardProps {
  title: string;
  description: string;
  effect: 'fade' | 'scale' | 'slide';
  color: 'purple' | 'pink' | 'blue';
}

export default function TransitionDemoCard({ 
  title, 
  description, 
  effect, 
  color 
}: TransitionDemoCardProps) {
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsActive(true);
    setIsVisible(false);
    
    setTimeout(() => {
      setIsVisible(true);
      setIsActive(false);
    }, 300);
  };

  const getColorClasses = () => {
    switch (color) {
      case 'purple': return 'bg-purple-500 hover:bg-purple-600';
      case 'pink': return 'bg-pink-500 hover:bg-pink-600';
      case 'blue': return 'bg-blue-500 hover:bg-blue-600';
      default: return 'bg-purple-500 hover:bg-purple-600';
    }
  };

  const getEffectClasses = () => {
    switch (effect) {
      case 'fade':
        return `transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`;
      case 'scale':
        return `transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-0'}`;
      case 'slide':
        return `transition-transform duration-300 ${isVisible ? 'translate-x-0' : 'translate-x-8'}`;
      default:
        return `transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`;
    }
  };

  return (
    <div className="text-center">
      <div 
        className={`w-20 h-20 ${getColorClasses()} rounded-lg mx-auto mb-3 cursor-pointer transition-all duration-300 ${getEffectClasses()} ${
          isActive ? 'shadow-lg' : 'shadow-md'
        }`}
        onClick={handleClick}
      >
        <div className="flex items-center justify-center h-full text-white font-semibold">
          {isVisible ? 'Click' : '...'}
        </div>
      </div>
      <h4 className="font-semibold text-gray-800 dark:text-white mb-1">{title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
} 