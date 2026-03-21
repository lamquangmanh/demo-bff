import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

// import from common
import { returnString } from '@/common/utils';
import { SortOrder } from '@/common/constants';

@InputType()
export class SortArgs {
  @Field(returnString, { nullable: false })
  @IsString()
  field!: string;

  @Field(() => SortOrder, { nullable: false })
  @IsString()
  order!: SortOrder;
}
