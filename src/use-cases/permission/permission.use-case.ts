import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  PermissionService,
  GetPermissionRequest,
  GetPermissionsResponse,
  CreateSuccess,
} from '@lamquangmanh/protobuf/dist/permission/v1/permission';
import {
  UpdateSuccess,
  DeleteSuccess,
  FilterOperator,
} from '@lamquangmanh/protobuf/dist/base/v1/base';

// import from common
import { USER_PACKAGE_NAME, FILTER_LIST_PERMISSION } from '@/common/constants';
import { GetListRequest } from '@/common/interfaces';
import {
  convertFilterToBackend,
  getResultFromGrpc,
  throwErrorFromGrpc,
} from '@/common/utils';

// import from domain
import {
  CreatePermissionRequest,
  UpdatePermissionRequest,
  DeletePermissionRequest,
} from '@/domain/use-cases';
import { PermissionEntity } from '@/domain/entites';

@Injectable()
export class PermissionUseCase implements OnModuleInit {
  private PermissionService!: PermissionService;

  @Inject(USER_PACKAGE_NAME)
  private readonly client!: ClientGrpc;
  // constructor() {}

  onModuleInit() {
    this.PermissionService =
      this.client.getService<PermissionService>('PermissionService');
  }

  async findByIds(ids: string[]): Promise<PermissionEntity[]> {
    const result = await getResultFromGrpc<GetPermissionsResponse>(
      this.PermissionService.GetPermissions({
        filters: [
          {
            field: 'permissionId',
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (result?.data as any[]) ?? [];
  }

  async findByRoleIds(ids: string[]): Promise<PermissionEntity[]> {
    const result = await getResultFromGrpc<GetPermissionsResponse>(
      this.PermissionService.GetPermissions({
        filters: [
          {
            field: 'roleId',
            operator: FilterOperator.IN,
            stringValues: ids,
            boolValues: [],
            numberValues: [],
          },
        ],
        pagination: { page: 1, limit: 1000 },
        sorts: [],
      }),
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (result?.data as any[]) ?? [];
  }

  async getPermission(
    request: GetPermissionRequest,
  ): Promise<PermissionEntity> {
    return await getResultFromGrpc<PermissionEntity>(
      this.PermissionService.GetPermission(request),
    );
  }

  async getPermissions(
    request: GetListRequest,
  ): Promise<GetPermissionsResponse> {
    const filters: any = convertFilterToBackend(
      request.filters,
      FILTER_LIST_PERMISSION,
    );

    return await getResultFromGrpc<GetPermissionsResponse>(
      this.PermissionService.GetPermissions({
        filters,
        pagination: request.pagination,
        sorts: request.sorts,
      }),
    );
  }

  async createPermission(
    request: CreatePermissionRequest,
    userId: string,
  ): Promise<CreateSuccess | undefined> {
    try {
      return await getResultFromGrpc<CreateSuccess>(
        this.PermissionService.CreatePermission({
          permission: {
            ...request,
          },
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }

  async updatePermission(
    request: UpdatePermissionRequest,
    userId: string,
  ): Promise<UpdateSuccess | undefined> {
    try {
      return await getResultFromGrpc<UpdateSuccess>(
        this.PermissionService.UpdatePermission({
          permission: {
            ...request,
          },
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }

  async deletePermission(
    request: DeletePermissionRequest,
    userId: string,
  ): Promise<DeleteSuccess | undefined> {
    try {
      return await getResultFromGrpc<DeleteSuccess>(
        this.PermissionService.DeletePermission({
          permissionId: request.permissionId,
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }
}
