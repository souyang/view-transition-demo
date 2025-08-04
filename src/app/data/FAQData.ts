export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What are View Transitions?",
    answer: "View Transitions API allows you to create smooth animations between different states of your application. It provides a way to animate between different views while maintaining visual continuity.",
    category: "basics",
  },
  {
    id: 2,
    question: "Which browsers support View Transitions?",
    answer: "View Transitions API is currently supported in Chromium-based browsers (Chrome, Edge, Opera). For other browsers, the application gracefully falls back to instant transitions.",
    category: "compatibility",
  },
  {
    id: 3,
    question: "How do I implement View Transitions?",
    answer: "Use document.startViewTransition() to wrap your DOM mutations. The browser will automatically create smooth animations between the old and new states.",
    category: "implementation",
  },
  {
    id: 4,
    question: "What are the performance benefits?",
    answer: "View Transitions provide hardware-accelerated animations that run at 60fps, reducing perceived loading time and creating a more polished user experience.",
    category: "performance",
  },
  {
    id: 5,
    question: "Can I customize the transition animations?",
    answer: "Yes! You can use CSS view-transition-name to create custom animations and control how elements transition between states.",
    category: "customization",
  },
  {
    id: 6,
    question: "What's the fallback for unsupported browsers?",
    answer: "For browsers that don't support View Transitions, your application will work normally with instant transitions. Always test your fallback behavior.",
    category: "compatibility",
  },
]; 