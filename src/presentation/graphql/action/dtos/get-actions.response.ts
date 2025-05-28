import { Field, ObjectType } from '@nestjs/graphql';

// import from domain
import { PaginationResponse, ActionEntity } from '@/domain/entites';

@ObjectType({ description: 'Get list' })
export class GetActionsResponse {
  @Field(() => PaginationResponse)
  pagination?: PaginationResponse;

  @Field(() => [ActionEntity])
  data!: ActionEntity[];
}
