import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck2 } from "lucide-react";

import { TaskBoard } from "@/components/tasks/TaskBoard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Semana em Ordem — Lista de tarefas semanal" },
      {
        name: "description",
        content: "Organize seus estudos e atividades da semana: crie, edite, conclua e filtre tarefas por cor e status.",
      },
      { property: "og:title", content: "Semana em Ordem — Lista de tarefas semanal" },
      {
        property: "og:description",
        content: "Organize seus estudos e atividades da semana com tarefas coloridas e filtros por status.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-header-glow">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 pt-12 pb-10 sm:px-6 sm:pt-16 lg:px-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            <CalendarCheck2 className="size-3.5" aria-hidden="true" />
            Organização semanal
          </span>
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Semana em Ordem</h1>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            Planeje seus estudos e atividades da semana. Cadastre tarefas, escolha uma cor para cada uma e
            acompanhe o que já foi concluído.
          </p>
        </div>
      </header>
      <main>
        <TaskBoard />
      </main>
    </div>
  );
}
