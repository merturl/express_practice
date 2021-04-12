import dotenv from "dotenv";
dotenv.config();
import { ConnectionOptions } from "typeorm";
import entities from "./entity";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities,
  host: process.env.DB_ENDPOINT,
  port: 32768,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "123123",
};

export default connectionOptions;
