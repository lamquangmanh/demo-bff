// import from libraries
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import {
  UpdateSuccess,
  DeleteSuccess,
} from '@lamquangmanh/protobuf/dist/base/v1/base';

// import from common
import { UserInformation } from '@/common/interfaces';

// import from domain/entities
import {
  ModuleEntity,
  GetListArgs,
  UpdateSuccessResponse,
  DeleteSuccessResponse,
} from '@/domain/entites';

// import from use-cases
import { ModuleUseCase } from '@/use-cases/module';

// import from presentation
import {
  CreateModuleInput,
  DeleteModuleInput,
  GetModuleInput,
  UpdateModuleInput,
  GetModulesResponse,
} from './dtos';

@Resolver(() => ModuleEntity)
export class ModuleResolver {
  constructor(private readonly useCase: ModuleUseCase) {}

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
}
