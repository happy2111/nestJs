import {
  IsIn,
  IsInt,
  IsNotEmpty,
  Min,
  Max,
  IsArray,
  IsUUID, IsString
} from "class-validator";

export class MovieDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @IsString()
  imageUrl: string;

  @IsArray()
  @IsUUID('all', {each: true})
  actorsIds: string[];
}