import { Observable } from 'rxjs';
import { GrpcServiceAbstract } from '../../abstracts/grpcService.abstract';
import { User } from '../../models/user.model';

export interface IUserGrpcService extends GrpcServiceAbstract<User> {
  getUser({ name }: { name: string }): Observable<User>;
  getUserStream(): Observable<{ data: number }>;
}
