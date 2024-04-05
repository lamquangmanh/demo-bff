import { Observable } from 'rxjs';
import { GrpcServiceAbstract } from '../../abstracts/grpcService.abstract';
import { AddUserRequest, GetUsersRequest, UpdateUserRequest } from '../request';
import { DeleteUserResponse, GetUsersResponse, UpdateUserResponse } from '../response';
import { User } from '@src/domain/entities';

export interface IUserGrpcService extends GrpcServiceAbstract<User> {
  get(id: number): Observable<User>;
  list(filter: GetUsersRequest): Observable<GetUsersResponse>;
  delete(id: number): Observable<DeleteUserResponse>;
  update(data: UpdateUserRequest): Observable<UpdateUserResponse>;
  create(data: AddUserRequest): Observable<User>;
}
