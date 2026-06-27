import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  PermissionService,
  GetPermissionRequest,
  GetPermissionsResponse,
  GetPermissionsByUserIdResponse,
  CreatePermissionData,
  CreatePermissionResponse,
  UpdatePermissionData,
  UpdatePermissionResponse,
  DeletePermissionRequest,
  DeletePermissionResponse,
} from '@lamquangmanh/protobuf/dist/proto/permission/v1/permission';
import { FilterOperator } from '@lamquangmanh/protobuf/dist/proto/base/v1/base';

// import from common
import { USER_PACKAGE_NAME, FILTER_LIST_PERMISSION } from '@/common/constants';
import { GetListRequest } from '@/common/interfaces';
import {
  convertFilterToBackend,
  getResultFromGrpc,
  throwErrorFromGrpc,
} from '@/common/utils';

import { PermissionEntity } from '@/domain/entities';

@Injectable()
export class PermissionUseCase implements OnModuleInit {
  private readonly logger = new Logger(PermissionUseCase.name);
  private permissionService!: PermissionService;

  @Inject(USER_PACKAGE_NAME)
  private readonly client!: ClientGrpc;

  onModuleInit() {
    this.permissionService =
      this.client.getService<PermissionService>('PermissionService');
  }

  async findByIds(ids: string[]): Promise<PermissionEntity[] | undefined> {
    try {
      const result = await getResultFromGrpc<GetPermissionsResponse>(
        this.permissionService.GetPermissions({
          filters: [
            {
              field: 'permissionId',
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return (result?.data as any[]) ?? [];
    } catch (error: any) {
      this.logger.error(`Error in findByIds: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }

  async findByRoleIds(ids: string[]): Promise<PermissionEntity[] | undefined> {
    try {
      const result = await getResultFromGrpc<GetPermissionsResponse>(
        this.permissionService.GetPermissions({
          filters: [
            {
              field: 'roleId',
              operator: FilterOperator.FILTER_OPERATOR_IN,
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
    } catch (error: any) {
      this.logger.error(`Error in findByRoleIds: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }

  async getPermissionsByUser(
    userId: string,
  ): Promise<GetPermissionsByUserIdResponse | undefined> {
    try {
      return await getResultFromGrpc<GetPermissionsByUserIdResponse>(
        this.permissionService.GetPermissionsByUserId({
          userId,
        }),
      );
    } catch (error: any) {
      this.logger.error(
        `Error in getPermissionsByUser: ${error.message}`,
        error,
      );
      throwErrorFromGrpc(error);
    }
  }

  async getPermission(
    request: GetPermissionRequest,
  ): Promise<PermissionEntity | undefined> {
    try {
      return await getResultFromGrpc<PermissionEntity>(
        this.permissionService.GetPermission(request),
      );
    } catch (error: any) {
      this.logger.error(`Error in getPermission: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }

  async getPermissions(
    request: GetListRequest,
  ): Promise<GetPermissionsResponse | undefined> {
    try {
      const filters: any = convertFilterToBackend(
        request.filters,
        FILTER_LIST_PERMISSION,
      );

      return await getResultFromGrpc<GetPermissionsResponse>(
        this.permissionService.GetPermissions({
          filters,
          pagination: request.pagination,
          sorts: request.sorts,
        }),
      );
    } catch (error: any) {
      this.logger.error(`Error in getPermissions: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }

  async createPermission(
    permission: CreatePermissionData,
    userId: string,
  ): Promise<CreatePermissionResponse | undefined> {
    try {
      return await getResultFromGrpc<CreatePermissionResponse>(
        this.permissionService.CreatePermission({
          permission,
          userId,
        }),
      );
    } catch (error: any) {
      this.logger.error(`Error in createPermission: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }

  async updatePermission(
    permission: UpdatePermissionData,
    userId: string,
  ): Promise<UpdatePermissionResponse | undefined> {
    try {
      return await getResultFromGrpc<UpdatePermissionResponse>(
        this.permissionService.UpdatePermission({
          permission,
          userId,
        }),
      );
    } catch (error: any) {
      this.logger.error(`Error in updatePermission: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }

  async deletePermission(
    request: DeletePermissionRequest,
    userId: string,
  ): Promise<DeletePermissionResponse | undefined> {
    try {
      return await getResultFromGrpc<DeletePermissionResponse>(
        this.permissionService.DeletePermission({
          permissionId: request.permissionId,
          userId,
        }),
      );
    } catch (error: any) {
      this.logger.error(`Error in deletePermission: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }
}
