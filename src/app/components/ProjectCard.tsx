import { useState } from "react";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  gradient: string;
  delay: number;
  isVisible: boolean;
  features: string[];
  status: string;
  completion: string;
  demoUrl?: string;
  githubUrl?: string;
  onFlip: (callback: () => void) => void;
}

export default function ProjectCard({ 
  title, 
  description, 
  technologies, 
  gradient, 
  delay, 
  isVisible,
  features,
  status,
  completion,
  demoUrl,
  githubUrl,
  onFlip,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    onFlip(() => {
      setIsFlipped(!isFlipped);
    });
  };

  const getStatusColor = () => {
    switch (status) {
    case "Production": return "bg-green-800 text-white"; // WCAG AA compliant
    case "Live": return "bg-green-800 text-white"; // WCAG AA compliant
    case "Beta": return "bg-yellow-800 text-white"; // WCAG AA compliant (was yellow-500 - poor contrast)
    case "Development": return "bg-blue-600 text-white"; // WCAG AA compliant
    default: return "bg-gray-600 text-white";
    }
  };

  return (
    <div
      className={`perspective-1000 transform transition-all duration-700 ease-out ${
        isVisible 
          ? "opacity-100 translate-y-0 scale-100" 
          : "opacity-0 translate-y-8 scale-95"
      } ${isHovered ? "scale-105 shadow-2xl" : "scale-100 shadow-xl"}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className={`relative transform-style-preserve-3d transition-transform duration-500 ${
        isFlipped ? "rotate-y-180" : "rotate-y-0"
      }`} style={{ transformStyle: "preserve-3d" }}>
        
        {/* Front Side */}
        <div className={`backface-hidden bg-gradient-to-br ${gradient} p-6 rounded-xl text-white h-full cursor-pointer transition-all duration-300 ${
          isHovered ? "brightness-110" : "brightness-100"
        }`}>
          <h3 className="text-xl font-semibold mb-3">
            {title}
          </h3>
          <p className="mb-4 opacity-90">
            {description}
          </p>
          <div className="flex gap-2 flex-wrap mb-4">
            {technologies.map((tech, index) => (
              <span
                key={tech}
                className="bg-white/20 px-3 py-1 rounded-full text-sm transition-all duration-300 hover:bg-white/30"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="text-sm opacity-75 mt-6 text-center">
            👆 Click to see details
          </div>
        </div>

        {/* Back Side */}
        <div 
          className={`absolute inset-0 backface-hidden bg-gradient-to-br ${gradient} rounded-xl text-white cursor-pointer overflow-hidden`}
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          <div className="h-full overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-white/10">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{title}</h3>
              <span className={`${getStatusColor()} px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 shadow-md`}>
                {status}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Completion</span>
                <span className="font-semibold">{completion}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{ width: completion }}
                />
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2 opacity-90">Key Features:</h4>
              <ul className="text-sm space-y-1">
                {features.map((feature) => (
                  <li key={feature} className="opacity-90">• {feature}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2 mt-6">
              {demoUrl && (
                <a 
                  href={demoUrl} 
                  className="flex-1 bg-white/20 hover:bg-white/30 text-center py-2 rounded-lg text-sm font-medium transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  🚀 Demo
                </a>
              )}
              {githubUrl && (
                <a 
                  href={githubUrl} 
                  className="flex-1 bg-white/20 hover:bg-white/30 text-center py-2 rounded-lg text-sm font-medium transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  💻 Code
                </a>
              )}
            </div>

            <div className="text-xs opacity-75 mt-4 text-center pb-2">
              👆 Click to flip back
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 