import { NextFunction, Request, Response } from "express";

class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("@@@@@@@@@@@ERRORMILL@@@@@@@@@@@@@@");
  return res.status(500).json({ message: error.message });
}

export default errorMiddleware;
