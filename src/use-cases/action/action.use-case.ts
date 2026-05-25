import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  ActionService,
  GetActionRequest,
  GetActionsResponse,
  CreateActionData,
  UpdateActionData,
  CreateActionResponse,
  UpdateActionResponse,
  DeleteActionRequest,
  DeleteActionResponse,
} from '@lamquangmanh/protobuf/dist/proto/action/v1/action';
import { FilterOperator } from '@lamquangmanh/protobuf/dist/proto/base/v1/base';

// import from common
import { USER_PACKAGE_NAME, FILTER_LIST_ACTION } from '@/common/constants';
import { GetListRequest } from '@/common/interfaces';
import {
  convertFilterToBackend,
  getResultFromGrpc,
  throwErrorFromGrpc,
} from '@/common/utils';

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
  }

  async findByResourceIds(ids: string[]): Promise<ActionEntity[]> {
    const result = await getResultFromGrpc<GetActionsResponse>(
      this.actionService.GetActions({
        filters: [
          {
            field: 'resourceId',
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
    action: CreateActionData,
    userId: string,
  ): Promise<CreateActionResponse | undefined> {
    try {
      return await getResultFromGrpc<CreateActionResponse>(
        this.actionService.CreateAction({
          action,
          userId,
        }),
      );
    } catch (error: any) {
      throwErrorFromGrpc(error);
    }
  }

  async updateAction(
    action: UpdateActionData,
    userId: string,
  ): Promise<UpdateActionResponse | undefined> {
    try {
      return await getResultFromGrpc<UpdateActionResponse>(
        this.actionService.UpdateAction({
          action,
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
  ): Promise<DeleteActionResponse | undefined> {
    try {
      return await getResultFromGrpc<DeleteActionResponse>(
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
