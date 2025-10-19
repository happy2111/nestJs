import {
  Column, CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import {MovieEntity} from "../../movie/entities/movie.entity";

@Entity('actors')
export class ActorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', length: 255})
  name: string;

  @ManyToMany(() =>  MovieEntity, (movie) => movie.actors)

  @JoinColumn({name: 'movie_id'})
  movie: MovieEntity;

  @CreateDateColumn({name: 'create_at'})
  createAt: Date;

  @CreateDateColumn({name: 'update_at'})
  updateAT: Date;
}