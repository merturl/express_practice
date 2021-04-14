import { RequestHandler } from "express";
import { getRepository } from "typeorm";
import Topic from "../../entity/Topic";
import Song from "../../entity/Song";
import User from "../../entity/User";

interface dto {
  title: string;
  songs: { title: string; url: string }[];
}

export const register: RequestHandler = async (req, res, next) => {
  console.log("req", req.user);
  const { title, songs } = <dto>req.body;
  const topicRepo = getRepository(Topic);
  const userRepo = getRepository(User);
  const songRepo = getRepository(Song);
  const topic = new Topic();
  const user = await userRepo.findOne({
    where: {
      id: req.user.id,
    },
  });
  topic.title = title;
  if (!user) {
    return res.status(401).json();
  }
  topic.user = user;
  for (const { title, url } of songs) {
    const song = new Song();
    song.title = title;
    song.url = url;
    song.topic = topic;
    
    await songRepo.save(song);
  }
  await topicRepo.save(topic);
  return res.status(200).json();
};

export const deleteSongs: RequestHandler = async (req, res, next) => {
  console.log("req", req.user);
  const { title, songs } = req.body;
  const topicRepo = getRepository(Topic);
  const userRepo = getRepository(User);
  const game = new Topic();
  const user = await userRepo.findOne({
    where: {
      id: req.user.id,
    },
  });
  game.title = title;
  if (user) game.user = user;
  await topicRepo.save(game);
  res.status(200).json();
};
