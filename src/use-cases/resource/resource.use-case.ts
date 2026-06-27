import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  ResourceService,
  GetResourceRequest,
  GetResourcesResponse,
  CreateResourceResponse,
  UpdateResourceResponse,
  DeleteResourceResponse,
  CreateResourceData,
  UpdateResourceData,
} from '@lamquangmanh/protobuf/dist/proto/resource/v1/resource';

// import from common
import { USER_PACKAGE_NAME, FILTER_LIST_RESOURCE } from '@/common/constants';
import { GetListRequest } from '@/common/interfaces';
import {
  convertFilterToBackend,
  getResultFromGrpc,
  throwErrorFromGrpc,
} from '@/common/utils';
import { ResourceEntity } from '@/domain/entities';

@Injectable()
export class ResourceUseCase implements OnModuleInit {
  private readonly logger = new Logger(ResourceUseCase.name);
  private resourceService!: ResourceService;

  constructor(@Inject(USER_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.resourceService =
      this.client.getService<ResourceService>('ResourceService');
  }

  async getResource(
    request: GetResourceRequest,
  ): Promise<ResourceEntity | undefined> {
    try {
      return await getResultFromGrpc<ResourceEntity>(
        this.resourceService.GetResource(request),
      );
    } catch (error: any) {
      this.logger.error(`Error in getResource: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }

  async getResources(
    request: GetListRequest,
  ): Promise<GetResourcesResponse | undefined> {
    try {
      const filters: any = convertFilterToBackend(
        request.filters,
        FILTER_LIST_RESOURCE,
      );

      return await getResultFromGrpc<GetResourcesResponse>(
        this.resourceService.GetResources({
          filters,
          pagination: request.pagination,
          sorts: request.sorts,
        }),
      );
    } catch (error: any) {
      this.logger.error(`Error in getResources: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }

  async createResource(
    resource: CreateResourceData,
    userId: string,
  ): Promise<CreateResourceResponse | undefined> {
    try {
      return await getResultFromGrpc<CreateResourceResponse>(
        this.resourceService.CreateResource({
          resource,
          userId,
        }),
      );
    } catch (error: any) {
      this.logger.error(`Error in createResource: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }

  async updateResource(
    resource: UpdateResourceData,
    userId: string,
  ): Promise<UpdateResourceResponse | undefined> {
    try {
      return await getResultFromGrpc<UpdateResourceResponse>(
        this.resourceService.UpdateResource({
          resource,
          userId,
        }),
      );
    } catch (error: any) {
      this.logger.error(`Error in updateResource: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }

  async deleteResource(
    request: { resourceId: string },
    userId: string,
  ): Promise<DeleteResourceResponse | undefined> {
    try {
      return await getResultFromGrpc<DeleteResourceResponse>(
        this.resourceService.DeleteResource({
          resourceId: request.resourceId,
          userId,
        }),
      );
    } catch (error: any) {
      this.logger.error(`Error in deleteResource: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }
}
