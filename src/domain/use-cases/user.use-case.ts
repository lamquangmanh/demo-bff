import { UserStatus } from '@/common/constants';

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
