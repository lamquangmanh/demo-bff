import { Field, ObjectType } from '@nestjs/graphql';

// import from domain
import { PaginationResponse, ProductEntity } from '@/domain/entites';

@ObjectType({ description: 'Get list' })
export class GetProductsResponse {
  @Field(() => PaginationResponse)
  pagination?: PaginationResponse;

  @Field(() => [ProductEntity])
  data!: ProductEntity[];
}
