export interface GetUsersRequest {
  size?: number;
  limit?: number;
  name?: string;
  sort?: string;
}

export interface UpdateUserRequest {
  id: number;
  name: string;
  username: string;
}

export interface AddUserRequest {
  name: string;
  username: string;
}
