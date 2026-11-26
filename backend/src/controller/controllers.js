import taskService from "../service/services.js";

function next(handler) {
  return async (req, res, nextHandler) => {
    try {
      await handler(req, res, nextHandler);
    } catch (error) {
      if (error.status) {
        return res.status(error.status).json({ message: error.message });
      }
      nextHandler(error);
    }
  };
}

export default {
  list: next(async (_req, res) => {
    const tasks = await taskService.list();
    res.status(200).json(tasks);
  }),
  get: next(async (req, res) => {
    const task = await taskService.get(req.params.id);
    res.status(200).json(task);
  }),
  create: next(async (req, res) => {
    const task = await taskService.create(req.body);
    res.status(201).json(task);
  }),
  update: next(async (req, res) => {
    const task = await taskService.update(req.params.id, req.body);
    res.status(200).json(task);
  }),
  delete: next(async (req, res) => {
    await taskService.delete(req.params.id);
    res.status(204).send();
  }),
};
