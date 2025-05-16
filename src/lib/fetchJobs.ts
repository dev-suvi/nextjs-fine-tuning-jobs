import apiClient from "./api";
import { JobsResponse } from "./types";

export async function fetchJobs(): Promise<JobsResponse> {
  const response = await apiClient.get("/jobs");
  return response.data;
}
