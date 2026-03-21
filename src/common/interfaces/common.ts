// import from libraries
import * as DataLoader from 'dataloader';

// import from domain/entities
import {
  ActionEntity,
  PermissionEntity,
  ModuleEntity,
  UserEntity,
} from '@/domain/entities';

export interface PaginationResponse {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  itemCount: number;
}

export interface BaseEntity {
  createdAt?: string;
  createdUserId?: string;
  updatedAt?: string;
  updatedUserId?: string;
  deletedAt?: string;
  deletedUserId?: string;
}

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
    userLoader?: {
      batchUsersByIds: DataLoader<string, UserEntity | null>;
    };
  };
  req: any; // Express request object
  res: any; // Express response object
  [key: string]: any; // Allow additional properties
}

export interface MessageQueuePayload<T> {
  metadata: {
    userId: string;
    userEmail?: string;
    socketId?: string;
    [key: string]: any;
  };
  eventType?: string;
  payload: T;
}
