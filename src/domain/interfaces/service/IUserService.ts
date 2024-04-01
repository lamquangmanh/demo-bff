import { GrpcServiceAbstract } from '../../abstracts/grpcService.abstract';
import { User } from '../../models/user.model';

export interface IUserService extends GrpcServiceAbstract<User> {
  getUser({ name }: { name: string }): Promise<User>;
  getUserStream(): Promise<{ data: number }[]>;
}
