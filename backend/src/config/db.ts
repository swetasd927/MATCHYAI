import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/User";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_DATABASE || "sweta",
    synchronize: true, // Auto create db schema based on entities
    logging: false,
    entities: [User],
    subscribers: [],
    migrations: [],
});