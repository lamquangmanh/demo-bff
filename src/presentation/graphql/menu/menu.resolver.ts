// import from libraries
import { Resolver, Query, Context } from '@nestjs/graphql';

// import from common
import { UserInformation } from '@/common/interfaces';

// import from use-cases
import { MenuUseCase } from '@/use-cases/menu';

// import from presentation
import { GetSuperMenusResponse } from './dtos';

@Resolver()
export class MenuResolver {
  constructor(private readonly useCase: MenuUseCase) {}

  @Query(() => GetSuperMenusResponse, { name: 'getSuperMenus' })
  async getSuperMenus(
    @Context('user') user: UserInformation,
  ): Promise<GetSuperMenusResponse | undefined> {
    const result: GetSuperMenusResponse | undefined =
      await this.useCase.getSuperMenus(user.userId);
    return result;
  }
}
