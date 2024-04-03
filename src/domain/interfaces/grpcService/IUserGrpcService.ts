import { Observable } from 'rxjs';
import { GrpcServiceAbstract } from '../../abstracts/grpcService.abstract';
import { User } from '../../models/user.model';
import {
  AddUserDto,
  UpdateUserDto,
  UsersFilterDto,
} from '@src/presentation/graphql/resolvers/user/user.dto';

export interface IUserGrpcService extends GrpcServiceAbstract<User> {
  getUserById(id: number): Observable<User>;
  getUsers(filter: UsersFilterDto): Observable<User[]>;
  deleteUser(id: number): Observable<User>;
  updateUser(data: UpdateUserDto): Observable<User>;
  addUser(data: AddUserDto): Observable<User>;
  // getUser({ name }: { name: string }): Observable<User>;
  // getUserStream(): Observable<{ data: number }>;
}
