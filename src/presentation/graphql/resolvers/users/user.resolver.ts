import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import {
  AddUserUseCaseAbstract,
  DeleteUserUseCaseAbstract,
  GetUserByIdUseCaseAbstract,
  GetUsersUseCaseAbstract,
  UpdateUserUseCaseAbstract,
} from '@src/domain/use-cases';
import {
  DeleteUserResponse,
  GetUsersResponseSchema,
  UpdateUserResponse,
  UserSchema,
} from './user.schema';
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
  async getUserById(@Args('id') id: number): Promise<UserSchema> {
    return this.getUserByIdUseCase.execute(id);
  }

  @Query(() => GetUsersResponseSchema, { name: 'getUsers' })
  async getUsers(
    @Args('usersFilterDto') usersFilterDto: UsersFilterDto,
  ): Promise<GetUsersResponseSchema> {
    return this.getUsersUseCase.execute(usersFilterDto);
  }

  @Mutation(() => DeleteUserResponse, { name: 'deleteUser' })
  async deleteUser(@Args('id') id: number): Promise<DeleteUserResponse> {
    return this.deleteUserUseCase.execute(id);
  }

  @Mutation(() => UserSchema, { name: 'addUser' })
  async addUser(@Args('addUserDto') addUserDto: AddUserDto): Promise<UserSchema> {
    return this.addUserUseCase.execute(addUserDto);
  }

  @Mutation(() => UpdateUserResponse, { name: 'updateUser' })
  async updateUser(
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    return this.updateUserUseCase.execute({ ...updateUserDto });
  }
}
