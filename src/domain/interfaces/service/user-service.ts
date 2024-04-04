import { User } from '@src/domain/entities';
import { GrpcServiceAbstract } from '../../abstracts/grpcService.abstract';
import { AddUserRequest, GetUsersRequest, UpdateUserRequest } from '../request';
import { DeleteUserResponse, GetUsersResponse, UpdateUserResponse } from '../response';

export interface IUserService extends GrpcServiceAbstract<User> {
  get(id: number): Promise<User>;
  list(filter: GetUsersRequest): Promise<GetUsersResponse>;
  delete(id: number): Promise<DeleteUserResponse>;
  update(data: UpdateUserRequest): Promise<UpdateUserResponse>;
  create(data: AddUserRequest): Promise<User>;
}
