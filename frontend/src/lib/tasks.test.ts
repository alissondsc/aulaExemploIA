import { describe, expect, it } from "vitest";
import {
  MOCK_TASKS,
  createTask,
  deleteTask,
  filterTasks,
  setTaskStatus,
  updateTask,
  validateTaskInput,
} from "./tasks";

describe("task rules", () => {
  it("rejects an empty or blank title with the required message", () => {
    expect(validateTaskInput({ titulo: "", descricao: "" })).toBe("Título é obrigatório.");
    expect(validateTaskInput({ titulo: "   ", descricao: "" })).toBe("Título é obrigatório.");
    expect(validateTaskInput({ titulo: "Estudar", descricao: "" })).toBeNull();
  });

  it("enforces title and description length limits", () => {
    expect(validateTaskInput({ titulo: "x".repeat(120), descricao: "x".repeat(500) })).toBeNull();
    expect(validateTaskInput({ titulo: "x".repeat(121), descricao: "" })).toBe(
      "O título deve ter no máximo 120 caracteres.",
    );
    expect(validateTaskInput({ titulo: "Válido", descricao: "x".repeat(501) })).toBe(
      "A descrição deve ter no máximo 500 caracteres.",
    );
  });

  it("creates new tasks as PENDENTE with the chosen color", () => {
    const t = createTask({ titulo: " Ler ", descricao: "", cor: "roxo" }, "x");
    expect(t).toEqual({ id: "x", titulo: "Ler", descricao: "", cor: "roxo", status: "PENDENTE" });
  });

  it("filters by status", () => {
    const pend = filterTasks(MOCK_TASKS, "PENDENTES");
    const done = filterTasks(MOCK_TASKS, "CONCLUIDAS");
    expect(pend.every((t) => t.status === "PENDENTE")).toBe(true);
    expect(done.every((t) => t.status === "CONCLUIDA")).toBe(true);
    expect(pend.length + done.length).toBe(filterTasks(MOCK_TASKS, "TODAS").length);
  });

  it("completes and reopens a task", () => {
    const done = setTaskStatus(MOCK_TASKS, "mock-1", "CONCLUIDA");
    expect(done.find((t) => t.id === "mock-1")?.status).toBe("CONCLUIDA");
    const reopened = setTaskStatus(done, "mock-1", "PENDENTE");
    expect(reopened.find((t) => t.id === "mock-1")?.status).toBe("PENDENTE");
  });

  it("edits title, description and color", () => {
    const next = updateTask(MOCK_TASKS, "mock-2", { titulo: "Novo", descricao: "D", cor: "verde" });
    expect(next.find((t) => t.id === "mock-2")).toMatchObject({
      titulo: "Novo",
      descricao: "D",
      cor: "verde",
    });
  });

  it("deletes a task", () => {
    expect(deleteTask(MOCK_TASKS, "mock-3").some((t) => t.id === "mock-3")).toBe(false);
  });

  it("ships at least 5 mock tasks with both statuses and varied colors", () => {
    expect(MOCK_TASKS.length).toBeGreaterThanOrEqual(5);
    expect(new Set(MOCK_TASKS.map((t) => t.status)).size).toBe(2);
    expect(new Set(MOCK_TASKS.map((t) => t.cor)).size).toBeGreaterThanOrEqual(4);
  });
});
