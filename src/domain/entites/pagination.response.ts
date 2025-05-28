import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Pagination response' })
export class PaginationResponse {
  @Field()
  page!: number;

  @Field()
  limit!: number;

  @Field()
  totalItems!: number;

  @Field()
  totalPages!: number;

  @Field()
  itemCount!: number;
}
