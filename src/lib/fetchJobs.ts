import { apiClient } from "./api";
import { JobsResponse } from "./types";

export async function fetchJobs(): Promise<JobsResponse | null> {
  try {
    const data = await apiClient<JobsResponse>("jobs");
    return data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return null;
  }
}
