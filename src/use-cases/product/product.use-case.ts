import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  ProductService,
  GetProductRequest,
  GetProductsResponse,
  CreateSuccess,
} from '@lamquangmanh/protobuf/dist/product/v1/product';
import {
  UpdateSuccess,
  DeleteSuccess,
  FilterOperator,
} from '@lamquangmanh/protobuf/dist/base/v1/base';

// import from common
import { USER_PACKAGE_NAME, FILTER_LIST_PRODUCT } from '@/common/constants';
import { GetListRequest } from '@/common/interfaces';
import {
  convertFilterToBackend,
  getResultFromGrpc,
  throwErrorFromGrpc,
} from '@/common/utils';

// import from domain
import {
  CreateProductRequest,
  UpdateProductRequest,
  DeleteProductRequest,
} from '@/domain/use-cases';
import { ProductEntity } from '@/domain/entities';

@Injectable()
export class ProductUseCase implements OnModuleInit {
  private productService!: ProductService;

  constructor(@Inject(USER_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.productService =
      this.client.getService<ProductService>('ProductService');
  }

  async findByIds(ids: string[]): Promise<ProductEntity[] | undefined> {
    try {
      const result: GetProductsResponse =
        await getResultFromGrpc<GetProductsResponse>(
          this.productService.GetProducts({
            filters: [
              {
                field: 'productId',
                operator: FilterOperator.IN,
                stringValues: ids,
                boolValues: [],
                numberValues: [],
              },
            ],
            pagination: { page: 1, limit: ids.length },
            sorts: [],
          }),
        );
      return result?.data ?? [];
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }

  async getProduct(
    request: GetProductRequest,
  ): Promise<ProductEntity | undefined> {
    try {
      return await getResultFromGrpc<ProductEntity>(
        this.productService.GetProduct(request),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }

  async getProducts(
    request: GetListRequest,
  ): Promise<GetProductsResponse | undefined> {
    try {
      const filters: any = convertFilterToBackend(
        request.filters,
        FILTER_LIST_PRODUCT,
      );

      const result = await getResultFromGrpc<GetProductsResponse>(
        this.productService.GetProducts({
          filters,
          pagination: request.pagination,
          sorts: request.sorts,
        }),
      );

      return result;
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }

  async createProduct(
    request: CreateProductRequest,
    userId: string,
  ): Promise<CreateSuccess | undefined> {
    try {
      return await getResultFromGrpc<CreateSuccess>(
        this.productService.CreateProduct({
          product: {
            ...request,
            description: request.description ?? '',
          },
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }

  async updateProduct(
    request: UpdateProductRequest,
    userId: string,
  ): Promise<UpdateSuccess | undefined> {
    try {
      return await getResultFromGrpc<UpdateSuccess>(
        this.productService.UpdateProduct({
          product: {
            ...request,
            description: request.description ?? '',
          },
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }

  async deleteProduct(
    request: DeleteProductRequest,
    userId: string,
  ): Promise<DeleteSuccess | undefined> {
    try {
      return await getResultFromGrpc<DeleteSuccess>(
        this.productService.DeleteProduct({
          productId: request.productId,
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }
}
