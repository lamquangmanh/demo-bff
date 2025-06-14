export interface CreatePermissionRequest {
  roleId: string;
  resourceId: string;
  actionId: string;
}

export interface UpdatePermissionRequest {
  permissionId: string;
  roleId: string;
  resourceId: string;
  actionId: string;
}

export interface DeletePermissionRequest {
  permissionId: string;
}

export interface PermissionInfo {
  name: string;
  requestType: string;
  url: string;
  icon?: string;
}

export interface GetPermissionsByUserResponse {
  permissions: PermissionInfo[];
}
