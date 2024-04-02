import { Module } from '@nestjs/common';
import { AddSampleUseCase, GetSampleUseCase } from '../../application/use-cases/sample';
import { ClientGRPCModule } from '../grpc/client-GRPC.module';
import {
  GetSampleUseCaseAbstract,
  AddSampleUseCaseAbstract,
  AddUserUseCaseAbstract,
  UpdateUserUseCaseAbstract,
  DeleteUserUseCaseAbstract,
  GetUsersUseCaseAbstract,
  GetUserByIdUseCaseAbstract,
} from '../../domain/use-cases';
import { AddUserUseCase, GetUserByIdUseCase } from '@src/application/use-cases/user';
import { UpdateUserUseCase } from '@src/application/use-cases/user/update-user.use-case';
import { DeleteUserUseCase } from '@src/application/use-cases/user/delete-user.use-case';
import { GetUsersUseCase } from '@src/application/use-cases/user/get-users.use-case';

@Module({
  imports: [ClientGRPCModule],
  providers: [
    { provide: GetSampleUseCaseAbstract, useClass: GetSampleUseCase },
    { provide: AddSampleUseCaseAbstract, useClass: AddSampleUseCase },
    // User
    { provide: AddUserUseCaseAbstract, useClass: AddUserUseCase },
    { provide: UpdateUserUseCaseAbstract, useClass: UpdateUserUseCase },
    { provide: DeleteUserUseCaseAbstract, useClass: DeleteUserUseCase },
    { provide: GetUsersUseCaseAbstract, useClass: GetUsersUseCase },
    { provide: GetUserByIdUseCaseAbstract, useClass: GetUserByIdUseCase },
  ],
  exports: [
    GetSampleUseCaseAbstract,
    AddSampleUseCaseAbstract,
    // User
    AddUserUseCaseAbstract,
    UpdateUserUseCaseAbstract,
    DeleteUserUseCaseAbstract,
    GetUsersUseCaseAbstract,
    GetUserByIdUseCaseAbstract,
  ],
})
export class UseCaseManagerModule {}
