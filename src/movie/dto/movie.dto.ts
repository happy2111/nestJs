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
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";


export class MovieDto {
  @ApiProperty({
    description: 'Movie title',
    example: 'Fight Club',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Movie release year',
    example: 1999,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @ApiProperty({
    description: 'Movie description',
    example: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
  })
  @Optional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Movie image url',
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description: 'Array of actor ids',
    example: ['123e4567-e89b-12d3-a456-426614174000', '8f3777fa-52e5-4a1c-b671-123d4567e89b'],
  })
  @IsArray()
  @IsUUID('all', {each: true})
  actorsIds: string[];
}