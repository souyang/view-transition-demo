import Image from "next/image";

interface HeroSectionProps {
  title: string;
  description: string;
  logoSrc?: string;
  logoAlt?: string;
}

export default function HeroSection({ title, description, logoSrc, logoAlt }: HeroSectionProps) {
  return (
    <div className="text-center">
      {logoSrc ? <Image
        className="dark:invert mx-auto mb-8"
        src={logoSrc}
        alt={logoAlt || "Logo"}
        width={200}
        height={42}
        priority
      /> : null}
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        {description}
      </p>
    </div>
  );
} 