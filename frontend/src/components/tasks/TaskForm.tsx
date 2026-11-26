import { useId, useRef, useState, type FormEvent } from "react";
import { AlertCircle, Plus, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { TASK_COLORS, validateTaskInput, type TaskInput } from "@/lib/tasks";
import { COLOR_CLASSES } from "./task-colors";

interface TaskFormProps {
  initial?: TaskInput;
  mode?: "create" | "edit";
  onSubmit: (input: TaskInput) => void;
  onCancel?: () => void;
}

const EMPTY: TaskInput = { titulo: "", descricao: "", cor: "azul" };

export function TaskForm({ initial = EMPTY, mode = "create", onSubmit, onCancel }: TaskFormProps) {
  const id = useId();
  const titleRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<TaskInput>(initial);
  const [error, setError] = useState<string | null>(null);

  const titleId = `${id}-titulo`;
  const descId = `${id}-descricao`;
  const errorId = `${id}-erro`;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const message = validateTaskInput(values);
    if (message) {
      setError(message);
      titleRef.current?.focus();
      return;
    }
    onSubmit(values);
    setError(null);
    if (mode === "create") {
      setValues((v) => ({ ...EMPTY, cor: v.cor }));
      titleRef.current?.focus();
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor={titleId} className="text-sm font-semibold">
          Título <span className="text-destructive" aria-hidden="true">*</span>
          <span className="sr-only">(obrigatório)</span>
        </Label>
        <Input
          ref={titleRef}
          id={titleId}
          value={values.titulo}
          onChange={(e) => {
            setValues({ ...values, titulo: e.target.value });
            if (error) setError(null);
          }}
          placeholder="Ex.: Revisar matéria de Biologia"
          aria-required="true"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "h-11 w-full rounded-lg bg-card text-base",
            error && "border-destructive focus-visible:ring-destructive",
          )}
          maxLength={120}
        />
        {error && (
          <p id={errorId} role="alert" className="flex items-center gap-1.5 text-sm font-medium text-destructive">
            <AlertCircle className="size-4" aria-hidden="true" />
            {error}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={descId} className="text-sm font-semibold">
          Descrição <span className="font-normal text-muted-foreground">(opcional)</span>
        </Label>
        <Textarea
          id={descId}
          value={values.descricao}
          onChange={(e) => setValues({ ...values, descricao: e.target.value })}
          placeholder="Detalhes, prazos ou observações"
          rows={3}
          className="w-full resize-none rounded-lg bg-card text-base"
          maxLength={500}
        />
      </div>

      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-2.5 text-sm font-semibold">Cor</legend>
        <div className="flex flex-wrap gap-2">
          {TASK_COLORS.map((c) => (
            <label key={c.value} className="cursor-pointer">
              <input
                type="radio"
                name={`${id}-cor`}
                value={c.value}
                checked={values.cor === c.value}
                onChange={() => setValues({ ...values, cor: c.value })}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm transition-all",
                  "hover:border-input hover:bg-secondary",
                  "peer-checked:border-transparent peer-checked:bg-secondary peer-checked:font-semibold peer-checked:ring-2",
                  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring",
                  COLOR_CLASSES[c.value].ring,
                )}
              >
                <span className={cn("size-3.5 rounded-full", COLOR_CLASSES[c.value].dot)} aria-hidden="true" />
                {c.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={cn("flex gap-2", mode === "edit" ? "justify-end" : "")}>
        {onCancel && (
          <Button type="button" variant="ghost" size="lg" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" size="lg" className={mode === "create" ? "w-full sm:w-auto" : ""}>
          {mode === "create" ? <Plus aria-hidden="true" /> : <Save aria-hidden="true" />}
          {mode === "create" ? "Adicionar tarefa" : "Salvar alterações"}
        </Button>
      </div>
    </form>
  );
}
