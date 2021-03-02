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
  const { accessToken } = req.cookies;
  console.log(accessToken);
  if (!accessToken) {
    req.user = null;
    return next();
  }

  try {
    const decoded = decodeToken<TokenData>(accessToken);
    const diff = decoded.exp * 1000 - new Date().getTime();
    if (diff < 1000 * 60 * 30 * 24 * 3) {
      const newToken = generateToken(
        { username: decoded.username },
        {
          expiresIn: "7d",
        }
      );
      res.cookie("accessToken", newToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
    }
    req.user = decoded;
  } catch (error) {
    req.user = null;
  }
  return next();
};

export default jwtMiddleware;
