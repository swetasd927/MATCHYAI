import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

import { User } from "../entities/User.js";
import { Resume } from "../entities/Resume.js";
import { Job } from "../entities/Job.js";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource(
  process.env.DATABASE_URL
    ? {
        type: "postgres",
        url: process.env.DATABASE_URL,
        ssl: isProduction ? { rejectUnauthorized: false } : false,
        synchronize: true,
        logging: true,
        entities: [User, Resume, Job],
        subscribers: [],
        migrations: [],
      }
    : {
        type: "postgres",
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || "postgres",
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE || "matchyai",
        synchronize: true,
        logging: true,
        entities: [User, Resume, Job],
        subscribers: [],
        migrations: [],
      }
);