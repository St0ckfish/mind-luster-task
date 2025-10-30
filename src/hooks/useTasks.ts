import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "~/lib/api/taskApi";
import type { CreateTaskDto, UpdateTaskDto } from "~/types/task";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: taskApi.getTasks,
    staleTime: 1000 * 60 * 5,
  });
};

export const useTask = (id: string) => {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () => taskApi.getTask(id),
    enabled: !!id,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: CreateTaskDto) => taskApi.createTask(task),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, task }: { id: string; task: UpdateTaskDto }) =>
      taskApi.updateTask(id, task),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskApi.deleteTask(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
