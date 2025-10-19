import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MovieEntity} from "./entities/movie.entity";
import {In, Repository} from "typeorm";
import {MovieDto} from "./dto/movie.dto";
import {ActorEntity} from "../actor/entities/actor.entiry";
import {MoviePosterEntity} from "./entities/poster.entity";

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
    @InjectRepository(MoviePosterEntity)
    private readonly moviePosterRepository: Repository<MoviePosterEntity>,
  ) {}

  async findAll():Promise<MovieEntity[]> {
    return await this.movieRepository.find(
      {
        order: {
          createAt: 'DESC'
        },
        where: {
          isAvailable: true
        },
        relations: ["actors", 'reviews']
        // select: {
        //   // title: true,
        //   // releaseYear: true,
        // }
      }
    );
  }

  async findById(id: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({
      where: {
        id
      }
    });

    if (!movie) throw new NotFoundException("Movie not found")

    return movie;


  }

  async create(dto: MovieDto):Promise<MovieEntity> {
    const {title, releaseYear, actorsIds, imageUrl } = dto;

    const actors = await this.actorRepository.find({
      where: {
        id: In(actorsIds)
      }
    })

    if (!actors || actors.length === 0 || actors.length !== actorsIds.length) {
      throw new NotFoundException("Actors not found");
    }

    let poster: MoviePosterEntity | null = null;

    if (imageUrl) {
        poster = this.moviePosterRepository.create({url: imageUrl});
        await this.moviePosterRepository.save(poster);
    }

    const movie = this.movieRepository.create({
      title,
      releaseYear,
      poster,
      actors,
    });
    return await this.movieRepository.save(movie);
  }

  async update(dto: MovieDto, id: string): Promise<boolean> {
    const movie = await this.findById(id)
    Object.assign(movie, dto);

    await this.movieRepository.save(movie);

    return true;
  }

  async patchPublic(id: string): Promise<boolean> {
    const movie = await this.findById(id);
    movie.isPublic = !movie.isPublic;
    await this.movieRepository.save(movie);
    return true;
  }

  async remove(id: string): Promise<string> {
    const movie = await this.findById(id);
    await this.movieRepository.remove(movie);
    return `Movie removed name: ${movie.title}`;
  }

}
