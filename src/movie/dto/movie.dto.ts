import {
  IsIn,
  IsInt,
  IsNotEmpty,
  Min,
  Max,
  IsArray,
  IsUUID, IsString
} from "class-validator";
import {Optional} from "@nestjs/common";

export class MovieDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @Optional()
  description?: string;

  @IsString()
  imageUrl: string;

  @IsArray()
  @IsUUID('all', {each: true})
  actorsIds: string[];
}