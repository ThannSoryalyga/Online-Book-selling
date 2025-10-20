import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "@/models/user";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "password",
  database: process.env.DB_NAME || "bookstore",
  synchronize: true,
  logging: false,
  entities: [User],
});
