import React from 'react';

interface StructuredDataProps {
  data: object;
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Website Schema
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'View Transitions Demo',
  description: 'Comprehensive demo showcasing the View Transitions API in Next.js',
  url: 'https://yourdomain.com',
  inLanguage: 'en-US',
  copyrightYear: new Date().getFullYear(),
  author: {
    '@type': 'Organization',
    name: 'View Transitions Demo',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://yourdomain.com/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

// Organization Schema
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'View Transitions Demo',
  url: 'https://yourdomain.com',
  logo: 'https://yourdomain.com/next.svg',
  description: 'Demonstrating modern web animation techniques with View Transitions API',
  sameAs: [
    // Add your social media links here
  ],
};

// WebApplication Schema
export const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'View Transitions Demo',
  description: 'Interactive demo of View Transitions API with Next.js 15 and React 19',
  url: 'https://yourdomain.com',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  browserRequirements: 'Requires JavaScript. Works best in Chromium-based browsers.',
  softwareVersion: '0.1.0',
  screenshot: 'https://yourdomain.com/next.svg',
  featureList: [
    'Smooth Page Transitions',
    'Hardware-accelerated Animations',
    'Panel Transitions Demo',
    'Card Animation Demo',
    'List Reordering Demo',
    'Progressive Enhancement',
  ],
  author: {
    '@type': 'Organization',
    name: 'View Transitions Demo',
  },
};

// Breadcrumb Schema Generator
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// FAQ Schema Generator
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// HowTo Schema Generator
export function generateHowToSchema(name: string, description: string, steps: Array<{ name: string; text: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

// TechArticle Schema Generator
export function generateTechArticleSchema(
  title: string,
  description: string,
  datePublished: string,
  dateModified: string,
  url: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    datePublished,
    dateModified,
    url,
    author: {
      '@type': 'Organization',
      name: 'View Transitions Demo',
    },
    publisher: {
      '@type': 'Organization',
      name: 'View Transitions Demo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yourdomain.com/next.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

