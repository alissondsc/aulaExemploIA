import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const useSsl = process.env.DB_SSL === "true";

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging: process.env.NODE_ENV === "development" ? console.log : false,
      dialectOptions: useSsl
        ? { ssl: { require: true, rejectUnauthorized: false } }
        : {},
    })
  : new Sequelize(
      process.env.DB_NAME || "tarefas",
      process.env.DB_USER || "postgres",
      process.env.DB_PASSWORD || "",
      {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT || 5432),
        dialect: "postgres",
        logging: process.env.NODE_ENV === "development" ? console.log : false,
        dialectOptions: useSsl
          ? { ssl: { require: true, rejectUnauthorized: false } }
          : {},
      },
    );

export default sequelize;