import { Controller, Post, Get, Body, Query } from '@nestjs/common';

import { TweetsService } from 'src/modules/tweets/tweets.service';
import { UsersService } from 'src/modules/users/users.service';
import { pagination } from 'src/shared/lib/helpers';
import { CreateUserDTO, GetUsersDTO } from 'src/modules/users/users.dto';
import { GetTweetsDTO } from 'src/modules/tweets/tweets.dto';

@Controller('api')
export class ApiController {
  constructor(
    private readonly tweetsService: TweetsService,
    private readonly usersService: UsersService,
  ) {}

  @Post('tweet')
  async createTweet(@Body() data) {
    return this.tweetsService.createTweet(data);
  }

  @Get('tweets')
  async getTweets(@Query() getTweetsDTO: GetTweetsDTO) {
    const { find, id, userId, order } = getTweetsDTO;

    return this.tweetsService.getTweets({
      find,
      id,
      userId,
      order,
    });
  }

  @Post('user')
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.usersService.createUser(createUserDTO);

    return user;
  }

  @Get('users')
  async getUsers(@Query() getUsersDTO: GetUsersDTO) {
    const { limit, order, page, tweets, id } = getUsersDTO;

    const { skip, take } = pagination(page, limit);

    const users = await this.usersService.getUsers({
      id,
      skip,
      take,
      showTweets: tweets,
      order,
    });

    return users;
  }
}
