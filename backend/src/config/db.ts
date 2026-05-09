import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/User";

import { Resume } from "../entities/Resume.js";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [User, Resume],
  subscribers: [],
  migrations: [],
});