import type { Task, TaskInput, TaskStatus } from "./tasks";

const API_URL = import.meta.env["VITE_API_URL"]?.replace(/\/$/, "") || "http://localhost:3000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Não foi possível conectar à API. Verifique a conexão e tente novamente.", {
        cause: error,
      });
    }
    throw error;
  }

  if (!response.ok) {
    let message = `A API respondeu com erro HTTP ${response.status}.`;
    try {
      const body: unknown = await response.json();
      if (
        body !== null &&
        typeof body === "object" &&
        "message" in body &&
        typeof body.message === "string" &&
        body.message.trim()
      ) {
        message = body.message;
      }
    } catch {
      // Keep the HTTP status message when the server response is not JSON.
    }
    throw new Error(message);
  }

  if (response.status === 204) return undefined as T;
  try {
    return (await response.json()) as T;
  } catch (error) {
    throw new Error("A API retornou uma resposta inválida.", { cause: error });
  }
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
