import { Router } from "express";
import wrapAsync from "../../utlis/async";
import { register } from "./game.controller";
// import { check, login, logout, register, unregister, validate } from "./auth.controller";

const game = Router();

// post.post("/login", validate, wrapAsync(login));
game.post("/register", wrapAsync(register));
// post.get("/check", wrapAsync(check));
// post.get("/logout", wrapAsync(logout));

export default game;
