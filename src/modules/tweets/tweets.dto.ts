import { IsOptional, IsArray, IsString, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

import { BaseDTO } from 'src/shared/dto';

export class GetTweetsDTO extends BaseDTO {
  @IsOptional()
  @IsString()
  find?: string;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.trim().split(',').map(Number))
  id?: number[];

  @IsOptional()
  @IsNumber()
  userId?: number;
}
