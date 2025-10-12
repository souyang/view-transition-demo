export interface ProjectCard {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  gradient: string;
  delay: number;
  // Back side details
  features: string[];
  status: string;
  completion: string;
  demoUrl?: string;
  githubUrl?: string;
}

export const projects: ProjectCard[] = [
  {
    id: 1,
    title: "E-commerce Site",
    description: "Smooth transitions between product listings and detail pages",
    technologies: ["React", "Next.js"],
    gradient: "from-purple-600 to-purple-800",
    delay: 0,
    features: [
      "Shopping Cart",
      "Product Search",
      "User Reviews",
      "Payment Integration",
    ],
    status: "Production",
    completion: "100%",
    demoUrl: "#demo",
    githubUrl: "#github",
  },
  {
    id: 2,
    title: "Portfolio",
    description: "Animated transitions between different portfolio sections",
    technologies: ["TypeScript", "Tailwind"],
    gradient: "from-pink-600 to-pink-800",
    delay: 100,
    features: ["Project Showcase", "Contact Form", "Blog Section", "Dark Mode"],
    status: "Live",
    completion: "100%",
    demoUrl: "#demo",
    githubUrl: "#github",
  },
  {
    id: 3,
    title: "Dashboard",
    description: "Smooth navigation between different dashboard views",
    technologies: ["Vue.js", "Vite"],
    gradient: "from-blue-600 to-blue-800",
    delay: 200,
    features: [
      "Real-time Charts",
      "Data Export",
      "User Management",
      "API Integration",
    ],
    status: "Beta",
    completion: "85%",
    demoUrl: "#demo",
    githubUrl: "#github",
  },
  {
    id: 4,
    title: "Blog Platform",
    description: "Elegant transitions between blog posts and categories",
    technologies: ["Svelte", "Kit"],
    gradient: "from-green-600 to-green-800",
    delay: 300,
    features: [
      "Markdown Editor",
      "SEO Optimization",
      "Comments System",
      "RSS Feed",
    ],
    status: "Production",
    completion: "100%",
    demoUrl: "#demo",
    githubUrl: "#github",
  },
  {
    id: 5,
    title: "Social Media App",
    description: "Fluid transitions between feed, profile, and messaging",
    technologies: ["React Native", "Expo"],
    gradient: "from-pink-600 to-pink-800",
    delay: 400,
    features: [
      "Real-time Messaging",
      "Photo Sharing",
      "Stories",
      "Push Notifications",
    ],
    status: "Development",
    completion: "70%",
    demoUrl: "#demo",
  },
  {
    id: 6,
    title: "Learning Platform",
    description: "Seamless navigation between courses and lessons",
    technologies: ["Angular", "RxJS"],
    gradient: "from-teal-600 to-teal-800",
    delay: 500,
    features: ["Video Lessons", "Progress Tracking", "Quizzes", "Certificates"],
    status: "Beta",
    completion: "90%",
    demoUrl: "#demo",
    githubUrl: "#github",
  },
]; 