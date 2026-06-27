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
import { REQUEST_TYPE_MAPPING } from '@/common/constants';

// import from domain/entities
import {
  ActionEntity,
  ModuleEntity,
  ResourceEntity,
  GetListArgs,
  UpdateSuccessResponse,
  DeleteSuccessResponse,
} from '@/domain/entities';

// import from use-cases
import { ResourceUseCase } from '@/use-cases/resource';
import { UserUseCase } from '@/use-cases/user';
import { ModuleUseCase } from '@/use-cases/module';

// import from presentation
import {
  CreateResourceInput,
  DeleteResourceInput,
  GetResourceInput,
  UpdateResourceInput,
  GetResourcesResponse,
} from './dtos';
import { BaseResolver } from '../base.resolver';

@UseInterceptors(DataLoaderInterceptor)
@Resolver(() => ResourceEntity)
export class ResourceResolver extends BaseResolver {
  constructor(
    private readonly useCase: ResourceUseCase,
    protected readonly userUseCase: UserUseCase,
    private readonly moduleUseCase: ModuleUseCase,
  ) {
    super(userUseCase);
  }

  @Query(() => GetResourcesResponse, { name: 'resources' })
  async getResources(
    @Args() query: GetListArgs,
  ): Promise<GetResourcesResponse | undefined> {
    return await this.useCase.getResources(query);
  }

  @Query(() => ResourceEntity, { name: 'resource' })
  async getResource(
    @Args() request: GetResourceInput,
  ): Promise<ResourceEntity | undefined> {
    return await this.useCase.getResource(request);
  }

  @Mutation(() => ResourceEntity, { name: 'createResource' })
  async createResource(
    @Args() request: CreateResourceInput,
    @Context('user') user: UserInformation,
  ): Promise<ResourceEntity | undefined> {
    console.log('createResource request', request);
    const result = await this.useCase.createResource(
      request as any,
      user?.userId,
    );
    if (result?.resource) {
      return {
        ...result.resource,
        actions: [],
      };
    }
    return undefined;
  }

  @Mutation(() => UpdateSuccessResponse, { name: 'updateResource' })
  async updateResource(
    @Args() request: UpdateResourceInput,
    @Context('user') user: UserInformation,
  ): Promise<UpdateSuccess | undefined> {
    return await this.useCase.updateResource(request as any, user?.userId);
  }

  @Mutation(() => DeleteSuccessResponse, { name: 'deleteResource' })
  async deleteResource(
    @Args() request: DeleteResourceInput,
    @Context('user') user: UserInformation,
  ): Promise<DeleteSuccess | undefined> {
    return await this.useCase.deleteResource(request, user?.userId);
  }

  @ResolveField(() => [ActionEntity], { name: 'actions' })
  async actions(
    @Parent() resource: ResourceEntity,
    @Context() context: GraphQLContext,
  ): Promise<ActionEntity[]> {
    const result =
      await context?.loaders?.actionLoader?.batchActionsByResourceIds?.load(
        resource.resourceId,
      );
    const actions = result || [];
    return actions.map((actionItem) => ({
      ...actionItem,
      requestType: REQUEST_TYPE_MAPPING[actionItem.requestType],
    }));
  }

  @ResolveField(() => ModuleEntity, { name: 'module' })
  async module(
    @Parent() resource: ResourceEntity,
  ): Promise<ModuleEntity | undefined> {
    return await this.moduleUseCase.getModule({ moduleId: resource.moduleId });
  }
}
