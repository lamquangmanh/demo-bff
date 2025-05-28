import { Field, ObjectType } from '@nestjs/graphql';

// import from domain
import { PaginationResponse, ResourceEntity } from '@/domain/entites';

@ObjectType({ description: 'Get list' })
export class GetResourcesResponse {
  @Field(() => PaginationResponse)
  pagination?: PaginationResponse;

  @Field(() => [ResourceEntity])
  data!: ResourceEntity[];
}
