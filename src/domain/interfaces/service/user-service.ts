import {
  AddUserDto,
  UpdateUserDto,
  UsersFilterDto,
} from '@src/presentation/graphql/resolvers/user/user.dto';
import { GrpcServiceAbstract } from '../../abstracts/grpcService.abstract';
import { User } from '../../models/user.model';

export interface IUserService extends GrpcServiceAbstract<User> {
  get(id: number): Promise<User>;
  list(filter: UsersFilterDto): Promise<User[]>;
  delete(id: number): Promise<User>;
  update(data: UpdateUserDto): Promise<User>;
  create(data: AddUserDto): Promise<User>;
}
