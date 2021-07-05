import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Song from "./Song";
import User from "./User";

@Entity()
export default class Quiz {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 255 })
  title!: string;

  @ManyToOne((type) => User, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: User;
  @OneToMany((type) => Song, (song) => song.quiz)
  songs!: Song[];
}
