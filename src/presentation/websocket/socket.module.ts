import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { JwtService } from '@nestjs/jwt';

import { WSS_BE_TO_BFF_QUEUE, WSS_BFF_TO_BE_QUEUE } from '@/common/constants';
import { SocketGateway } from './socket.gateway';
import { SocketProcessor } from './socket.processor';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: WSS_BE_TO_BFF_QUEUE,
      },
      {
        name: WSS_BFF_TO_BE_QUEUE,
      },
    ),
  ],
  controllers: [],
  providers: [SocketGateway, SocketProcessor, JwtService],
})
export class WebSocketModule {}
