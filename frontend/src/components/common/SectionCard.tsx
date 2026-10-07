interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900">
        {title}
      </h2>

      <div className="mt-4">
        {children}
      </div>
    </div>
  );
}

export default SectionCard;