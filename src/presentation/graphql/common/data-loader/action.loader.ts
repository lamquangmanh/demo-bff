import DataLoader from 'dataloader';
import { Injectable, Scope, Inject } from '@nestjs/common';

// import from use-cases
import { ActionUseCase } from '@/use-cases/action';

// import from domain/entities
import { ActionEntity } from '@/domain/entities';

// One instance per request
@Injectable({ scope: Scope.REQUEST })
export class ActionLoader {
  @Inject(ActionUseCase)
  private readonly actionUseCase!: ActionUseCase;

  /**
   * Generate a DataLoader to batch actions by action IDs.
   * This is useful for fetching multiple actions in a single query.
   */
  generateBatchActionsByActionIds() {
    return new DataLoader<string, ActionEntity[]>(
      // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
      async (actionIds: readonly string[]): Promise<(ActionEntity | any)[]> => {
        const actions = await this.actionUseCase.findByIds(
          actionIds as string[],
        );
        const actionsMap = new Map(
          actions.map((action) => [action.actionId, action]),
        );
        return actionIds.map((id) => actionsMap.get(id));
      },
    );
  }

  /**
   * Generate a DataLoader to batch actions by resource IDs.
   * This is useful for fetching all actions related to multiple resources in a single query.
   */
  generateBatchActionsByResourceIds() {
    return new DataLoader<string, ActionEntity[]>(
      async (resourceIds: readonly string[]) => {
        const actions = await this.actionUseCase.findByResourceIds(
          resourceIds as string[],
        );
        const grouped = resourceIds.map((id) =>
          actions.filter((action) => action.resourceId === id),
        );
        return grouped;
      },
    );
  }
}
