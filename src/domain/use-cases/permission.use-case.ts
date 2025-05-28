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
