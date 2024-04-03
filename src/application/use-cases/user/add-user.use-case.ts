import { Injectable } from '@nestjs/common';
import { GrpcContextAbstract } from '@src/domain/abstracts/grpcContext.abstract';
import { User } from '@src/domain/entities';
import { AddUserUseCaseAbstract } from '@src/domain/use-cases';
import { AddUserDto } from '@src/presentation/graphql/resolvers/user/user.dto';

@Injectable()
export class AddUserUseCase implements AddUserUseCaseAbstract {
  constructor(private grpcService: GrpcContextAbstract) {}

  async execute(data: AddUserDto): Promise<User> {
    return this.grpcService.userService.addUser(data);
    return {
      id: 1,
      ...data,
    };
  }
}
