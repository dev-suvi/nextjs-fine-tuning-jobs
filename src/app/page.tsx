import GlobalErrorHandler from "@/components/GlobalErrorHandler";
import JobListClient from "@/components/Dashboard/JobsClient";
import { fetchJobs } from "@/lib/fetchJobs";

export default async function DashboardPage() {
  const data = await fetchJobs();

  if (!data) return <p className="p-4 text-center">No data available</p>;

  const { jobs } = data;

  return (
    <section className="py-4 px-4 mx-auto max-w-7xl">
      <GlobalErrorHandler />
      <JobListClient jobs={jobs} />
    </section>
  );
}
