import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  RoleService,
  GetRoleRequest,
  GetRolesResponse,
  CreateSuccess,
} from '@lamquangmanh/protobuf/dist/role/v1/role';
import {
  UpdateSuccess,
  DeleteSuccess,
} from '@lamquangmanh/protobuf/dist/base/v1/base';

// import from common
import { USER_PACKAGE_NAME, FILTER_LIST_ROLE } from '@/common/constants';
import { GetListRequest } from '@/common/interfaces';
import {
  convertFilterToBackend,
  getResultFromGrpc,
  throwErrorFromGrpc,
} from '@/common/utils';

// import from domain
import {
  CreateRoleRequest,
  UpdateRoleRequest,
  DeleteRoleRequest,
} from '@/domain/use-cases';
import { RoleEntity } from '@/domain/entites';

@Injectable()
export class RoleUseCase implements OnModuleInit {
  private RoleService!: RoleService;

  constructor(@Inject(USER_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.RoleService = this.client.getService<RoleService>('RoleService');
  }

  async getRole(request: GetRoleRequest): Promise<RoleEntity> {
    return await getResultFromGrpc<RoleEntity>(
      this.RoleService.GetRole(request),
    );
  }

  async getRoles(request: GetListRequest): Promise<GetRolesResponse> {
    const filters: any = convertFilterToBackend(
      request.filters,
      FILTER_LIST_ROLE,
    );

    return await getResultFromGrpc<GetRolesResponse>(
      this.RoleService.GetRoles({
        filters,
        pagination: request.pagination,
        sorts: request.sorts,
      }),
    );
  }

  async createRole(
    request: CreateRoleRequest,
    userId: string,
  ): Promise<CreateSuccess | undefined> {
    try {
      return await getResultFromGrpc<CreateSuccess>(
        this.RoleService.CreateRole({
          role: {
            name: request.name,
            description: request.description ?? '',
            moduleId: request.moduleId,
            permissions: request.permissions,
          },
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }

  async updateRole(
    request: UpdateRoleRequest,
    userId: string,
  ): Promise<UpdateSuccess | undefined> {
    try {
      return await getResultFromGrpc<UpdateSuccess>(
        this.RoleService.UpdateRole({
          role: {
            roleId: request.roleId,
            name: request.name,
            description: request.description ?? '',
            moduleId: request.moduleId,
            permissions: request.permissions,
          },
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }

  async deleteRole(
    request: DeleteRoleRequest,
    userId: string,
  ): Promise<DeleteSuccess | undefined> {
    try {
      return await getResultFromGrpc<DeleteSuccess>(
        this.RoleService.DeleteRole({
          roleId: request.roleId,
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }
}
