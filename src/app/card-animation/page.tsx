"use client";

import NavBar from "../components/NavBar";
import ProjectCard from "../components/ProjectCard";
import TransitionDemoCard from "../components/TransitionDemoCard";
import { projects } from "../data/ProjectData";
import { useState, useEffect } from "react";

export default function ProjectsPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade in animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <NavBar currentPage="projects" />

      {/* Content */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
          <h1 className={`text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Project Examples
          </h1>
          
          <p className={`text-gray-600 dark:text-gray-300 mb-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Explore these projects with realistic fade transitions and hover effects
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                {...project}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Interactive Transition Demo */}
          <div className={`mt-12 p-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-700 dark:to-gray-600 rounded-xl transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Interactive Transition Demo
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Click the buttons below to see different transition effects in action
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TransitionDemoCard 
                title="Fade Effect"
                description="Smooth opacity transitions"
                effect="fade"
                color="purple"
              />
              <TransitionDemoCard 
                title="Scale Effect"
                description="Transform scale animations"
                effect="scale"
                color="pink"
              />
              <TransitionDemoCard 
                title="Slide Effect"
                description="Translate position changes"
                effect="slide"
                color="blue"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 