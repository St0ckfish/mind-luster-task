import type { Task, CreateTaskDto, UpdateTaskDto } from "~/types/task";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/tasks";

export const taskApi = {
  getTasks: async (): Promise<Task[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return response.json() as Promise<Task[]>;
  },

  getTask: async (id: string): Promise<Task> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch task");
    }
    return response.json() as Promise<Task>;
  },

  createTask: async (task: CreateTaskDto): Promise<Task> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    return response.json() as Promise<Task>;
  },

  updateTask: async (id: string, task: UpdateTaskDto): Promise<Task> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    return response.json() as Promise<Task>;
  },

  deleteTask: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
  },
};
