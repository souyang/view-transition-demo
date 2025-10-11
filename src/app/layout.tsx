import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import React from "react";
import StructuredData, { websiteSchema, organizationSchema, webApplicationSchema } from "./components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "View Transitions Demo - Next.js | Modern Web Animations",
    template: "%s | View Transitions Demo"
  },
  description: "Comprehensive demo showcasing the View Transitions API in Next.js 15 with React 19. Learn hardware-accelerated page transitions, smooth animations, and modern UX patterns with TypeScript and Tailwind CSS.",
  keywords: [
    "View Transitions API",
    "Next.js 15",
    "React 19",
    "Web Animations",
    "Page Transitions",
    "TypeScript",
    "Tailwind CSS",
    "Modern UX",
    "Hardware Acceleration",
    "Smooth Animations",
    "SPA Transitions",
    "document.startViewTransition",
    "CSS Transitions",
    "Progressive Enhancement"
  ],
  authors: [{ name: "View Transitions Demo" }],
  creator: "View Transitions Demo",
  publisher: "View Transitions Demo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "View Transitions Demo",
    title: "View Transitions Demo - Next.js | Modern Web Animations",
    description: "Comprehensive demo showcasing the View Transitions API in Next.js 15 with React 19. Learn hardware-accelerated page transitions and smooth animations.",
    images: [
      {
        url: "/next.svg",
        width: 1200,
        height: 630,
        alt: "View Transitions Demo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "View Transitions Demo - Next.js | Modern Web Animations",
    description: "Comprehensive demo showcasing the View Transitions API in Next.js 15 with React 19.",
    images: ["/next.svg"],
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3B82F6",
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <StructuredData data={websiteSchema} />
        <StructuredData data={organizationSchema} />
        <StructuredData data={webApplicationSchema} />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
