import { Router } from "express";
import wrapAsync from "../../utlis/async";
import { readAllQuiz, readOneQuiz, writeQuiz } from "./quiz.controller";
// import { check, login, logout, register, unregister, validate } from "./auth.controller";

const quiz = Router();

// post.post("/login", validate, wrapAsync(login));
quiz.post("/", wrapAsync(writeQuiz));
quiz.get("/", wrapAsync(readAllQuiz));
quiz.get("/:id", wrapAsync(readOneQuiz));
// post.get("/check", wrapAsync(check));
// post.get("/logout", wrapAsync(logout));

export default quiz;
