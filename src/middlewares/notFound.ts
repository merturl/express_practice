import { RequestHandler } from "express";

const notFoundMiddleware: RequestHandler = (req, res) => {
  res.status(404).send("NOT FOUND API");
};

export default notFoundMiddleware;
