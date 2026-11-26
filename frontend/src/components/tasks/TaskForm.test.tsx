import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MESSAGES } from "@/lib/tasks";
import { TaskForm } from "./TaskForm";

describe("TaskForm submission", () => {
  it("keeps the entered values when saving fails", async () => {
    const onSubmit = vi.fn().mockResolvedValue(false);
    render(<TaskForm onSubmit={onSubmit} />);

    const title = screen.getByLabelText(/Título/);
    fireEvent.change(title, { target: { value: "Revisar matéria" } });
    fireEvent.click(screen.getByRole("button", { name: "Adicionar tarefa" }));

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        titulo: "Revisar matéria",
        descricao: "",
        cor: "azul",
      }),
    );
    expect(title).toHaveValue("Revisar matéria");
  });

  it("clears the title after a successful creation", async () => {
    const onSubmit = vi.fn().mockResolvedValue(true);
    render(<TaskForm onSubmit={onSubmit} />);

    const title = screen.getByLabelText(/Título/);
    fireEvent.change(title, { target: { value: "Revisar matéria" } });
    fireEvent.click(screen.getByRole("button", { name: "Adicionar tarefa" }));

    await waitFor(() => expect(title).toHaveValue(""));
  });

  it("prevents a second submission while the first one is pending", async () => {
    let resolveSubmission!: (result: boolean) => void;
    const onSubmit = vi.fn(
      () =>
        new Promise<boolean>((resolve) => {
          resolveSubmission = resolve;
        }),
    );
    render(<TaskForm onSubmit={onSubmit} />);

    const title = screen.getByLabelText(/Título/);
    fireEvent.change(title, { target: { value: "Revisar matéria" } });
    const button = screen.getByRole("button", { name: "Adicionar tarefa" });
    const form = button.closest("form");
    if (!form) throw new Error("TaskForm did not render a form.");

    fireEvent.submit(form);
    expect(button).toBeDisabled();
    fireEvent.submit(form);
    expect(onSubmit).toHaveBeenCalledTimes(1);

    resolveSubmission(true);
    await waitFor(() => expect(title).toHaveValue(""));
  });

  it("shows a title length message and focuses the title field", async () => {
    render(<TaskForm onSubmit={vi.fn().mockResolvedValue(true)} />);

    const title = screen.getByLabelText(/Título/);
    fireEvent.change(title, { target: { value: "x".repeat(121) } });
    fireEvent.click(screen.getByRole("button", { name: "Adicionar tarefa" }));

    expect(await screen.findByText(MESSAGES.titleTooLong)).toBeInTheDocument();
    expect(title).toHaveFocus();
  });

  it("shows a description length message and focuses the description field", async () => {
    render(<TaskForm onSubmit={vi.fn().mockResolvedValue(true)} />);

    const title = screen.getByLabelText(/Título/);
    const description = screen.getByLabelText(/Descrição/);
    fireEvent.change(title, { target: { value: "Título válido" } });
    fireEvent.change(description, { target: { value: "x".repeat(501) } });
    fireEvent.click(screen.getByRole("button", { name: "Adicionar tarefa" }));

    expect(await screen.findByText(MESSAGES.descriptionTooLong)).toBeInTheDocument();
    expect(description).toHaveFocus();
  });
});
