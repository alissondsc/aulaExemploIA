export type TaskStatus = "PENDENTE" | "CONCLUIDA";
export type TaskColor = "azul" | "verde" | "amarelo" | "roxo" | "vermelho";
export type TaskFilter = "TODAS" | "PENDENTES" | "CONCLUIDAS";

export interface Task {
  id: number | string;
  titulo: string;
  descricao: string;
  cor: TaskColor;
  status: TaskStatus;
}

export interface TaskInput {
  titulo: string;
  descricao: string;
  cor: TaskColor;
}

export const TASK_COLORS: { value: TaskColor; label: string }[] = [
  { value: "azul", label: "Azul" },
  { value: "verde", label: "Verde" },
  { value: "amarelo", label: "Amarelo" },
  { value: "roxo", label: "Roxo" },
  { value: "vermelho", label: "Vermelho" },
];

export const TASK_FILTERS: { value: TaskFilter; label: string }[] = [
  { value: "TODAS", label: "Todas" },
  { value: "PENDENTES", label: "Pendentes" },
  { value: "CONCLUIDAS", label: "Concluídas" },
];

export const MESSAGES = {
  titleRequired: "Título é obrigatório.",
  emptyList: "Você ainda não possui tarefas cadastradas.",
  noResults: "Nenhuma tarefa encontrada.",
} as const;

export function colorLabel(cor: TaskColor): string {
  return TASK_COLORS.find((c) => c.value === cor)?.label ?? cor;
}

/** Returns the validation message, or null when the input is valid. */
export function validateTaskInput(input: Pick<TaskInput, "titulo">): string | null {
  return input.titulo.trim() === "" ? MESSAGES.titleRequired : null;
}

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `t-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createTask(input: TaskInput, id: string = newId()): Task {
  return {
    id,
    titulo: input.titulo.trim(),
    descricao: input.descricao.trim(),
    cor: input.cor,
    status: "PENDENTE",
  };
}

export function updateTask(tasks: Task[], id: string, input: TaskInput): Task[] {
  return tasks.map((t) =>
    t.id === id
      ? { ...t, titulo: input.titulo.trim(), descricao: input.descricao.trim(), cor: input.cor }
      : t,
  );
}

export function setTaskStatus(tasks: Task[], id: string, status: TaskStatus): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, status } : t));
}

export function deleteTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((t) => t.id !== id);
}

export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  if (filter === "PENDENTES") return tasks.filter((t) => t.status === "PENDENTE");
  if (filter === "CONCLUIDAS") return tasks.filter((t) => t.status === "CONCLUIDA");
  return tasks;
}

export function countByFilter(tasks: Task[]): Record<TaskFilter, number> {
  return {
    TODAS: tasks.length,
    PENDENTES: filterTasks(tasks, "PENDENTES").length,
    CONCLUIDAS: filterTasks(tasks, "CONCLUIDAS").length,
  };
}

export const MOCK_TASKS: Task[] = [
  {
    id: "mock-1",
    titulo: "Revisar capítulo 3 de Cálculo",
    descricao: "Limites e continuidade — refazer os exercícios 12 a 20.",
    cor: "azul",
    status: "PENDENTE",
  },
  {
    id: "mock-2",
    titulo: "Entregar relatório de Física",
    descricao: "Enviar pelo portal até sexta-feira às 18h.",
    cor: "vermelho",
    status: "PENDENTE",
  },
  {
    id: "mock-3",
    titulo: "Treino na academia",
    descricao: "Segunda, quarta e sexta pela manhã.",
    cor: "verde",
    status: "CONCLUIDA",
  },
  {
    id: "mock-4",
    titulo: "Ler 30 páginas do livro do clube",
    descricao: "",
    cor: "roxo",
    status: "PENDENTE",
  },
  {
    id: "mock-5",
    titulo: "Organizar anotações da semana",
    descricao: "Passar a limpo os resumos de História e Química.",
    cor: "amarelo",
    status: "CONCLUIDA",
  },
  {
    id: "mock-6",
    titulo: "Estudar inglês — listening",
    descricao: "Dois episódios de podcast com transcrição.",
    cor: "azul",
    status: "CONCLUIDA",
  },
];
