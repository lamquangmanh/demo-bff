import { Observable } from 'rxjs';
import { GrpcServiceAbstract } from '../../abstracts/grpcService.abstract';
import {
  AddUserRequest,
  DeleteRequest,
  GetUserByIdRequest,
  GetUsersRequest,
  UpdateUserRequest,
} from '../request';
import { DeleteUserResponse, GetUsersResponse, UpdateUserResponse } from '../response';
import { User } from '@src/domain/entities';

export interface IUserGrpcService extends GrpcServiceAbstract<User> {
  getUser(data: GetUserByIdRequest): Observable<User>;
  listUser(filter: GetUsersRequest): Observable<GetUsersResponse>;
  deleteUser(data: DeleteRequest): Observable<DeleteUserResponse>;
  updateUser(data: UpdateUserRequest): Observable<UpdateUserResponse>;
  addUser(data: AddUserRequest): Observable<User>;
}
