import { Injectable } from '@nestjs/common';
import { GrpcContextAbstract } from '@src/domain/abstracts/grpcContext.abstract';
import { User } from '@src/domain/entities';
import { GetUsersUseCaseAbstract } from '@src/domain/use-cases';
import { UsersFilterDto } from '@src/presentation/graphql/resolvers/user/user.dto';

@Injectable()
export class GetUsersUseCase implements GetUsersUseCaseAbstract {
  constructor(private grpcService: GrpcContextAbstract) {}

  async execute(filter: UsersFilterDto): Promise<User[]> {
    return this.grpcService.userService.getUsers(filter);
  }
}
