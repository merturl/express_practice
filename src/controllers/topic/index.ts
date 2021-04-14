import { Router } from "express";
import wrapAsync from "../../utlis/async";
import { register } from "./topic.controller";
// import { check, login, logout, register, unregister, validate } from "./auth.controller";

const topic = Router();

// post.post("/login", validate, wrapAsync(login));
topic.post("/register", wrapAsync(register));
// post.get("/check", wrapAsync(check));
// post.get("/logout", wrapAsync(logout));

export default topic;
