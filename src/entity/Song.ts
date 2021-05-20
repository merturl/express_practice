import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Quiz from "./Quiz";

@Entity()
export default class Song {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 255 })
  title!: string;

  @Column({ length: 255 })
  url!: string;
  @Column()
  start?: number;
  @Column()
  end?: number;

  @ManyToOne((type) => Quiz, (quiz) => quiz.songs)
  @JoinColumn({ name: "quiz_id" })
  quiz!: Quiz;
}
