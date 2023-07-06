import { Module } from '@nestjs/common';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisClientOptions } from 'redis';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma.module';
import { TweetsModule } from './modules/tweets/tweets.module';
import { ApiController } from './api/api.controller';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.development.env'], isGlobal: true }),
    CacheModule.registerAsync<RedisClientOptions>({
      useFactory: async (config: ConfigService) => ({
        store: await redisStore({
          url: config.get('REDIS_URI'),
          ttl: config.get('TTL'),
        }),
        max: config.get('MAX_CACHE_ITEMS'),
      }),
      isGlobal: true,
      inject: [ConfigService],
    }),
    PrismaModule,
    TweetsModule,
    UsersModule,
  ],
  controllers: [AppController, ApiController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
})
export class AppModule {}
