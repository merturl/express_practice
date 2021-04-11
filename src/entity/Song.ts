import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Game from "./Game";

@Entity()
export default class Song {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 255 })
  title!: string;

  @Column({ length: 255 })
  url!: string;

  @ManyToOne((type) => Game, { cascade: true })
  game!: Game;
}
