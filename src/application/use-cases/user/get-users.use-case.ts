import { Injectable } from '@nestjs/common';
import { GrpcContextAbstract } from '@src/domain/abstracts/grpcContext.abstract';
import { GetUsersRequest } from '@src/domain/interfaces/request';
import { GetUsersResponse } from '@src/domain/interfaces/response/user';
import { GetUsersUseCaseAbstract } from '@src/domain/use-cases';

@Injectable()
export class GetUsersUseCase implements GetUsersUseCaseAbstract {
  constructor(private grpcService: GrpcContextAbstract) {}

  async execute(filter: GetUsersRequest): Promise<GetUsersResponse> {
    return this.grpcService.userService.list(filter);
  }
}
