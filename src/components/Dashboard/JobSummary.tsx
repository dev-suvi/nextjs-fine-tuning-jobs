import React from "react";

interface JobSummaryProps {
  completed: number;
  running: number;
  failed: number;
}

interface SummaryDataItem {
  label: string;
  count: number;
  color: string;
  stroke: string;
}

const JOB_STYLES: Record<string, { bg: string; stroke: string }> = {
  Completed: { bg: "bg-green-500", stroke: "#10b981" },
  Running: { bg: "bg-blue-500", stroke: "#3b82f6" },
  Failed: { bg: "bg-red-500", stroke: "#ef4444" },
};

const createSummaryData = (
  completed: number,
  running: number,
  failed: number
): SummaryDataItem[] => [
  {
    label: "Completed",
    count: completed,
    color: JOB_STYLES.Completed.bg,
    stroke: JOB_STYLES.Completed.stroke,
  },
  {
    label: "Running",
    count: running,
    color: JOB_STYLES.Running.bg,
    stroke: JOB_STYLES.Running.stroke,
  },
  {
    label: "Failed",
    count: failed,
    color: JOB_STYLES.Failed.bg,
    stroke: JOB_STYLES.Failed.stroke,
  },
];

export default function JobSummary({
  completed,
  running,
  failed,
}: JobSummaryProps) {
  const summaryData = createSummaryData(completed, running, failed);
  const total = summaryData.reduce((acc, item) => acc + item.count, 0);

  if (total === 0) {
    return (
      <div className="w-full p-4 border border-gray-200 rounded-lg mb-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Fine-tuning usage</h3>
        <p className="text-sm text-gray-500">No jobs to display.</p>
      </div>
    );
  }

  let accumulatedPercent = 0;
  const renderedCircles = summaryData.map((item) => {
    const percent = (item.count / total) * 100;
    const circleElement = (
      <circle
        key={item.label}
        cx="18"
        cy="18"
        r="15.9155"
        fill="none"
        strokeDasharray={`${percent} ${100 - percent}`}
        strokeDashoffset={100 - accumulatedPercent}
        strokeWidth="3.8"
        strokeLinecap="round"
        stroke={item.stroke}
      />
    );
    accumulatedPercent += percent;
    return circleElement;
  });

  return (
    <div className="w-full p-4 border border-gray-200 rounded-lg mb-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Fine-tuning usage</h3>
      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 36 36" className="w-full h-full">
            <circle
              cx="18"
              cy="18"
              r="15.9155"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3.8"
            />
            {renderedCircles}
          </svg>
        </div>

        <div>
          {summaryData.map((item) => (
            <div key={item.label} className="flex items-center gap-2 mb-1">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-sm">
                {item.label}: {item.count} jobs
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
