import { IsNumber, Max, Min, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { IPaginationOptions } from './pagination.interface';

export class PaginationQueryDTO implements IPaginationOptions {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  @ValidateIf((object) => object.limit)
  limit: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ValidateIf((object) => object.page)
  page: number;
}
