import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {MovieDto} from "./dto/movie.dto";
import {Movie, MoviePoster} from "@prisma/client";
import {map} from "rxjs";

@Injectable()
export class MovieService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}


  async findAll() {
    return this.prismaService.movie.findMany({
      where: {
        isAvailable:true
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        poster: true,

        reviews: {
          select: {
            text: true,
            rating: true
          }
        },

        actors: {
          select: {
            id: true,
            name: true,
          }
        }
      },

    });
  }


  async findById(id: string): Promise<Movie> {
    const movie = await this.prismaService.movie.findUnique({
      where: {
        id,
      },
      include: {
        poster: true,
        actors: true,
        reviews: true,
      }
    });

    if (!movie) throw new NotFoundException("Movie not found")

    return movie;
  }

  async create(dto: MovieDto):Promise<Movie> {
    const {title, releaseYear, actorsIds, imageUrl } = dto;

    const actors = await this.prismaService.actor.findMany({
      where: {
        id: {in: actorsIds}
      }
    })

    console.log(actors, actorsIds)

    if (!actors || actors.length === 0 || actors.length !== actorsIds.length) {
      throw new NotFoundException("Actors not found");
    }


    const movie = await this.prismaService.movie.create({
      data: {
        title,
        releaseYear,
        poster: imageUrl
          ? {
              create: {
                url: imageUrl
              }
            }
          : undefined,
        actors: {
          connect: actors.map((actor) => ({
            id: actor.id,
          }))
        }

      }
    })
    return movie;
  }

  async update(dto: MovieDto, id: string): Promise<boolean> {
    const movie = await this.findById(id)

    await this.prismaService.movie.update({
      where: {
        id: movie.id,
      },
      data: {
        ...dto,
        releaseYear: dto.releaseYear,
        poster: dto.imageUrl
        ? {
            create: {
              url: dto.imageUrl
            }
          }
        : undefined,
        actors: {
          connect: dto.actorsIds.map((actorId) => ({
            id: actorId,
          }))
        }
      }
    })

    return true;
  }

  async patchPublic(id: string): Promise<boolean> {
    const movie = await this.findById(id);
    await this.prismaService.movie.update({
      where: {
        id
      },
      data: {
        isAvailable: !movie.isAvailable
      }
    })
    return true;
  }


  async remove(id: string): Promise<string> {
    const movie = await this.findById(id);
    await this.prismaService.movie.delete({
      where: {
        id
      }
    });
    return `Movie removed name: ${movie.title}`;
  }

}
