import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
  Req,
  Res,
  Param, Put, Patch, Delete
} from '@nestjs/common';
import { MovieService } from './movie.service';
import type {Request, Response} from "express";
import {MovieDto} from "./dto/movie.dto";

@Controller({
  path: 'movie',
  host: 'localhost',
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('all')
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.movieService.findById(id);
  }


  @Post('create')
  create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() dto: MovieDto) {
    return this.movieService.update(dto, id);
  }

  @Patch('patch/:id')
  patch(@Param('id') id: string) {
    return this.movieService.patchPublic(id);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(id);
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
