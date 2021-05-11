import { RequestHandler } from "express";
import Joi from "joi";
import { getRepository } from "typeorm";
import User from "../../entity/User";

export const validate: RequestHandler = (req, res, next) => {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(4).max(15).required(),
    password: Joi.string().required().min(6),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(403).json();

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
    return res.status(403).json();
  }

  const checkPassword = await user.comparePassword(password);
  if (!checkPassword) {
    return res.status(403).json();
  }
  try {
    const { accessToken } = user.generateUserToken();
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });
    return res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const register: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  const userRepo = getRepository(User);
  const userDuplicate = await userRepo.findOne({
    where: {
      username,
    },
  });

  if (userDuplicate) {
    return res.status(500).json();
  }

  const user = new User();
  user.username = username;
  user.password = password;

  await userRepo.save(user);
  try {
    const { accessToken } = user.generateUserToken();
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const unregister: RequestHandler = async (req, res, next) => {
  const { user } = req.body;
  console.log(user);
  if (!user) {
    return res.status(401).json();
  }
  const userRepo = getRepository(User);
  const existUser = await userRepo.findOne({
    where: {
      id: user.id,
    },
  });
  if (!existUser) {
    return res.status(401).json();
  }
  res.clearCookie("accessToken");
  await userRepo.delete({ id: user.id });
  return res.status(200).json({ user: null });
};

export const check: RequestHandler = async (req, res, next) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json();
  }
  const userRepo = getRepository(User);
  const existUser = await userRepo.findOne({
    where: {
      id: user.id,
    },
  });
  if (!existUser) {
    res.clearCookie("accessToken");
    return res.status(401).json();
  }
  return res.status(200).json({
    user: {
      id: existUser.id,
      username: existUser.username,
    },
  });
};

export const logout: RequestHandler = async (req, res, next) => {
  res.clearCookie("accessToken");
  return res.status(204).json({ user: null });
};
