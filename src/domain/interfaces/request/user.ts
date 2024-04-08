export interface GetUsersRequest {
  pageSize?: number;
  page?: number;
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

export interface DeleteRequest {
  id: number;
}

export interface GetUserByIdRequest {
  id: number;
}
