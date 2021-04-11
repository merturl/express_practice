import { Router } from "express";
import wrapAsync from "../../utlis/async";
import {
  check,
  login,
  logout,
  register,
  unregister,
  validate,
} from "./auth.controller";

const auth = Router();

auth.post("/login", validate, wrapAsync(login));
auth.post("/register", validate, wrapAsync(register));
auth.post("/unregister", wrapAsync(unregister));
auth.get("/check", wrapAsync(check));
auth.get("/logout", wrapAsync(logout));

export default auth;
