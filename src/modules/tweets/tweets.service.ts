import { Injectable } from '@nestjs/common';
import { Prisma, Tweet, User } from '@prisma/client';

import { TweetsRepository } from './tweets.repository';

@Injectable()
export class TweetsService {
  private readonly repository: TweetsRepository;

  constructor(repository: TweetsRepository) {
    this.repository = repository;
  }

  async createTweet(params: { content: Tweet['content']; userId: User['id'] }) {
    const { content, userId } = params;

    const tweet = await this.repository.createTweet({
      data: {
        content,
        user: { connect: { id: userId } },
      },
    });

    return tweet;
  }

  async getTweets(params: {
    find?: string;
    id?: number[];
    userId?: number;
    order: Prisma.SortOrder;
  }) {
    const { find, id, userId, order } = params;

    const tweets = await this.repository.getTweets({
      where: {
        content: { contains: find },
        id: { in: id },
        userId: { equals: userId },
      },
      orderBy: { id: order },
    });

    return tweets;
  }
}
