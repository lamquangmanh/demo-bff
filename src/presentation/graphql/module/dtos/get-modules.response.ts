import { Field, ObjectType } from '@nestjs/graphql';

// import from domain
import { PaginationResponse, ModuleEntity } from '@/domain/entities';

@ObjectType({ description: 'Get list' })
export class GetModulesResponse {
  @Field(() => PaginationResponse)
  pagination?: PaginationResponse;

  @Field(() => [ModuleEntity])
  data!: ModuleEntity[];
}
