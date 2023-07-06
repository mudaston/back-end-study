import { Injectable } from '@nestjs/common';
import { Prisma, Tweet } from '@prisma/client';

import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TweetsRepository {
  private readonly prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async createTweet(params: { data: Prisma.TweetCreateInput }): Promise<Tweet> {
    const { data } = params;
    return this.prisma.tweet.create({ data });
  }

  async getTweets(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TweetWhereUniqueInput;
    where?: Prisma.TweetWhereInput;
    orderBy?: Prisma.TweetOrderByWithRelationInput;
  }) {
    return this.prisma.tweet.findMany({
      ...params,
      select: { content: true, id: true, userId: true },
    });
  }

  async updateTweet(params: {
    where: Prisma.TweetWhereUniqueInput;
    data: Prisma.TweetUpdateInput;
  }): Promise<Tweet> {
    return this.prisma.tweet.update(params);
  }

  async deleteTweet(params: {
    where: Prisma.TweetWhereUniqueInput;
  }): Promise<Tweet> {
    return this.prisma.tweet.delete(params);
  }
}
