import DataLoader from 'dataloader';
import { Injectable, Scope, Inject } from '@nestjs/common';

// import from use-cases
import { PermissionUseCase } from '@/use-cases/permission';

// import from domain/entities
import { PermissionEntity } from '@/domain/entites';

// One instance per request
@Injectable({ scope: Scope.REQUEST })
export class PermissionLoader {
  @Inject(PermissionUseCase)
  private readonly permissionUseCase!: PermissionUseCase;

  /**
   * Generate a DataLoader to batch actions by resource IDs.
   * This is useful for fetching all actions related to multiple resources in a single query.
   */
  generateBatchPermissionsByRoleIds() {
    return new DataLoader<string, PermissionEntity[]>(
      async (roleIds: readonly string[]): Promise<PermissionEntity[][]> => {
        const permissions = await this.permissionUseCase.findByRoleIds(
          roleIds as string[],
        );
        const filtered: PermissionEntity[] = permissions.filter(
          (permission: PermissionEntity | null | undefined) =>
            permission !== null && permission !== undefined,
        );
        const grouped: PermissionEntity[][] = roleIds.map((id: string) => {
          return filtered.filter(
            (permission: PermissionEntity) => permission.roleId === id,
          );
        });
        return grouped;
      },
    );
  }
}
