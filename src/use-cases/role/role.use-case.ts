import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  RoleService,
  GetRoleRequest,
  GetRolesResponse,
  CreateRoleResponse,
  UpdateRoleResponse,
  DeleteRoleResponse,
  CreateRoleData,
  UpdateRoleData,
} from '@lamquangmanh/protobuf/dist/proto/role/v1/role';

// import from common
import { USER_PACKAGE_NAME, FILTER_LIST_ROLE } from '@/common/constants';
import { GetListRequest } from '@/common/interfaces';
import {
  convertFilterToBackend,
  getResultFromGrpc,
  throwErrorFromGrpc,
} from '@/common/utils';

import { RoleEntity } from '@/domain/entities';

@Injectable()
export class RoleUseCase implements OnModuleInit {
  private readonly logger = new Logger(RoleUseCase.name);
  private roleService!: RoleService;

  constructor(@Inject(USER_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.roleService = this.client.getService<RoleService>('RoleService');
  }

  async getRole(request: GetRoleRequest): Promise<RoleEntity | undefined> {
    try {
      return await getResultFromGrpc<RoleEntity>(
        this.roleService.GetRole(request),
      );
    } catch (error: any) {
      this.logger.error(`Error in getRole: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }

  async getRoles(
    request: GetListRequest,
  ): Promise<GetRolesResponse | undefined> {
    try {
      const filters: any = convertFilterToBackend(
        request.filters,
        FILTER_LIST_ROLE,
      );

      return await getResultFromGrpc<GetRolesResponse>(
        this.roleService.GetRoles({
          filters,
          pagination: request.pagination,
          sorts: request.sorts,
        }),
      );
    } catch (error: any) {
      this.logger.error(`Error in getRoles: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }

  async createRole(
    role: CreateRoleData,
    userId: string,
  ): Promise<CreateRoleResponse | undefined> {
    try {
      return await getResultFromGrpc<CreateRoleResponse>(
        this.roleService.CreateRole({
          role: {
            name: role.name,
            description: role.description ?? '',
            moduleId: role.moduleId,
            permissions: role.permissions,
          },
          userId,
        }),
      );
    } catch (error: any) {
      this.logger.error(`Error in createRole: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }

  async updateRole(
    role: UpdateRoleData,
    userId: string,
  ): Promise<UpdateRoleResponse | undefined> {
    try {
      return await getResultFromGrpc<UpdateRoleResponse>(
        this.roleService.UpdateRole({
          role: {
            roleId: role.roleId,
            name: role.name,
            description: role.description ?? '',
            moduleId: role.moduleId,
            permissions: role.permissions,
          },
          userId,
        }),
      );
    } catch (error: any) {
      this.logger.error(`Error in updateRole: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }

  async deleteRole(
    request: { roleId: string },
    userId: string,
  ): Promise<DeleteRoleResponse | undefined> {
    try {
      return await getResultFromGrpc<DeleteRoleResponse>(
        this.roleService.DeleteRole({
          roleId: request.roleId,
          userId,
        }),
      );
    } catch (error: any) {
      this.logger.error(`Error in deleteRole: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }
}
