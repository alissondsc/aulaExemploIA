import { useEffect, useMemo, useState } from "react";
import { ClipboardList, SearchX } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { MESSAGES, countByFilter, filterTasks, type Task, type TaskFilter } from "@/lib/tasks";
import { tasksApi } from "@/lib/tasks-api";
import { TaskCard } from "./TaskCard";
import { TaskFilters } from "./TaskFilters";
import { TaskForm } from "./TaskForm";

export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [filter, setFilter] = useState<TaskFilter>("TODAS");
  const [editing, setEditing] = useState<Task | null>(null);
  const [deleting, setDeleting] = useState<Task | null>(null);

  const visible = useMemo(() => filterTasks(tasks, filter), [tasks, filter]);
  const counts = useMemo(() => countByFilter(tasks), [tasks]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setLoadError(null);

    tasksApi
      .list()
      .then((items) => {
        if (active) setTasks(items);
      })
      .catch((error) => {
        if (!active) return;
        const message =
          error instanceof Error && error.message.trim()
            ? error.message
            : "Não foi possível carregar as tarefas.";
        setLoadError(message);
        toast.error(message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [loadAttempt]);

  async function handleCreate(input: Parameters<typeof tasksApi.create>[0]): Promise<boolean> {
    try {
      const created = await tasksApi.create(input);
      setTasks((prev) => [created, ...prev]);
      toast.success("Tarefa adicionada.");
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao adicionar tarefa.");
      return false;
    }
  }

  async function handleUpdate(
    task: Task,
    input: Parameters<typeof tasksApi.create>[0],
  ): Promise<boolean> {
    try {
      const updated = await tasksApi.update(task.id, input);
      setTasks((prev) => prev.map((item) => (item.id === task.id ? updated : item)));
      setEditing(null);
      toast.success("Tarefa atualizada.");
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao atualizar tarefa.");
      return false;
    }
  }

  async function handleToggle(task: Task) {
    const status = task.status === "CONCLUIDA" ? "PENDENTE" : "CONCLUIDA";
    try {
      const updated = await tasksApi.update(task.id, { status });
      setTasks((prev) => prev.map((item) => (item.id === task.id ? updated : item)));
      toast.success(status === "CONCLUIDA" ? "Tarefa concluída." : "Tarefa reaberta.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao alterar tarefa.");
    }
  }

  async function handleDelete(task: Task) {
    try {
      await tasksApi.delete(task.id);
      setTasks((prev) => prev.filter((item) => item.id !== task.id));
      setDeleting(null);
      toast.success("Tarefa excluída.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao excluir tarefa.");
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pb-16 sm:px-6 lg:px-8">
      <section
        aria-labelledby="nova-tarefa"
        className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-7"
      >
        <h2 id="nova-tarefa" className="mb-5 text-xl font-semibold">
          Nova tarefa
        </h2>
        <TaskForm onSubmit={handleCreate} />
      </section>

      <section aria-labelledby="minhas-tarefas" className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="minhas-tarefas" className="text-xl font-semibold">
              Minhas tarefas
            </h2>
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {counts.CONCLUIDAS} de {counts.TODAS} concluídas
            </p>
          </div>
          <TaskFilters value={filter} counts={counts} onChange={setFilter} />
        </div>

        {loading ? (
          <div
            role="status"
            className="rounded-2xl border border-border bg-card px-6 py-14 text-center text-muted-foreground"
          >
            Carregando tarefas...
          </div>
        ) : loadError ? (
          <div
            role="alert"
            className="flex flex-col items-center gap-4 rounded-2xl border border-destructive/30 bg-card px-6 py-10 text-center"
          >
            <p className="text-sm font-medium text-destructive">{loadError}</p>
            <Button
              type="button"
              variant="outline"
              onClick={() => setLoadAttempt((attempt) => attempt + 1)}
            >
              Tentar novamente
            </Button>
          </div>
        ) : tasks.length === 0 ? (
          <EmptyState
            icon={<ClipboardList className="size-8" aria-hidden="true" />}
            message={MESSAGES.emptyList}
          />
        ) : visible.length === 0 ? (
          <EmptyState
            icon={<SearchX className="size-8" aria-hidden="true" />}
            message={MESSAGES.noResults}
          />
        ) : (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2" aria-label="Lista de tarefas">
            {visible.map((task) => (
              <li key={task.id} className="flex">
                <div className="w-full [&>article]:h-full">
                  <TaskCard
                    task={task}
                    onEdit={setEditing}
                    onDelete={setDeleting}
                    onToggle={handleToggle}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Dialog open={editing !== null} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="rounded-2xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Editar tarefa</DialogTitle>
            <DialogDescription>Altere o título, a descrição ou a cor da tarefa.</DialogDescription>
          </DialogHeader>
          {editing && (
            <TaskForm
              key={editing.id}
              mode="edit"
              initial={{ titulo: editing.titulo, descricao: editing.descricao, cor: editing.cor }}
              onCancel={() => setEditing(null)}
              onSubmit={(input) => handleUpdate(editing, input)}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleting !== null} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">Excluir tarefa?</AlertDialogTitle>
            <AlertDialogDescription>
              “{deleting?.titulo}” será removida da sua lista. Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className={buttonVariants({ variant: "destructive" })}
              onClick={() => deleting && handleDelete(deleting)}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function EmptyState({ icon, message }: { icon: React.ReactNode; message: string }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-input bg-card/50 px-6 py-14 text-center"
    >
      <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-muted-foreground">
        {icon}
      </span>
      <p className="text-base font-medium text-muted-foreground">{message}</p>
    </div>
  );
}
