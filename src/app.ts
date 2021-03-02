import express from "express";
import morgan from "morgan";
import api from "./controllers";
import cookieParser from "cookie-parser";
import jwtMiddleware from "./middlewares/jwt";
import notFoundMiddleware from "./middlewares/notFound";
import errorMiddleware from "./middlewares/error";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.use(jwtMiddleware);
app.use("/api", api);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
