import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

// import from common
import { returnString } from '@/common/utils';
import { FlexibleValueScalar, AllowedValue } from '@/common/scalars';
@InputType()
export class FilterArgs {
  @Field(returnString, { nullable: false })
  @IsString()
  field!: string;

  @Field(() => FlexibleValueScalar, { nullable: false })
  @IsString()
  value!: AllowedValue;
}
