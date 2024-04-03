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
