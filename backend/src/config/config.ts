import dotenv from "dotenv";
const Joi = require("@hapi/joi");
import path from "path";

const rootPath = path.resolve(__dirname);

const envSchema = Joi.object({
    PORT: Joi.number(),
    DB_HOST: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_NAME_CARTERA: Joi.string().required(),
    DB_NAME_COMUNICACIONES: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
});

const { error, value } = envSchema.validate(process.env);

const config = {
  ENV: value.NODE_ENV,
  DB_HOST: value.DB_HOST,
  DB_NAME: value.DB_NAME,
  DB_NAME_CARTERA: value.DB_NAME_CARTERA,
  DB_NAME_COMUNICACIONES: value.DB_NAME_COMUNICACIONES,
  DB_NAME_CRM: value.DB_NAME_CRM,
  DB_USER: value.DB_USER,
  DB_PASSWORD: value.DB_PASSWORD,
  ROOT_PATH: rootPath,
}

export default config;
