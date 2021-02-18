import { createConnection } from "typeorm";
import app from "./app";
import connectionOptions from "./ormConfig";
createConnection(connectionOptions).then(() => {
  app.listen(3000);
});
