import { Prisma } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class BaseDTO {
  @IsEnum(Prisma.SortOrder)
  order: Prisma.SortOrder = 'asc';
}
