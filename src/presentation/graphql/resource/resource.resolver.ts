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
  ActionEntity,
  ResourceEntity,
  GetListArgs,
  UpdateSuccessResponse,
  DeleteSuccessResponse,
} from '@/domain/entites';

// import from use-cases
import { ResourceUseCase } from '@/use-cases/resource';

// import from presentation
import {
  CreateResourceInput,
  DeleteResourceInput,
  GetResourceInput,
  UpdateResourceInput,
  GetResourcesResponse,
} from './dtos';

@UseInterceptors(DataLoaderInterceptor)
@Resolver(() => ResourceEntity)
export class ResourceResolver {
  constructor(private readonly useCase: ResourceUseCase) {}

  @Query(() => GetResourcesResponse, { name: 'resources' })
  async getResources(
    @Args() query: GetListArgs,
  ): Promise<GetResourcesResponse> {
    return await this.useCase.getResources(query);
  }

  @Query(() => ResourceEntity, { name: 'resource' })
  async getResource(
    @Args() request: GetResourceInput,
  ): Promise<ResourceEntity> {
    return await this.useCase.getResource(request);
  }

  @Mutation(() => ResourceEntity, { name: 'createResource' })
  async createResource(
    @Args() request: CreateResourceInput,
    @Context('user') user: UserInformation,
  ): Promise<ResourceEntity | undefined> {
    const result = await this.useCase.createResource(
      request as any,
      user?.userId,
    );
    return result?.resource;
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
    return result || [];
  }
}
