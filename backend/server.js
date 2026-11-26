import "dotenv/config";
import express from "express";
import cors from "cors";
import sequelize from "./src/config/database.js";
import taskRouter from "./src/router/routes.js";

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN && process.env.CORS_ORIGIN !== "*"
      ? process.env.CORS_ORIGIN
      : true,
  }),
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/tasks", taskRouter);

app.use((req, res) => {
  res.status(404).json({ message: `Rota não encontrada: ${req.method} ${req.originalUrl}` });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ message: "O JSON enviado é inválido." });
  }
  if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({ message: "Dados inválidos." });
  }
  return res.status(500).json({ message: "Erro interno do servidor." });
});

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Não foi possível iniciar o servidor:", error.message);
    process.exitCode = 1;
  }
}

start();
