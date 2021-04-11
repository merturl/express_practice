import { Router } from "express";
import auth from "./auth";
import async from "./async";
import game from "./game";

const api = Router();
api.use("/auth", auth);
api.use("/game", game);
api.use("/async", async);

export default api;
