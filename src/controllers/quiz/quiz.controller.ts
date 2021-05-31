import { RequestHandler } from "express";
import { getRepository } from "typeorm";
import Quiz from "../../entity/Quiz";
import Song from "../../entity/Song";
import User from "../../entity/User";

interface dto {
  title: string;
  songs: {
    title: string;
    url: string;
    start: number;
    end: number;
  }[];
}

export const writeQuiz: RequestHandler = async (req, res, next) => {
  const { title, songs } = <dto>req.body;
  const quizRepo = getRepository(Quiz);
  const userRepo = getRepository(User);
  const songRepo = getRepository(Song);
  const quiz = new Quiz();
  const user = await userRepo.findOne({
    where: {
      id: req.user.id,
    },
  });
  quiz.title = title;
  if (!user) {
    return res.status(401).json();
  }
  quiz.user = user;
  quiz.songs = [];
  console.log(songs);
  for (const { title, url, start, end } of songs) {
    const song = new Song();
    song.title = title;
    song.url = url;
    song.start = start;
    song.end = end;
    quiz.songs.push(song);
    await songRepo.save(song);
  }
  await quizRepo.save(quiz);
  return res.status(200).json({ quiz });
};

export const deleteSongs: RequestHandler = async (req, res, next) => {
  const { title, songs } = req.body;
  const quizRepo = getRepository(Quiz);
  const userRepo = getRepository(User);
  const game = new Quiz();
  const user = await userRepo.findOne({
    where: {
      id: req.user.id,
    },
  });
  game.title = title;
  if (user) game.user = user;
  await quizRepo.save(game);
  res.status(200).json();
};

export const readAllQuiz: RequestHandler = async (req, res, next) => {
  const quizRepo = getRepository(Quiz);
  const quizzes = await quizRepo.find({
    select: ["id", "title"],
  });
  res.status(200).json({ quizzes });
};

export const readOneQuiz: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const quizRepo = getRepository(Quiz);
  const quiz = await quizRepo.findOne({
    select: ["id", "title"],
    join: {
      alias: "quiz",
      leftJoinAndSelect: {
        songs: "quiz.songs",
      },
    },
    where: { id },
  });
  res.status(200).json({ quiz });
};
