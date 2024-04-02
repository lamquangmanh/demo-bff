import { Injectable } from '@nestjs/common';
import { User } from '@src/domain/entities';
import { GetUsersUseCaseAbstract } from '@src/domain/use-cases';
import { UsersFilterDto } from '@src/presentation/graphql/resolvers/user/user.dto';

@Injectable()
export class GetUsersUseCase implements GetUsersUseCaseAbstract {
  execute(data: UsersFilterDto): User[] {
    console.log({ data });
    return [];
  }
}
