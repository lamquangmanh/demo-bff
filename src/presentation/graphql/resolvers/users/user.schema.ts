import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserSchema {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  username: string;
}

@ObjectType('Pagination')
export class PaginationSchema {
  @Field()
  page: number;

  @Field()
  pageSize: number;

  @Field()
  total: number;
}

@ObjectType('GetUsersResponse')
export class GetUsersResponseSchema {
  @Field(() => [UserSchema])
  data: UserSchema[];

  @Field()
  total: number;
}

@ObjectType('UpdateUserResponse')
export class UpdateUserResponse {
  @Field()
  modifiedCount: number;
}

@ObjectType('DeleteUserResponse')
export class DeleteUserResponse {
  @Field()
  deletedCount: number;
}
