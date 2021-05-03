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
  if (!accessToken) {
    console.log("accessToken is null!!!!!");
    req.user = null;
    return next();
  }

  try {
    const decoded = decodeToken<TokenData>(accessToken);
    const diff = decoded.exp * 1000 - new Date().getTime();
    if (diff < 1000 * 60 * 30 * 24 * 3) {
      console.log("date is expired");
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
    console.log("is OK");
    req.user = decoded;
  } catch (error) {
    console.log("ERROR!!!!");
    req.user = null;
  }
  return next();
};

export default jwtMiddleware;
