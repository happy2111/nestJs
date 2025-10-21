import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
  Req,
  Res,
  Param, Put, Patch, Delete, HttpException, HttpStatus
} from '@nestjs/common';
import { MovieService } from './movie.service';
import type {Request, Response} from "express";
import {MovieDto} from "./dto/movie.dto";
import {
  ApiBody,
  ApiHeaders,
  ApiOperation,
  ApiParam, ApiQuery,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";


@ApiTags('Movie')
@Controller({
  path: 'movie',
  host: 'localhost',
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'Get all movies',
    description: 'Get all movies',
  })
  @ApiQuery({ name: 'year', type: Number, required: false})
  @ApiResponse({status: HttpStatus.OK, description: 'Get all movies'})
  @Get('all')
  findAll() {
    return this.movieService.findAll();
  }


  @ApiOperation({
    summary: 'Get movie by id',
    description: 'Get movie by id',
  })
  @ApiResponse({status: HttpStatus.OK, description: 'Get movie by id'})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Movie not found'})
  @ApiParam({
    name: 'id',
    description: 'Movie id',
    required: true,
    type: String,
  })
  // @ApiHeaders({ })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.movieService.findById(id);
  }


  @ApiOperation({
    summary: 'Create movie',
    description: 'Create movie',
  })
  @ApiResponse({status: HttpStatus.CREATED, description: 'Movie created'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad request'})
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Inception' },
        releaseYear: { type: 'number', example: 2010 },
        actorsIds: { type: 'array', items: { type: 'string' } },
        imageUrl: { type: 'string', example: 'https://example.com/image.jpg' },
      }
    }
  })
  @Post('create')
  create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }


  @ApiOperation({
    summary: 'Update movie',
    description: 'Update movie',
  })
  @ApiResponse({status: HttpStatus.OK, description: 'Movie updated', type: MovieDto})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Movie not found'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad request'})
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

  // @Get('headers')
  // getHeaders(@Headers() headers: any) {
  //   return headers
  // }
  //
  // @Get('user-agent')
  // getUserAgent(@Headers('user-agent') userAgent: string) {
  //   return userAgent
  // }
  //
  // @Get('request-details')
  // getRequestDetails(@Req() req: Request) {
  //   return {
  //     method: req.method,
  //     url: req.url,
  //     headers: req.headers,
  //     params: req.params,
  //     query: req.query,
  //     body: req.body,
  //     ip: req.ip,
  //     ips: req.ips,
  //     path: req.path,
  //     hostname: req.hostname,
  //     protocol: req.protocol,
  //   }
  // }
  //
  // @Get('response')
  // getResponse(@Res() res: Response) {
  //   return res.status(1000).json({message: 'Hello World!'})
  // }
  //
  // @Get("find/:id")
  // findOne(@Param("id") id: string) {
  //   return {
  //     id
  //   }
  // }


}
