import { User } from '@src/domain/entities';
import { GrpcServiceAbstract } from '../../abstracts/grpcService.abstract';
import {
  AddUserRequest,
  DeleteRequest,
  GetUserByIdRequest,
  GetUsersRequest,
  UpdateUserRequest,
} from '../request';
import { DeleteUserResponse, GetUsersResponse, UpdateUserResponse } from '../response';

export interface IUserService extends GrpcServiceAbstract<User> {
  getUser(data: GetUserByIdRequest): Promise<User>;
  listUser(filter: GetUsersRequest): Promise<GetUsersResponse>;
  deleteUser(data: DeleteRequest): Promise<DeleteUserResponse>;
  updateUser(data: UpdateUserRequest): Promise<UpdateUserResponse>;
  addUser(data: AddUserRequest): Promise<User>;
}
