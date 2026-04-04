import DataLoader from 'dataloader';
import { Injectable, Scope, Inject } from '@nestjs/common';
import { filter, identify } from 'lodash';

// import from use-cases
import { RoleUseCase } from '@/use-cases/role';

// import from domain/entities
import { RoleEntity } from '@/domain/entities';

// One instance per request
@Injectable({ scope: Scope.REQUEST })
export class RoleLoader {
  @Inject(RoleUseCase)
  private readonly roleUseCase!: RoleUseCase;

  generateBatchRolesByIds() {
    return new DataLoader<string, RoleEntity | null>(
      async (ids: readonly string[]) => {
        const uniqueIds = filter(ids, identify);

        const roles = await Promise.all(
          uniqueIds.map(async (id: string) => {
            try {
              return await this.roleUseCase.getRole({ roleId: id });
            } catch {
              return null;
            }
          }),
        );

        const filtered: RoleEntity[] = roles.filter(
          (role): role is RoleEntity => role !== null,
        );

        const rolesMap = new Map(
          filtered.map((role: RoleEntity) => [role.roleId, role]),
        );

        return ids.map((id: string) => rolesMap.get(id) ?? null);
      },
    );
  }
}
