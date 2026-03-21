// import from libraries
import { UseInterceptors } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import {
  UpdateSuccess,
  DeleteSuccess,
} from '@lamquangmanh/protobuf/dist/base/v1/base';

// import from common
import { UserInformation } from '@/common/interfaces';
import { DataLoaderInterceptor } from '@/common/interceptors';

// import from domain/entities
import {
  ProductEntity,
  ModuleEntity,
  GetListArgs,
  UpdateSuccessResponse,
  DeleteSuccessResponse,
} from '@/domain/entities';

// import from use-cases
import { ModuleUseCase } from '@/use-cases/module';
import { UserUseCase } from '@/use-cases/user';
import { ProductUseCase } from '@/use-cases/product';

// import from presentation
import {
  CreateModuleInput,
  DeleteModuleInput,
  GetModuleInput,
  UpdateModuleInput,
  GetModulesResponse,
} from './dtos';
import { BaseResolver } from '../base.resolver';

@UseInterceptors(DataLoaderInterceptor)
@Resolver(() => ModuleEntity)
export class ModuleResolver extends BaseResolver {
  constructor(
    private readonly useCase: ModuleUseCase,
    private readonly productUseCase: ProductUseCase,
    protected readonly userUseCase: UserUseCase,
  ) {
    super(userUseCase);
  }

  @Query(() => GetModulesResponse, { name: 'modules' })
  async getModules(@Args() query: GetListArgs): Promise<GetModulesResponse> {
    return await this.useCase.getModules(query);
  }

  @Query(() => ModuleEntity, { name: 'module' })
  async getModule(@Args() request: GetModuleInput): Promise<ModuleEntity> {
    return await this.useCase.getModule(request);
  }

  @Mutation(() => ModuleEntity, { name: 'createModule' })
  async createModule(
    @Args() request: CreateModuleInput,
    @Context('user') user: UserInformation,
  ): Promise<ModuleEntity | undefined> {
    const result = await this.useCase.createModule(request, user?.userId);
    return result?.module;
  }

  @Mutation(() => UpdateSuccessResponse, { name: 'updateModule' })
  async updateModule(
    @Args() request: UpdateModuleInput,
    @Context('user') user: UserInformation,
  ): Promise<UpdateSuccess | undefined> {
    return await this.useCase.updateModule(request, user?.userId);
  }

  @Mutation(() => DeleteSuccessResponse, { name: 'deleteModule' })
  async deleteModule(
    @Args() request: DeleteModuleInput,
    @Context('user') user: UserInformation,
  ): Promise<DeleteSuccess | undefined> {
    return await this.useCase.deleteModule(request, user?.userId);
  }

  @ResolveField(() => ProductEntity, { name: 'product' })
  async getProduct(
    @Parent() entity: { productId: string },
  ): Promise<ProductEntity | null> {
    if (!entity.productId) return null;
    const result = await this.productUseCase.getProduct(entity);
    return result || null;
  }
}
