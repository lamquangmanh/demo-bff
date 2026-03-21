import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  ActionService,
  GetActionRequest,
  GetActionsResponse,
  CreateSuccess,
} from '@lamquangmanh/protobuf/dist/action/v1/action';
import {
  UpdateSuccess,
  DeleteSuccess,
  FilterOperator,
} from '@lamquangmanh/protobuf/dist/base/v1/base';

// import from common
import { USER_PACKAGE_NAME, FILTER_LIST_ACTION } from '@/common/constants';
import { GetListRequest } from '@/common/interfaces';
import {
  convertFilterToBackend,
  getResultFromGrpc,
  throwErrorFromGrpc,
} from '@/common/utils';

// import from domain
import {
  CreateActionRequest,
  UpdateActionRequest,
  DeleteActionRequest,
} from '@/domain/use-cases';
import { ActionEntity } from '@/domain/entities';

@Injectable()
export class ActionUseCase implements OnModuleInit {
  private actionService!: ActionService;

  @Inject(USER_PACKAGE_NAME)
  private readonly client!: ClientGrpc;

  onModuleInit() {
    this.actionService = this.client.getService<ActionService>('ActionService');
  }

  async findByIds(ids: string[]): Promise<ActionEntity[]> {
    const result = await getResultFromGrpc<GetActionsResponse>(
      this.actionService.GetActions({
        filters: [
          {
            field: 'actionId',
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

  async findByResourceIds(ids: string[]): Promise<ActionEntity[]> {
    const result = await getResultFromGrpc<GetActionsResponse>(
      this.actionService.GetActions({
        filters: [
          {
            field: 'resourceId',
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

  async getAction(request: GetActionRequest): Promise<ActionEntity> {
    return await getResultFromGrpc<ActionEntity>(
      this.actionService.GetAction(request),
    );
  }

  async getActions(request: GetListRequest): Promise<GetActionsResponse> {
    const filters: any = convertFilterToBackend(
      request.filters,
      FILTER_LIST_ACTION,
    );

    return await getResultFromGrpc<GetActionsResponse>(
      this.actionService.GetActions({
        filters,
        pagination: request.pagination,
        sorts: request.sorts,
      }),
    );
  }

  async createAction(
    request: CreateActionRequest,
    userId: string,
  ): Promise<CreateSuccess | undefined> {
    try {
      return await getResultFromGrpc<CreateSuccess>(
        this.actionService.CreateAction({
          action: {
            name: request.name,
            description: request.description,
            resourceId: request.resourceId,
            requestType: request.requestType,
            method: request.method,
            url: request.url,
          },
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }

  async updateAction(
    request: UpdateActionRequest,
    userId: string,
  ): Promise<UpdateSuccess | undefined> {
    try {
      return await getResultFromGrpc<UpdateSuccess>(
        this.actionService.UpdateAction({
          action: {
            actionId: request.actionId,
            name: request.name,
            description: request.description,
            resourceId: request.resourceId,
            requestType: request.requestType,
            method: request.method,
            url: request.url,
          },
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }

  async deleteAction(
    request: DeleteActionRequest,
    userId: string,
  ): Promise<DeleteSuccess | undefined> {
    try {
      return await getResultFromGrpc<DeleteSuccess>(
        this.actionService.DeleteAction({
          actionId: request.actionId,
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }
}
