import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { join } from 'path';
import { MICROSERVICE_NAME, PACKAGE_NAME } from 'src/domain/common/constants';
import { GRPCService } from './gRPC.service';
import { GrpcContextAbstract } from 'src/domain/abstracts/grpcContext.abstract';
import { ConfigModule } from '../configs';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: MICROSERVICE_NAME.USERS_SERVICE,
    //     transport: Transport.GRPC,
    //     options: {
    //       package: PACKAGE_NAME.USERS,
    //       protoPath: './protos/users.proto',
    //       url: '0.0.0.0:50051',
    //     },
    //   },
    // ]),
    ClientsModule.registerAsync([
      {
        name: MICROSERVICE_NAME.USERS_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          return {
            transport: Transport.GRPC,
            options: {
              package: PACKAGE_NAME.USERS,
              protoPath: './protos/users.proto',
              url: configService.get<string>('serviceHost') || '0.0.0.0:50051',
            },
          };
        },
      },
    ]),
  ],
  providers: [{ provide: GrpcContextAbstract, useClass: GRPCService }],
  exports: [GrpcContextAbstract],
})
export class ClientGRPCModule {}
