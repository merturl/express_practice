import { RequestHandler, Router } from "express";
import wrapAsync from "../utlis/async";
const async = Router();
export const asyncTest: RequestHandler = (req, res, next) => {
  // try {
  //   throw new Error("1212");
  // } catch (error) {
  //   return next({ ok: "ok" });
  // }
  // setTimeout(() => {
  //   try {
  //     throw new Error("hello");
  //   } catch (error) {
  //     console.log("error");
  //     return next(error);
  //   }
  // }, 0);
};

async.get("/async", asyncTest);

export default async;
