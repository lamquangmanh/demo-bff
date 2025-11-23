// notification.processor.ts
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import { BE_TO_BFF_QUEUE } from '@/common/constants';
import { MessageQueuePayload } from '@/common/interfaces';
import { SocketGateway } from './socket.gateway';

@Processor(BE_TO_BFF_QUEUE)
export class SocketProcessor extends WorkerHost {
  constructor(private readonly socketGateway: SocketGateway) {
    super();
  }

  process(
    job: Job<MessageQueuePayload<{ userId: string; message: string }>>,
  ): any {
    console.log('📩 Received job:', job.name, job.data);

    // send to WebSocket client
    const socketId = job.data.metadata.socketId || '';
    const payload = job.data.payload;

    return this.socketGateway.sendToUser(socketId, payload);
  }
}
