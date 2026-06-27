import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  ModuleService,
  GetModuleRequest,
  GetModuleResponse,
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
  private readonly logger = new Logger(ModuleUseCase.name);
  private moduleService!: ModuleService;

  constructor(@Inject(USER_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.moduleService = this.client.getService<ModuleService>('ModuleService');
  }

  async findByIds(ids: string[]): Promise<ModuleEntity[] | undefined> {
    try {
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
    } catch (error: any) {
      this.logger.error(`Error in findByIds: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }

  async getModule(
    request: GetModuleRequest,
  ): Promise<ModuleEntity | undefined> {
    try {
      const result = await getResultFromGrpc<GetModuleResponse>(
        this.moduleService.GetModule(request),
      );
      return result?.module;
    } catch (error: any) {
      this.logger.error(`Error in getModule: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }

  async getModules(
    request: GetListRequest,
  ): Promise<GetModulesResponse | undefined> {
    try {
      const filters: any = convertFilterToBackend(
        request.filters,
        FILTER_LIST_MODULE,
      );

      const result = await getResultFromGrpc<GetModulesResponse>(
        this.moduleService.GetModules({
          filters,
          pagination: request.pagination,
          sorts: request.sorts,
        }),
      );
      return result;
    } catch (error: any) {
      this.logger.error(`Error in getModules: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
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
      this.logger.error(`Error in createModule: ${error.message}`, error);
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
      this.logger.error(`Error in updateModule: ${error.message}`, error);
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
      this.logger.error(`Error in deleteModule: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }
}
