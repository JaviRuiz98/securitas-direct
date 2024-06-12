import { DataSource } from "typeorm";
import path from "path";
import config from "./config";
import dotenv from 'dotenv';

export enum DBConnection {
    configurador = "",
}
dotenv.config();

const entityPathConfigurador = path.resolve(__dirname, "../entity/configurador/**/*{.js,.ts}");

export const DB = new DataSource({
    type: "mariadb",
    host: process.env.DB_HOST,
    port: 3307,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: ["error"],
    entities: [entityPathConfigurador],
    extra: {
      connectionLimit: 75,
    },
});