import { Injectable } from '@nestjs/common';
import { GrpcContextAbstract } from '@src/domain/abstracts/grpcContext.abstract';
import { UpdateUserRequest } from '@src/domain/interfaces/request';
import { UpdateUserResponse } from '@src/domain/interfaces/response';
import { UpdateUserUseCaseAbstract } from '@src/domain/use-cases';

@Injectable()
export class UpdateUserUseCase implements UpdateUserUseCaseAbstract {
  constructor(private grpcService: GrpcContextAbstract) {}

  async execute(data: UpdateUserRequest): Promise<UpdateUserResponse> {
    return this.grpcService.userService.updateUser(data);
  }
}
