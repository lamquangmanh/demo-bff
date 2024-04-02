import { Injectable } from '@nestjs/common';
import { User } from '@src/domain/entities';
import { UpdateUserUseCaseAbstract } from '@src/domain/use-cases';
import { UpdateUserDto } from '@src/presentation/graphql/resolvers/user/user.dto';

@Injectable()
export class UpdateUserUseCase implements UpdateUserUseCaseAbstract {
  execute(data: UpdateUserDto): User {
    return {
      ...data,
    };
  }
}
