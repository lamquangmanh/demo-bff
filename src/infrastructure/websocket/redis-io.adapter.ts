import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { INestApplicationContext } from '@nestjs/common';

// import from common
import { bffRedisAdapterClient } from '@/common/configs';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter> | null = null;

  constructor(app: INestApplicationContext) {
    super(app);
  }

  connectToRedis(): void {
    try {
      // Create Redis clients for pub/sub
      // Ensure the main client is connected
      // Create the adapter
      this.adapterConstructor = createAdapter(
        bffRedisAdapterClient,
        bffRedisAdapterClient,
      );
    } catch (error) {
      console.error('Error connecting to Redis for Socket.IO adapter:', error);
      throw error;
    }
  }

  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);

    // Bind the Redis adapter to the server
    if (!this.adapterConstructor) {
      throw new Error(
        'Redis adapter not initialized! Call connectToRedis() first.',
      );
    }
    server.adapter(this.adapterConstructor);
    return server;
  }
}
