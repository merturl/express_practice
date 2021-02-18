import { RequestHandler } from "express";
import { decodeToken, generateToken } from "../utlis/token";

type TokenData = {
  username: string;
  iat: number;
  exp: number;
  sub: string;
  iss: string;
};

const jwtMiddleware: RequestHandler = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next();
  try {
    const decoded = decodeToken<TokenData>(token);
    const diff = decoded.exp * 1000 - new Date().getTime();
    if (diff < 1000 * 60 * 30) {
      const newToken = generateToken(
        { username: decoded.username },
        {
          expiresIn: "1h",
        }
      );
      res.cookie("token", newToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      });
    }
    req.user = decoded;
    return next();
  } catch (error) {
    req.user = null;
    return next(error);
  }
};

export default jwtMiddleware;
