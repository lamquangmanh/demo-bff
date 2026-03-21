import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  ResourceService,
  GetResourceRequest,
  GetResourcesResponse,
  CreateSuccess,
} from '@lamquangmanh/protobuf/dist/resource/v1/resource';
import {
  UpdateSuccess,
  DeleteSuccess,
} from '@lamquangmanh/protobuf/dist/base/v1/base';

// import from common
import { USER_PACKAGE_NAME, FILTER_LIST_RESOURCE } from '@/common/constants';
import { GetListRequest } from '@/common/interfaces';
import {
  convertFilterToBackend,
  getResultFromGrpc,
  throwErrorFromGrpc,
} from '@/common/utils';

// import from domain
import {
  CreateResourceRequest,
  UpdateResourceRequest,
  DeleteResourceRequest,
} from '@/domain/use-cases';
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
    request: CreateResourceRequest,
    userId: string,
  ): Promise<CreateSuccess | undefined> {
    try {
      return await getResultFromGrpc<CreateSuccess>(
        this.resourceService.CreateResource({
          resource: {
            name: request.name,
            moduleId: request.moduleId,
            actions: request.actions,
          },
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }

  async updateResource(
    request: UpdateResourceRequest,
    userId: string,
  ): Promise<UpdateSuccess | undefined> {
    try {
      return await getResultFromGrpc<UpdateSuccess>(
        this.resourceService.UpdateResource({
          resource: {
            resourceId: request.resourceId,
            name: request.name,
            moduleId: request.moduleId,
            actions: request.actions,
          },
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }

  async deleteResource(
    request: DeleteResourceRequest,
    userId: string,
  ): Promise<DeleteSuccess | undefined> {
    try {
      return await getResultFromGrpc<DeleteSuccess>(
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
