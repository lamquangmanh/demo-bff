import DataLoader from 'dataloader';
import { Injectable, Scope, Inject } from '@nestjs/common';
import { filter, identify } from 'lodash';

// import from use-cases
import { UserUseCase } from '@/use-cases/user';

// import from domain/entities
import { UserEntity } from '@/domain/entities';

// One instance per request
@Injectable({ scope: Scope.REQUEST })
export class UserLoader {
  @Inject(UserUseCase)
  private readonly userUseCase!: UserUseCase;

  /**
   * Generate a DataLoader to batch users by user IDs.
   * This is useful for fetching all users related to multiple user IDs in a single query.
   */
  generateBatchUsersByIds() {
    return new DataLoader<string, UserEntity | null>(
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
        // Return null instead of empty entity when user not found
        return ids.map((id: string) => usersMap.get(id) ?? null);
      },
    );
  }
}
