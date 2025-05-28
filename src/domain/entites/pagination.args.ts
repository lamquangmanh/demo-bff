import { Field, InputType } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

// import from common
import { returnInt } from '@/common/utils';

@InputType()
export class PaginationArgs {
  @Field(returnInt, { nullable: false })
  @IsInt()
  @Min(1)
  page!: number;

  @Field(returnInt, { nullable: false })
  @IsInt()
  @Min(1)
  limit!: number;
}
