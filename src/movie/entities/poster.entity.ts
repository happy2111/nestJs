import {
  Column,
  CreateDateColumn,
  Entity, OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import {MovieEntity} from "./movie.entity";

@Entity("movie_poster")
export class MoviePosterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', length: 255})
  url: string;

  @OneToOne(() => MovieEntity, (movie) => movie.poster)
  movie: MovieEntity;

  @CreateDateColumn({name: "create_at"})
  createAt: Date;
}