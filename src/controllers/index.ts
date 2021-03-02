import { Router } from "express";
import auth from "./auth";
import async from "./async";

const api = Router();
api.use("/auth", auth);
api.use("/async", async);

export default api;
