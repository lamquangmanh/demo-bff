import { Observable } from 'rxjs';
import { GrpcServiceAbstract } from '../../abstracts/grpcService.abstract';
import { AddUserRequest, GetUsersRequest, UpdateUserRequest } from '../request';
import { DeleteUserResponse, GetUsersResponse, UpdateUserResponse } from '../response';
import { User } from '@src/domain/entities';

export interface IUserGrpcService extends GrpcServiceAbstract<User> {
  getUser(id: number): Observable<User>;
  listUser(filter: GetUsersRequest): Observable<GetUsersResponse>;
  deleteUser(id: number): Observable<DeleteUserResponse>;
  updateUser(data: UpdateUserRequest): Observable<UpdateUserResponse>;
  addUser(data: AddUserRequest): Observable<User>;
}
