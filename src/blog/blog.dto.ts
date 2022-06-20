import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BlogAddRequestDTO {
  @IsString()
  @MinLength(5)
  @MaxLength(256)
  title: string;

  @IsString()
  @MinLength(10)
  @MaxLength(512)
  shortContent?: string;

  @IsString()
  @MinLength(10)
  content: string;

  @ApiProperty({ description: 'multipart/form-data, only accept image file' })
  image: string;
}

export class BlogUpdateRequestDTO extends BlogAddRequestDTO {
  @Type(() => Number)
  @IsNumber()
  id: number;
}

export class BlogAddResponseDTO {
  id: number;
  atCreated: Date;
}
