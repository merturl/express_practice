import { Router } from "express";
import wrapAsync from "../../utlis/async";
import { check, login, logout, register, validate } from "./auth.controller";

const auth = Router();

auth.post("/login", validate, wrapAsync(login));
auth.post("/register", validate, wrapAsync(register));
auth.get("/check", wrapAsync(check));
auth.get("/logout", wrapAsync(logout));

export default auth;
