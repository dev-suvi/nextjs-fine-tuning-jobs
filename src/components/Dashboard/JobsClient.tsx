"use client";

import { useRouter } from "next/navigation";
import JobList from "./JobList";
import Button from "../UI/Button";
import { useDeleteJob } from "@/lib/hooks";
import { Job } from "@/lib/types";
import JobSummary from "./JobSummary";

type Props = {
  jobs: Job[];
};

export default function JobListClient({ jobs }: Props) {
  const router = useRouter();
  const deleteJobMutation = useDeleteJob();

  const handleCreateJobClick = () => router.push("/jobs/create");

  const handleDeleteClick = async (jobId: string) => {
    try {
      await deleteJobMutation.mutateAsync(jobId);
      router.refresh(); // to re-fetch SSR data
    } catch (error) {
      console.error("Deletion failed", error);
    }
  };

  const completed = jobs.filter((job) => job.status === "Completed").length;
  const running = jobs.filter((job) => job.status === "Running").length;
  const failed = jobs.filter((job) => job.status === "Failed").length;

  return (
    <>
      <div className="flex justify-start sm:justify-end mb-4">
        <Button data-testid="new-job-btn" onClick={handleCreateJobClick}>
          New Fine tuning Job
        </Button>
      </div>
      <JobSummary completed={completed} running={running} failed={failed} />
      <JobList jobs={jobs} onDelete={handleDeleteClick} />
    </>
  );
}
