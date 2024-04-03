import { Injectable } from '@nestjs/common';
import { GrpcContextAbstract } from '@src/domain/abstracts/grpcContext.abstract';
import { User } from '@src/domain/entities';
import { UpdateUserUseCaseAbstract } from '@src/domain/use-cases';
import { UpdateUserDto } from '@src/presentation/graphql/resolvers/user/user.dto';

@Injectable()
export class UpdateUserUseCase implements UpdateUserUseCaseAbstract {
  constructor(private grpcService: GrpcContextAbstract) {}

  async execute(data: UpdateUserDto): Promise<User> {
    return this.grpcService.userService.update(data);

    return {
      ...data,
    };
  }
}
