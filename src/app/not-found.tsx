'use client';

import { useState } from 'react';
import { useViewTransition } from '../hooks/useViewTransition';
import NavBar from './components/NavBar';
import ViewTransitionLink from '@/components/ViewTransitionLink';

export default function NotFound() {
  const viewTransition = useViewTransition();
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const handleNotFoundClick = () => {
    viewTransition(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <NavBar currentPage="" />
      <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8 relative">
          <div 
            onClick={handleNotFoundClick}
            className={`text-9xl font-bold bg-gradient-to-r ${
              isAnimating 
                ? 'from-purple-600 to-pink-600' 
                : 'from-blue-600 to-purple-600'
            } bg-clip-text text-transparent animate-pulse cursor-pointer transition-all duration-300 hover:scale-110`}
            style={{ viewTransitionName: 'error-code' }}
          >
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`w-32 h-32 ${
              isAnimating ? 'bg-pink-500/20' : 'bg-blue-500/20'
            } rounded-full blur-3xl animate-ping`}></div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Page Not Found
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Oops! The page you&apos;re looking for seems to have vanished into the digital void.
            Perhaps it took a smooth transition elsewhere? 🚀
          </p>

          {/* Helpful Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <ViewTransitionLink
              href="/"
              onMouseEnter={() => setHoveredButton('home')}
              onMouseLeave={() => setHoveredButton(null)}
              className={`group flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg transition-all duration-200 border-2 ${
                hoveredButton === 'home'
                  ? 'bg-blue-700 border-blue-800 shadow-xl scale-105'
                  : 'bg-blue-600 border-blue-700 shadow-lg'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </ViewTransitionLink>

            <ViewTransitionLink
              href="/for-ai"
              onMouseEnter={() => setHoveredButton('info')}
              onMouseLeave={() => setHoveredButton(null)}
              className={`group flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg transition-all duration-200 border-2 ${
                hoveredButton === 'info'
                  ? 'bg-purple-800 border-purple-900 shadow-xl scale-105'
                  : 'bg-purple-700 border-purple-800 shadow-lg'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Site Info
            </ViewTransitionLink>
          </div>

          {/* Quick Navigation */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Or explore our demos:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <ViewTransitionLink
                href="/panel-transition"
                onMouseEnter={() => setHoveredButton('panel')}
                onMouseLeave={() => setHoveredButton(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
                  hoveredButton === 'panel'
                    ? 'bg-blue-700 border-blue-800 text-white scale-105 shadow-lg'
                    : 'bg-blue-600 border-blue-700 text-white shadow-md'
                }`}
              >
                Panel Transitions
              </ViewTransitionLink>
              <ViewTransitionLink
                href="/card-animation"
                onMouseEnter={() => setHoveredButton('card')}
                onMouseLeave={() => setHoveredButton(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
                  hoveredButton === 'card'
                    ? 'bg-purple-800 border-purple-900 text-white scale-105 shadow-lg'
                    : 'bg-purple-700 border-purple-800 text-white shadow-md'
                }`}
              >
                Card Animations
              </ViewTransitionLink>
              <ViewTransitionLink
                href="/list-reorder"
                onMouseEnter={() => setHoveredButton('list')}
                onMouseLeave={() => setHoveredButton(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
                  hoveredButton === 'list'
                    ? 'bg-green-800 border-green-900 text-white scale-105 shadow-lg'
                    : 'bg-green-700 border-green-800 text-white shadow-md'
                }`}
              >
                List Reordering
              </ViewTransitionLink>
            </div>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>✨ Fun fact: Even this 404 page uses view transitions! Try clicking the 404 text above!</p>
        </div>
      </div>
    </div>
  </div>
  );
}

