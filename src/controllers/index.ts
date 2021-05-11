import { Router } from "express";
import auth from "./auth";
import async from "./async";
import quiz from "./quiz";

const api = Router();
api.use("/auth", auth);
api.use("/quiz", quiz);
api.use("/async", async);

export default api;
