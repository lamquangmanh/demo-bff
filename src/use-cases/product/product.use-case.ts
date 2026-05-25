import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  ProductService,
  GetProductRequest,
  GetProductsResponse,
  CreateProductResponse,
  UpdateProductResponse,
  DeleteProductResponse,
  CreateProductData,
  UpdateProductData,
} from '@lamquangmanh/protobuf/dist/proto/product/v1/product';
import { FilterOperator } from '@lamquangmanh/protobuf/dist/proto/base/v1/base';

// import from common
import { USER_PACKAGE_NAME, FILTER_LIST_PRODUCT } from '@/common/constants';
import { GetListRequest } from '@/common/interfaces';
import {
  convertFilterToBackend,
  getResultFromGrpc,
  throwErrorFromGrpc,
} from '@/common/utils';

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
                operator: FilterOperator.FILTER_OPERATOR_IN,
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
    product: Omit<CreateProductData, 'description' | 'icon'> & {
      description?: string;
      icon?: string;
    },
    userId: string,
  ): Promise<CreateProductResponse | undefined> {
    try {
      return await getResultFromGrpc<CreateProductResponse>(
        this.productService.CreateProduct({
          product: {
            ...product,
            description: product.description ?? '',
            icon: product.icon ?? '',
          },
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }

  async updateProduct(
    product: Omit<UpdateProductData, 'description' | 'icon'> & {
      description?: string;
      icon?: string;
    },
    userId: string,
  ): Promise<UpdateProductResponse | undefined> {
    try {
      return await getResultFromGrpc<UpdateProductResponse>(
        this.productService.UpdateProduct({
          product: {
            ...product,
            description: product.description ?? '',
            icon: product.icon ?? '',
          },
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }

  async deleteProduct(
    request: { productId: string },
    userId: string,
  ): Promise<DeleteProductResponse | undefined> {
    try {
      return await getResultFromGrpc<DeleteProductResponse>(
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
