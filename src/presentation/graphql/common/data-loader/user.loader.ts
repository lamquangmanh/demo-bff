import DataLoader from 'dataloader';
import { Injectable, Scope, Inject } from '@nestjs/common';
import { filter, identify } from 'lodash';

// import from use-cases
import { UserUseCase } from '@/use-cases/user';

// import from domain/entities
import { UserEntity } from '@/domain/entites';

// One instance per request
@Injectable({ scope: Scope.REQUEST })
export class UserLoader {
  @Inject(UserUseCase)
  private readonly userUseCase!: UserUseCase;

  /**
   * Generate a DataLoader to batch modules by resource IDs.
   * This is useful for fetching all modules related to multiple roles in a single query.
   */
  generateBatchUsersByIds() {
    return new DataLoader<string, UserEntity>(
      async (ids: readonly string[]) => {
        const uniqueIds = filter(ids, identify);
        const users: UserEntity[] = await this.userUseCase.findByIds(
          uniqueIds as string[],
        );
        const filtered: UserEntity[] = users.filter(
          (user: UserEntity | null | undefined) =>
            user !== null && user !== undefined,
        );
        const usersMap = new Map(
          filtered.map((user: UserEntity) => [user.userId, user]),
        );
        return ids.map((id: string) => usersMap.get(id) ?? new UserEntity());
      },
    );
  }
}
