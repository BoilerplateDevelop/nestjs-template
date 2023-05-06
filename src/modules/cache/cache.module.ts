import { CacheModule, Module } from '@nestjs/common';
import { InMemoryCacheService } from './in-memery-cache.service';

@Module({
  imports: [CacheModule.register()],
  providers: [InMemoryCacheService],
  exports: [InMemoryCacheService],
})
export class RedisModule {}
