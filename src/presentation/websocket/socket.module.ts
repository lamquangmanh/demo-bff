import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { JwtService } from '@nestjs/jwt';

import { BFF_TO_BE_QUEUE, BE_TO_BFF_QUEUE } from '@/common/constants';
import { SocketGateway } from './socket.gateway';
import { SocketProcessor } from './socket.processor';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: BFF_TO_BE_QUEUE,
      },
      {
        name: BE_TO_BFF_QUEUE,
      },
    ),
  ],
  controllers: [],
  providers: [SocketGateway, SocketProcessor, JwtService],
})
export class WebSocketModule {}
