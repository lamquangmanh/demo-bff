import { Observable } from 'rxjs';
import { GrpcServiceAbstract } from '../../abstracts/grpcService.abstract';
import { User } from '../../models/user.model';
import { AddUserDto, UpdateUserDto } from '@src/presentation/graphql/resolvers/user/user.dto';

export interface IUserGrpcService extends GrpcServiceAbstract<User> {
  get(id: number): Observable<User>;
  list(filter: any): Observable<User[]>;
  delete(id: number): Observable<User>;
  update(data: UpdateUserDto): Observable<User>;
  create(data: AddUserDto): Observable<User>;
}
