import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "movies" })
export class Movie {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
}
