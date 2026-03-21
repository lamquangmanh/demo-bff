import { Field, ArgsType } from '@nestjs/graphql';

// import from common
import { FilterArgs } from './filter.args';
import { SortArgs } from './sort.agrs';
import { PaginationArgs } from './pagination.args';

@ArgsType()
export class GetListArgs {
  @Field(() => PaginationArgs, { nullable: false })
  pagination!: PaginationArgs;

  @Field(() => [SortArgs], { nullable: false })
  sorts!: SortArgs[];

  @Field(() => [FilterArgs], { nullable: false })
  filters!: FilterArgs[];
}
