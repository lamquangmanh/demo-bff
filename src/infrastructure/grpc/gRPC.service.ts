import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MICROSERVICE_NAME } from 'src/domain/common/constants';
import { UserService } from './services/user.service';
import { IUserGrpcService } from '@src/domain/interfaces/grpc-service/user-grpc-service';
import { IUserService } from '@src/domain/interfaces/service/user-service';
import { GrpcContextAbstract } from 'src/domain/abstracts/grpcContext.abstract';
import { LoggerAbstract } from '@src/domain/abstracts/logger.abstract';

@Injectable()
export class GRPCService implements GrpcContextAbstract {
  userService: IUserService;
  constructor(
    @Inject(MICROSERVICE_NAME.USERS_SERVICE) private userClientGrpc: ClientGrpc,
    @Inject(LoggerAbstract) private logger: LoggerAbstract,
  ) {}

  onModuleInit() {
    this.userService = new UserService(
      this.userClientGrpc.getService<IUserGrpcService>('UsersService'),
      this.logger,
    );
  }
}
