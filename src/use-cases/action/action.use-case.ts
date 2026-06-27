import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
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
  private readonly logger = new Logger(ActionUseCase.name);
  private actionService!: ActionService;

  @Inject(USER_PACKAGE_NAME)
  private readonly client!: ClientGrpc;

  onModuleInit() {
    this.actionService = this.client.getService<ActionService>('ActionService');
  }

  async findByIds(ids: string[]): Promise<ActionEntity[] | undefined> {
    try {
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
    } catch (error: any) {
      this.logger.error(`Error in findByIds: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }

  async findByResourceIds(ids: string[]): Promise<ActionEntity[] | undefined> {
    try {
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
    } catch (error: any) {
      this.logger.error(`Error in findByResourceIds: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }

  async getAction(
    request: GetActionRequest,
  ): Promise<ActionEntity | undefined> {
    try {
      return await getResultFromGrpc<ActionEntity>(
        this.actionService.GetAction(request),
      );
    } catch (error: any) {
      this.logger.error(`Error in getAction: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }

  async getActions(
    request: GetListRequest,
  ): Promise<GetActionsResponse | undefined> {
    try {
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
    } catch (error: any) {
      this.logger.error(`Error in getActions: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
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
      this.logger.error(`Error in createAction: ${error.message}`, error);
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
      this.logger.error(`Error in updateAction: ${error.message}`, error);
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
      this.logger.error(`Error in deleteAction: ${error.message}`, error);
      throwErrorFromGrpc(error);
    }
  }
}
