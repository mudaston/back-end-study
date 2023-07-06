import { Prisma } from '@prisma/client';
import {
  IsString,
  IsArray,
  IsNumber,
  IsEnum,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDTO {
  @IsString()
  username: string;
}

export class GetUsersDTO {
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.trim().split(',').map(Number))
  id?: number[];

  @IsNumber()
  page = 0;

  @IsNumber()
  limit = 20;

  @IsBoolean()
  tweets = false;

  @IsEnum(Prisma.SortOrder)
  order: Prisma.SortOrder = 'asc';
}
