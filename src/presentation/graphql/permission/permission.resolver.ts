// import from libraries
import { Resolver, Query, Context } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-errors';

// import from common
import { UserInformation } from '@/common/interfaces';

// import from use-cases
import { PermissionUseCase } from '@/use-cases/permission';

// import from presentation
import { GetPermissionsByUserResponse } from './dtos';

@Resolver()
export class PermissionResolver {
  constructor(private readonly useCase: PermissionUseCase) {}

  @Query(() => GetPermissionsByUserResponse, { name: 'getPermissionsByUser' })
  async getPermissionsByUser(
    @Context('user') user: UserInformation,
  ): Promise<GetPermissionsByUserResponse> {
    const result: GetPermissionsByUserResponse | undefined =
      await this.useCase.getPermissionsByUser(user.userId);
    if (!result) {
      throw new ApolloError('No super menus found for the user', '500', {});
    }

    return result;
  }
}
