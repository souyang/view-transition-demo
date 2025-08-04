interface CTAButton {
  label: string;
  path: string;
  color: string;
  hoverColor: string;
}

interface CTASectionProps {
  title: string;
  description: string;
  buttons: CTAButton[];
  onNavigate: (path: string) => void;
}

export default function CTASection({ title, description, buttons, onNavigate }: CTASectionProps) {
  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl">
      <h3 className="text-xl font-semibold mb-3 text-yellow-700 dark:text-yellow-300">
        {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {description}
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        {buttons.map((button) => (
          <button
            key={button.path}
            onClick={() => onNavigate(button.path)}
            className={`px-6 py-3 ${button.color} hover:${button.hoverColor} text-white rounded-lg transition-colors`}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
} 