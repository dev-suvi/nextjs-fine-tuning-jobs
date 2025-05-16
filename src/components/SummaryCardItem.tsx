import React from "react";

interface SummaryCardItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}

const SummaryCardItem: React.FC<SummaryCardItemProps> = ({
  icon,
  title,
  subtitle,
}) => {
  return (
    <div className="flex items-start gap-3 p-4 border border-gray-400 rounded-lg">
      <div className="mt-1">{icon}</div>
      <div>
        <div className="font-medium text-gray-800">{title}</div>
        {subtitle && (
          <div className="text-sm text-gray-500 mt-0.5">{subtitle}</div>
        )}
      </div>
    </div>
  );
};

export default SummaryCardItem;
