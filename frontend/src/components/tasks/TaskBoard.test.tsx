import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { toast } from "sonner";
import { MESSAGES, type Task } from "@/lib/tasks";
import { tasksApi } from "@/lib/tasks-api";
import { TaskBoard } from "./TaskBoard";

vi.mock("@/lib/tasks-api", () => ({
  tasksApi: {
    list: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

const task: Task = {
  id: 1,
  titulo: "Revisar matéria",
  descricao: "Capítulo 2",
  cor: "azul",
  status: "PENDENTE",
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(tasksApi.list).mockResolvedValue([]);
});

describe("TaskBoard loading states", () => {
  it("transitions from loading to the task list when the request succeeds", async () => {
    let resolveRequest!: (tasks: Task[]) => void;
    vi.mocked(tasksApi.list).mockReturnValue(
      new Promise((resolve) => {
        resolveRequest = resolve;
      }),
    );

    render(<TaskBoard />);
    expect(screen.getByText("Carregando tarefas...")).toBeInTheDocument();

    resolveRequest([task]);
    expect(await screen.findByText(task.titulo)).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES.emptyList)).not.toBeInTheDocument();
  });

  it("shows the empty-list message after a successful empty response", async () => {
    render(<TaskBoard />);

    expect(await screen.findByText(MESSAGES.emptyList)).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("shows a connection error instead of the empty-list message", async () => {
    const message = "Não foi possível conectar à API. Verifique a conexão e tente novamente.";
    let rejectRequest!: (reason: unknown) => void;
    vi.mocked(tasksApi.list).mockReturnValue(
      new Promise<Task[]>((_, reject) => {
        rejectRequest = reject;
      }),
    );

    render(<TaskBoard />);
    expect(screen.getByText("Carregando tarefas...")).toBeInTheDocument();

    rejectRequest(new Error(message));

    expect(await screen.findByRole("alert")).toHaveTextContent(message);
    expect(screen.queryByText(MESSAGES.emptyList)).not.toBeInTheDocument();
    expect(toast.error).toHaveBeenCalledWith(message);
  });

  it("shows the server error message returned by the API", async () => {
    vi.mocked(tasksApi.list).mockRejectedValue(new Error("Erro interno do servidor."));

    render(<TaskBoard />);

    expect(await screen.findByRole("alert")).toHaveTextContent("Erro interno do servidor.");
    expect(toast.error).toHaveBeenCalledWith("Erro interno do servidor.");
  });

  it("retries a failed request and transitions through loading to success", async () => {
    let resolveRetry!: (tasks: Task[]) => void;
    vi.mocked(tasksApi.list)
      .mockRejectedValueOnce(new Error("API indisponível."))
      .mockReturnValueOnce(
        new Promise((resolve) => {
          resolveRetry = resolve;
        }),
      );

    render(<TaskBoard />);
    expect(await screen.findByRole("alert")).toHaveTextContent("API indisponível.");

    fireEvent.click(screen.getByRole("button", { name: "Tentar novamente" }));
    expect(screen.getByText("Carregando tarefas...")).toBeInTheDocument();

    resolveRetry([task]);
    expect(await screen.findByText(task.titulo)).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(tasksApi.list).toHaveBeenCalledTimes(2);
  });

  it("keeps the loading state visible while a retry is pending", async () => {
    let resolveRetry!: (tasks: Task[]) => void;
    vi.mocked(tasksApi.list)
      .mockRejectedValueOnce(new Error("API indisponível."))
      .mockReturnValueOnce(
        new Promise((resolve) => {
          resolveRetry = resolve;
        }),
      );

    render(<TaskBoard />);
    await screen.findByRole("alert");
    fireEvent.click(screen.getByRole("button", { name: "Tentar novamente" }));

    await waitFor(() => expect(screen.getByText("Carregando tarefas...")).toBeInTheDocument());
    resolveRetry([]);
    await screen.findByText(MESSAGES.emptyList);
  });
});
