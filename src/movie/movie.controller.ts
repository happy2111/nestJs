import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Headers,
  Req,
  Res,
  Param
} from '@nestjs/common';
import { MovieService } from './movie.service';
import type {Request, Response} from "express";

@Controller({
  path: 'movie',
  host: 'localhost',
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('all')
  findAll(@Query('genre') genre: string, @Query() query: any) {
    return [
      query,
      genre,
      {
        title: 'test',
        year: 2020,
        genres: ['test']
      },
      {
        title: 'test2',
        year: 2020,
        genres: ['test2']
      }
    ]
  }


  @Post('create')
  create(@Body('title') title: string, @Body('year') year: number, @Body('genres') genres: string[]) {
    return {
      title,
      year,
      genres,
    }
  }

  @Get('headers')
  getHeaders(@Headers() headers: any) {
    return headers
  }

  @Get('user-agent')
  getUserAgent(@Headers('user-agent') userAgent: string) {
    return userAgent
  }

  @Get('request-details')
  getRequestDetails(@Req() req: Request) {
    return {
      method: req.method,
      url: req.url,
      headers: req.headers,
      params: req.params,
      query: req.query,
      body: req.body,
      ip: req.ip,
      ips: req.ips,
      path: req.path,
      hostname: req.hostname,
      protocol: req.protocol,
    }
  }

  @Get('response')
  getResponse(@Res() res: Response) {
    return res.status(1000).json({message: 'Hello World!'})
  }

  @Get("find/:id")
  findOne(@Param("id") id: string) {
    return {
      id
    }
  }





}
