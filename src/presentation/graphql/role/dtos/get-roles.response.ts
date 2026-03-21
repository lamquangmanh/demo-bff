import { Field, ObjectType } from '@nestjs/graphql';

// import from domain
import { PaginationResponse, RoleEntity } from '@/domain/entities';

@ObjectType({ description: 'Get list' })
export class GetRolesResponse {
  @Field(() => PaginationResponse)
  pagination?: PaginationResponse;

  @Field(() => [RoleEntity])
  data!: RoleEntity[];
}
