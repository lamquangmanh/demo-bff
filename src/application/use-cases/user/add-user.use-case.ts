import { Injectable } from '@nestjs/common';
import { GrpcContextAbstract } from '@src/domain/abstracts/grpcContext.abstract';
import { User } from '@src/domain/entities';
import { AddUserRequest } from '@src/domain/interfaces/request';
import { AddUserUseCaseAbstract } from '@src/domain/use-cases';

@Injectable()
export class AddUserUseCase implements AddUserUseCaseAbstract {
  constructor(private grpcService: GrpcContextAbstract) {}

  async execute(data: AddUserRequest): Promise<User> {
    return this.grpcService.userService.create(data);
  }
}
