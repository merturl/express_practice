import dotenv from "dotenv";
dotenv.config();
import { ConnectionOptions } from "typeorm";
import entities from "./entity";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  database: "merturl",
  synchronize: true,
  logging: false,
  entities,
  host: process.env.DB_ENDPOINT,
  port: 5432,
  username: process.env.DB_USERNAME || "merturl",
  password: process.env.DB_PASSWORD || "merturl",
};

export default connectionOptions;
