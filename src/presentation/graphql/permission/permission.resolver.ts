// import from libraries
import { Resolver, Query, Context } from '@nestjs/graphql';

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
  ): Promise<GetPermissionsByUserResponse | undefined> {
    return await this.useCase.getPermissionsByUser(user.userId);
  }
}
