export interface ProjectCard {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  gradient: string;
  delay: number;
}

export const projects: ProjectCard[] = [
  {
    id: 1,
    title: "E-commerce Site",
    description: "Smooth transitions between product listings and detail pages",
    technologies: ["React", "Next.js"],
    gradient: "from-purple-500 to-purple-600",
    delay: 0
  },
  {
    id: 2,
    title: "Portfolio",
    description: "Animated transitions between different portfolio sections",
    technologies: ["TypeScript", "Tailwind"],
    gradient: "from-pink-500 to-pink-600",
    delay: 100
  },
  {
    id: 3,
    title: "Dashboard",
    description: "Smooth navigation between different dashboard views",
    technologies: ["Vue.js", "Vite"],
    gradient: "from-blue-500 to-blue-600",
    delay: 200
  },
  {
    id: 4,
    title: "Blog Platform",
    description: "Elegant transitions between blog posts and categories",
    technologies: ["Svelte", "Kit"],
    gradient: "from-green-500 to-green-600",
    delay: 300
  },
  {
    id: 5,
    title: "Social Media App",
    description: "Fluid transitions between feed, profile, and messaging",
    technologies: ["React Native", "Expo"],
    gradient: "from-orange-500 to-orange-600",
    delay: 400
  },
  {
    id: 6,
    title: "Learning Platform",
    description: "Seamless navigation between courses and lessons",
    technologies: ["Angular", "RxJS"],
    gradient: "from-teal-500 to-teal-600",
    delay: 500
  }
]; 