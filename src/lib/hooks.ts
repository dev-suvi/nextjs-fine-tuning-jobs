import { useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./api"; // updated from axios
import { Job, JobsResponse, Model } from "./types";
import { JobState } from "@/app/jobs/types";
import { useMutation, useQuery } from "./reactQuery";

const JOBS_QUERY_KEY = "jobs";
const MODELS_QUERY_KEY = "models";

export function useJobs() {
  const query = useQuery<JobsResponse, Error>({
    queryKey: [JOBS_QUERY_KEY],
    queryFn: async () => {
      return await apiClient<JobsResponse>("jobs");
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
      return await apiClient<Model[]>("models");
    },
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation<Job, Error, JobState>({
    mutationFn: async (newJob) => {
      try {
        return await apiClient<Job>("jobs", {
          method: "POST",
          body: JSON.stringify(newJob),
        });
      } catch (error) {
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
        await apiClient<void>(`jobs/${jobId}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.error("API error deleting job:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [JOBS_QUERY_KEY] });
    },
  });
}
