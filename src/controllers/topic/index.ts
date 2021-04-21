import { Router } from "express";
import wrapAsync from "../../utlis/async";
import { readAllTopic, readOneTopic, writeTopic } from "./topic.controller";
// import { check, login, logout, register, unregister, validate } from "./auth.controller";

const topic = Router();

// post.post("/login", validate, wrapAsync(login));
topic.post("/", wrapAsync(writeTopic));
topic.get("/", wrapAsync(readAllTopic));
topic.get("/:id", wrapAsync(readOneTopic));
// post.get("/check", wrapAsync(check));
// post.get("/logout", wrapAsync(logout));

export default topic;
