import { Module } from '@nestjs/common';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisClientOptions } from 'redis';

import { AppController } from './app.controller';
import { AppService } from './app.service';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
