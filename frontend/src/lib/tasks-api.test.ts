import { afterEach, describe, expect, it, vi } from "vitest";

import { tasksApi } from "./tasks-api";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("tasks API request errors", () => {
  it("surfaces the error message from an unsuccessful HTTP response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: "Erro interno do servidor." }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    await expect(tasksApi.list()).rejects.toThrow("Erro interno do servidor.");
  });

  it("returns a localized message when the API cannot be reached", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("fetch failed")));

    await expect(tasksApi.list()).rejects.toThrow(
      "Não foi possível conectar à API. Verifique a conexão e tente novamente.",
    );
  });

  it("reports invalid JSON from a successful HTTP response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("{invalid", {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    await expect(tasksApi.list()).rejects.toThrow("A API retornou uma resposta inválida.");
  });
});
