import { RequestHandler, Router } from "express";
import Joi from "joi";
import { getRepository } from "typeorm";
import User from "../entity/User";
import wrapAsync from "../utlis/async";
import { decodeToken, generateToken } from "../utlis/token";
const auth = Router();

export const validate: RequestHandler = (req, res, next) => {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(4).max(15).required(),
    password: Joi.string().required().min(6),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(403).json({ message: "userform is invalid" });

  return next();
};

export const login: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  const userRepo = getRepository(User);

  const user = await userRepo.findOne({
    where: {
      username,
    },
  });
  if (!user) {
    return res.status(403).json({ message: "wrong username or password" });
  }

  const checkPassword = await user.comparePassword(password);
  if (!checkPassword) {
    return res.status(403).json({ message: "wrong username or password" });
  }
  try {
    const token = generateToken(
      { username: user.username },
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });
    return res.status(200).json({ message: "login success", token });
  } catch (error) {
    next(error);
  }
};

export const register: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  const userRepo = getRepository(User);
  const user = new User();
  const userDuplicate = await userRepo.findOne({
    where: {
      username,
    },
  });

  if (userDuplicate) {
    return res.status(500).json({ message: "user is duplicated" });
  }
  user.username = username;
  user.password = password;

  await userRepo.save(user);
  try {
    const token = generateToken(
      { username: user.username },
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });
    return res.status(201).json({ message: "success, create User", token });
  } catch (error) {
    next(error);
  }
};

export const check: RequestHandler = async (req, res, next) => {
  // res.cookie;
  // decodeToken();
  console.log(req.user);
  return res.json({ ok: "ok" });
};

auth.post("/login", validate, wrapAsync(login));
auth.post("/register", validate, wrapAsync(register));
auth.get("/check", wrapAsync(check));

export default auth;
