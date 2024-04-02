import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserSchema {
  @Field()
  user_id: string;

  @Field()
  user_name: string;

  @Field()
  permissions: string;
}
