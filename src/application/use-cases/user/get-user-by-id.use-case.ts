import { Injectable } from '@nestjs/common';
import { User } from '@src/domain/entities';
import { GetUserByIdUseCaseAbstract } from '@src/domain/use-cases';

@Injectable()
export class GetUserByIdUseCase implements GetUserByIdUseCaseAbstract {
  execute(id: string): User {
    console.log('=============');
    console.log({ id });
    return {
      user_id: id,
      user_name: 'name',
      permissions: 'admin',
    };
  }
}
