import type { TaskColor } from "@/lib/tasks";

export const COLOR_CLASSES: Record<TaskColor, { dot: string; stripe: string; ring: string }> = {
  azul: { dot: "bg-task-blue", stripe: "bg-task-blue", ring: "peer-checked:ring-task-blue" },
  verde: { dot: "bg-task-green", stripe: "bg-task-green", ring: "peer-checked:ring-task-green" },
  amarelo: { dot: "bg-task-yellow", stripe: "bg-task-yellow", ring: "peer-checked:ring-task-yellow" },
  roxo: { dot: "bg-task-purple", stripe: "bg-task-purple", ring: "peer-checked:ring-task-purple" },
  vermelho: { dot: "bg-task-red", stripe: "bg-task-red", ring: "peer-checked:ring-task-red" },
};
