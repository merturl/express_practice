import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Topic from "./Topic";

@Entity()
export default class Song {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 255 })
  title!: string;

  @Column({ length: 255 })
  url!: string;

  @ManyToOne((type) => Topic, (topic) => topic.songs)
  topic!: Topic;
}
