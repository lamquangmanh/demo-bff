// import from libraries
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import {
  UpdateSuccess,
  DeleteSuccess,
} from '@lamquangmanh/protobuf/dist/base/v1/base';
import { UseInterceptors } from '@nestjs/common';

// import from common
import { UserInformation, GraphQLContext } from '@/common/interfaces';
import { DataLoaderInterceptor } from '@/common/interceptors';

// import from domain/entities
import {
  UserEntity,
  UserRoleEntity,
  RoleEntity,
  GetListArgs,
  UpdateSuccessResponse,
  DeleteSuccessResponse,
} from '@/domain/entities';

// import from use-cases
import { UserUseCase } from '@/use-cases/user';

// import from presentation
import {
  CreateUserInput,
  DeleteUserInput,
  GetUserInput,
  UpdateUserInput,
  ChangeUserPasswordInput,
  GetUsersResponse,
} from './dtos';
import { BaseResolver } from '../base.resolver';

@UseInterceptors(DataLoaderInterceptor)
@Resolver(() => UserEntity)
export class UserResolver extends BaseResolver {
  constructor(protected readonly useCase: UserUseCase) {
    super(useCase);
  }

  @Query(() => GetUsersResponse, { name: 'users' })
  async getUsers(@Args() query: GetListArgs): Promise<GetUsersResponse> {
    return await this.useCase.getUsers(query);
  }

  @Query(() => UserEntity, { name: 'user' })
  async getUser(@Args() request: GetUserInput): Promise<UserEntity> {
    return await this.useCase.getUser(request);
  }

  @Mutation(() => UserEntity, { name: 'createUser' })
  async createUser(
    @Args() request: CreateUserInput,
    @Context('user') user: UserInformation,
  ): Promise<UserEntity | undefined> {
    return this.useCase.createUser(request as any, user?.userId);
  }

  @Mutation(() => UpdateSuccessResponse, { name: 'updateUser' })
  async updateUser(
    @Args() request: UpdateUserInput,
    @Context('user') user: UserInformation,
  ): Promise<UpdateSuccess | undefined> {
    return await this.useCase.updateUser(request as any, user?.userId);
  }

  @Mutation(() => UpdateSuccessResponse, { name: 'changePassword' })
  async changePassword(
    @Args() request: ChangeUserPasswordInput,
    @Context('user') user: UserInformation,
  ): Promise<UpdateSuccess | undefined> {
    return await this.useCase.changePassword(request as any, user?.userId);
  }

  @Mutation(() => DeleteSuccessResponse, { name: 'deleteUser' })
  async deleteUser(
    @Args() request: DeleteUserInput,
    @Context('user') user: UserInformation,
  ): Promise<DeleteSuccess | undefined> {
    return await this.useCase.deleteUser(request, user?.userId);
  }

  @ResolveField(() => [UserRoleEntity], { name: 'userRoles' })
  async userRoles(
    @Parent() user: UserEntity,
    @Context() context: GraphQLContext,
  ): Promise<UserRoleEntity[]> {
    const detail = Array.isArray(user.userRoles)
      ? user
      : await this.useCase.getUser({ userId: user.userId });

    const detailWithFallback = detail as UserEntity & {
      data?: UserRoleEntity[];
      roleIds?: string[];
    };

    const userRoles: UserRoleEntity[] = Array.isArray(
      detailWithFallback.userRoles,
    )
      ? detailWithFallback.userRoles
      : Array.isArray(detailWithFallback.data)
        ? detailWithFallback.data
        : Array.isArray(detailWithFallback.roleIds)
          ? detailWithFallback.roleIds.map((roleId) => ({
              userRoleId: `${user.userId}:${roleId}`,
              userId: user.userId,
              roleId,
            }))
          : [];
    if (userRoles.length === 0) {
      return [];
    }

    const uniqueRoleIds = Array.from(
      new Set(userRoles.map((item) => item.roleId)),
    );

    const roleResults = context?.loaders?.roleLoader?.batchRolesByIds
      ? await context.loaders.roleLoader.batchRolesByIds.loadMany(uniqueRoleIds)
      : [];

    const rolesById = new Map<string, RoleEntity>();
    uniqueRoleIds.forEach((roleId, index) => {
      const role = roleResults[index];
      if (role && !(role instanceof Error)) {
        rolesById.set(roleId, role);
      }
    });

    return userRoles.map((userRole) => ({
      ...userRole,
      role: userRole.role ?? rolesById.get(userRole.roleId),
    }));
  }
}
