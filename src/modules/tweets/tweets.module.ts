import { Module } from '@nestjs/common';

import { TweetsRepository } from './tweets.repository';
import { TweetsService } from './tweets.service';

@Module({
  providers: [TweetsRepository, TweetsService],
  exports: [TweetsService],
})
export class TweetsModule {}
