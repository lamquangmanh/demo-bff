import { Injectable } from '@nestjs/common';
import { GrpcContextAbstract } from '@src/domain/abstracts/grpcContext.abstract';
import { User } from '@src/domain/entities';
import { DeleteUserUseCaseAbstract } from '@src/domain/use-cases';

@Injectable()
export class DeleteUserUseCase implements DeleteUserUseCaseAbstract {
  constructor(private grpcService: GrpcContextAbstract) {}
  async execute(id: number): Promise<User> {
    return this.grpcService.userService.delete(id);
    return {
      id: id,
      name: 'name',
      username: 'admin',
    };
  }
}
