import React from "react";
import type { Job } from "@/lib/types";
import Button from "@/components/UI/Button";
import { BiEraser } from "react-icons/bi";
import NoSSR from "../NoSSR";

const statusColors = {
  Running: "bg-yellow-100 text-yellow-800",
  Completed: "bg-green-100 text-green-800",
  Failed: "bg-red-100 text-red-800",
};

interface JobListProps {
  jobs: Job[];
  onDelete: (jobId: string) => void;
}

export default function JobList({ jobs, onDelete }: JobListProps) {
  const handleDeleteClick = (jobId: string) => {
    onDelete(jobId);
  };
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4" role="heading">
        Jobs
      </h2>
      {jobs.map((job) => (
        <div
          key={job.id}
          className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div
            className="flex-1 min-w-[120px] font-mono text-sm text-gray-600 truncate"
            title={job.name}
          >
            {job.name}
          </div>
          <div className="flex-1 min-w-[160px] text-gray-700 text-sm">
            <NoSSR>
              {new Date(job.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </NoSSR>
          </div>
          <div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                statusColors[job.status]
              }`}
            >
              {job.status}
            </span>
          </div>
          <div className="sm:ml-8">
            <Button type="button" onClick={() => handleDeleteClick(job.id)}>
              <BiEraser />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
