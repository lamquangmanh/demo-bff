// import from libraries
import { ResolveField, Parent, Context, Resolver } from '@nestjs/graphql';

// import from domain/entities
import {
  CreatedUserEntity,
  UpdatedUserEntity,
  DeletedUserEntity,
} from '@/domain/entities';

// import from use-cases
import { UserUseCase } from '@/use-cases/user';

import { GraphQLContext } from '@/common/interfaces';

@Resolver(() => CreatedUserEntity)
export class BaseResolver {
  constructor(protected readonly userUseCase: UserUseCase) {}

  @ResolveField(() => CreatedUserEntity, { name: 'createdUser' })
  async createdUser(
    @Parent() entity: { createdUserId: string },
    @Context() context: GraphQLContext,
  ): Promise<CreatedUserEntity | null> {
    if (!entity.createdUserId) return null;

    const result = await context?.loaders?.userLoader?.batchUsersByIds?.load(
      entity.createdUserId ?? '',
    );
    return result || null;
  }

  @ResolveField(() => UpdatedUserEntity, { name: 'updatedUser' })
  async updatedUser(
    @Parent() entity: { updatedUserId: string },
    @Context() context: GraphQLContext,
  ): Promise<UpdatedUserEntity | null> {
    if (!entity.updatedUserId) return null;

    const result = await context?.loaders?.userLoader?.batchUsersByIds?.load(
      entity.updatedUserId ?? '',
    );
    return result || null;
  }

  @ResolveField(() => DeletedUserEntity, { name: 'deletedUser' })
  async deletedUser(
    @Parent() entity: { deletedUserId: string },
    @Context() context: GraphQLContext,
  ): Promise<DeletedUserEntity | null> {
    if (!entity.deletedUserId) return null;

    const result = await context?.loaders?.userLoader?.batchUsersByIds?.load(
      entity.deletedUserId ?? '',
    );
    return result || null;
  }
}
