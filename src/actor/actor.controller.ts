import {Body, Controller, Get, Post} from '@nestjs/common';
import { ActorService } from './actor.service';
import {CreateActorDto} from "./dto/create-actor.dto";

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Post('create')
  create(@Body() dto: CreateActorDto) {
    return this.actorService.onCreate(dto);
  }
}
