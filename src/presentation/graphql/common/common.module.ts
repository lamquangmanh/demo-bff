import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { dirname, join } from 'path';

// import from common
import {
  PACKAGE_NAMES,
  PROTO_PATHS,
  USER_PACKAGE_NAME,
} from '@/common/constants';

const protobufPackageRoot = dirname(
  require.resolve('@lamquangmanh/protobuf/package.json'),
);
const protobufProtoDir = join(protobufPackageRoot, 'proto');

// import data-loader from presentation
import {
  ActionLoader,
  PermissionLoader,
  ModuleLoader,
  UserLoader,
  RoleLoader,
} from './data-loader';

// import from use-cases
import { ActionUseCase } from '@/use-cases/action';
import { PermissionUseCase } from '@/use-cases/permission';
import { ModuleUseCase } from '@/use-cases/module';
import { UserUseCase } from '@/use-cases/user';
import { RoleUseCase } from '@/use-cases/role';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.BE_GRPC_URL ?? 'localhost:5000',
          package: PACKAGE_NAMES,
          protoPath: PROTO_PATHS.map((protoPath) =>
            join(protobufProtoDir, protoPath.replace(/^proto\//, '')),
          ),
          loader: {
            // must set defaults to true to get default values for missing fields,
            // otherwise grpc will return undefined for missing fields which can cause issues in our code
            defaults: true,
            // must set longs to String to avoid issues with long numbers in JavaScript, especially for IDs
            longs: String,
            // must set enums to String to get enum values as strings instead of numbers,
            // which is more readable and easier to work with in JavaScript/TypeScript
            enums: String,
            includeDirs: [protobufPackageRoot],
          },
        },
      },
    ]),
  ],
  providers: [
    ActionLoader,
    ActionUseCase,
    PermissionLoader,
    PermissionUseCase,
    ModuleLoader,
    ModuleUseCase,
    RoleLoader,
    RoleUseCase,
    UserUseCase,
    UserLoader,
  ],
  exports: [
    ClientsModule,
    ActionLoader,
    ActionUseCase,
    PermissionLoader,
    PermissionUseCase,
    ModuleLoader,
    ModuleUseCase,
    RoleLoader,
    RoleUseCase,
    UserUseCase,
    UserLoader,
  ],
})
export class CommonModule {}
