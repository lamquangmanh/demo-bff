import { Injectable } from '@nestjs/common';
import { User } from '@src/domain/entities';
import { AddUserUseCaseAbstract } from '@src/domain/use-cases';
import { AddUserDto } from '@src/presentation/graphql/resolvers/user/user.dto';

@Injectable()
export class AddUserUseCase implements AddUserUseCaseAbstract {
  execute(data: AddUserDto): User {
    return {
      user_id: '1',
      ...data,
    };
  }
}
