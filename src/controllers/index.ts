import { Router } from "express";
import auth from "./auth";
import async from "./async";
import topic from "./topic";

const api = Router();
api.use("/auth", auth);
api.use("/topic", topic);
api.use("/async", async);

export default api;
