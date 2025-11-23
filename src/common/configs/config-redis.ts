import Redis from 'ioredis';

import { configs } from './config-validation-schema';
import { BFF_REDIS_CLIENT, QUEUE_REDIS_CLIENT } from '../constants';

export const redisConnection = {
  host: configs.REDIS_HOST,
  port: configs.REDIS_PORT,
  db: configs.REDIS_DB ?? undefined,
  password: configs.REDIS_PASS ?? undefined,
  keyPrefix: configs.REDIS_KEY_PREFIX ?? undefined,
};

export const bffRedisClient = new Redis(redisConnection);
export const bffRedisAdapterClient = new Redis(redisConnection);

// Queue Redis Client: used for background jobs and task queues. shared queue between services BFF and BE
export const queueRedisClient = new Redis(redisConnection);

export const BFF_REDIS_PROVIDER = {
  provide: BFF_REDIS_CLIENT,
  useFactory: () => {
    return bffRedisClient;
  },
};

export const QUEUE_REDIS_PROVIDER = {
  provide: QUEUE_REDIS_CLIENT,
  useFactory: () => {
    return queueRedisClient;
  },
};
