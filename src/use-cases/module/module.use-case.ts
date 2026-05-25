import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  ModuleService,
  GetModuleRequest,
  GetModulesResponse,
  CreateModuleResponse,
  UpdateModuleResponse,
  CreateModuleData,
  UpdateModuleData,
  DeleteModuleResponse,
} from '@lamquangmanh/protobuf/dist/proto/module/v1/module';
import { FilterOperator } from '@lamquangmanh/protobuf/dist/proto/base/v1/base';

// import from common
import { USER_PACKAGE_NAME, FILTER_LIST_MODULE } from '@/common/constants';
import { GetListRequest } from '@/common/interfaces';
import {
  convertFilterToBackend,
  getResultFromGrpc,
  throwErrorFromGrpc,
} from '@/common/utils';

import { ModuleEntity } from '@/domain/entities';

@Injectable()
export class ModuleUseCase implements OnModuleInit {
  private moduleService!: ModuleService;

  constructor(@Inject(USER_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.moduleService = this.client.getService<ModuleService>('ModuleService');
  }

  async findByIds(ids: string[]): Promise<ModuleEntity[]> {
    const result: GetModulesResponse =
      await getResultFromGrpc<GetModulesResponse>(
        this.moduleService.GetModules({
          filters: [
            {
              field: 'moduleId',
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
  }

  async getModule(request: GetModuleRequest): Promise<ModuleEntity> {
    return await getResultFromGrpc<ModuleEntity>(
      this.moduleService.GetModule(request),
    );
  }

  async getModules(request: GetListRequest): Promise<GetModulesResponse> {
    const filters: any = convertFilterToBackend(
      request.filters,
      FILTER_LIST_MODULE,
    );

    return await getResultFromGrpc<GetModulesResponse>(
      this.moduleService.GetModules({
        filters,
        pagination: request.pagination,
        sorts: request.sorts,
      }),
    );
  }

  async createModule(
    module: Omit<CreateModuleData, 'description'> & {
      description?: string;
    },
    userId: string,
  ): Promise<CreateModuleResponse | undefined> {
    try {
      return await getResultFromGrpc<CreateModuleResponse>(
        this.moduleService.CreateModule({
          module: {
            ...module,
            description: module.description ?? '',
          },
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }

  async updateModule(
    module: Omit<UpdateModuleData, 'description'> & {
      description?: string;
    },
    userId: string,
  ): Promise<UpdateModuleResponse | undefined> {
    try {
      return await getResultFromGrpc<UpdateModuleResponse>(
        this.moduleService.UpdateModule({
          module: {
            ...module,
            description: module.description ?? '',
          },
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }

  async deleteModule(
    request: { moduleId: string },
    userId: string,
  ): Promise<DeleteModuleResponse | undefined> {
    try {
      return await getResultFromGrpc<DeleteModuleResponse>(
        this.moduleService.DeleteModule({
          moduleId: request.moduleId,
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }
}
