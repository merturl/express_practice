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
  @Column({ default: 0 })
  start!: number;
  @Column({ default: 0 })
  end!: number;

  @ManyToOne((type) => Quiz, (quiz) => quiz.songs, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "quiz_id" })
  quiz!: Quiz;
}
