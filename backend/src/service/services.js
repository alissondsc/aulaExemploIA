import Task from "../model/models.js";

function parseId(id) {
  const parsed = Number(id);
  if (!Number.isInteger(parsed) || parsed < 1) {
    const error = new Error("O ID informado é inválido.");
    error.status = 400;
    throw error;
  }
  return parsed;
}

async function findTask(id) {
  const task = await Task.findByPk(parseId(id));
  if (!task) {
    const error = new Error("Tarefa não encontrada.");
    error.status = 404;
    throw error;
  }
  return task;
}

function normalizeInput(input) {
  const normalized = {};
  if (input.titulo !== undefined) {
    normalized.titulo = typeof input.titulo === "string" ? input.titulo.trim() : "";
  }
  if (input.descricao !== undefined) {
    normalized.descricao = typeof input.descricao === "string" ? input.descricao.trim() : "";
  }
  if (input.cor !== undefined) normalized.cor = input.cor;
  if (input.status !== undefined) normalized.status = input.status;

  if (Object.prototype.hasOwnProperty.call(normalized, "titulo") && !normalized.titulo) {
    const error = new Error("O título é obrigatório.");
    error.status = 400;
    throw error;
  }
  return normalized;
}

export default {
  list() {
    return Task.findAll({ order: [["createdAt", "DESC"]] });
  },
  get(id) {
    return findTask(id);
  },
  async create(input) {
    const normalized = normalizeInput(input);
    if (!normalized.titulo) {
      const error = new Error("O título é obrigatório.");
      error.status = 400;
      throw error;
    }
    return Task.create(normalized);
  },
  async update(id, input) {
    const task = await findTask(id);
    const normalized = normalizeInput(input);
    if (input.status !== undefined) {
      normalized.status = input.status;
    }
    await task.update(normalized);
    return task;
  },
  async delete(id) {
    const task = await findTask(id);
    await task.destroy();
  },
};
