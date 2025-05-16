import { useQueryClient } from "@tanstack/react-query";
import apiClient from "./api";
import { Job, JobsResponse, Model } from "./types";
import { JobState } from "@/app/jobs/types";
import { useMutation, useQuery } from "./reactQuery";

const JOBS_QUERY_KEY = "jobs";
const MODELS_QUERY_KEY = "models";

export function useJobs() {
  const query = useQuery<JobsResponse, Error>({
    queryKey: [JOBS_QUERY_KEY],
    queryFn: async () => {
      const { data } = await apiClient.get("/jobs");

      return data;
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}

export function useModels() {
  return useQuery<Model[], Error>({
    queryKey: [MODELS_QUERY_KEY],
    queryFn: async () => {
      const { data } = await apiClient.get("/models");
      return data;
    },
  });
}
export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation<Job, Error, JobState>({
    mutationFn: async (newJob) => {
      try {
        const { data } = await apiClient.post("/jobs", newJob);
        return data;
      } catch (error: unknown) {
        console.error("API error creating job:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [JOBS_QUERY_KEY] });
    },
  });
}

export function useDeleteJob() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (jobId: string) => {
      try {
        await apiClient.delete(`/jobs/${jobId}`);
      } catch (error: unknown) {
        console.error("API error deleting job:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [JOBS_QUERY_KEY] });
    },
  });
}
