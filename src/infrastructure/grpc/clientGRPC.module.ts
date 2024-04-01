import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MICROSERVICE_NAME, PACKAGE_NAME } from 'src/domain/common/constants';
import { GRPCService } from './gRPC.service';
import { GrpcContextAbstract } from 'src/domain/abstracts/grpcContext.abstract';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICE_NAME.USERS_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: PACKAGE_NAME.USERS,
          protoPath: join(__dirname, './protos/users.proto'),
          url: 'localhost:50051',
        },
      },
      // {
      //   name: MICROSERVICE_NAME.AUTH_SERVICE,
      //   transport: Transport.GRPC,
      //   options: {
      //     package: PACKAGE_NAME.AUTH,
      //     protoPath: join(__dirname, './protos/auth.proto'),
      //     url: 'localhost:50051',
      //   },
      // },
    ]),
  ],
  providers: [{ provide: GrpcContextAbstract, useClass: GRPCService }],
  exports: [GrpcContextAbstract],
})
export class ClientGRPCModule {}
