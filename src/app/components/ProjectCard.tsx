import { useState } from "react";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  gradient: string;
  delay: number;
  isVisible: boolean;
}

export default function ProjectCard({ 
  title, 
  description, 
  technologies, 
  gradient, 
  delay, 
  isVisible 
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`transform transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
      } ${isHovered ? 'scale-105 shadow-2xl' : 'scale-100 shadow-xl'}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`bg-gradient-to-br ${gradient} p-6 rounded-xl text-white h-full cursor-pointer transition-all duration-300 ${
        isHovered ? 'brightness-110' : 'brightness-100'
      }`}>
        <h3 className="text-xl font-semibold mb-3 transition-all duration-300 ${
          isHovered ? 'scale-105' : 'scale-100'
        }">
          {title}
        </h3>
        <p className="mb-4 opacity-90 transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-90'
        }">
          {description}
        </p>
        <div className="flex gap-2 flex-wrap">
          {technologies.map((tech, index) => (
            <span
              key={tech}
              className="bg-white/20 px-3 py-1 rounded-full text-sm transition-all duration-300 hover:bg-white/30 hover:scale-105"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className={`mt-4 h-1 bg-white/30 rounded-full transition-all duration-500 ${
          isHovered ? 'w-full' : 'w-0'
        }`} />
      </div>
    </div>
  );
} 