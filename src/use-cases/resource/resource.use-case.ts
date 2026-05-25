import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
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
  private resourceService!: ResourceService;

  constructor(@Inject(USER_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.resourceService =
      this.client.getService<ResourceService>('ResourceService');
  }

  async getResource(request: GetResourceRequest): Promise<ResourceEntity> {
    return await getResultFromGrpc<ResourceEntity>(
      this.resourceService.GetResource(request),
    );
  }

  async getResources(request: GetListRequest): Promise<GetResourcesResponse> {
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
      throwErrorFromGrpc(error);
    }
  }
}
