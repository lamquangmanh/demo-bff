import { Injectable } from '@nestjs/common';
import { User } from '@src/domain/entities';
import { DeleteUserUseCaseAbstract } from '@src/domain/use-cases';

@Injectable()
export class DeleteUserUseCase implements DeleteUserUseCaseAbstract {
  execute(id: string): User {
    return {
      user_id: id,
      user_name: 'name',
      permissions: 'admin',
    };
  }
}
