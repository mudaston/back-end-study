import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(data: Prisma.UserCreateWithoutTweetsInput) {
    const user = await this.usersRepository.createUser(data);

    return user;
  }

  async getUsers(params: {
    id: number[] | undefined;
    skip: number;
    take: number;
    showTweets: boolean;
    order: Prisma.SortOrder;
  }) {
    const { id, ...rest } = params;

    return this.usersRepository.getUsers({
      where: { id: { in: id } },
      ...rest,
    });
  }
}
