import { User } from '@src/domain/entities';

export interface GetUsersResponse {
  total: number;
  data: User[];
}

export interface DeleteUserResponse {
  deletedCount: number;
}

export interface UpdateUserResponse {
  modifiedCount: number;
}
