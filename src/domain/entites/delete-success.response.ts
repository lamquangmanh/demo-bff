import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Delete successfully response' })
export class DeleteSuccessResponse {
  @Field()
  success!: boolean;
}
