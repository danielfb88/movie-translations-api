import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "movies" })
export class Movie {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "api_movie_id" })
  apiMovieId!: number;

  @Column({ name: "original_title" })
  originalTitle!: string;
}
