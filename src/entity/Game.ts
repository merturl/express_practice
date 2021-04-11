import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Song from "./Song";
import User from "./User";

@Entity()
export default class Game {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 255 })
  title!: string;

  @ManyToOne((type) => User, { cascade: true, eager: true })
  user!: User;
}
