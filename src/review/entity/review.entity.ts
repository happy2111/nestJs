import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import {MovieEntity} from "../../movie/entities/movie.entity";
import { ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: 'review'})
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column({
    type: 'text',
  })
  text: string;

  @Column({
    type: 'decimal',
    precision: 2,
    scale: 1,
    default: 5.0,
  })
  rating: number;

  @Column({
    name: "movie_id",
    type: 'uuid',
  })
  movieId: string;

  @ManyToOne(() => MovieEntity, (movie) => movie.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: "movie_id"})
  movie: MovieEntity;

  @CreateDateColumn(
    {name: "create_at",}
  )
  createAt: Date;

  @UpdateDateColumn(
    {name: "update_at",}
  )
  updateAt: Date;
}