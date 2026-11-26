import Task from "../model/models.js";

const ALLOWED_FIELDS = new Set(["titulo", "descricao", "cor", "status"]);
const ALLOWED_COLORS = ["azul", "verde", "amarelo", "roxo", "vermelho"];
const ALLOWED_STATUSES = ["PENDENTE", "CONCLUIDA"];
const TITLE_MAX_LENGTH = 120;
const DESCRIPTION_MAX_LENGTH = 500;

function badRequest(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

function parseId(id) {
  const value = String(id);
  if (!/^[1-9]\d*$/.test(value)) throw badRequest("O ID informado é inválido.");
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed)) throw badRequest("O ID informado é inválido.");
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

function normalizeInput(input, { requireTitle = false } = {}) {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    throw badRequest("O corpo da requisição deve ser um objeto.");
  }

  const keys = Object.keys(input);
  const unexpectedField = keys.find((key) => !ALLOWED_FIELDS.has(key));
  if (unexpectedField) {
    throw badRequest(`Campo não permitido: ${unexpectedField}.`);
  }
  if (requireTitle && !Object.prototype.hasOwnProperty.call(input, "titulo")) {
    throw badRequest("O título é obrigatório.");
  }
  if (!requireTitle && keys.length === 0) {
    throw badRequest("Informe ao menos um campo para atualizar.");
  }

  const normalized = {};
  if (Object.prototype.hasOwnProperty.call(input, "titulo")) {
    if (typeof input.titulo !== "string") {
      throw badRequest("O título deve ser um texto.");
    }
    if (input.titulo.length > TITLE_MAX_LENGTH) {
      throw badRequest(`O título deve ter no máximo ${TITLE_MAX_LENGTH} caracteres.`);
    }
    normalized.titulo = input.titulo.trim();
    if (!normalized.titulo) throw badRequest("O título é obrigatório.");
  }
  if (Object.prototype.hasOwnProperty.call(input, "descricao")) {
    if (typeof input.descricao !== "string") {
      throw badRequest("A descrição deve ser um texto.");
    }
    if (input.descricao.length > DESCRIPTION_MAX_LENGTH) {
      throw badRequest(`A descrição deve ter no máximo ${DESCRIPTION_MAX_LENGTH} caracteres.`);
    }
    normalized.descricao = input.descricao.trim();
  }
  if (Object.prototype.hasOwnProperty.call(input, "cor")) {
    if (typeof input.cor !== "string" || !ALLOWED_COLORS.includes(input.cor)) {
      throw badRequest("A cor informada é inválida.");
    }
    normalized.cor = input.cor;
  }
  if (Object.prototype.hasOwnProperty.call(input, "status")) {
    if (typeof input.status !== "string" || !ALLOWED_STATUSES.includes(input.status)) {
      throw badRequest("O status informado é inválido.");
    }
    normalized.status = input.status;
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
    const normalized = normalizeInput(input, { requireTitle: true });
    return Task.create(normalized);
  },
  async update(id, input) {
    const normalized = normalizeInput(input);
    const task = await findTask(id);
    await task.update(normalized);
    return task;
  },
  async delete(id) {
    const task = await findTask(id);
    await task.destroy();
  },
};
