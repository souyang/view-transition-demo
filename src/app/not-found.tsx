import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8 relative">
          <div className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-ping"></div>
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
            <Link 
              href="/"
              className="group flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </Link>

            <Link 
              href="/for-ai"
              className="group flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Site Info
            </Link>
          </div>

          {/* Quick Navigation */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Or explore our demos:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link 
                href="/panel-transition"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm transition-colors"
              >
                Panel Transitions
              </Link>
              <Link 
                href="/card-animation"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm transition-colors"
              >
                Card Animations
              </Link>
              <Link 
                href="/list-reorder"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm transition-colors"
              >
                List Reordering
              </Link>
            </div>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>✨ Fun fact: Even this 404 page uses view transitions!</p>
        </div>
      </div>
    </div>
  );
}

