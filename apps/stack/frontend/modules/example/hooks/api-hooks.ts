import type { CreateExampleInput, ProcessExampleInput } from "@newsnow/definition/frontend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { defineMutationHook, defineQueryHook } from "#/shared/network/query-hooks";
import { apiExampleCreateOne, apiExampleFindMany, apiExampleProcess } from "../api";

export const exampleQueryKeys = {
  all: ["examples"] as const,
};

export const useExamplesQuery = defineQueryHook(() =>
  useQuery({
    queryKey: exampleQueryKeys.all,
    queryFn: () => apiExampleFindMany(),
  }),
);

export const useCreateExampleMutation = defineMutationHook(() => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateExampleInput) => apiExampleCreateOne(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: exampleQueryKeys.all }),
  });
});

export const useProcessExampleMutation = defineMutationHook(() =>
  useMutation({ mutationFn: (input: ProcessExampleInput) => apiExampleProcess(input) }),
);
