import { Injectable } from '@nestjs/common';
import { GrpcContextAbstract } from '@src/domain/abstracts/grpcContext.abstract';
import { User } from '@src/domain/entities';
import { GetUserByIdUseCaseAbstract } from '@src/domain/use-cases';

@Injectable()
export class GetUserByIdUseCase implements GetUserByIdUseCaseAbstract {
  constructor(private grpcService: GrpcContextAbstract) {}

  async execute(id: number): Promise<User> {
    return this.grpcService.userService.get(id);
  }
}
