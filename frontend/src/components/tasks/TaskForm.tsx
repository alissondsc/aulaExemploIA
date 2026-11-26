import { useId, useRef, useState, type FormEvent } from "react";
import { AlertCircle, Plus, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  MESSAGES,
  TASK_COLORS,
  TASK_DESCRIPTION_MAX_LENGTH,
  TASK_TITLE_MAX_LENGTH,
  validateTaskInput,
  type TaskInput,
} from "@/lib/tasks";
import { COLOR_CLASSES } from "./task-colors";

interface TaskFormProps {
  initial?: TaskInput;
  mode?: "create" | "edit";
  onSubmit: (input: TaskInput) => Promise<boolean>;
  onCancel?: () => void;
}

const EMPTY: TaskInput = { titulo: "", descricao: "", cor: "azul" };

export function TaskForm({ initial = EMPTY, mode = "create", onSubmit, onCancel }: TaskFormProps) {
  const id = useId();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [values, setValues] = useState<TaskInput>(initial);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const titleId = `${id}-titulo`;
  const descId = `${id}-descricao`;
  const errorId = `${id}-erro`;
  const descriptionErrorId = `${id}-descricao-erro`;
  const titleError = error !== MESSAGES.descriptionTooLong ? error : null;
  const descriptionError = error === MESSAGES.descriptionTooLong ? error : null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;

    const message = validateTaskInput(values);
    if (message) {
      setError(message);
      if (message === MESSAGES.descriptionTooLong) {
        descriptionRef.current?.focus();
      } else {
        titleRef.current?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const succeeded = await onSubmit(values);
      if (!succeeded) return;

      setError(null);
      if (mode === "create") {
        setValues((v) => ({ ...EMPTY, cor: v.cor }));
        titleRef.current?.focus();
      }
    } catch (submitFailure) {
      setSubmitError(
        submitFailure instanceof Error
          ? submitFailure.message
          : "Não foi possível salvar a tarefa.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor={titleId} className="text-sm font-semibold">
          Título{" "}
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
          <span className="sr-only">(obrigatório)</span>
        </Label>
        <Input
          ref={titleRef}
          id={titleId}
          value={values.titulo}
          onChange={(e) => {
            setValues({ ...values, titulo: e.target.value });
            if (titleError) setError(null);
            if (submitError) setSubmitError(null);
          }}
          placeholder="Ex.: Revisar matéria de Biologia"
          aria-required="true"
          aria-invalid={titleError ? true : undefined}
          aria-describedby={titleError ? errorId : undefined}
          className={cn(
            "h-11 w-full rounded-lg bg-card text-base",
            titleError && "border-destructive focus-visible:ring-destructive",
          )}
          maxLength={TASK_TITLE_MAX_LENGTH}
        />
        {titleError && (
          <p
            id={errorId}
            role="alert"
            className="flex items-center gap-1.5 text-sm font-medium text-destructive"
          >
            <AlertCircle className="size-4" aria-hidden="true" />
            {titleError}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={descId} className="text-sm font-semibold">
          Descrição <span className="font-normal text-muted-foreground">(opcional)</span>
        </Label>
        <Textarea
          ref={descriptionRef}
          id={descId}
          value={values.descricao}
          onChange={(e) => {
            setValues({ ...values, descricao: e.target.value });
            if (descriptionError) setError(null);
            if (submitError) setSubmitError(null);
          }}
          placeholder="Detalhes, prazos ou observações"
          rows={3}
          aria-invalid={descriptionError ? true : undefined}
          aria-describedby={descriptionError ? descriptionErrorId : undefined}
          className="w-full resize-none rounded-lg bg-card text-base"
          maxLength={TASK_DESCRIPTION_MAX_LENGTH}
        />
        {descriptionError && (
          <p id={descriptionErrorId} role="alert" className="text-sm font-medium text-destructive">
            {descriptionError}
          </p>
        )}
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
                <span
                  className={cn("size-3.5 rounded-full", COLOR_CLASSES[c.value].dot)}
                  aria-hidden="true"
                />
                {c.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {submitError && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {submitError}
        </p>
      )}

      <div className={cn("flex gap-2", mode === "edit" ? "justify-end" : "")}>
        {onCancel && (
          <Button type="button" variant="ghost" size="lg" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className={mode === "create" ? "w-full sm:w-auto" : ""}
        >
          {mode === "create" ? <Plus aria-hidden="true" /> : <Save aria-hidden="true" />}
          {mode === "create" ? "Adicionar tarefa" : "Salvar alterações"}
        </Button>
      </div>
    </form>
  );
}
