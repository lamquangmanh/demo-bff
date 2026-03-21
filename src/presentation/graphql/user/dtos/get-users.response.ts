import { Field, ObjectType } from '@nestjs/graphql';

// import from domain
import { PaginationResponse, UserEntity } from '@/domain/entities';

@ObjectType({ description: 'Get list' })
export class GetUsersResponse {
  @Field(() => PaginationResponse)
  pagination?: PaginationResponse;

  @Field(() => [UserEntity])
  data!: UserEntity[];
}
