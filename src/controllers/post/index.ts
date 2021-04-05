import { Router } from "express";
import wrapAsync from "../../utlis/async";
// import { check, login, logout, register, unregister, validate } from "./auth.controller";

const post = Router();

// post.post("/login", validate, wrapAsync(login));
// post.post("/register", validate, wrapAsync(register));
// post.post("/unregister", wrapAsync(unregister));
// post.get("/check", wrapAsync(check));
// post.get("/logout", wrapAsync(logout));

export default post;
