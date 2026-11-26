import { cn } from "@/lib/utils";
import { TASK_FILTERS, type TaskFilter } from "@/lib/tasks";

interface TaskFiltersProps {
  value: TaskFilter;
  counts: Record<TaskFilter, number>;
  onChange: (f: TaskFilter) => void;
}

export function TaskFilters({ value, counts, onChange }: TaskFiltersProps) {
  return (
    <div
      role="group"
      aria-label="Filtrar tarefas por status"
      className="grid w-full grid-cols-1 gap-1.5 rounded-xl border border-border bg-muted p-1.5 sm:grid-cols-3 md:w-auto"
    >
      {TASK_FILTERS.map((f) => {
        const active = value === f.value;
        return (
          <button
            key={f.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(f.value)}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-muted",
              active
                ? "bg-card text-foreground shadow-soft"
                : "text-muted-foreground hover:bg-card/60 hover:text-foreground",
            )}
          >
            {f.label}
            <span
              className={cn(
                "min-w-6 rounded-full px-1.5 py-0.5 text-xs tabular-nums",
                active ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
              )}
            >
              {counts[f.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
