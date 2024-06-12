import { DataSource } from "typeorm";
import path from "path";
import config from "./config";

export enum DBConnection {
    configurador = "",
}

const entityPathConfigurador = path.resolve(__dirname, "../entity/configurador/**/*{.js,.ts}");

export const DB = new DataSource({
    type: "mariadb",
    host: config.DB_HOST,
    port: 3307,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    logging: ["error"],
    entities: [entityPathConfigurador],
    extra: {
      connectionLimit: 75,
    },
});