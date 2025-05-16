import {
  useQuery as rqUseQuery,
  useMutation as rqUseMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import React from "react";
import { useApiError } from "@/context/ApiErrorContext";

export function useQuery<TData, TError extends Error = Error>(
  options: UseQueryOptions<TData, TError>
) {
  const { setError } = useApiError();

  const queryResult = rqUseQuery<TData, TError>(options);

  React.useEffect(() => {
    if (queryResult.isError) {
      setError(queryResult.error?.message || "Unknown error occurred");
    }
  }, [queryResult.isError, queryResult.error, setError]);

  return queryResult;
}

export function useMutation<
  TData = unknown,
  TError extends Error = Error,
  TVariables = void,
  TContext = unknown
>(options: UseMutationOptions<TData, TError, TVariables, TContext>) {
  const { setError } = useApiError();

  const mutationResult = rqUseMutation<TData, TError, TVariables, TContext>({
    ...options,
    onError: (error, variables, context) => {
      setError(error?.message || "Unknown error occurred");
      if (options.onError) options.onError(error, variables, context);
    },
  });

  return mutationResult;
}
