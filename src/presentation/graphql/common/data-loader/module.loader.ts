import DataLoader from 'dataloader';
import { Injectable, Scope, Inject } from '@nestjs/common';

// import from use-cases
import { ModuleUseCase } from '@/use-cases/module';

// import from domain/entities
import { ModuleEntity } from '@/domain/entities';

// One instance per request
@Injectable({ scope: Scope.REQUEST })
export class ModuleLoader {
  @Inject(ModuleUseCase)
  private readonly moduleUseCase!: ModuleUseCase;

  /**
   * Generate a DataLoader to batch modules by resource IDs.
   * This is useful for fetching all modules related to multiple roles in a single query.
   */
  generateBatchModulesByIds() {
    return new DataLoader<string, ModuleEntity>(
      async (ids: readonly string[]) => {
        let modules: ModuleEntity[] | undefined =
          await this.moduleUseCase.findByIds(ids as string[]);
        if (!modules) modules = [];
        const filtered: ModuleEntity[] = modules.filter(
          (module: ModuleEntity | null | undefined) =>
            module !== null && module !== undefined,
        );
        const modulesMap = new Map(
          filtered.map((module: ModuleEntity) => [module.moduleId, module]),
        );
        return ids.map(
          (id: string) => modulesMap.get(id) ?? new ModuleEntity(),
        );
      },
    );
  }
}
