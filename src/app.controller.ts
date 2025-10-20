import {Body, Controller, Get, Post, UseGuards, UsePipes} from '@nestjs/common';
import { AppService } from './app.service';
import {StringToLowerCasePipe} from "./pipes/string-to-lowercase.pipe";
import {AuthGuard} from "./guards/auth.guard";
import {UserAgent} from "./decorators/user-agent.decorator";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UsePipes(StringToLowerCasePipe)
  @Post()
  create(@Body("title") title: string) {
    return `Movie title: ${title}`
  }

  @UseGuards(AuthGuard)
  @Get('@me')
  getMe(@UserAgent() userAgent: string) {
    return {
      name: 'John Doe',
      email: 'example.com',
      userAgent,
    }
  }
}
