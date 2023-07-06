import { Module } from '@nestjs/common';

import { TweetsModule } from 'src/modules/tweets/tweets.module';
import { UsersModule } from 'src/modules/users/users.module';
import { ApiController } from './api.controller';

@Module({
  imports: [TweetsModule, UsersModule],
  controllers: [ApiController],
})
export class ApiModule {}
