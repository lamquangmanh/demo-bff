import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  ModuleService,
  GetModuleRequest,
  GetModulesResponse,
  CreateSuccess,
} from '@lamquangmanh/protobuf/dist/module/v1/module';
import {
  UpdateSuccess,
  DeleteSuccess,
  FilterOperator,
} from '@lamquangmanh/protobuf/dist/base/v1/base';

// import from common
import { USER_PACKAGE_NAME, FILTER_LIST_MODULE } from '@/common/constants';
import { GetListRequest } from '@/common/interfaces';
import {
  convertFilterToBackend,
  getResultFromGrpc,
  throwErrorFromGrpc,
} from '@/common/utils';

// import from domain
import {
  CreateModuleRequest,
  UpdateModuleRequest,
  DeleteModuleRequest,
} from '@/domain/use-cases';
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
    request: CreateModuleRequest,
    userId: string,
  ): Promise<CreateSuccess | undefined> {
    try {
      return await getResultFromGrpc<CreateSuccess>(
        this.moduleService.CreateModule({
          module: {
            ...request,
            description: request.description ?? '',
            icon: request.icon ?? '',
            url: request.url ?? '',
          },
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }

  async updateModule(
    request: UpdateModuleRequest,
    userId: string,
  ): Promise<UpdateSuccess | undefined> {
    try {
      return await getResultFromGrpc<UpdateSuccess>(
        this.moduleService.UpdateModule({
          module: {
            ...request,
            description: request.description ?? '',
            icon: request.icon ?? '',
            url: request.url ?? '',
          },
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }

  async deleteModule(
    request: DeleteModuleRequest,
    userId: string,
  ): Promise<DeleteSuccess | undefined> {
    try {
      return await getResultFromGrpc<DeleteSuccess>(
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
