import { protobufPackage as UserPackageName } from '@lamquangmanh/protobuf/dist/proto/user/v1/user';
import { protobufPackage as AuthPackageName } from '@lamquangmanh/protobuf/dist/proto/auth/v1/auth';
import { protobufPackage as ActionPackageName } from '@lamquangmanh/protobuf/dist/proto/action/v1/action';
import { protobufPackage as MenuPackageName } from '@lamquangmanh/protobuf/dist/proto/menu/v1/menu';
import { protobufPackage as ProductPackageName } from '@lamquangmanh/protobuf/dist/proto/product/v1/product';
import { protobufPackage as ModulePackageName } from '@lamquangmanh/protobuf/dist/proto/module/v1/module';
import { protobufPackage as ResourcePackageName } from '@lamquangmanh/protobuf/dist/proto/resource/v1/resource';
import { protobufPackage as RolePackageName } from '@lamquangmanh/protobuf/dist/proto/role/v1/role';
import { protobufPackage as PermissionPackageName } from '@lamquangmanh/protobuf/dist/proto/permission/v1/permission';
import { protobufPackage as UserRolePackageName } from '@lamquangmanh/protobuf/dist/proto/user_role/v1/user_role';
import { protobufPackage as ErrorPackageName } from '@lamquangmanh/protobuf/dist/proto/error/v1/error';

export const USER_PACKAGE_NAME = 'USER_PACKAGE';
export const PACKAGE_NAMES = [
  UserPackageName,
  AuthPackageName,
  ActionPackageName,
  MenuPackageName,
  ProductPackageName,
  ModulePackageName,
  ResourcePackageName,
  RolePackageName,
  PermissionPackageName,
  UserRolePackageName,
  ErrorPackageName,
];

export const PROTO_PATHS = [
  'base/v1/base.proto',
  'action/v1/action.proto',
  'resource/v1/resource.proto',
  'module/v1/module.proto',
  'role/v1/role.proto',
  'permission/v1/permission.proto',
  'user/v1/user.proto',
  'user_role/v1/user_role.proto',
  'auth/v1/auth.proto',
  'menu/v1/menu.proto',
  'product/v1/product.proto',
  'error/v1/error.proto',
];
