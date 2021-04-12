import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Song from "./Song";
import User from "./User";

//Rename Game to Topic

@Entity()
export default class Game {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 255 })
  title!: string;

  @ManyToOne((type) => User, { cascade: true, eager: true })
  user!: User;

  @ManyToMany((type) => Song)
  @JoinTable({
    name: 'game_songs',
    joinColumn: {
      name: 'fk_game_id'
    },
    inverseJoinColumn: {
      name: 'fk_song_id'
    }
  })
  songs!: Song[];
}
