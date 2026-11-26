import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import Task from "../model/models.js";
import taskService from "./services.js";

const originalDescriptors = new Map();

function stubTaskMethod(name, implementation) {
  if (!originalDescriptors.has(name)) {
    originalDescriptors.set(name, Object.getOwnPropertyDescriptor(Task, name));
  }
  Object.defineProperty(Task, name, {
    configurable: true,
    writable: true,
    value: implementation,
  });
}

function restoreTaskMethods() {
  for (const [name, descriptor] of originalDescriptors) {
    if (descriptor) {
      Object.defineProperty(Task, name, descriptor);
    } else {
      delete Task[name];
    }
  }
  originalDescriptors.clear();
}

afterEach(restoreTaskMethods);

const validPayload = { titulo: "  Revisar matéria  ", descricao: "  Capítulo 2  ", cor: "verde" };

describe("task service payload validation", () => {
  it("normalizes a valid payload before persistence", async () => {
    let received;
    stubTaskMethod("create", async (input) => {
      received = input;
      return { id: 1, ...input };
    });

    await taskService.create(validPayload);

    assert.deepEqual(received, {
      titulo: "Revisar matéria",
      descricao: "Capítulo 2",
      cor: "verde",
    });
  });

  it("lists tasks in the existing newest-first order", async () => {
    const records = [{ id: 1 }, { id: 2 }];
    let receivedOptions;
    stubTaskMethod("findAll", async (options) => {
      receivedOptions = options;
      return records;
    });

    assert.equal(await taskService.list(), records);
    assert.deepEqual(receivedOptions, { order: [["createdAt", "DESC"]] });
  });

  it("gets a task using a valid identifier", async () => {
    const record = { id: 12, titulo: "Revisar matéria" };
    let receivedId;
    stubTaskMethod("findByPk", async (id) => {
      receivedId = id;
      return record;
    });

    assert.equal(await taskService.get("12"), record);
    assert.equal(receivedId, 12);
  });

  const invalidPayloads = [
    ["missing required title", { descricao: "", cor: "azul" }],
    ["blank title", { titulo: "   " }],
    ["non-string title", { titulo: 123 }],
    ["non-string description", { titulo: "Válida", descricao: 123 }],
    ["title over the limit", { titulo: "x".repeat(121) }],
    ["description over the limit", { titulo: "Válida", descricao: "x".repeat(501) }],
    ["invalid color", { titulo: "Válida", cor: "preto" }],
    ["invalid status", { titulo: "Válida", status: "EM_ANDAMENTO" }],
    ["unexpected property", { titulo: "Válida", admin: true }],
    ["null body", null],
    ["array body", []],
  ];

  for (const [description, payload] of invalidPayloads) {
    it(`rejects ${description} before persistence`, async () => {
      let persistenceCalls = 0;
      stubTaskMethod("create", async () => {
        persistenceCalls += 1;
      });

      await assert.rejects(taskService.create(payload), { status: 400 });
      assert.equal(persistenceCalls, 0);
    });
  }

  it("allows duplicate titles because task titles are not unique by business rule", async () => {
    let persistenceCalls = 0;
    stubTaskMethod("create", async (input) => {
      persistenceCalls += 1;
      return { id: persistenceCalls, ...input };
    });

    await taskService.create({ titulo: "Revisar matéria" });
    await taskService.create({ titulo: "Revisar matéria" });

    assert.equal(persistenceCalls, 2);
  });

  it("rejects empty updates and unknown fields before looking up the task", async () => {
    let lookupCalls = 0;
    stubTaskMethod("findByPk", async () => {
      lookupCalls += 1;
      return null;
    });

    await assert.rejects(taskService.update("1", {}), { status: 400 });
    await assert.rejects(taskService.update("1", { unknown: true }), { status: 400 });
    assert.equal(lookupCalls, 0);
  });

  it("updates valid partial fields without changing the existing update contract", async () => {
    const record = {
      id: 1,
      update: async (input) => Object.assign(record, input),
    };
    let receivedId;
    stubTaskMethod("findByPk", async (id) => {
      receivedId = id;
      return record;
    });

    const updated = await taskService.update("1", { status: "CONCLUIDA" });

    assert.equal(receivedId, 1);
    assert.equal(updated.status, "CONCLUIDA");
  });

  it("rejects invalid identifier formats before looking up the task", async () => {
    let lookupCalls = 0;
    stubTaskMethod("findByPk", async () => {
      lookupCalls += 1;
      return null;
    });

    await assert.rejects(taskService.get("1e2"), { status: 400 });
    await assert.rejects(taskService.get("0"), { status: 400 });
    assert.equal(lookupCalls, 0);
  });

  it("returns not found for a well-formed identifier with no matching task", async () => {
    stubTaskMethod("findByPk", async () => null);

    await assert.rejects(taskService.get("987"), {
      status: 404,
      message: "Tarefa não encontrada.",
    });
  });

  it("propagates persistence failures for the server error handler", async () => {
    stubTaskMethod("create", async () => {
      throw new Error("database unavailable");
    });

    await assert.rejects(taskService.create(validPayload), /database unavailable/);
  });

  it("deletes an existing task", async () => {
    let destroyed = false;
    const record = { destroy: async () => { destroyed = true; } };
    stubTaskMethod("findByPk", async () => record);

    await taskService.delete("1");

    assert.equal(destroyed, true);
  });

  it("enforces description length and enum values at the model validation layer", async () => {
    const invalidDescription = Task.build({
      titulo: "Válida",
      descricao: "x".repeat(501),
      cor: "azul",
    });
    const invalidColor = Task.build({
      titulo: "Válida",
      descricao: "",
      cor: "preto",
    });
    const invalidStatus = Task.build({
      titulo: "Válida",
      descricao: "",
      cor: "azul",
      status: "EM_ANDAMENTO",
    });

    await assert.rejects(invalidDescription.validate(), { name: "SequelizeValidationError" });
    await assert.rejects(invalidColor.validate(), { name: "SequelizeValidationError" });
    await assert.rejects(invalidStatus.validate(), { name: "SequelizeValidationError" });
  });
});
