export interface PermissionItem {
  actionId: string;
  resourceId: string;
}

export interface CreateRoleRequest {
  name: string;
  description?: string;
  moduleId: string;
  permissions: PermissionItem[];
}

export interface UpdateRoleRequest {
  roleId: string;
  name: string;
  description?: string;
  moduleId: string;
  permissions: PermissionItem[];
}

export interface DeleteRoleRequest {
  roleId: string;
}
