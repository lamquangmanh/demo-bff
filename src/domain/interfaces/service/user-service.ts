import {
  AddUserDto,
  UpdateUserDto,
  UsersFilterDto,
} from '@src/presentation/graphql/resolvers/user/user.dto';
import { GrpcServiceAbstract } from '../../abstracts/grpcService.abstract';
import { User } from '../../models/user.model';

export interface IUserService extends GrpcServiceAbstract<User> {
  getUserById(id: number): Promise<User>;
  getUsers(filter: UsersFilterDto): Promise<User[]>;
  deleteUser(id: number): Promise<User>;
  updateUser(data: UpdateUserDto): Promise<User>;
  addUser(data: AddUserDto): Promise<User>;
  // getUser({ name }: { name: string }): Promise<User>;
  // getUserStream(): Promise<{ data: number }[]>;
}
