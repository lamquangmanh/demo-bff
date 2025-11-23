// src/redis/redis.module.ts
import { Module, Global } from '@nestjs/common';

// import from common/configs
import { BFF_REDIS_CLIENT, QUEUE_REDIS_CLIENT } from '@/common/constants';
import { BFF_REDIS_PROVIDER, QUEUE_REDIS_PROVIDER } from '@/common/configs';

@Global()
@Module({
  providers: [BFF_REDIS_PROVIDER, QUEUE_REDIS_PROVIDER],
  exports: [BFF_REDIS_CLIENT, QUEUE_REDIS_CLIENT],
})
export class RedisModule {}
