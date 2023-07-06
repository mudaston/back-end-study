import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/database/prisma.service';

type RouteParams = {
  where: Prisma.UserWhereInput;
  skip: number;
  take: number;
  order: Prisma.SortOrder;
  showTweets: boolean;
};

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateWithoutTweetsInput) {
    const { username } = data;

    const user = await this.prisma.user.create({
      data: { username },
      select: {
        id: true,
        username: true,
        tweets: true,
      },
    });

    return user;
  }

  async getUsers(params: RouteParams) {
    const { showTweets, order, ...rest } = params;

    let tweets: boolean | object = false;

    if (showTweets)
      tweets = {
        orderBy: { id: 'asc' },
        select: { id: true, content: true },
      };

    const users = await this.prisma.user.findMany({
      ...rest,
      orderBy: { id: order },
      select: {
        id: true,
        username: true,
        tweets,
      },
    });

    return users;
  }
}
