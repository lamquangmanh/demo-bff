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
  ProductEntity,
  GetListArgs,
  UpdateSuccessResponse,
  DeleteSuccessResponse,
} from '@/domain/entites';

// import from use-cases
import { ProductUseCase } from '@/use-cases/product';

// import from presentation
import {
  CreateProductInput,
  DeleteProductInput,
  GetProductInput,
  UpdateProductInput,
  GetProductsResponse,
} from './dtos';

@Resolver(() => ProductEntity)
export class ProductResolver {
  constructor(private readonly useCase: ProductUseCase) {}

  @Query(() => GetProductsResponse, { name: 'products' })
  async getProducts(
    @Args() query: GetListArgs,
  ): Promise<GetProductsResponse | undefined> {
    const data = await this.useCase.getProducts(query);
    console.log('getProducts', data);
    return data;
  }

  @Query(() => ProductEntity, { name: 'product' })
  async getProduct(
    @Args() request: GetProductInput,
  ): Promise<ProductEntity | undefined> {
    return await this.useCase.getProduct(request);
  }

  @Mutation(() => ProductEntity, { name: 'createProduct' })
  async createProduct(
    @Args() request: CreateProductInput,
    @Context('user') user: UserInformation,
  ): Promise<ProductEntity | undefined> {
    const result = await this.useCase.createProduct(request, user?.userId);
    return result?.product;
  }

  @Mutation(() => UpdateSuccessResponse, { name: 'updateProduct' })
  async updateProduct(
    @Args() request: UpdateProductInput,
    @Context('user') user: UserInformation,
  ): Promise<UpdateSuccess | undefined> {
    return await this.useCase.updateProduct(request, user?.userId);
  }

  @Mutation(() => DeleteSuccessResponse, { name: 'deleteProduct' })
  async deleteProduct(
    @Args() request: DeleteProductInput,
    @Context('user') user: UserInformation,
  ): Promise<DeleteSuccess | undefined> {
    return await this.useCase.deleteProduct(request, user?.userId);
  }
}
