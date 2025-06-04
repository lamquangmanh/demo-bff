import { UserStatus } from '@/common/constants';
import { PaginationResponse, BaseEntity } from '@/common/interfaces';

export interface UserEntity extends BaseEntity {
  userId: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  status: UserStatus;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
  status: UserStatus;
  roleIds?: string[];
}

export interface UpdateUserRequest {
  userId: string;
  username: string;
  email: string;
  password?: string;
  phone: string;
  avatar: string;
  status: UserStatus;
  roleIds?: string[];
}

export interface ChangePasswordUserRequest {
  userId: string;
  password: string;
}

export interface DeleteUserRequest {
  userId: string;
}

export interface GetUsersResponse {
  pagination: PaginationResponse;
  data: UserEntity[];
}
