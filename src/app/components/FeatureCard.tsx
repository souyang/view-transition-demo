interface FeatureCardProps {
  title: string;
  description: string;
  gradient: string;
  icon?: string;
}

export default function FeatureCard({ title, description, gradient, icon }: FeatureCardProps) {
  return (
    <div className={`bg-gradient-to-br ${gradient} p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      {icon ? <div className="text-3xl mb-3">{icon}</div> : null}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white/90">{description}</p>
    </div>
  );
} 