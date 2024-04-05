import { User } from '@src/domain/entities';
import { GrpcServiceAbstract } from '../../abstracts/grpcService.abstract';
import { AddUserRequest, GetUsersRequest, UpdateUserRequest } from '../request';
import { DeleteUserResponse, GetUsersResponse, UpdateUserResponse } from '../response';

export interface IUserService extends GrpcServiceAbstract<User> {
  getUser(id: number): Promise<User>;
  listUser(filter: GetUsersRequest): Promise<GetUsersResponse>;
  deleteUser(id: number): Promise<DeleteUserResponse>;
  updateUser(data: UpdateUserRequest): Promise<UpdateUserResponse>;
  addUser(data: AddUserRequest): Promise<User>;
}
