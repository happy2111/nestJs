import { Injectable } from '@nestjs/common';
import {CreateActorDto} from "./dto/create-actor.dto";
import {PrismaService} from "../prisma/prisma.service";
import {Actor} from "@prisma/client";

@Injectable()
export class ActorService {
  constructor(private readonly prismaService: PrismaService) {}

  // prisma generate - to generate type of model

  async onCreate(dto: CreateActorDto): Promise<Actor> {
    const {name} = dto;
    const actor = await this.prismaService.actor.create({
      data: {name},
    })
    return actor;
  }
}
