import {
  Column,
  CreateDateColumn,
  Entity, Generated, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryColumn,
  PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import {ReviewEntity} from "../../review/entity/review.entity";
import { OneToMany } from "typeorm";
import {ActorEntity} from "../../actor/entities/actor.entiry";
import {MoviePosterEntity} from "./poster.entity";

export enum Genre {
  Action = 'Action',
  Comedy = 'Comedy',
  Drama = 'Drama',
  Horror = 'Horror',
  Romance = 'Romance',
  Thriller = 'Thriller',
}

@Entity({ name: 'movie'})
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    default: ''
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
    default: '',
  })
  description: string;

  @Column({
    name: "release_year",
    type: 'int2',
    unsigned: true, // только положительные значения от 0 до 65535
    nullable: true,
  })
  releaseYear: number;

  @Column({
    type: "decimal",
    precision: 2,
    scale: 1,
    default: 0.0,
  })
  rating: number;

  @Column({
    name: "is_available",
    type: "boolean",
    default: true
  })
  isAvailable: boolean;

  @Column({
    name: "is_public",
    type: "boolean",
    default: false
  })
  isPublic: boolean

  @Column({
    type: "enum",
    enum: Genre,
    default: Genre.Action,
  })
  genre: Genre;

  @OneToMany(() => ReviewEntity, (review) => review.movie)
  reviews: ReviewEntity[];

  @ManyToMany(() => ActorEntity, (actor) => actor.movie)
  @JoinTable({
    name: 'movie_actors',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'actor_id',
    }
  })
  actors: ActorEntity[];

  @Column({name: "poster_id", type: 'uuid', nullable: true})
  posterId: string;

  @OneToOne(() => MoviePosterEntity, (poster) => poster.movie,
    {
      onDelete: 'CASCADE',
      nullable: true,
    })
  @JoinColumn({name: "poster_id"})
  poster: MoviePosterEntity | null;


  @CreateDateColumn(
    {name: "create_at",}
  )
  createAt: Date;

  @UpdateDateColumn(
    {name: "update_at",}
  )
  updateAt: Date;
}