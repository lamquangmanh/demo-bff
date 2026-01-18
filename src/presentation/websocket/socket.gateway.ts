import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as cookie from 'cookie';
import { JwtService } from '@nestjs/jwt';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Injectable } from '@nestjs/common';

// import from common
import { configs } from '@/common/configs';
import { MessageQueuePayload } from '@/common/interfaces';
import {
  USER_CONNECTED_EVENT,
  USER_DISCONNECTED_EVENT,
  MESSAGE_EVENT,
  WSS_BFF_TO_BE_QUEUE,
} from '@/common/constants';

type ISocket = Socket & { user?: any };

@WebSocketGateway({
  cors: {
    origin: '*', // domain name: http://localhost:3000
  },
  namespace: '/ws',
  credentials: true,
})
@Injectable()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  @InjectQueue(WSS_BFF_TO_BE_QUEUE)
  private readonly bffToBeQueue!: Queue;

  constructor(private readonly jwtService: JwtService) {}

  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token, { secret: configs.JWT_SECRET });
    } catch (e) {
      console.error('Token verification failed:', e);
      return null;
    }
  }

  getToken(client: ISocket): string | undefined {
    // Parse cookies from the handshake headers
    const cookies = cookie.parse(client.handshake.headers.cookie || '');

    // Extract access_token
    let token: string | undefined = cookies?.access_token;

    if (!token) {
      // Fallback to Authorization header
      token =
        client.handshake.auth?.token ||
        client.handshake.headers['authorization'];
    }

    return token;
  }

  async handleConnection(client: ISocket) {
    const token = this.getToken(client);
    if (!token) {
      client.disconnect(true);
      return;
    }

    const payload = this.verifyToken(token.replace('Bearer ', ''));
    if (!payload) {
      client.disconnect(true);
      return;
    }

    // assign user to socket
    (client as any).user = payload;
    console.log(
      `User connected: userId=${payload.userId}, socketId=${client.id}`,
    );
    console.log(payload);

    // publish a message to Redis for User Backend service
    const messagePayload: MessageQueuePayload<{
      userId: string;
      socketId: string;
    }> = {
      metadata: {
        userId: payload.userId,
        userEmail: payload.email,
        socketId: client.id,
      },
      payload: {
        userId: payload.userId,
        socketId: client.id,
      },
      eventType: USER_CONNECTED_EVENT,
    };
    const job = await this.bffToBeQueue?.add(
      USER_CONNECTED_EVENT,
      messagePayload,
    );
    console.log('Published USER_CONNECTED_EVENT job:', job.id);
  }

  async handleDisconnect(client: ISocket) {
    console.log('User disconnected: ', client.id);

    // publish a message to Redis for User Backend service
    const messagePayload: MessageQueuePayload<{
      userId: string;
      socketId: string;
    }> = {
      metadata: {
        userId: client.user.userId,
        userEmail: client.user.email,
        socketId: client.id,
      },
      eventType: USER_DISCONNECTED_EVENT,
      payload: {
        userId: client.user.userId,
        socketId: client.id,
      },
    };
    const job = await this.bffToBeQueue?.add(
      USER_DISCONNECTED_EVENT,
      messagePayload,
      {
        removeOnComplete: true,
      },
    );
    console.log('Published USER_DISCONNECTED_EVENT job:', job.id);
  }

  @SubscribeMessage(MESSAGE_EVENT)
  async handleMessage(client: ISocket, data: any) {
    const user = client.user;
    console.log(`Message from ${user.email}:`, data);

    // publish a message to Redis for User Backend service
    const messagePayload: MessageQueuePayload<{ any }> = {
      metadata: {
        userId: client.user.userId,
        userEmail: user.email,
        socketId: client.id,
      },
      eventType: MESSAGE_EVENT,
      payload: data,
    };
    await this.bffToBeQueue?.add(MESSAGE_EVENT, messagePayload, {
      removeOnComplete: true,
    });
  }

  sendToUser(socketId: string, payload: any) {
    this.server.to(socketId).emit(MESSAGE_EVENT, payload);
  }
}
