import { RequestHandler } from "express";
import { getRepository } from "typeorm";
import Game from "../../entity/Game";
import Song from "../../entity/Song";
import User from "../../entity/User";

interface dto {
  title: string;
  songs: { title: string; url: string }[];
}

export const register: RequestHandler = async (req, res, next) => {
  console.log("req", req.user);
  const { title, songs } = <dto>req.body;
  const gameRepo = getRepository(Game);
  const userRepo = getRepository(User);
  const songRepo = getRepository(Song);
  const game = new Game();
  const user = await userRepo.findOne({
    where: {
      id: req.user.id,
    },
  });
  game.title = title;
  if (!user) {
    return res.status(401).json();
  }
  game.user = user;
  game.songs = [];
  for (const { title, url } of songs) {
    const song = new Song();
    song.title = title;
    song.url = url;
    song.user = user;
    
    await songRepo.save(song);
    game.songs.push(song);
  }
  await gameRepo.save(game);
  return res.status(200).json();
};

export const deleteSongs: RequestHandler = async (req, res, next) => {
  console.log("req", req.user);
  const { title, songs } = req.body;
  const gameRepo = getRepository(Game);
  const userRepo = getRepository(User);
  const game = new Game();
  res.status(200).json();
  const user = await userRepo.findOne({
    where: {
      id: req.user.id,
    },
  });
  game.title = title;
  if (user) game.user = user;
  await gameRepo.save(game);
  // if (userDuplicate) {
  //   return res.status(500).json();
  // }

  // const user = new Game();

  // await userRepo.save(user);
  // try {
  //   const { accessToken } = user.generateUserToken();
  //   res.cookie("accessToken", accessToken, {
  //     httpOnly: true,
  //     maxAge: 1000 * 60 * 60 * 24 * 7,
  //   });
  //   return res.status(201).json({
  //     user: {
  //       id: user.id,
  //       username: user.username,
  //     },
  //   });
  // } catch (error) {
  //   next(error);
  // }
};
