import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: {
        notEmpty: { msg: "O título é obrigatório." },
        len: { args: [1, 120], msg: "O título deve ter entre 1 e 120 caracteres." },
      },
    },
    descricao: {
      type: DataTypes.STRING(500),
      allowNull: false,
      defaultValue: "",
    },
    cor: {
      type: DataTypes.ENUM("azul", "verde", "amarelo", "roxo", "vermelho"),
      allowNull: false,
      defaultValue: "azul",
    },
    status: {
      type: DataTypes.ENUM("PENDENTE", "CONCLUIDA"),
      allowNull: false,
      defaultValue: "PENDENTE",
    },
  },
  {
    tableName: "tasks",
    underscored: true,
    timestamps: true,
  },
);

export default Task;
