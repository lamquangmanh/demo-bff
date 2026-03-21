import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Update successfully response' })
export class UpdateSuccessResponse {
  @Field()
  success!: boolean;
}
