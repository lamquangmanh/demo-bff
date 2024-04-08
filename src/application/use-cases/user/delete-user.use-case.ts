import { Injectable } from '@nestjs/common';
import { GrpcContextAbstract } from '@src/domain/abstracts/grpcContext.abstract';
import { DeleteUserResponse } from '@src/domain/interfaces/response';
import { DeleteUserUseCaseAbstract } from '@src/domain/use-cases';

@Injectable()
export class DeleteUserUseCase implements DeleteUserUseCaseAbstract {
  constructor(private grpcService: GrpcContextAbstract) {}
  async execute(id: number): Promise<DeleteUserResponse> {
    return this.grpcService.userService.deleteUser({ id });
  }
}
