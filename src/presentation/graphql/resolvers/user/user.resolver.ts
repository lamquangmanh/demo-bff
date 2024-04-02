import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import {
  AddUserUseCaseAbstract,
  DeleteUserUseCaseAbstract,
  GetUserByIdUseCaseAbstract,
  GetUsersUseCaseAbstract,
  UpdateUserUseCaseAbstract,
} from '@src/domain/use-cases';
import { UserSchema } from './user.schema';
import { AddUserDto, UpdateUserDto, UsersFilterDto } from './user.dto';

@Resolver(() => UserSchema)
export class UserResolver {
  constructor(
    private addUserUseCase: AddUserUseCaseAbstract,
    private updateUserUseCase: UpdateUserUseCaseAbstract,
    private deleteUserUseCase: DeleteUserUseCaseAbstract,
    private getUserByIdUseCase: GetUserByIdUseCaseAbstract,
    private getUsersUseCase: GetUsersUseCaseAbstract,
  ) {}

  @Query(() => UserSchema, { name: 'getUserById' })
  async getUserById(@Args('id') id: string) {
    return this.getUserByIdUseCase.execute(id);
  }

  @Query(() => [UserSchema], { name: 'getUsers' })
  async getUsers(@Args('usersFilterDto') usersFilterDto: UsersFilterDto) {
    return this.getUsersUseCase.execute(usersFilterDto);
  }

  @Mutation(() => UserSchema, { name: 'deleteUser' })
  async deleteUser(@Args('id') id: string) {
    return this.deleteUserUseCase.execute(id);
  }

  @Mutation(() => UserSchema, { name: 'addUser' })
  async addUser(@Args('addUserDto') addUserDto: AddUserDto) {
    return this.addUserUseCase.execute(addUserDto);
  }

  @Mutation(() => UserSchema, { name: 'updateUser' })
  async updateUser(@Args('updateUserDto') updateUserDto: UpdateUserDto) {
    return this.updateUserUseCase.execute(updateUserDto);
  }
}
