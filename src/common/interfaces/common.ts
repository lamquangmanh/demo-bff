// import from libraries
import * as DataLoader from 'dataloader';

// import from domain/entities
import { ActionEntity, PermissionEntity, ModuleEntity } from '@/domain/entites';

export interface Pagination {
  page: number;
  limit: number;
}

export interface Filter {
  field: string;
  value: any;
}

export interface Sort {
  field: string;
  order: any;
}

export interface GetListRequest {
  pagination: Pagination;
  filters: Filter[];
  sorts: Sort[];
}

export interface UserInformation {
  userId: string;
  email: string;
}

export interface GraphQLContext {
  user: UserInformation;
  loaders?: {
    actionLoader?: {
      batchActions: DataLoader<string, ActionEntity[]>;
      batchActionsByResourceIds: DataLoader<string, ActionEntity[]>;
    };
    permissionLoader?: {
      batchPermissionsByRoleIds: DataLoader<string, PermissionEntity[]>;
    };
    moduleLoader?: {
      batchModulesByIds: DataLoader<string, ModuleEntity[]>;
    };
  };
  req: any; // Express request object
  res: any; // Express response object
  [key: string]: any; // Allow additional properties
}
