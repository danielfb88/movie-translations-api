import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "translactions" })
export class Translaction {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "movie_id" })
  movieId!: string;

  @Column({ name: "iso_3166_1" })
  iso31661!: string;

  @Column({ name: "iso_639_1" })
  iso6391!: string;

  @Column({ name: "name" })
  name!: string;

  @Column({ name: "english_name" })
  englishName!: string;

  @Column({ name: "title", nullable: true, type: "text" })
  title!: string;

  @Column({ name: "overview", nullable: true, type: "text" })
  overview!: string;

  @Column({ name: "homepage", nullable: true, type: "text" })
  homepage!: string;
}
