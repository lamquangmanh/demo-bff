import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// import action loader from presentation
import {
  ActionLoader,
  PermissionLoader,
  ModuleLoader,
} from '@/presentation/graphql/common/data-loader';

@Injectable()
export class DataLoaderInterceptor implements NestInterceptor {
  constructor(
    private readonly actionLoader: ActionLoader,
    private readonly permissionLoader: PermissionLoader,
    private readonly moduleLoader: ModuleLoader,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = GqlExecutionContext.create(context).getContext();
    ctx.loaders = {
      actionLoader: {
        batchActions: this.actionLoader.generateBatchActionsByActionIds(),
        batchActionsByResourceIds:
          this.actionLoader.generateBatchActionsByResourceIds(),
      },
      permissionLoader: {
        batchPermissionsByRoleIds:
          this.permissionLoader.generateBatchPermissionsByRoleIds(),
      },
      moduleLoader: {
        batchModulesByIds: this.moduleLoader.generateBatchModulesByIds(),
      },
    };
    return next.handle();
  }
}
