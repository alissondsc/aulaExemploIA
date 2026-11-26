import { CheckCircle2, Circle, Pencil, RotateCcw, Trash2, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { colorLabel, type Task } from "@/lib/tasks";
import { COLOR_CLASSES } from "./task-colors";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onToggle: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskCard({ task, onEdit, onToggle, onDelete }: TaskCardProps) {
  const done = task.status === "CONCLUIDA";
  const titleId = `task-${task.id}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "group relative flex animate-task-in flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all",
        "hover:-translate-y-0.5 hover:shadow-lift focus-within:shadow-lift",
        done && "bg-card/70",
      )}
    >
      <span className={cn("absolute inset-y-0 left-0 w-1.5", COLOR_CLASSES[task.cor].stripe)} aria-hidden="true" />

      <div className="flex flex-1 flex-col gap-3 py-5 pr-5 pl-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span className={cn("size-2.5 rounded-full", COLOR_CLASSES[task.cor].dot)} aria-hidden="true" />
            <span>
              <span className="sr-only">Cor: </span>
              {colorLabel(task.cor)}
            </span>
          </span>

          {done ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2.5 py-1 text-xs font-semibold text-success-foreground">
              <CheckCircle2 className="size-3.5" aria-hidden="true" />
              Concluída
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-warning-soft px-2.5 py-1 text-xs font-semibold text-warning-foreground">
              <Circle className="size-3.5" aria-hidden="true" />
              Pendente
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <h3
            id={titleId}
            className={cn(
              "text-lg leading-snug font-semibold break-words",
              done && "text-muted-foreground line-through decoration-2 decoration-success/60",
            )}
          >
            {task.titulo}
          </h3>
          {task.descricao ? (
            <p className={cn("text-sm leading-relaxed break-words text-muted-foreground", done && "opacity-80")}>
              {task.descricao}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground/70 italic">Sem descrição</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-border bg-background/40 py-3 pr-4 pl-6">
        <Button variant="action" size="sm" onClick={() => onEdit(task)} aria-label={`Editar tarefa: ${task.titulo}`}>
          <Pencil aria-hidden="true" />
          Editar
        </Button>
        {done ? (
          <Button variant="action" size="sm" onClick={() => onToggle(task)} aria-label={`Reabrir tarefa: ${task.titulo}`}>
            <RotateCcw aria-hidden="true" />
            Reabrir
          </Button>
        ) : (
          <Button variant="success" size="sm" onClick={() => onToggle(task)} aria-label={`Concluir tarefa: ${task.titulo}`}>
            <Check aria-hidden="true" />
            Concluir
          </Button>
        )}
        <Button
          variant="danger"
          size="sm"
          className="ml-auto"
          onClick={() => onDelete(task)}
          aria-label={`Excluir tarefa: ${task.titulo}`}
        >
          <Trash2 aria-hidden="true" />
          Excluir
        </Button>
      </div>
    </article>
  );
}
