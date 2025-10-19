import {Body, Controller, Param, Post} from '@nestjs/common';
import { ReviewService } from './review.service';
import {CreateReviewDto} from "./dto/create-review.dto";

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }
}
