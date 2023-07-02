import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CacheTTL, CacheInterceptor } from '@nestjs/cache-manager';
import { AppService } from './app.service';

@Controller('name')
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getName(): Promise<string> {
    return this.appService.getName();
  }
}
