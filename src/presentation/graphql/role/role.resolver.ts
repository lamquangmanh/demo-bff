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
} from '@lamquangmanh/protobuf/dist/proto/base/v1/base';
import { UseInterceptors } from '@nestjs/common';

// import from common
import { UserInformation, GraphQLContext } from '@/common/interfaces';
import { DataLoaderInterceptor } from '@/common/interceptors';

// import from domain/entities
import {
  PermissionEntity,
  RoleEntity,
  ModuleEntity,
  GetListArgs,
  UpdateSuccessResponse,
  DeleteSuccessResponse,
} from '@/domain/entities';

// import from use-cases
import { RoleUseCase } from '@/use-cases/role';
import { UserUseCase } from '@/use-cases/user';

// import from presentation
import {
  CreateRoleInput,
  DeleteRoleInput,
  GetRoleInput,
  UpdateRoleInput,
  GetRolesResponse,
} from './dtos';
import { BaseResolver } from '../base.resolver';

@UseInterceptors(DataLoaderInterceptor)
@Resolver(() => RoleEntity)
export class RoleResolver extends BaseResolver {
  constructor(
    private readonly useCase: RoleUseCase,
    protected readonly userUseCase: UserUseCase,
  ) {
    super(userUseCase);
  }

  @Query(() => GetRolesResponse, { name: 'roles' })
  async getRoles(
    @Args() query: GetListArgs,
  ): Promise<GetRolesResponse | undefined> {
    return await this.useCase.getRoles(query);
  }

  @Query(() => RoleEntity, { name: 'role' })
  async getRole(
    @Args() request: GetRoleInput,
  ): Promise<RoleEntity | undefined> {
    return await this.useCase.getRole(request);
  }

  @Mutation(() => RoleEntity, { name: 'createRole' })
  async createRole(
    @Args() request: CreateRoleInput,
    @Context('user') user: UserInformation,
  ): Promise<RoleEntity | undefined> {
    const result = await this.useCase.createRole(request as any, user?.userId);
    return result?.role;
  }

  @Mutation(() => UpdateSuccessResponse, { name: 'updateRole' })
  async updateRole(
    @Args() request: UpdateRoleInput,
    @Context('user') user: UserInformation,
  ): Promise<UpdateSuccess | undefined> {
    return await this.useCase.updateRole(request as any, user?.userId);
  }

  @Mutation(() => DeleteSuccessResponse, { name: 'deleteRole' })
  async deleteRole(
    @Args() request: DeleteRoleInput,
    @Context('user') user: UserInformation,
  ): Promise<DeleteSuccess | undefined> {
    return await this.useCase.deleteRole(request, user?.userId);
  }

  @ResolveField(() => [ModuleEntity], { name: 'module' })
  async module(
    @Parent() role: RoleEntity,
    @Context() context: GraphQLContext,
  ): Promise<ModuleEntity[]> {
    const result =
      await context?.loaders?.moduleLoader?.batchModulesByIds?.load(
        role.moduleId,
      );
    return result || [];
  }

  @ResolveField(() => [PermissionEntity], { name: 'permissions' })
  async permissions(
    @Parent() role: RoleEntity,
    @Context() context: GraphQLContext,
  ): Promise<PermissionEntity[]> {
    const result =
      await context?.loaders?.permissionLoader?.batchPermissionsByRoleIds?.load(
        role.roleId,
      );
    return result || [];
  }
}
