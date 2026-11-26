import type { Task, TaskInput, TaskStatus } from "./tasks";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    let message = "Não foi possível comunicar com o servidor.";
    try {
      const body = await response.json();
      message = body.message || message;
    } catch {
      // Preserve a generic message if the API does not return JSON.
    }
    throw new Error(message);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const tasksApi = {
  list: () => request<Task[]>("/api/tasks"),
  create: (input: TaskInput) =>
    request<Task>("/api/tasks", {
      method: "POST",
      body: JSON.stringify(input),
    }),
  update: (id: Task["id"], input: Partial<TaskInput & { status: TaskStatus }>) =>
    request<Task>(`/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(input),
    }),
  delete: (id: Task["id"]) =>
    request<void>(`/api/tasks/${id}`, {
      method: "DELETE",
    }),
};
